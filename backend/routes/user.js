const express = require('express');
const {
  getall,
  createuser,
  loginin,
  forgotPassword,
  logout,
  resetPassword,
  updatePassword,
  updateByUser,
  getUserProfile,
  getUserDetails,
  updateUserByAdmin,
  DeteleUserByAdmin,
} = require('../controller/user');
const { authenticateUser, authorizeRoles } = require('../middleware/auth');
const router = new express.Router();
router.post('/register', createuser);

router.post('/login', loginin);
router.get('/getall', getall);
router.post('/forgotpassword', forgotPassword);
router.get('/profile', authenticateUser, getUserProfile);
router.put('/resetpassword/:resetToken', resetPassword);
router.put('/updateprofile', authenticateUser, updateByUser);
router.put('/updatepassword', authenticateUser, updatePassword);
router.post('/logout', authenticateUser, logout);
router.get(
  '/admin/getallusers',
  authenticateUser,
  authorizeRoles('admin'),
  getall
);
router.get(
  '/admin/getuserdetails/:_id',
  authenticateUser,
  authorizeRoles('admin'),
  getUserDetails
);
router.put(
  '/admin/updateuser/:_id',
  authenticateUser,
  authorizeRoles('admin'),
  updateUserByAdmin
);
router.delete(
  '/admin/deleteuser/:_id',
  authenticateUser,
  authorizeRoles('admin'),
  DeteleUserByAdmin
);
module.exports = router;
