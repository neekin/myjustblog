var mongoose =require('mongoose')

var ArticleSchema = require("../schema/article")

var Article=mongoose.model("article",ArticleSchema )

module.exports = Article