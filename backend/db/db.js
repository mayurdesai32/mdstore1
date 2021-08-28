const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;
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
    process.exit(1);
  }
};

module.exports = db;
