const express = require('express');

const {
  createproduct,
  readallproduct,
  readsingleproduct,
  removeproduct,
  updateproduct,
  createReview,
  allReview,
  deleteReview,
} = require('../controller/product');

const { authenticateUser, authorizeRoles } = require('../middleware/auth');
const router = new express.Router();
router.post(
  '/admin/',
  authenticateUser,
  authorizeRoles('admin'),
  createproduct
);
router.get(
  '/products/all',

  readallproduct
);
router.post(
  '/create',
  authenticateUser,
  authorizeRoles('admin'),
  createproduct
);
// by Id
router.get('/productbyid/:_id', readsingleproduct);
router.put(
  '/admin/:_id',
  authenticateUser,
  authorizeRoles('admin'),
  updateproduct
);
router.delete(
  '/admin/:_id',
  authenticateUser,
  authorizeRoles('admin'),
  removeproduct
);
router.put('/createreview/:_id', authenticateUser, createReview);

router.get('/allreview/:_id', authenticateUser, allReview);
router.delete('/deletereview/:_id', authenticateUser, deleteReview);
module.exports = router;
