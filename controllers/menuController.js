const menuService = require('../services/menuService');
const catchAsync = require('../utils/catchAsync');
const apiResponse = require('../utils/apiResponse');

const getAllMenuItems = catchAsync(async (req, res, next) => {
  const menuItems = await menuService.getAllMenuItems();
  apiResponse(res, 200, 'Menu items retrieved successfully', { menuItems });
});

const getMenuItem = catchAsync(async (req, res, next) => {
  const menuItem = await menuService.getMenuItemById(req.params.id);
  apiResponse(res, 200, 'Menu item retrieved successfully', { menuItem });
});

const createMenuItem = catchAsync(async (req, res, next) => {
  const newMenuItem = await menuService.createMenuItem(req.body);
  apiResponse(res, 201, 'Menu item created successfully', { menuItem: newMenuItem });
});

const updateMenuItem = catchAsync(async (req, res, next) => {
  const updatedMenuItem = await menuService.updateMenuItem(req.params.id, req.body);
  apiResponse(res, 200, 'Menu item updated successfully', { menuItem: updatedMenuItem });
});

const deleteMenuItem = catchAsync(async (req, res, next) => {
  await menuService.deleteMenuItem(req.params.id);
  apiResponse(res, 204, 'Menu item deleted successfully');
});

module.exports = {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
