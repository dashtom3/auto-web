angular.module("auto-biz-user")
  .service('CompanyNewsService', function ($http,GlobalService,$q) {
  var self = this; 
  //注册公司
  this.getCompanyNewsList = function (title,author,isFirst,tag,isOnline,numPerPage,pageNumber) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["title",title],["author",author],["isFirst",isFirst],["tag",tag],["isOnline",isOnline],["numPerPage",numPerPage],["pageNumber",pageNumber]]);
    //var urlStr = GlobalService.getURLStr([["title",title],["author",author],["isFirst",isFirst],["tag",tag],["isOnline",isOnline]]);
    $http.get(GlobalService.baseUrl+'news/list?'+urlStr).success(function (res) {
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
})