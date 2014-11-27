//引入 express 框架 来处理请求
var express = require("express");
//引入body-parser 处理request里的body参数(既post请求过来的参数)
var bodyParser = require("body-parser");
//引入path  因为我们引入样式后，框架并不知道我们的静态资源文件在哪
var path = require("path");
//1引入mongoose ODM来操作数据
var mongoose = require('mongoose');
//2mongoose链接服务器
mongoose.connect('mongodb://localhost/local');
//3引入model模型
var Article = require("./model/article");
//4再来初始化对象
var article = new Article({
	title:"这仅仅是个测试",
	subtitle:"没错 是个测试",
	articlebody:"一下写到这 我好紧张呀"
});

//5最后保存即可
/*   article.save(function(err){
   if(err)
   	console.log("Err");

   })*/
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
//启动应用监听
app.listen(port);
console.log("Website is on prot "+ port);

//路由 访问 根目录返回的页面
app.get("/",function  (req,res) {
	res.render("index",{ title:"首页"});
});
//
app.get("/page",function  (req,res) {
	res.render("page",{});
});
//
app.get("/add",function  (req,res) {
	res.render("addArticle",{title:"添加文章"});
});
app.post("/add",function(req,res){
	res.send(req.body);
})
//
app.get("/test",function  (req,res) {
	res.render("test",{});
});