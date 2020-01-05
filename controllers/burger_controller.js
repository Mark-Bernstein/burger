var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
// get route -> index
router.get("/", function (req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function (req, res) {
  // express callback response by calling burger.selectAllBurger
  burger.all(function (burgerData) {
    var burgerObject = { burgers: burgerData };
    console.log("burgerObject console log here!!!", burgerObject);

    // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
    res.render("index", burgerObject);
  });
});


router.post("/api/burgers", function (req, res) {
  burger.create(["burger_name", "devoured"],
    [ req.body.burger_name, req.body.devoured ], 
    function (result) {
      // wrapper for orm.js that using MySQL insert callback will return a log to console,
      // render back to index with handle
      console.log("post console log here!!!", result);
      res.json({ id: result.insertId });
      res.redirect("/");
    });
});

// // post route -> back to index
// router.post("/burgers/create", function(req, res) {
//   // takes the request object using it as input for burger.addBurger
//   burger.create(req.body.burger_name, function(result) {
//     // wrapper for orm.js that using MySQL insert callback will return a log to console,
//     // render back to index with handle
//     console.log(result);
//     res.redirect("/");
//   });
// });


router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({ devoured: req.body.devoured }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


// // put route -> back to index
// router.put("/burgers/:id", function(req, res) {
//   burger.update(req.params.id, function(result) {
//     // wrapper for orm.js that using MySQL update callback will return a log to console,
//     // render back to index with handle
//     console.log(result);
//     // Send back response and let page reload from .then in Ajax
//     res.sendStatus(200);
//     //res.redirect("/");
//   });
// });


// Export routes for server.js to use.
module.exports = router;
