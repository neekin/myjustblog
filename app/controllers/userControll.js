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

exports.logout = function(req,res){
   delete req.session.user;
   res.redirect('/');
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
                            req.session.user = user;
                            console.log(req.session);
                        	   return res.redirect('/');

                        	}
                        });

                    })
                    break;
                 default:
                      break;
            
	}

}

exports.signinRequired= function(req,res,next){
   if(!req.session.user){
           return res.redirect("/");
   }
   next();
}
