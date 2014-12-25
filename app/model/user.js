var mongoose =require('mongoose')

var UserSchema = require("../schema/user")

var User=mongoose.model("user",UserSchema )

module.exports = User;
