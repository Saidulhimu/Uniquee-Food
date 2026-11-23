const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

// Get all products with query filters
router.get('/', async (req, res) => {
  try {
    const { category, search, sort, featured, minPrice, maxPrice } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    if (minPrice || maxPrice) {
      filter.regularPrice = {};
      if (minPrice) filter.regularPrice.$gte = Number(minPrice);
      if (maxPrice) filter.regularPrice.$lte = Number(maxPrice);
    }

    let query = Product.find(filter);

    // Sorting
    if (sort === 'low-to-high') {
      query = query.sort({ regularPrice: 1 });
    } else if (sort === 'high-to-low') {
      query = query.sort({ regularPrice: -1 });
    } else if (sort === 'newest') {
      query = query.sort({ createdAt: -1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const products = await query.exec();
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve products' });
  }
});

// Get single product details by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Invalid product ID or server error' });
  }
});

// Admin: Add new product
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      weight,
      regularPrice,
      discountPrice,
      stock,
      images,
      isFeatured,
    } = req.body;

    if (!name || !category || !description || regularPrice === undefined) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }

    const newProduct = await Product.create({
      name,
      category,
      description,
      weight: weight || '500g',
      regularPrice: Number(regularPrice),
      discountPrice: discountPrice ? Number(discountPrice) : null,
      stock: stock !== undefined ? Number(stock) : 10,
      images: Array.isArray(images) && images.length ? images : ['https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600'],
      isFeatured: Boolean(isFeatured),
    });

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product: newProduct,
    });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Update product
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      product: updated,
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Delete product
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
