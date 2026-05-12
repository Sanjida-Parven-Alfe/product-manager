const mongoose = require('mongoose');

const specialOfferSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
      type: Number,
      required: [true, 'Original Price is required'],
      min: [0, 'Original Price cannot be negative'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    image: {
      url: {
        type: String,
        default: '',
      },
      publicId: {
        type: String,
        default: '',
      },
    },
    stock: {
      type: Number,
      default: 50,
    },
    rating: {
      type: Number,
      default: 5,
    },
    badge: {
      type: String,
      default: 'Special',
    },
    unit: {
      type: String,
      default: '1 Unit',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SpecialOffer', specialOfferSchema, 'special_offers');
