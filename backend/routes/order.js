const express = require('express');

const router = new express.Router();

const {
  placeOrder,
  sendStripApi,
  newOrder,
  getSingleOrder,
  loginUserOrder,
  allOrder,
  updateOrder,
  deleteOrder,
} = require('../controller/order');
const { authenticateUser, authorizeRoles } = require('../middleware/auth');

router.post('/create', authenticateUser, newOrder);
router.get(
  '/admin/getall',
  authenticateUser,
  authorizeRoles('admin'),
  allOrder
);

router.put(
  '/admin/update/:_id',
  authenticateUser,
  authorizeRoles('admin'),
  updateOrder
);

router.get('/getsinglerorder/:_id', authenticateUser, getSingleOrder);
router.get('/loginUserorder', authenticateUser, loginUserOrder);

router.delete(
  '/deleteorder/:_id',
  authenticateUser,
  authorizeRoles('admin'),
  deleteOrder
);

router.post('/placeorder', authenticateUser, placeOrder);
router.get('/stripeapi', sendStripApi);
// router.route('/stripeapi').get(isAuthenticatedUser, sendStripApi);

module.exports = router;
