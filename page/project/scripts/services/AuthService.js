angular.module("auto-biz-user")
  .service('AuthService',["$q","$http","GlobalService","$location", function ($q,$http,GlobalService,$location) {
  var self = this; 
  //用户登录
  this.userLogin = function (username, password) {
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl+'user/login?name='+username+'&password='+GlobalService.MD5Decode(password))
      .success(function (res) {
        if(res.callStatus == "SUCCEED"){
          self.kickOut();
          self.user = res.data;
          localStorage.auto_user = JSON.stringify(res.data);
          console.log("用户登录");
          deferred.resolve(res.data);
        }else{
          alert("用户名密码错误");
        }
      })
      .error(function (res) {
        self.kickOut();
      }); 
    return deferred.promise;
  };
  this.kickOut = function(){
    if (self.user){
      self.user = null;
      localStorage.auto_user = null;
    }
    if (self.company){
      self.company = null;
      localStorage.auto_company = null;
    }
  }
  //用户登出
  this.userLogout=function () {
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl+'user/logout?token='+self.user.token)
        .success(function (res) {
          if(res.callStatus == "SUCCEED"){
            console.log("用户登出");
            localStorage.auto_user = null;
            deferred.resolve();

          }else{
          self.kickOut();
           $location.path("/loginUser");
        }
      })
      .error(function (res) {
        self.kickOut();
        $location.path("/loginUser");
      });
      return deferred.promise;
  };
  //企业登录
  this.companyLogin = function(username,password){
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl+'company/login?name='+username+'&password='+password)
      .success(function (res) {
        if(res.callStatus == "SUCCEED"){
            self.kickOut();
            console.log("企业登录");
            self.company = res.data;
            localStorage.auto_company = JSON.stringify(res.data);
            deferred.resolve(res.data);
          }else{
            alert("用户名密码错误");
        }
      }) 
      .error(function (res) {
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  }
  //企业登出
  this.companyLogout = function(){
    var deferred = $q.defer();$http.get(GlobalService.baseUrl+'company/logout?token='+self.company.token)
      .success(function (res) {
        if(res.callStatus == "SUCCEED"){
          console.log("企业登出");
          localStorage.auto_company = null;
          deferred.resolve();
       }else{
          self.kickOut();
          $location.path("/loginCompany");
        }
      })
      .error(function (res) {
        self.kickOut();
        $location.path("/loginCompany");
      });
      return deferred.promise;
  }
  this.setUserInfo = function(user){
    self.user = user;
    self.token = user.token;
  }
  this.setCompanyInfo = function(company){
    self.company = company;
    self.token = company.token;
  }
  this.getToken = function(){
      if(self.user){
        return self.user.token;
      }else if(self.company){
        return self.company.token;
      }
      return "guest";
  }
  this.setInfoFromLocalStorage = function(){
      if(localStorage.auto_user != null){
        self.user =  JSON.parse(localStorage.auto_user);
      }
      if(localStorage.auto_company != null){
        self.company =  JSON.parse(localStorage.auto_company);
      }
  }
}]);