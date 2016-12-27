angular.module("auto-biz-user")
  .service('CompanyFinanceService', function ($http,GlobalService,$q,AuthService) {
  var self = this; 
  //获取企业财务列表
  this.getCompanyFinanceList = function (companyId,yearStart,yearEnd,numPerPage,pageNumber) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["companyId",companyId],["yearStart",yearStart],["yearEnd",yearEnd]]);
    $http.get(GlobalService.baseUrl+'finance/list/'+numPerPage+'/'+pageNumber+'?'+urlStr).success(function (res) {
        console.log("获取企业财务列表");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("获取失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.deleteCompanyFinance = function (financeRecordId) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["financeRecordId",financeRecordId],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'finance/delete?'+urlStr).success(function (res) {
        console.log("删除企业财务");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("删除失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.addCompanyFinance = function (finance) {
    finance.token = AuthService.getToken();
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'finance/add',
          finance
      ).success(function (res) {
        console.log("添加财务");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("添加失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.updateCompanyFinance = function (finance) {
    finance.token = AuthService.getToken();
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'finance/modify',
          finance
      ).success(function (res) {
        console.log("修改财务数据");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("修改失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
})