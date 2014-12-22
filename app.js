//引入 express 框架 来处理请求
var express = require("express");
//引入body-parser 处理request里的body参数(既post请求过来的参数)
var bodyParser = require("body-parser");
var session = require('express-session');
//引入path  因为我们引入样式后，框架并不知道我们的静态资源文件在哪
var path = require("path");
//引入百度富文本
var ueditor = require("ueditor");

//数据库相关
//1引入mongoose ODM来操作数据
var mongoose = require('mongoose');
//2mongoose链接服务器
mongoose.connect('mongodb://localhost/local');
//3引入model模型
var Article = require("./model/article");
var port = process.env.PORT  || 3000;
var app = express();
//设置VIews的路径 对应请求名字 在该目录 放模板
app.set("views","./Template/pages");
//设置框架的页面引擎为jade
app.set("view engine","jade");
//告诉框架静态资源文件的路径
app.use(express.static(path.join(__dirname,"")));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use("/public/ueditor/ue", ueditor(path.join(__dirname, "images"), function(req, res, next) {
  // ueditor 客户发起上传图片请求
  if(req.query.action === 'uploadimage'){
    var foo = req.ueditor;
    var date = new Date();
    var imgname = req.ueditor.filename;

    var img_url = date.getTime()+imgname;
    
    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
  }//  客户端发起图片列表请求
  else if (req.query.action === 'listimage'){
    var dir_url = '/';
    res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
  }else {

    res.setHeader('Content-Type', 'application/json');
    res.redirect('/public/ueditor/nodejs/config.json')
}}));
//启动应用监听
app.listen(port);
console.log("Website is on prot "+ port);

//路由 访问 根目录返回的页面
app.get("/",function  (req,res) {
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
});
//访问文章页面
app.get("/page/:id",function  (req,res) {
/*  Article.findOne(req.params.id,function(err,article){
        if(err){console.log(err)}
           res.render("page",{title:article.title,article:article});
  });*/

 Article.findById(req.params.id,function(err,article){
  
                    if(err){console.log(err);}

                        res.render("page",{title:article.title,article:article});
  });
});
//访问添加文章页
app.get("/add",function  (req,res) {
	res.render("addArticle",{title:"添加文章"});
});
//添加文章方法
app.post("/add",function(req,res){

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
})
//
app.get("/test",function  (req,res) {
	res.render("test",{});
});

app.get("/login",function  (req,res) {
  res.render("login",{});
});
app.post("/login",function  (req,res) {
  var username = req.body.username;
  var password = req.body.password;
  session.username = username;
  session.password = password;
  console.log(session);
  res.render("login",{}); 
});
