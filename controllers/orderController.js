const orderService = require('../services/orderService');
const catchAsync = require('../utils/catchAsync');
const apiResponse = require('../utils/apiResponse');

const createOrder = catchAsync(async (req, res, next) => {
  const newOrder = await orderService.createOrder(req.body);
  apiResponse(res, 201, 'Order created successfully', { order: newOrder });
});

const getOrders = catchAsync(async (req, res, next) => {
  const data = await orderService.getOrders(req.query);
  apiResponse(res, 200, 'Orders retrieved successfully', data);
});

const getOrder = catchAsync(async (req, res, next) => {
  const order = await orderService.getOrderById(req.params.id);
  apiResponse(res, 200, 'Order retrieved successfully', { order });
});

const updateOrderStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const updatedOrder = await orderService.updateOrderStatus(req.params.id, status);
  apiResponse(res, 200, 'Order status updated successfully', { order: updatedOrder });
});

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
};
