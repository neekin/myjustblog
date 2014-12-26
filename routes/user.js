var user = require('../app/controllers/userControll');

module.exports = function(app){
      app.post("/user/signup",user.signup);
      app.post("/user/signin",user.signin);
      app.get('/user/logout',user.logout);
}