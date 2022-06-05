const express = require('express');
const router = express.Router();
const controller = require('../controlers/paymentController');

router.post('/api/payment', controller.SendPayment);

module.exports = router;