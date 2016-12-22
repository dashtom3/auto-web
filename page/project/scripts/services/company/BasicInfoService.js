angular.module("auto-biz-user")
.service('BasicInfoService', function ($http,GlobalService,$q) {
  var self = this; 
  this.getBasicInfo = function(companyName){
    var deferred = $q.defer();
    console.log("读取companyinfo网络数据");
    var url = GlobalService.baseUrl+'company/getCompanyByName?name='+companyName;
    console.log(url);
      $http.get(url)
      .success(function(data, status, headers, config){
        
        if(data.isSuccess=='0'){
          alert(data.data)
          deferred.resolve("");
        }
        else{
          console.log("success");
          console.log(data);
          deferred.resolve(data);
        }
      })
      .error(function(data, status, headers, config){
        console.log("error");              
        deferred.reject(data);
      });
      return deferred.promise;
    };
  });