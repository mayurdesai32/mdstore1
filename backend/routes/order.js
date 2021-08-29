const express = require('express');

const router = new express.Router();

const { placeOrder, sendStripApi } = require('../controller/order');
const { authenticateUser, authorizeRoles } = require('../middleware/auth');

router.post('/placeorder', authenticateUser, placeOrder);
router.get('/stripeapi', sendStripApi);
// router.route('/stripeapi').get(isAuthenticatedUser, sendStripApi);

module.exports = router;
