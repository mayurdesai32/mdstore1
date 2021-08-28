const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter the name'],
    maxlength: [30, 'Your name should not be more than 30 char'],
  },
  email: {
    type: String,
    required: [true, 'Please enter the name'],
    unique: true,
    validate: [validator.isEmail, 'Not a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter the password'],
    minLength: [6, 'Your name should not be less than 6 char'],
    // select: false,
  },
  cpassword: { type: String, required: true, select: false },

  role: { type: String, default: 'user' },

  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },

  tokens: [{ token: { type: String, required: true } }],
  createdAt: { type: Date, default: Date.now },
});

// hashing password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.cpassword = await bcrypt.hash(this.cpassword, 12);
});

// // Compare user password and comfirmed-password
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// for verify login and password
userSchema.methods.compareloginPasssword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

// Generating JWT token
userSchema.methods.generateAuthToken = async function () {
  let token = jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET
    // { expiresIn: process.env.JWT_EXPIRES_TIME * 2 * 60 }
  );
  this.tokens = this.tokens.concat({ token: token });
  await this.save();
  return token;
};

//generating reset token

userSchema.methods.getResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  await this.save();
  // console.log(this.resetPassword);
  return resetToken;
};

const User = new mongoose.model('User', userSchema);
module.exports = User;
