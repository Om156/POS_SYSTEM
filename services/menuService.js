const Menu = require('../models/Menu');
const AppError = require('../utils/customError');

const getAllMenuItems = async () => {
  return await Menu.find();
};

const getMenuItemById = async (id) => {
  const menuItem = await Menu.findById(id);
  if (!menuItem) {
    throw new AppError('No menu item found with that ID', 404);
  }
  return menuItem;
};

const createMenuItem = async (data) => {
  return await Menu.create(data);
};

const updateMenuItem = async (id, data) => {
  const menuItem = await Menu.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!menuItem) {
    throw new AppError('No menu item found with that ID', 404);
  }
  return menuItem;
};

const deleteMenuItem = async (id) => {
  const menuItem = await Menu.findByIdAndDelete(id);

  if (!menuItem) {
    throw new AppError('No menu item found with that ID', 404);
  }
  return menuItem;
};

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
