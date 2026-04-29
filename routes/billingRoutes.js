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

router.post('/:orderId', validate(generateBillSchema), billingController.generateBill);
router.get('/:id', billingController.getBill);

module.exports = router;
