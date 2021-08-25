const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

////////////////
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "./frontend/build")));

  app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname + "/frontend/build/index.html"));
  });
} else console.log(process.env.NODE_ENV);

///////////////////
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Hello world!"));

//this is automatically decided by heroku if you push to heroku
console.log("env port" + process.env.PORT);
console.log("node env " + process.env.NODE_ENV);


let PORT;
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT;
} else PORT = 5555;

console.log("port = ", PORT);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT || 5555, () => console.log(`Server running on port ${PORT}`));
