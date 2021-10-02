const express = require("express");
const {connectDB} = require("./config/db");
var cors = require("cors");
const app = express();
const articles = require("./routes/api/articles");
const bodyParser = require("body-parser");

var allowCrossDomain = function (req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    console.log("options req detected (preflight)");
    res.send(200);
  } else {
    next();
  }
}
require("dotenv").config();
//maybe not
require("./models/Article");
require("./routes/api/articles.js");
//app.use(allowCrossDomain);

connectDB();

  app.use(express.json({ extended: false }));
  app.use(cors({ origin: true , credentials: true, optionsSuccessStatus:200 }));

  app.use("/api/articles", articles);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  if (process.env.NODE_ENV === "production") {
    console.log("production version " + process.env.NODE_ENV);
    app.use(express.static(path.resolve(__dirname, "./frontend/build")));
    app.get("*", function (request, response) {
      response.sendFile(path.join(__dirname + "/frontend/build/index.html"));
    });
  } else console.log("development version " + process.env.NODE_ENV);


app.get("/", (req, res) => {res.json(app.stack);});
//update books via app.use
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up @ ${PORT}`));
