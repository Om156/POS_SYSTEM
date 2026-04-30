const Billing = require('../models/Billing');
const Order = require('../models/Order');
const AppError = require('../utils/customError');
const { ORDER_STATUS } = require('../utils/constants');

const generateBill = async (orderId, billingData) => {
  const { paymentMethod, taxPercent = 0 } = billingData;

  const order = await Order.findById(orderId);
  if (!order) {
    throw new AppError('No order found with that ID', 404);
  }

  if (order.status === ORDER_STATUS.PAID) {
    throw new AppError('Order is already paid', 400);
  }

  const existingBill = await Billing.findOne({ orderId });
  if (existingBill) {
    throw new AppError('Bill already generated for this order', 400);
  }

  const tax = (order.totalAmount * taxPercent) / 100;
  const finalAmount = order.totalAmount + tax;

  const bill = await Billing.create({
    orderId,
    total: order.totalAmount,
    tax,
    finalAmount,
    paymentMethod,
  });

  // Update order status to paid
  order.status = ORDER_STATUS.PAID;
  await order.save({ validateBeforeSave: false });

  return bill;
};

const getBillById = async (id) => {
  const bill = await Billing.findById(id).populate({
    path: 'orderId',
    populate: {
      path: 'items.itemId',
      select: 'name price',
    },
  });

  if (!bill) {
    throw new AppError('No bill found with that ID', 404);
  }

  return bill;
};

const getAllBills = async () => {
  return await Billing.find().populate('orderId');
};

const updateBill = async (id, updateData) => {
  const bill = await Billing.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!bill) {
    throw new AppError('No bill found with that ID', 404);
  }
  return bill;
};

const deleteBill = async (id) => {
  const bill = await Billing.findByIdAndDelete(id);
  
  if (!bill) {
    throw new AppError('No bill found with that ID', 404);
  }
  return bill;
};

module.exports = {
  generateBill,
  getBillById,
  getAllBills,
  updateBill,
  deleteBill,
};
