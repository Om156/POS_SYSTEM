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

router
  .route('/')
  .get(orderController.getOrders)
  .post(validate(createOrderSchema), orderController.createOrder);

router.route('/:id').get(orderController.getOrder);

router
  .route('/:id/status')
  .put(validate(updateOrderStatusSchema), orderController.updateOrderStatus);

module.exports = router;
