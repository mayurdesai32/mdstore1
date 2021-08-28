const User = require('../models/userSchema');
const AppError = require('../error handler/AppError');
const wrapAsync = require('../error handler/AsyncError');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const createuser = wrapAsync(async (req, res, next) => {
  const user = new User(req.body);
  console.log(user);
  let match = user.password === user.cpassword;
  if (!match) {
    next(new AppError('password doesnt matches confirm-password', 400));
  } else {
    const createuser = await user.save();
    res.status(201).json({ success: true, message: createuser });
  }
});

const loginin = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please enter email & password', 400));
  } else {
    const user = await User.findOne({ email });
    console.log(user);
    // const match = await bcrypt.compare(password, user.password);
    const match = await user.compareloginPasssword(password);
    if (!match) {
      next(new AppError('Invalid user or password', 404));
    } else {
      // To generate JWT-Token
      const token = await user.generateAuthToken();
      console.log(token);
      // To generate cookie
      res.cookie('jwttoken', token, {
        expires: new Date(
          Date.now() + process.env.cokiee_EXPIRES_TIME * 60 * 60
        ),
        httpOnly: true,
      });

      res.status(201).json({ success: true, message: user });
    }
  }
});

// for forgot password

const forgotPassword = wrapAsync(async (req, res, next) => {
  console.log('hello');
  console.log(req.body);
  console.log('hello');
  const email = req.body.email;
  if (!email) {
    return next(new AppError('Please enter email id', 400));
  }
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('No email could not be sent', 404));
  }

  // Reset Token  for forgot password
  const ResetPasswordtoken = await user.getResetPasswordToken();
  // const sam = await user.save({ validateBeforeSave: false });
  // console.log(sam);

  // Create reset url to email to provided email
  const mainurl = process.env.MAINURL;
  const resetUrl = `${mainurl}/resetpassword/${ResetPasswordtoken}`;

  // HTML Message
  const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      <br/>
      <p>If you have not requested this email, then ignore it.</p>
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
    await user.save();
    //  await user.save({ validateBeforeSave: false });

    return next(new AppError(error.message, 500));
  }
});

// for reset password of user
const resetPassword = wrapAsync(async (req, res, next) => {
  console.log(req.body);
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
  user.cpassword = req.body.cpassword;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(201).json({
    success: true,
    message: 'Password Updated Success',
    // token: user.getSignedJwtToken(),
  });
});

// for update user
const updateUser = wrapAsync(async (req, res, next) => {
  // const user = await User.findById(req.user.id);
  res.status(201).json({
    success: true,
    data: 'Password Updated',
    // token: user.getSignedJwtToken(),
  });
});
///for logout
const logout = wrapAsync(async (req, res) => {
  console.log(req.rootUser);

  req.rootUser.tokens = [];
  await req.rootUser.save();

  res.status(200).clearCookie('jwttoken').json('cookie cleared');
});
module.exports = {
  createuser,
  loginin,
  logout,
  forgotPassword,
  resetPassword,
  updateUser,
};
