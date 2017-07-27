//require dependencies
var express = require("express");
var router = express.Router();
var Burger = require("../model/burger.js");

//set landing page to show all burgers
router.get("/",function(req,res){
	res.redirect("/burgers")
});

//landing page - inserts all burgers into handlebars
router.get("/burgers",function(req,res){
	//use burger model to read all burgers
	Burger.selectAll(function(data){
		//render all burgers into handlebars
		res.render("index", { burgers: data});
	});
});

//handles creating new burger in db and then redirects to burgers page
router.post("/burgers/create", function(req,res){
	//use burger model to insert a new burger to mysql
	Burger.insertOne( "burger_name", req.body.name,
	//after inserting data into mysql run callback to redirect to landing page
	 function(data){
		res.redirect("/burgers")
	});
});
//handles updating devoured boolean in mysql then redirects to burgers page
router.put("/burgers/update/:id",function(req,res){
	//set condition to id of burger
	var condition = "id = " + req.params.id;
	//use burger model to set devoured bool to true where condition is true
	Burger.updateOne({"devoured": 1}, condition,
	//after updating devoured bool redirect to landing page
	 function(data){
		res.redirect("/burgers")
	});
});
//export router
module.exports = router;


