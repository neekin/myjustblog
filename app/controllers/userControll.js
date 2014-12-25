//user类控制器
//引入依赖model
var User =require("../model/user");

exports.signup = function(req,res){
	switch(req.method)
	{
                case "GET":
                      res.render("user/add",{})
                      console.log("GET方法")
                    break;
               case "POST":
                     var user = new User(req.body.user);
                     user.save(function(err){
                     	if(err) 
                     	   console.log(err)
                            return;
                     })
                    break;
                 default:
                      break;
            
	}
}

exports.signin=function(req,res){
        switch(req.method)
	{
                case "GET":
                      res.render("user/add",{})
                      console.log("GET方法")
                    break;
               case "POST":
                    var _user = req.body.user;
                    var username = _user.username;
                    var password = _user.password;
                    User.findOne({username:username},function(err,user){
                          if(err)
                          	console.log(err);
                          console.log(user);
                          if(!user){
                               return res.redirect('/');
                          }
                        user.comparePassword(password,function(err,isMatch){
                        	if(err)
                        		console.log(err);
                        	if(isMatch)
                        	{
                        	   console.log('密码是对的 登陆咯')
                        	   return res.redirect('/');

                        	}
                        });

                    })
                    break;
                 default:
                      break;
            
	}

}
