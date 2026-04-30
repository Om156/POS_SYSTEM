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

// Explicit GET, POST, PUT, DELETE endpoints for simplicity
router.get('/', menuController.getAllMenuItems);
router.post('/', validate(menuSchema), menuController.createMenuItem);

router.get('/:id', menuController.getMenuItem);
router.put('/:id', validate(updateMenuSchema), menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);

module.exports = router;
