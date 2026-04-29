const mongoose = require('mongoose');
const { ORDER_STATUS, ORDER_TYPE } = require('../utils/constants');

const orderItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Menu',
    required: [true, 'Order item must have an itemId'],
  },
  quantity: {
    type: Number,
    required: [true, 'Order item must have a quantity'],
    min: [1, 'Quantity must be at least 1'],
  },
  price: {
    type: Number,
    required: [true, 'Order item must have a price'],
    min: [0, 'Price must be greater than or equal to 0'],
  },
});

const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],
    type: {
      type: String,
      enum: Object.values(ORDER_TYPE),
      required: [true, 'An order must have a type'],
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
    },
    totalAmount: {
      type: Number,
      required: [true, 'An order must have a totalAmount'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
