const mongoose = require('mongoose');
const DB_CONTAINERNAME = process.env.DB_CONTAINERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USERNAME = process.env.DB_USERNAME;

let DB_URI;
// IF we are using docker
if (process.env.DOCKER) {
  DB_URI = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_CONTAINERNAME}:27017/mdstore?authSource=admin`;
} else {
  DB_URI = `${process.env.MONGODB_URI}`;
}

const db = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('database connected');
  } catch (error) {
    console.log('error occur on databate side ' + error);
    console.log('shutting down the server due to error');

    process.exit(1);
  }
};

module.exports = db;
