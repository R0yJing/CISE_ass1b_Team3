let mongoose = require("mongoose");
let numArticles = 0;
const connectDB = async () => {
    console.log("connecting to " + process.env.MONGODB_CONNECTION_STRING);
  
  mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => console.log(err));

};

module.exports = connectDB;
