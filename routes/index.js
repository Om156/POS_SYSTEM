const express = require('express');
const menuRoutes = require('./menuRoutes');
const orderRoutes = require('./orderRoutes');
const billingRoutes = require('./billingRoutes');

const router = express.Router();

router.use('/menu', menuRoutes);
router.use('/orders', orderRoutes);
router.use('/billing', billingRoutes);

module.exports = router;
