const mongoose = require('mongoose');
const DB_CONTAINERNAME = process.env.DB_CONTAINERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USERNAME = process.env.DB_USERNAME;

// IF we are using docker

let DB_URI;
// DB_URI = `mongodb:${DB_USERNAME}@${DB_PASSWORD}:${DB_CONTAINERNAME}:27017/mdstore?authSource=admin`;
if (process.env.DOCKER) {
  DB_URI = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_CONTAINERNAME}:27017/mdstore?authSource=admin`;
} else {
  DB_URI = `${process.env.MONGODB_URI}`;
}
console.log(DB_URI);
const db = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    // await mongoose.connect(DB_URI);
    console.log('database connected');
  } catch (error) {
    console.log('error occur on databate side ' + error);
    process.exit(1);
  }
};

module.exports = db;
