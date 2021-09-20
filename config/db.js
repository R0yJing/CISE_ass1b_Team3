let mongoose = require('mongoose');

let db;
const connectDB = async () => {
    console.log("connecting to " + process.env.MONGODB_CONNECTION_STRING);
  
  mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {db, connectDB};

