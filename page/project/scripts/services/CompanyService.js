angular.module("auto-biz-user")
  .service('CompanyService', function ($http,GlobalService,$q) {
  var self = this; 
  //注册公司
  this.registerCompany = function (company) {
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'company/signup',
          company
      ).success(function (res) {
        console.log("企业注册");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
})