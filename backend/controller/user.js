const User = require('../models/userSchema');
const AppError = require('../error handler/AppError');
const wrapAsync = require('../error handler/AsyncError');
const sendEmail = require('../utils/sendEmail');
const sendToken = require('../utils/jwtToken');
const crypto = require('crypto');
const { ObjectId } = require('mongodb');

const createuser = wrapAsync(async (req, res, next) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return next(new AppError('some of the input fields is missing', 401));
  }

  let match = password === cpassword;
  if (!match) {
    return next(new AppError('password doesnt matches confirm-password', 400));
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return next(
      new AppError(`user found with this email id ${req.body.email}`, 400)
    );
  }

  user = new User({
    name,
    email,
    password,
  });
  user = await user.save();

  sendToken(user, 201, res);
});

const loginin = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please enter email & password', 401));
  }
  const user = await User.findOne({ email }).select('+password');

  const match = await user.compareloginPasssword(password);
  if (!match) {
    return next(new AppError('Invalid user or password', 404));
  }
  sendToken(user, 201, res);
});

// get currently logged in user
const getUserProfile = wrapAsync(async (req, res, next) => {
  const user = await User.findById(req.rootUser._id);

  res.status(201).json({
    success: true,
    message: user,
  });
});

// for forgot password

const forgotPassword = wrapAsync(async (req, res, next) => {
  const email = req.body.email;
  if (!email) {
    return next(new AppError('Please enter email id', 400));
  }
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new AppError(`user not found with this email id ${req.body.email}`, 404)
    );
  }

  // Reset Token  for forgot password
  const ResetPasswordtoken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create reset url to email to provided email
  // const mainurl = process.env.MAINURL;
  // const resetUrl = `${mainurl}/resetpassword/${ResetPasswordtoken}`;
  const mywebsite = process.env.MYWEBSITE;
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/user/resetpassword/${ResetPasswordtoken}`;
  // HTML Message
  const message = `
      You have requested for a password reset please click on  link below to reset pasword for MDStore Account:
     ${resetUrl}
    
      If you have not requested this email, then ignore it.
    
      MDStore is an Dummy Ecommerce website just created for coding practice. It is design by me mayur desai.
       you can also check my other project ${mywebsite}
    `;

  try {
    await sendEmail({
      email: user.email,
      subject: 'MDSTORE Password Recovery',
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    //  await user.save({ validateBeforeSave: false });

    return next(new AppError(error.message, 500));
  }
});

// for reset password of user
const resetPassword = wrapAsync(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  console.log('hello');
  if (!user) {
    return next(new AppError('Invalid Token or Token Expire', 400));
  }
  if (req.body.password !== req.body.cpassword) {
    return next(new ErrorHandler('Password does not match', 400));
  }

  // Setup new password
  user.password = req.body.password;
  // user.cpassword = req.body.cpassword;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(201).json({
    success: true,
    message: 'Password Updated Success',
    // token: user.getSignedJwtToken(),
  });
});

// for update user Password
const updatePassword = wrapAsync(async (req, res, next) => {
  console.log(req.rootUser);
  const user = await User.findById(req.rootUser._id).select('+select');

  // check previous password
  const match = await user.compareloginPasssword(req.body.oldpassword);

  if (!match) {
    return next(new AppError('Incorrect password', 404));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new AppError('Password and Confirm Password doesnt match', 404)
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 201, res);

  // res.status(201).json({
  //   success: true,
  //   data: 'Password Updated',
  //   // token: user.getSignedJwtToken(),
  // });
});

// for update by user
const updateByUser = wrapAsync(async (req, res, next) => {
  let role;
  if (req.rootUser.role === 'admin') {
    // only admin can change his role
    role = req.body.role;
  }
  const newdata = {
    name: req.body.name ? req.body.name : req.rootUser.name,
    email: req.body.email ? req.body.email : req.rootUser.email,
    role: role ? role : req.rootUser.role,
  };

  const user = await User.findByIdAndUpdate(
    req.rootUser._id,
    { $set: newdata },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  sendToken(user, 201, res);
  // res.status(201).json({
  //   success: true,
  //   data: 'profile Updated',
  //   message: user,
  // });
});
///for logout
const logout = wrapAsync(async (req, res) => {
  console.log(req.rootUser);

  req.rootUser.tokens = [];
  await req.rootUser.save();

  res
    .status(200)
    .clearCookie('jwttoken')
    .json({ success: true, token, message: 'logout successfully' });
});

// for admin
const getall = wrapAsync(async (req, res, next) => {
  const user = await User.find();
  res.status(201).json({ success: true, message: user });
});
// for admin
const getUserDetails = wrapAsync(async (req, res, next) => {
  const user = await User.findById(req.params._id);
  if (!user) {
    return next(
      new AppError(`user not found with this email id ${req.params._id}`, 400)
    );
  }
  res.status(201).json({ success: true, message: user });
});

// for update by admin
const updateUserByAdmin = wrapAsync(async (req, res, next) => {
  let user = await User.findById(req.params._id);
  if (!user) {
    return next(
      new AppError(`user not found with this email id ${req.params._id}`, 400)
    );
  }

  const newdata = {
    name: req.body.name ? req.body.name : req.rootUser.name,
    email: req.body.email ? req.body.email : req.rootUser.email,
    role: req.body.role ? req.body.role : req.rootUser.role,
  };

  user = await User.findByIdAndUpdate(
    req.params._id,
    { $set: newdata },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  const requestedObjectId = new ObjectId(req.params._id);
  const match = req.rootUser._id.equals(requestedObjectId);
  if (match) {
    return next(
      new AppError(`user cant update his own account by this route`, 400)
    );
  }

  res.status(201).json({
    success: true,
    message: 'User Detail Updated',
  });
});

// for update by admin
const DeteleUserByAdmin = wrapAsync(async (req, res, next) => {
  const requestedObjectId = new ObjectId(req.params._id);
  const match = req.rootUser._id.equals(requestedObjectId);
  if (match) {
    return next(
      new AppError(`user cant delete his own account by this route`, 400)
    );
  }
  let user = await User.findById(req.params._id);

  if (!user) {
    return next(
      new AppError(`user not found with this email id ${req.params._id}`, 400)
    );
  }

  await user.remove();
  res.status(201).json({
    success: true,
    message: 'user deleted',
  });
});

module.exports = {
  createuser,
  loginin,
  logout,
  forgotPassword,
  resetPassword,
  updateByUser,
  getall,
  getUserProfile,
  updatePassword,
  getUserDetails,
  updateUserByAdmin,
  DeteleUserByAdmin,
};
