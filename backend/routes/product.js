const express = require('express');

const {
  createproduct,
  readallproduct,
  readsingleproduct,
  removeproduct,
  updateproduct,
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

  createproduct
);
// by Id
router.get('/productbyid/:id', readsingleproduct);
router.put('/admin/:id', authorizeRoles('admin'), updateproduct);
router.delete('/admin/:id', authorizeRoles('admin'), removeproduct);
module.exports = router;
