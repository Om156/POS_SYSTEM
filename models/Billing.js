const mongoose = require('mongoose');
const { PAYMENT_METHOD } = require('../utils/constants');

const billingSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Order',
      required: [true, 'A bill must belong to an order'],
      unique: true,
    },
    total: {
      type: Number,
      required: [true, 'A bill must have a total amount'],
    },
    tax: {
      type: Number,
      required: [true, 'A bill must have a tax amount'],
      default: 0,
    },
    finalAmount: {
      type: Number,
      required: [true, 'A bill must have a final amount'],
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PAYMENT_METHOD),
      required: [true, 'A payment method is required'],
    },
    paidAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Billing = mongoose.model('Billing', billingSchema);

module.exports = Billing;
