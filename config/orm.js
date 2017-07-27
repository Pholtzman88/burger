//require mysql connection
var connection = require("../config/connection.js");
//converts objects into sql syntax for updating data queries
function objToSql(obj){
	//stores converted object properties
	var arr = [];
	//for each property in object
	for (key in obj){
		// push sql syntax to arr ex: objectProperty = objectPropertyValue ;
		arr.push(key + "=" + obj[key]);
	}
	//when all properties in object have been pushed to arr return arr as a string
	return arr.toString();
}
//object relational mapping
var orm = {
	//select all function *read*
	selectAll: function( table, next){
		//declare query
		var query = "SELECT * FROM "+table+';'
		//connect to mysql and perform query
		connection.query(query,function(err, result){
			//error handler
			if (err) throw err;
			//callback
			next(result);
		});
	}, 
	//insert one function *create*
	insertOne: function( table, col, val, next){
		var query = "INSERT INTO "+ table;
		query += " (" + col.toString() + ") ";
		query += "VALUES (?) ";
		console.log(query)
		//connect to mysql and perform query
		connection.query(query , val , function(err, result){
			if (err) throw err;
			//callback
			next(result);
		});
	},
	//update one function *update*
	updateOne: function( table, obj, condition, next){
		//set query
		var query = "UPDATE " + table;
		query += " SET " + objToSql(obj);
		query += " WHERE " + condition + ';';
		//connect to mysql and perform query
		connection.query(query, function(err,result){
			//error handler
			if (err) throw err;
			//callback
			next(result);
		})
	}
};
//export orm for use by model
module.exports = orm;