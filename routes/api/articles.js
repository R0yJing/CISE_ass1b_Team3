const express = require("express");
const router = express.Router();
const Article = require("../../models/Article");


router.get("/api/articles", async (req, res) => {
  Article.find()
    .then((articles) => res.json(articles))
    .catch((err) => res.status(404).json({ noArtFound: "No articles found" }));
  
});

// router.get("/:id", async (req, res) => {
//   console.log("finding...");

//   Article.findById(req.params.id, (err, doc) =>{
//     if (err) console.log(err);
//     else res.json(doc);
//   });
// });

//findOneAndDelete({ _id: id}) = findByIdAndDelete(id)
router.delete("/api/articles/:title", async (req, res) => {
  Article.remove({title : req.params.title}, (err) => {
    if (err)
      res.json({ msg: "unsucessful delete by title = " + req.params.title });
    else res.json({ msg: "deleted " + art });

  })
  // Article.findOneAndDelete({title: req.params.title}, (err, art) =>{
    
  // });
});

// router.delete("/", async (req, res) => {
//   Article.remove({}, (err, art) => {
//     if (err) console.log("delete all not successful");
//     else console.log("delete all successful");
//   });
// });


router.post("/api/articles", async (req, res) => {
  console.log("posting new article");
  Article.create(req.body)
    .then((article) => res.send("posted!"))
    .catch((err) =>{      
      res.status(400).json({ error: "Unable to add this article" });
      console.log(err);
    }
    );
  
});

module.exports = router;