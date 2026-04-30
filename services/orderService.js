const Order = require('../models/Order');
const Menu = require('../models/Menu');
const AppError = require('../utils/customError');
const { ORDER_STATUS } = require('../utils/constants');

const createOrder = async (orderData) => {
  const { items, type } = orderData;
  
  if (!items || items.length === 0) {
    throw new AppError('Order must have at least one item', 400);
  }

  let totalAmount = 0;
  const processedItems = [];

  for (const item of items) {
    const menuItem = await Menu.findById(item.itemId);
    if (!menuItem) {
      throw new AppError(`Menu item with id ${item.itemId} not found`, 404);
    }
    
    // Calculate price from DB, not from frontend
    const itemTotal = menuItem.price * item.quantity;
    totalAmount += itemTotal;

    processedItems.push({
      itemId: item.itemId,
      quantity: item.quantity,
      price: menuItem.price, // Store the price at the time of order
    });
  }

  const newOrder = await Order.create({
    items: processedItems,
    type,
    totalAmount,
  });

  return newOrder;
};

const getOrders = async (query) => {
  const { status, page = 1, limit = 10 } = query;
  
  const filter = {};
  if (status) {
    filter.status = status;
  }

  const skip = (page - 1) * limit;

  const orders = await Order.find(filter)
    .populate('items.itemId', 'name price category')
    .sort('-createdAt')
    .skip(skip)
    .limit(parseInt(limit, 10));

  const total = await Order.countDocuments(filter);

  return {
    orders,
    pagination: {
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / limit),
    },
  };
};

const getOrderById = async (id) => {
  const order = await Order.findById(id).populate('items.itemId', 'name price category');
  if (!order) {
    throw new AppError('No order found with that ID', 404);
  }
  return order;
};

const updateOrderStatus = async (id, status) => {
  if (!Object.values(ORDER_STATUS).includes(status)) {
    throw new AppError('Invalid order status', 400);
  }

  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!order) {
    throw new AppError('No order found with that ID', 404);
  }
  return order;
};

const updateOrder = async (id, updateData) => {
  // If items are being updated, we would need to recalculate totalAmount
  // For simplicity, we just allow updating the type or other non-item fields here
  // A complete update with item recalculation would be more complex
  if (updateData.items) {
    let totalAmount = 0;
    const processedItems = [];

    for (const item of updateData.items) {
      const menuItem = await Menu.findById(item.itemId);
      if (!menuItem) {
        throw new AppError(`Menu item with id ${item.itemId} not found`, 404);
      }
      const itemTotal = menuItem.price * item.quantity;
      totalAmount += itemTotal;
      processedItems.push({
        itemId: item.itemId,
        quantity: item.quantity,
        price: menuItem.price,
      });
    }
    updateData.items = processedItems;
    updateData.totalAmount = totalAmount;
  }

  const order = await Order.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    throw new AppError('No order found with that ID', 404);
  }
  return order;
};

const deleteOrder = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  if (!order) {
    throw new AppError('No order found with that ID', 404);
  }
  return order;
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  updateOrder,
  deleteOrder,
};
