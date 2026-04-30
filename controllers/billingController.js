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

const getAllBills = catchAsync(async (req, res, next) => {
  const bills = await billingService.getAllBills();
  apiResponse(res, 200, 'Bills retrieved successfully', { bills });
});

const updateBill = catchAsync(async (req, res, next) => {
  const updatedBill = await billingService.updateBill(req.params.id, req.body);
  apiResponse(res, 200, 'Bill updated successfully', { bill: updatedBill });
});

const deleteBill = catchAsync(async (req, res, next) => {
  await billingService.deleteBill(req.params.id);
  apiResponse(res, 204, 'Bill deleted successfully');
});

module.exports = {
  generateBill,
  getBill,
  getAllBills,
  updateBill,
  deleteBill,
};
