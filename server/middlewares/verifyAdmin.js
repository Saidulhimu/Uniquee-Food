const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User identity not found',
      });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Admin access required',
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Account has been suspended',
      });
    }

    req.adminUser = user;
    next();
  } catch (error) {
    console.error('verifyAdmin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during admin verification',
    });
  }
};

module.exports = verifyAdmin;
