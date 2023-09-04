require('dotenv').config({
  path: '../env/backend.env',
});
const express = require('express');
const product = require('./routes/product');
const user = require('./routes/user');
const db = require('./db/db');
const ExpressError = require('./error handler/ExpressError');
const cookieParser = require('cookie-parser');
const order = require('./routes/order');

// handle uncaught exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('shutting down the server due to unhandled promise rejection');

  process.exit(1);
});

// for database
db();
const app = express();
app.use(express.json());
app.use(cookieParser());

const router = new express.Router();
const router1 = router.get('/', (req, res) => {
  res.json('hello world');
});

app.use('/hello', router1);
app.use('/product', product);
app.use('/order', order);
app.use('/user', user);

// for middleware Error handler
app.use(ExpressError);

// for server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

// for handling promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('shutting down the server due to unhandled promise rejection');
  server.close(() => {
    process.exit(1);
  });
});
