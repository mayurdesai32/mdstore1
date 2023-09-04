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
router.post('/admin/', authorizeRoles('admin'), createproduct);
router.get('/products', readallproduct);
router.get('/create', createproduct);
// by Id
router.get('/productbyid/:id', readsingleproduct);
router.put('/admin/:id', authorizeRoles('admin'), updateproduct);
router.delete('/admin/:id', authorizeRoles('admin'), removeproduct);
module.exports = router;
