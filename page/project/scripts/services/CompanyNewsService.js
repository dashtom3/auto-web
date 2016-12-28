angular.module("auto-biz-user")
  .service('CompanyNewsService', function ($http,GlobalService,$q) {
  var self = this; 
  //获取资讯
  this.getCompanyNewsList = function (title,author,isFirst,tag,isOnline,companyId,startTime,endTime,numPerPage,pageNumber) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["title",title],["author",author],["isFirst",isFirst],["tag",tag],["isOnline",isOnline],["companyId",companyId],["startTime",startTime],["endTime",endTime]]);
    var url = GlobalService.baseUrl+'news/list/'+numPerPage+'/'+pageNumber+'?'+urlStr;
    console.log(url);
    $http.get(url).success(function (res) {
        console.log("获取企业新闻列表");
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
  this.getCompanyNewsDetail = function (newsId) {
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl+'news/detail?newsId='+newsId).success(function (res) {
        console.log("获取企业新闻列表");
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
     var urlStr = GlobalService.getURLStr([["newsId",newsId],["isOnline",isOnline],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'news/modify/online?'+urlStr).success(function (res) {
        console.log("改变新闻状态");
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
        console.log("删除企业资讯");
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
    $http.post(GlobalService.baseUrl+'finance/add',
          news
      ).success(function (res) {
        console.log("添加企业资讯");
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
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'finance/modify',
          news
      ).success(function (res) {
        console.log("修改资讯数据");
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