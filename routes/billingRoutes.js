const express = require('express');
const Joi = require('joi');
const billingController = require('../controllers/billingController');
const validate = require('../middleware/validate');
const { PAYMENT_METHOD } = require('../utils/constants');

const router = express.Router();

const generateBillSchema = Joi.object({
  paymentMethod: Joi.string().valid(...Object.values(PAYMENT_METHOD)).required(),
  taxPercent: Joi.number().min(0).default(0),
});

const updateBillSchema = Joi.object({
  paymentMethod: Joi.string().valid(...Object.values(PAYMENT_METHOD)),
  taxPercent: Joi.number().min(0),
}).min(1);

// Explicit GET, POST, PUT, DELETE endpoints
router.get('/', billingController.getAllBills);
router.post('/:orderId', validate(generateBillSchema), billingController.generateBill);

router.get('/:id', billingController.getBill);
router.put('/:id', validate(updateBillSchema), billingController.updateBill);
router.delete('/:id', billingController.deleteBill);

module.exports = router;
