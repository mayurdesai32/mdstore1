require('dotenv').config({ path: './config.env' });
const express = require('express');
const product = require('./routes/product');
const user = require('./routes/user');
const db = require('./db/db');
const ExpressError = require('./error handler/ExpressError');
const cookieParser = require('cookie-parser');

// for database
db();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/product', product);
app.use('/user', user);

// for Error haddler
app.use(ExpressError);

// for server
const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
