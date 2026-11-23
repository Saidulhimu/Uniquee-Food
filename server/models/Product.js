const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Pure Honey & Ghee',
        'Nuts & Dry Fruits',
        'Organic Spices & Herbs',
        'Cold-Pressed Oils',
        'Healthy Snacks',
      ],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    weight: {
      type: String,
      required: [true, 'Weight/pack size is required'],
      default: '500g',
    },
    regularPrice: {
      type: Number,
      required: [true, 'Regular price is required'],
      min: 0,
    },
    discountPrice: {
      type: Number,
      min: 0,
      default: null,
    },
    stock: {
      type: Number,
      required: [true, 'Stock count is required'],
      default: 10,
      min: 0,
    },
    images: {
      type: [String],
      required: [true, 'At least one product image is required'],
      validate: [val => val.length > 0, 'Must provide at least 1 image URL'],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual property for discount percentage
productSchema.virtual('discountPercentage').get(function () {
  if (this.discountPrice && this.discountPrice < this.regularPrice) {
    return Math.round(((this.regularPrice - this.discountPrice) / this.regularPrice) * 100);
  }
  return 0;
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
