var mongoose =require('mongoose');
var ArticleSchema = new mongoose.Schema({
	title:String,
	subtitle:String,
	articlebody:String,
	publishtime:{type:Date,default:Date.now()}
});

//单独声明静态方法的方式
/*ArticleSchema.statics.findAll=function(cb){
      return this.find({},cb).sort("publishtime");
};
ArticleSchema.statics.findById= function(id,cb){
      return this.findOne(id,cb);
};*/

//直接给方法数组
ArticleSchema.statics = {
	findAll:function(cb){
		 return this.find({},cb).sort("publishtime");
	},
	findById:function(id,cb){
		 return this.findOne(id,cb);
	}
}
module.exports = ArticleSchema;

