const express = require('express');
const Joi = require('joi');
const menuController = require('../controllers/menuController');
const validate = require('../middleware/validate');

const router = express.Router();

const menuSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(),
  available: Joi.boolean(),
});

const updateMenuSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number().min(0),
  category: Joi.string(),
  available: Joi.boolean(),
}).min(1);

router
  .route('/')
  .get(menuController.getAllMenuItems)
  .post(validate(menuSchema), menuController.createMenuItem);

router
  .route('/:id')
  .get(menuController.getMenuItem)
  .put(validate(updateMenuSchema), menuController.updateMenuItem)
  .delete(menuController.deleteMenuItem);

module.exports = router;
