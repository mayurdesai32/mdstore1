// create and send token and save in the cookie.

const sendToken = async (user, statuscode, res) => {
  // create Jwt token
  const token = await user.generateAuthToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.cookie_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie('jwttoken', token, options).json({
    success: true,
    token,
    message: user,
  });
};

module.exports = sendToken;
