const jwt = require('jsonwebtoken');
const AppError = require('../error handler/AppError');
const wrapAsync = require('../error handler/AsyncError');
const User = require('../models/userSchema');

const authenticateUser = wrapAsync(async (req, res, next) => {
  const token = req.cookies.jwttoken;

  if (!token) {
    return next(new AppError('Login first to access this resource.', 401));
  }

  const verifytoken = jwt.verify(token, process.env.JWT_SECRET);

  const rootUser = await User.findOne(
    { _id: verifytoken.id },
    { 'tokens.token': token }
  );

  if (!rootUser) {
    next(new AppError('Invaliduser', 403));
  } else {
    console.log('token verified');
    // console.log(rootUser);
    req.rootUser = rootUser;

    next();
  }
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userroot.role)) {
      return next(
        new AppError(
          `Role (${req.userroot.role}) is not allowed to acccess this resource`,
          403
        )
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
