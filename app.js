//引入 express 框架 来处理请求
var express = require("express");
//引入path  因为我们引入样式后，框架并不知道我们的静态资源文件在哪
var path = require("path");

var port = process.env.PORT  || 3000;
var app = express();
//设置VIews的路径 对应请求名字 在该目录 放模板
app.set("views","./Template/pages");
//设置框架的页面引擎为jade
app.set("view engine","jade");
//告诉框架静态资源文件的路径
app.use(express.static(path.join(__dirname,"")));
//启动应用监听
app.listen(port);
console.log("Website is on prot "+ port);

//路由 访问 根目录返回的页面
app.get("/",function  (req,res) {
	res.render("index",{});});
app.get("/page",function  (req,res) {
	res.render("page",{});});