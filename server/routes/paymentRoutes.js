const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_mock_stripe_key');
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

// Create Stripe Checkout Session
router.post('/create-checkout-session', verifyToken, async (req, res) => {
  try {
    const { orderId, items, customerEmail, successUrl, cancelUrl } = req.body;

    if (!orderId || !items || !items.length) {
      return res.status(400).json({ success: false, message: 'Order data is missing' });
    }

    // Convert BDT to approximate USD or format cents for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        // Stripe expects amount in cents; 1 BDT ~ 0.0085 USD or direct unit_amount in cents
        unit_amount: Math.max(50, Math.round(Number(item.price) * 100)),
      },
      quantity: item.quantity,
    }));

    // If Stripe secret key is present and valid
    if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: customerEmail || req.user.email,
        line_items: lineItems,
        mode: 'payment',
        metadata: {
          orderId: orderId.toString(),
          userEmail: req.user.email,
        },
        success_url: `${successUrl || process.env.CLIENT_URL || 'http://localhost:5173'}/payment/success?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
        cancel_url: `${cancelUrl || process.env.CLIENT_URL || 'http://localhost:5173'}/payment/cancel?orderId=${orderId}`,
      });

      return res.json({ success: true, id: session.id, url: session.url });
    }

    // Fallback Mock Stripe Checkout for development/demo test flow
    const mockSessionId = `cs_test_uniquee_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const mockUrl = `${successUrl || 'http://localhost:5173'}/payment/success?session_id=${mockSessionId}&orderId=${orderId}`;

    res.json({
      success: true,
      id: mockSessionId,
      url: mockUrl,
      isDemo: true,
      message: 'Demo Stripe session generated (configure STRIPE_SECRET_KEY in server/.env for live Stripe)',
    });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify payment and record transaction
router.post('/verify-payment', verifyToken, async (req, res) => {
  try {
    const { orderId, sessionId, paymentMethod } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.paymentStatus = 'Paid';
    order.transactionId = sessionId || `TXN_${Date.now()}`;
    await order.save();

    const transaction = await Transaction.create({
      orderId: order._id,
      userEmail: order.userEmail,
      amount: order.totalAmount,
      currency: 'BDT',
      paymentMethod: paymentMethod || 'Stripe',
      transactionId: order.transactionId,
      status: 'Success',
    });

    res.json({
      success: true,
      message: 'Payment confirmed & verified',
      transaction,
      order,
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: View all transactions
router.get('/admin/transactions', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json({ success: true, count: transactions.length, transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
