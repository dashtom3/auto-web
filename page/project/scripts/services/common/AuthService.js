angular.module("auto-biz-user")
  .service('AuthService', function ($http,GlobalService) {
  var self = this; 
  this.login = function (username, password) {
    return $http.get(GlobalService.baseUrl+'user/login?name='+username+'&password='+password)
      .then(function (res) {
        console.log("获取用户数据");
        if(res.isSuccess == "1"){
          self.user = res.data;
          console.log(self.user);
        }
        return res;
      });
  };
})