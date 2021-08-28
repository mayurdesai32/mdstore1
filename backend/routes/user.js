const express = require('express');
const {
  createuser,
  loginin,
  forgotPassword,
  logout,
  resetPassword,
  updateUser,
} = require('../controller/user');
const { authenticateUser, authorizeRoles } = require('../middleware/auth');
const router = new express.Router();
router.post('/register', createuser);
router.post('/login', loginin);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);
router.put('/updateuser/:resetToken', updateUser);
router.post('/logout', authenticateUser, logout);

module.exports = router;
