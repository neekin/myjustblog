//引入控制器
var home = require('../app/controllers/homeControll');

module.exports = function(app){
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

}

