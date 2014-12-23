//引入 express 框架 来处理请求
var express = require("express");
//引入body-parser 处理request里的body参数(既post请求过来的参数)
var bodyParser = require("body-parser");
//引入path  因为我们引入样式后，框架并不知道我们的静态资源文件在哪
var path = require("path");
//引入百度富文本
var ueditor = require("ueditor");
//引入cookie中间件
var cookie = require('cookie-parser');
//引入session中间件
var session = require('express-session')
//引入connect-mongo中间件做session 持久化的操作
var mongoStore = require('connect-mongo')(session);
var logger = require('morgan');
//数据库相关
var dbUrl = 'mongodb://localhost/local';
//1引入mongoose ODM来操作数据
var mongoose = require('mongoose');
//2mongoose链接服务器
mongoose.connect(dbUrl);
//3引入model模型
var Article = require("./app/model/article");
var port = process.env.PORT  || 3000;
var app = express();
//设置VIews的路径 对应请求名字 在该目录 放模板
app.set("views","./app/Template/pages");
//设置框架的页面引擎为jade
app.set("view engine","jade");
//告诉框架静态资源文件的路径
app.use(express.static(path.join(__dirname,"")));
//中间件相关
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookie());
app.use(session({
  secret:"myjustBlog",
  store:new mongoStore({
    url:dbUrl,
    collection:'sessions'
  })
}));

if('development'===app.get("env")){
  app.set('showStackError',true);
  app.use(logger(' :method :url :status'));
  app.locals.pretty = true;
  mongoose.set('debug',true);
}
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

//将路由分离，使用外部路由
require("./config/routes")(app);