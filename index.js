const express = require("express");
const {connectDB} = require("./config/db");
var cors = require("cors");
const app = express();
const articles = require("./routes/api/articles");
const bodyParser = require("body-parser");

require("dotenv").config();
//maybe not
require("./models/Article");
require("./routes/api/articles.js");
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json({ extended: false }));

app.get("/", (req, res) => {res.json(app.stack);});
//update books via app.use
app.use("/", articles);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "./frontend/build")));

  app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname + "/frontend/build/index.html"));
  });
} else console.log("development version " + process.env.NODE_ENV);

const PORT = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Server up @ ${PORT}`));
