angular.module("auto-biz-user")
  .service('CompanyNewsService', ["$http","GlobalService","$q", "AuthService",function ($http,GlobalService,$q,AuthService) {
  var self = this; 
  //获取资讯
  this.getCompanyNewsList = function (title,author,isFirst,tag,isOnline,companyId,startTime,endTime,numPerPage,pageNumber) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["title",title],["author",author],["isFirst",isFirst],["tag",tag],["isOnline",isOnline],["companyId",companyId],["startTime",startTime],["endTime",endTime]]);
    var url = GlobalService.baseUrl+'news/list/'+numPerPage+'/'+pageNumber+'?'+urlStr;
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
  this.getCompanyNewsDetail = function (newsId) {
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl+'news/detail?newsId='+newsId).success(function (res) {
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
  this.changeCompanyNewsState = function(newsId,isOnline){
    var deferred = $q.defer();
    isOnline = ""+isOnline;
     var urlStr = GlobalService.getURLStr([["newsId",newsId],["isOnline",isOnline],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'news/modify/online?'+urlStr).success(function (res) {
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
  this.changeCompanyNewsStateAdmin = function(newsId,isOnline){
    var deferred = $q.defer();
    isOnline = ""+isOnline;
     var urlStr = GlobalService.getURLStr([["newsId",newsId],["isOnline",isOnline],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'news/modify/online/admin?'+urlStr).success(function (res) {
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
  this.deleteCompanyNews = function (newsId) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["newsId",newsId],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'news/delete?'+urlStr).success(function (res) {
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
  this.addCompanyNews = function (news) {
    news.token = AuthService.getToken();
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'news/add',
          news
      ).success(function (res) {
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
  this.updateCompanyNews = function (news) {
    news.token = AuthService.getToken();
    news.newsId = news._id;
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'news/modify/detail',
          news
      ).success(function (res) {
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

}]);