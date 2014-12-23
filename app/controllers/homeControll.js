//引入依赖model

var Article = require("../model/article");

exports.index =function  (req,res) {
/*       Article.find(function(err,articles){
         if(err){console.log(err)}
          console.log(articles);
        res.render("index",{ title:"首页",articles:articles});
       })*/
      //静态方法也是可以的
      Article.findAll(function(err,articles){
        if(err){console.log(err);}
          res.render("index",{title:"首页",articles:articles});
      });
}
//访问文章页面
exports.page=function  (req,res) {
/*  Article.findOne(req.params.id,function(err,article){
        if(err){console.log(err)}
           res.render("page",{title:article.title,article:article});
  });*/

 Article.findById(req.params.id,function(err,article){
  
                    if(err){res.redirect("/404.html");}

                        res.render("page",{title:article.title,article:article});
  });
}
//访问添加文章页
exports.newArticle=function  (req,res) {
	res.render("addArticle",{title:"添加文章"});
}

//添加文章方法
exports.addArticle=function(req,res){

//4再来初始化对象
var article = new Article({
  title:req.body.title,
  subtitle:req.body.subtitle,
  articlebody:req.body.editorValue
});

//5最后保存即可
  article.save(function(err){
   if(err)
    console.log("Err");
   return;
   })
	res.send("<script>alert('保存成功！') ;window.location.href=\"/\";</script>");
      //res.redirect("/");
}
//
exports.test=function  (req,res) {

   console.log(req.session);
	res.render("test",{});
}

exports.loginPage=function  (req,res) {
  res.render("login",{});
}
exports.login=function  (req,res) {
  req.session.user = {username:req.body.username,password:req.body.password}
  console.log(req.session);
  res.render("login",{}); 
}
exports.err=function  (req,res) {
  res.render("404",{title:'错误'}); 
}