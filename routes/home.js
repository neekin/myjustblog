//引入控制器
var home = require('../app/controllers/homeControll');
var user = require("../app/controllers/userControll");
module.exports = function(app){
//验证session
app.use(function(req,res,next){
console.log("打印配置文件")
console.log(app.locals.config);
app.locals.user  =req.session.user;
next();
})
//路由 访问 根目录返回的页面
app.get("/",home.index);
app.get("/index",home.index);
app.get("/index.html",home.index);
//访问文章页面
app.get("/page/:id",home.page);
//访问添加文章
app.get("/add",home.newArticle);
app.post("/add",home.addArticle);

//404错误页
app.get("/404",home.err);
app.get("/404.html",home.err);
//登陆页面
app.get("/login",home.loginPage);
app.post("/login",home.login );

//测试页
app.get("/test",home.test);

//时间格式化插件
app.locals.moment = require('moment');

}

