const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middlewares/verifyToken');

// Generate JWT token on login
router.post('/jwt', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const secret = process.env.JWT_SECRET || 'uniquee_food_super_secret_jwt_key_2026';
    const token = jwt.sign({ email }, secret, { expiresIn: '7d' });

    res.json({
      success: true,
      token,
      message: 'Token issued successfully',
    });
  } catch (error) {
    console.error('JWT error:', error);
    res.status(500).json({ success: false, message: 'Failed to issue token' });
  }
});

// Sync or Upsert User from Firebase into MongoDB
router.post('/sync-user', async (req, res) => {
  try {
    const { email, name, photoURL, phone, address } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // First user registered or designated admin email automatically gets admin
      const totalUsers = await User.countDocuments();
      const isAdminByEnv = process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL.toLowerCase() === email.toLowerCase();
      const initialRole = totalUsers === 0 || isAdminByEnv ? 'admin' : 'user';

      user = await User.create({
        name: name || email.split('@')[0],
        email,
        photoURL: photoURL || '',
        phone: phone || '',
        address: address || '',
        role: initialRole,
      });
    } else {
      // Update basic fields if provided
      if (name) user.name = name;
      if (photoURL) user.photoURL = photoURL;
      if (phone) user.phone = phone;
      if (address) user.address = address;
      await user.save();
    }

    res.json({
      success: true,
      user,
      message: 'User synchronized successfully',
    });
  } catch (error) {
    console.error('Sync user error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Check if email belongs to an Admin
router.get('/check-admin/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    const isAdmin = Boolean(user && user.role === 'admin' && !user.isBlocked);
    res.json({ isAdmin, role: user ? user.role : 'user' });
  } catch (error) {
    console.error('Check admin error:', error);
    res.status(500).json({ isAdmin: false, error: error.message });
  }
});

// Get current user profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
