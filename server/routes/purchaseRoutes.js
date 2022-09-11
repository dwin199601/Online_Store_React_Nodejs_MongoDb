const {createPurchase, getPurchase} = require('../controlers/purchaseController');
const router = require('express').Router();

router.post('/api/newPurchase', createPurchase);
router.get('/api/newPurchase', getPurchase);

module.exports = router;