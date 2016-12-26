angular.module("auto-biz-user")
  .service('CompanyService', function ($http,GlobalService) {
  var self = this; 
  //注册公司
  this.registerCompany = function (company) {
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'company/signup',{
          company:company
      }).success(function (res) {
        console.log("用户登录");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve();
        }else{
          alert("您好，您访问的内容出错");
          deferred.resolve(); 
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
        deferred.resolve();
      });
      return deferred.promise;
  };
})