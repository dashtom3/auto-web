angular.module("auto-biz-user")
  .service('CompanyPriReportService', ["$http","GlobalService","$q", "AuthService",function ($http,GlobalService,$q,AuthService) {
  var self = this; 
  //获取用户测评
  this.getCompanyPriReportList = function (productId,title,type,address,startDateStart,endDateStart,startDateEnd,endDateEnd,maxUserNum_Min,maxUserNum_Max,argc,state,signUser,passUser,startTime,endTime,companyId,numPerPage,pageNumber) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["productId",productId],["title",title],["type",type],["address",address],["startDateStart",startDateStart],["endDateStart",endDateStart],
      ["startDateEnd",startDateEnd],["endDateEnd",endDateEnd],["maxUserNum_Min",maxUserNum_Min],["maxUserNum_Max",maxUserNum_Max],["argc",argc],["state",state],["signUser",signUser],["passUser",passUser],
      ["startTime",startTime],["endTime",endTime],["companyId",companyId]]);
    var url = GlobalService.baseUrl+'report/private/list/'+numPerPage+'/'+pageNumber+'?'+urlStr;
    $http.get(url).success(function (res) {
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
  //设置上下线
  this.changeCompanyPriReportOnline = function(reportId,isOnline){
    var deferred = $q.defer();
     var urlStr = GlobalService.getURLStr([["reportId",reportId],["isOnline",isOnline],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/modify/online?'+urlStr).success(function (res) {
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
  this.changeCompanyPriReportOnlineAdmin = function(reportId,isOnline){
    var deferred = $q.defer();
     var urlStr = GlobalService.getURLStr([["reportId",reportId],["isOnline",isOnline],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/modify/online/admin?'+urlStr).success(function (res) {
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
  this.changeCompanyPriReportState = function(reportId,state){
    var deferred = $q.defer();
     var urlStr = GlobalService.getURLStr([["reportId",reportId],["state",state],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/modify/approval?'+urlStr).success(function (res) {
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
  this.getCompanyPriReportDetail = function(reportId){
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl + 'report/private/detail?reportId='+reportId).success(function(res){
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
  this.getReportSignUser = function(reportId,passed){
    var deferred = $q.defer();
    var  urlStr = GlobalService.getURLStr([["reportId",reportId],["passed",passed],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/signuser/list?'+urlStr).success(function (res) {
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
  this.getReportPassUser = function(reportId,passed){
    var deferred = $q.defer();
    var  urlStr = GlobalService.getURLStr([["reportId",reportId],["passed",passed],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/passuser/list?'+urlStr).success(function (res) {
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
  this.getCompanyPriReportComment = function(reportId){
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl + 'report/private/comment/list?reportId='+reportId).success(function(res){
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
  // this.getCompanyPriReportSignList = function(reportId){
  //   var deferred = $q.defer();
  //   $http.get(GlobalService.baseUrl + 'report/private/signlist?reportId='+reportId).success(function(res){
  //     console.log("获取待审核用户");
  //     if(res.callStatus == "SUCCEED"){
  //       deferred.resolve(res.data);
  //     }else{
  //       alert("您好，您访问的内容出错");
  //     }
  //   }).error(function (res){
  //     alert("您好，您访问的内容出错");
  //   });
  //     return deferred.promise;
  // }
  // this.getCompanyPriReportToPassList = function(reportId){
  //   var deferred = $q.defer();
  //   $http.get(GlobalService.baseUrl + 'report/private/comment/topasslist?reportId='+reportId).success(function(res){
  //     console.log("获取测评中用户");
  //     if(res.callStatus == "SUCCEED"){
  //       deferred.resolve(res.data);
  //     }else{
  //       alert("您好，您访问的内容出错");
  //     }
  //   }).error(function (res){
  //     alert("您好，您访问的内容出错");
  //   });
  //     return deferred.promise;
  // }
  // this.getCompanyPriReportToRefused = function(reportId){
  //   var deferred = $q.defer();
  //   $http.get(GlobalService.baseUrl + 'report/private/refused?reportId='+reportId).success(function(res){
  //     console.log("获取被拒绝用户");
  //     if(res.callStatus == "SUCCEED"){
  //       deferred.resolve(res.data);
  //     }else{
  //       alert("您好，您访问的内容出错");
  //     }
  //   }).error(function (res){
  //     alert("您好，您访问的内容出错");
  //   });
  //     return deferred.promise;
  // }
  this.deleteCompanyPriReport = function (reportId) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["reportId",reportId],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/delete?'+urlStr).success(function (res) {
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
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else if (res.errCode == "ALREADY_CREATE_PRIVATE_REPORT"){
          alert("该产品已经有用户测评了");
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
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else if(res.errCode == "NOT_PASSED"){
          alert("您的用户审核还未通过");
        }else if (res.errCode == "ALREADY_SIGNED"){
          alert("您已经报名过该测评");
        }else{
          alert("报名失败，错误为"+res.errCode+"");
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
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("评论失败");
        }
      }).error(function (res){
        alert("您好，您不是该测评的用户");
      });
      return deferred.promise;
  };
  //通过测评评论
  this.passCommentCompanyPriReport= function (reportId,userId,passed) {
    var deferred = $q.defer();
   var urlStr = GlobalService.getURLStr([["reportId",reportId],["userId",userId],["passed",passed],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/modify/commentpass?'+urlStr).success(function (res) {
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert(res.errCode);
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
}]);