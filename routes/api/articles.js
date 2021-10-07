const express = require("express");
const router = express.Router();
const Article = require("../../models/Article");

router.get("/", async (req, res) => {
  Article.find()
    .then((articles) => res.json(articles))
    .catch((err) => res.status(404).json({ noArtFound: "No articles found" }));
  
});
router.put("/moderated/:id", async (req, res, next) =>
{
  console.log("updating moderator");
  console.log(req.body.id);
  console.log(req.params.id);
  var analysedQuery = {_id : req.params.id};
  var newValue = {$set:{moderated : true}}
  Article.updateOne(analysedQuery, newValue, (err, res) =>{
    if(err)
      console.log("something bad happed : failed to set to analysed");
    else
      console.log("success");
  });
}
);

router.put("/:id", async (req, res, next) =>{
  console.log("updating!!!!!!!");
  console.log(req.body.id);
  console.log(req.params.id);
  console.log("claim" + req.body["claim"]);

  var analysedQuery = {_id : req.params.id};
  var newValue = {$set:{analysed : true, claim}}
  Article.updateOne(analysedQuery, newValue, (err, res) =>{
    if(err)
      console.log("something bad happed : failed to set to analysed");
    else
      console.log("success");
  });

})

// router.put("/:id", (req, res, next) => {
//   User.findById(req.params.id)
//     .then((user) => user.update(req.body))
//     .then((updated) => res.status(201).json(updated))
//     .catch(next);
// });
// router.get("/:id", async (req, res) => {
//   console.log("finding...");

//   Article.findById(req.params.id, (err, doc) =>{
//     if (err) console.log(err);
//     else res.json(doc);
//   });
// });

router.delete("/", async (req, res) => {
  console.log("deleting");
  
  Article.deleteMany({})
    .then(res.send("deletions successful"))
    .catch((error) => console.log(error));
})
//findOneAndDelete({ _id: id}) = findByIdAndDelete(id)
router.delete("/:id", async (req, res) => {
 
  Article.remove({ id : req.body.id}, ( err) => {
    if (err)
      res.json({ msg: "unsucessful delete by title = " + req.params.title });
    else res.json({ msg: "deleted " + title });

  })
  // Article.findOneAndDelete({title: req.params.title}, (err, art) =>{
    
});

// router.delete("/", async (req, res) => {
//   Article.remove({}, (err, art) => {
//     if (err) console.log("delete all not successful");
//     else console.log("delete all successful");
//   });
// });


router.post("/", async (req, res) => {
  console.log("posting new article");
  Article.create(req.body)
    .then((article) => {console.log("posted"); res.send("posted!")})
    .catch((err) =>{      
      res.status(400).json({ error: "Unable to add this article" });
      console.log(err);
    }
    );
  
});

module.exports = router;