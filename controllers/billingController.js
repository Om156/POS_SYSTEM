const billingService = require('../services/billingService');
const catchAsync = require('../utils/catchAsync');
const apiResponse = require('../utils/apiResponse');

const generateBill = catchAsync(async (req, res, next) => {
  const newBill = await billingService.generateBill(req.params.orderId, req.body);
  apiResponse(res, 201, 'Bill generated successfully', { bill: newBill });
});

const getBill = catchAsync(async (req, res, next) => {
  const bill = await billingService.getBillById(req.params.id);
  apiResponse(res, 200, 'Bill retrieved successfully', { bill });
});

module.exports = {
  generateBill,
  getBill,
};
