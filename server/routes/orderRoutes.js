const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

// Customer: Create new order
router.post('/', verifyToken, async (req, res) => {
  try {
    const {
      userId,
      customerName,
      customerPhone,
      shippingAddress,
      city,
      notes,
      items,
      subtotal,
      deliveryFee,
      totalAmount,
      paymentMethod,
    } = req.body;

    if (!customerName || !customerPhone || !shippingAddress || !items || !items.length) {
      return res.status(400).json({ success: false, message: 'Please complete all order fields' });
    }

    const newOrder = await Order.create({
      userId: userId || req.user.id,
      userEmail: req.user.email,
      customerName,
      customerPhone,
      shippingAddress,
      city: city || 'Dhaka',
      notes: notes || '',
      items,
      subtotal: Number(subtotal),
      deliveryFee: deliveryFee !== undefined ? Number(deliveryFee) : 60,
      totalAmount: Number(totalAmount),
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Pending',
      orderStatus: 'Pending',
    });

    // Optionally reduce stock
    for (const item of items) {
      if (item.productId) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity },
        }).catch(err => console.log('Stock update error:', err));
      }
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: newOrder,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Customer: Get my orders
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const orders = await Order.find({ userEmail }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error('My orders error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve orders' });
  }
});

// Customer: Cancel pending order
router.patch('/:id/cancel', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.userEmail !== req.user.email) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    if (order.orderStatus !== 'Pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending orders can be cancelled',
      });
    }

    order.orderStatus = 'Cancelled';
    await order.save();

    res.json({ success: true, message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Get all orders
router.get('/admin/all', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status && status !== 'All' ? { orderStatus: status } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Update order status
router.patch('/admin/:id/status', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const updateData = {};
    if (orderStatus) updateData.orderStatus = orderStatus;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({
      success: true,
      message: `Order marked as ${orderStatus || paymentStatus}`,
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
