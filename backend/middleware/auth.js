const jwt = require('jsonwebtoken');
const AppError = require('../error handler/AppError');
const wrapAsync = require('../error handler/AsyncError');
const User = require('../models/userSchema');

const authenticateUser = wrapAsync(async (req, res, next) => {
  const { jwttoken } = req.cookies;

  if (!jwttoken) {
    return next(new AppError('Login first to access this resource.', 401));
  }

  const verifytoken = jwt.verify(jwttoken, process.env.JWT_SECRET);

  // const rootUser = await User.findOne(
  //   { _id: verifytoken.id },
  //   { 'tokens.token': jwttoken }
  // );

  const rootUser = await User.findById(verifytoken.id);

  if (!rootUser) {
    return next(new AppError('Invaliduser', 403));
  }

  console.log('token verified');
  req.rootUser = rootUser;

  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.rootUser.role);
    if (!roles.includes(req.rootUser.role)) {
      return next(
        new AppError(
          `Role (${req.rootUser.role}) is not allowed to acccess this resource`,
          403
        )
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
