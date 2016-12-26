angular.module("auto-biz-user")
  .service('AuthService', function ($q,$http,GlobalService) {
  var self = this; 
  //用户登录
  this.userLogin = function (username, password) {
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl+'user/login?name='+username+'&password='+GlobalService.MD5Decode(password))
      .success(function (res) {
        if(res.callStatus == "SUCCEED"){
          self.user = res.data;
          console.log("用户登录");
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
          deferred.resolve();
        }
      })
      .error(function (res) {
        alert("您好，您访问的内容出错");
        deferred.resolve();
      });
    return deferred.promise;
  };
  //用户登出
  this.userLogout=function (token) {
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl+'user/logout?token='+token)
        .success(function (res) {
          if(res.callStatus == "SUCCEED"){
            console.log("用户登出");
            //window.location.href="/";
            deferred.resolve();

          }else{
          alert("您好，您访问的内容出错");
          deferred.resolve();
        }
      })
      .error(function (res) {
        alert("您好，您访问的内容出错");
        deferred.resolve();
      });
      return deferred.promise;
  };
  //企业登录
  this.companyLogin = function(username,password){
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl+'company/login?name='+username+'&password='+password)
      .success(function (res) {
        if(res.callStatus == "SUCCEED"){
            console.log("企业登录");
            self.company = res.data;
            deferred.resolve(res.data);
          }else{
            alert("您好，您访问的内容出错");
            deferred.resolve();
        }
      })
      .error(function (res) {
        alert("您好，您访问的内容出错");
        deferred.resolve();
      });
      return deferred.promise;
  }
  //企业登出
  this.companyLoginout = function(token){
    var deferred = $q.defer();$http.get(GlobalService.baseUrl+'company/logout?token'+token)
      .success(function (res) {
        if(res.callStatus == "SUCCEED"){
          console.log("企业登出");
          
       }else{
          alert("您好，您访问的内容出错");
          deferred.resolve();
        }
      })
      .error(function (res) {
        alert("您好，您访问的内容出错");
        deferred.resolve();
      });
  }
})