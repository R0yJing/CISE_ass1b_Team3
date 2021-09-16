const mongoose = require("mongoose");
const ArticleSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  cat: {
    type: String,
  },
  title: {
    type: String,
  },
  authors: {
    type: String,
  },
  source: {
    type: String,
  },
  pubyear: {
    type: String,
  },
  doi: {
    type: String,
  },
  claim: {
    type: String,
  },
  evidence: {
    type: String,
  },
});

module.exports = mongoose.model("article", ArticleSchema);
