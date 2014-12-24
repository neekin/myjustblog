var mongoose =require('mongoose');
var bcrypt = require("bcrypt");
var UserSchema = new mongoose.Schema({
	username:{unique:true,type:String},
	password:String
});


//直接给方法数组
UserSchema.statics = {
	findAll:function(cb){
		//取出数据库所有文章数据并按时间排序
		return this.find({}).sort({publishtime: -1}).exec(cb);
	},
	findById:function(id,cb){
		 return this.findOne({_id:id},cb);
	}
}

UserSchema.pre('save',function(next){
	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
		if(err) return next(err)
		bcrypt.hash(user.password,salt,function(err,hash){
                           if(err) return next(err)

		})
	})
})
module.exports = ArticleSchema;

