var mongoose =require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
	username:{
		"unique":true,
		type:String
	},
	password:String
});

//直接给方法数组
UserSchema.statics = {
	findAll:function(cb){
		//取出数据库所有文章数据并按时间排序
		return this.find({}).sort({publishtime: -1}).exec(cb);
	},
	findById:function(name,cb){
		 return this.findOne({username:name},cb);
	}
}


UserSchema.pre('save', function(next) {
    var user = this;
    console.log(user);
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next()
        })

    })

})

UserSchema.methods = {
    comparePassword: function(_password, cb) {
        bcrypt.compare(_password, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch)

        })
    }


}


module.exports = UserSchema;
