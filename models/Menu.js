const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A menu item must have a name'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'A menu item must have a price'],
      min: [0, 'Price must be greater than or equal to 0'],
    },
    category: {
      type: String,
      required: [true, 'A menu item must have a category'],
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
