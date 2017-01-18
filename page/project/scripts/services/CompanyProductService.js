angular.module("auto-biz-user")
  .service('CompanyProductsService',["$http","GlobalService","$q", "AuthService", function ($http,GlobalService,$q,AuthService) {
  var self = this; 
  //获取产品
  this.getCompanyProductsList = function (name,tag,state,argc,desc,companyId,startTime,endTime,numPerPage,pageNumber) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["name",name],["tag",tag],["state",state],["argc",argc],["desc",desc],["companyId",companyId],["startTime",startTime],["endTime",endTime]]);
    var url = GlobalService.baseUrl+'product/list/'+numPerPage+'/'+pageNumber+'?'+urlStr;
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
  //获取产品详情
  this.getCompanyProductsDetail = function (productId) {
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl+'product/detail?productId='+productId).success(function (res) {
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
  //state true false
  this.changeCompanyProductsState = function(productId,state){
    var deferred = $q.defer();
    state = ""+state;
     var urlStr = GlobalService.getURLStr([["productId",productId],["state",state],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'product/modify/online?'+urlStr).success(function (res) {
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
  this.changeCompanyProductsStateAdmin = function(productId,state){
    var deferred = $q.defer();
    state = ""+state;
     var urlStr = GlobalService.getURLStr([["productId",productId],["state",state],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'product/modify/online/admin?'+urlStr).success(function (res) {
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
  this.deleteCompanyProduct = function (productId) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["productId",productId],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'product/delete?'+urlStr).success(function (res) {
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
  this.addCompanyProduct = function (product) {
    product.token = AuthService.getToken();
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'product/add',
          product
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
  this.updateCompanyProduct = function (product) {
    product.token = AuthService.getToken();
    product.productId = product._id;
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'product/modify/detail',
          product
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