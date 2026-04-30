const express = require('express');
const Joi = require('joi');
const orderController = require('../controllers/orderController');
const validate = require('../middleware/validate');
const { ORDER_TYPE, ORDER_STATUS } = require('../utils/constants');

const router = express.Router();

const orderItemSchema = Joi.object({
  itemId: Joi.string().required(), // Assuming MongoDB ObjectId as string
  quantity: Joi.number().integer().min(1).required(),
});

const createOrderSchema = Joi.object({
  items: Joi.array().items(orderItemSchema).min(1).required(),
  type: Joi.string().valid(...Object.values(ORDER_TYPE)).required(),
});

const updateOrderStatusSchema = Joi.object({
  status: Joi.string().valid(...Object.values(ORDER_STATUS)).required(),
});

const updateOrderSchema = Joi.object({
  items: Joi.array().items(orderItemSchema).min(1),
  type: Joi.string().valid(...Object.values(ORDER_TYPE)),
}).min(1);

// Explicit GET, POST, PUT, DELETE endpoints for simple and clear routing
router.get('/', orderController.getOrders);
router.post('/', validate(createOrderSchema), orderController.createOrder);

router.get('/:id', orderController.getOrder);
router.put('/:id', validate(updateOrderSchema), orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

// Specific endpoint for status updates
router.put('/:id/status', validate(updateOrderStatusSchema), orderController.updateOrderStatus);

module.exports = router;
