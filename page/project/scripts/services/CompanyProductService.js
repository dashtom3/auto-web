angular.module("auto-biz-user")
  .service('CompanyProductsService', function ($http,GlobalService,$q) {
  var self = this; 
  //获取产品
  this.getCompanyProductsList = function (name,tag,state,argc,desc,companyId,startTime,endTime,numPerPage,pageNumber) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["name",name],["tag",tag],["state",state],["argc",argc],["desc",desc],["companyId",companyId],["startTime",startTime],["endTime",endTime]]);
    var url = GlobalService.baseUrl+'product/list/'+numPerPage+'/'+pageNumber+'?'+urlStr;
    console.log(url);
    $http.get(url).success(function (res) {
        console.log("获取企业产品列表");
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
  //获取产品详情
  this.getCompanyProductsDetail = function (productId) {
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl+'product/detail?productId='+productId).success(function (res) {
        console.log("获取企业产品详情");
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
  this.changeCompanyProductsState = function(productId,isOnline){
    var deferred = $q.defer();
     var urlStr = GlobalService.getURLStr([["productId",productId],["isOnline",isOnline],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'product/modify/online?'+urlStr).success(function (res) {
        console.log("改变产品状态");
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
//   this.deleteCompanyNews = function (newsId) {
//     var deferred = $q.defer();
//     var urlStr = GlobalService.getURLStr([["newsId",newsId],["token",AuthService.getToken()]]);
//     $http.get(GlobalService.baseUrl+'news/delete?'+urlStr).success(function (res) {
//         console.log("删除企业资讯");
//         if(res.callStatus == "SUCCEED"){
//           deferred.resolve(res.data);
//         }else{
//           alert("删除失败");
//         }
//       }).error(function (res){
//         alert("您好，您访问的内容出错");
//       });
//       return deferred.promise;
//   };
//   this.addCompanyNews = function (news) {
//     news.token = AuthService.getToken();
//     var deferred = $q.defer();
//     $http.post(GlobalService.baseUrl+'finance/add',
//           news
//       ).success(function (res) {
//         console.log("添加企业资讯");
//         if(res.callStatus == "SUCCEED"){
//           deferred.resolve(res.data);
//         }else{
//           alert("添加失败");
//         }
//       }).error(function (res){
//         alert("您好，您访问的内容出错");
//       });
//       return deferred.promise;
//   };
//   this.updateCompanyNews = function (news) {
//     news.token = AuthService.getToken();
//     var deferred = $q.defer();
//     $http.post(GlobalService.baseUrl+'finance/modify',
//           news
//       ).success(function (res) {
//         console.log("修改资讯数据");
//         if(res.callStatus == "SUCCEED"){
//           deferred.resolve(res.data);
//         }else{
//           alert("修改失败");
//         }
//       }).error(function (res){
//         alert("您好，您访问的内容出错");
//       });
//       return deferred.promise;
//   };

})