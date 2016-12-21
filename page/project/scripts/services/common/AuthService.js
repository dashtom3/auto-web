angular.module("auto-biz-user")
  .service('AuthService', function ($http,GlobalService) {
  var self = this; 
  this.login = function (username, password) {
    return $http.get(GlobalService.baseUrl+'user/login?name='+username+'&password='+password)
      .then(function (res) {
        console.log("获取用户数据");
        if(res.isSuccess == "1"){
          self.user = res.data;
        }
        return res;
      });
  };
  this.logout=function (username,password) {
    return $http.get(GlobalService.baseUrl+'user/logout')
        .then(function (res) {
          console.log("登出");
          window.location.href="home";
          return res;
        });
  };
})