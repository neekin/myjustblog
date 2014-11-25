var mongoose =require('mongoose');
var ArticleSchema = new mongoose.Schema({
	title:String,
	subtitle:String,
	articlebody:String,
	publishtime:{type:Date,default:Date.now()}
});
module.exports = ArticleSchema;