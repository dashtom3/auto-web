angular.module("auto-biz-user")
  .service('CompanyPriReportService', function ($http,GlobalService,$q) {
  var self = this; 
  //获取用户测评
  this.getCompanyPriReportList = function (productId,title,type,address,startDateStart,endDateStart,startDateEnd,endDateEnd,maxUserNum_Min,maxUserNum_Max,argc,state,signUser,passUser,startTime,endTime,companyId,numPerPage,pageNumber) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["productId",productId],["title",title],["type",type],["address",address],["startDateStart",startDateStart],["endDateStart",endDateStart],
      ["endDateEnd",endDateEnd],["maxUserNum_Min",maxUserNum_Min],["maxUserNum_Max",maxUserNum_Max],["argc",argc],["state",state],["signUser",signUser],["passUser",passUser],
      ["startTime",startTime],["endTime",endTime],["companyId",companyId],["companyId",companyId],["dateStart",dateStart],["dateEnd",dateEnd]]);
    var url = GlobalService.baseUrl+'report/private/list/'+numPerPage+'/'+pageNumber+'?'+urlStr;
    console.log(url);
    $http.get(url).success(function (res) {
        console.log("获取用户测评列表");
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
  //设置审核状态 true false
  // this.changeCompanyPriReportState = function(reportId,type){
  //   var deferred = $q.defer();
  //    var urlStr = GlobalService.getURLStr([["reportId",reportId],["isOnline",isOnline],["token",AuthService.getToken()]]);
  //   $http.get(GlobalService.baseUrl+'report/private/modify/online?'+urlStr).success(function (res) {
  //       console.log("改变测评状态");
  //       if(res.callStatus == "SUCCEED"){
  //         deferred.resolve(res.data);
  //       }else{
  //         alert("您好，您访问的内容出错");
  //       }
  //     }).error(function (res){
  //       alert("您好，您访问的内容出错");
  //     });
  //     return deferred.promise;
  // }
  this.getCompanyPriReportDetail = function(productId){
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl + 'report/private/detail?productId='+productId).success(function(res){
      console.log("获取用户测评详情");
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
  this.deleteCompanyPriReport = function (reportId) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["newsId",newsId],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/delete?'+urlStr).success(function (res) {
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
  this.addCompanyPriReport = function (report) {
    report.token = AuthService.getToken();
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'report/private/add',
          report
      ).success(function (res) {
        console.log("添加用户测评");
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
  this.updateCompanyPriReport = function (report) {
    report.token = AuthService.getToken();
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'report/private/modify/detail',
          report
      ).success(function (res) {
        console.log("修改用户测评");
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
  //用户报名参加测评
  this.signCompanyPriReport= function (reportId,phone,address) {
    var deferred = $q.defer();
   var urlStr = GlobalService.getURLStr([["reportId",reportId],["phone",phone],["address",address],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/sign?'+urlStr).success(function (res) {
        console.log("报名用户测评");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("报名失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  //通过报名参加测评
  this.passCompanyPriReport= function (reportId,userId,passed) {
    var deferred = $q.defer();
   var urlStr = GlobalService.getURLStr([["reportId",reportId],["userId",userId],["passed",passed],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/pass?'+urlStr).success(function (res) {
        console.log("通过用户测评");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("通过失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  //用户发表评论
  this.commentCompanyPriReport= function (comment) {
    comment.token = AuthService.getToken();
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'report/private/comment',comment).success(function (res) {
        console.log("通过用户测评");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("评论失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  //通过报名参加测评
  this.passCommentCompanyPriReport= function (reportId,userId,passed) {
    var deferred = $q.defer();
   var urlStr = GlobalService.getURLStr([["reportId",reportId],["userId",userId],["passed",passed],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/modify/commentpass?'+urlStr).success(function (res) {
        console.log("通过用户评论");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("通过失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
})