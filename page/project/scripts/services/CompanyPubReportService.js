angular.module("auto-biz-user")
  .service('CompanyPubReportService', function ($http,GlobalService,$q) {
  var self = this; 
  //获取专业测评
  this.getCompanyPubReportList = function (productId,isOnline,testDesc,team,site,companyId,dateStart,dateEnd,numPerPage,pageNumber) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["productId",productId],["isOnline",isOnline],["testDesc",testDesc],["team",team],["site",site],["companyId",companyId],["dateStart",dateStart],["dateEnd",dateEnd]]);
    var url = GlobalService.baseUrl+'report/public/list/'+numPerPage+'/'+pageNumber+'?'+urlStr;
    console.log(url);
    $http.get(url).success(function (res) {
        console.log("获取企业专业测评列表");
        console.log(res);
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
  //isOnline true false
  this.changeCompanyPubReportState = function(reportId,isOnline){
    var deferred = $q.defer();
     var urlStr = GlobalService.getURLStr([["reportId",reportId],["isOnline",isOnline],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/public/modify/online?'+urlStr).success(function (res) {
        console.log("改变测评状态");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  }
  this.getCompanyPubReportDetail = function(productId){
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl + 'report/public/list/1/1?productId='+productId).success(function(res){
      console.log("获取专业测评详情");
      if(res.callStatus == "SUCCEED"){
        deferred.resolve(res.data);
      }else{
        alert("您好，您访问的内容出错");
      }
    }).error(function (res){
      alert("您好，您访问的内容出错");
    });
      return deferred.promise;
  }
  this.deleteCompanyPubReport = function (reportId) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["reportId",reportId],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/public/delete?'+urlStr).success(function (res) {
        console.log("删除专业测评");
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
  this.addCompanyPubReport = function (report) {
    report.token = AuthService.getToken();
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'report/public/add',
          report
      ).success(function (res) {
        console.log("添加专业测评");
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
  this.updateCompanyPubReport = function (report) {
    report.token = AuthService.getToken();
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'report/public/modify/detail',
          report
      ).success(function (res) {
        console.log("修改专业测评");
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