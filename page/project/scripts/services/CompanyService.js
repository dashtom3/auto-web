angular.module("auto-biz-user")
.service('CompanyService', ["$http","GlobalService","$q", "AuthService",function ($http,GlobalService,$q,AuthService) {
  var self = this; 
  //注册公司
  this.registerCompany = function (company) {
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'company/signup',
      company
      ).success(function (res) {
        if(res.callStatus == "SUCCEED"){
          AuthService.kickOut();
          deferred.resolve(res.data);
          AuthService.company = res.data;
          localStorage.auto_company = JSON.stringify(res.data);
        }else{
          alert(res.errCode);
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
    };

    //修改企业信息 
    this.modifyCompany = function (company) {
      company.token = AuthService.getToken();
      var deferred = $q.defer();
      $http.post(GlobalService.baseUrl+'company/modify/info',
        company
        ).success(function (res) {
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
   
  this.getCompanysList = function(numPerPage,pageNum,isPassed,type,name) {
      var deferred = $q.defer();
      var urlStr = GlobalService.getURLStr([["isPassed",isPassed],["type",type],["name",name],["token",AuthService.getToken()]]);
      var url = GlobalService.baseUrl+'company/list/'+numPerPage+'/'+pageNum + '?' +urlStr;
      $http.get(url).success(function(res){
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
  //获取企业列表
  this.getCompanyList = function(numPerPage,pageNum,isPassed,type,name) {

    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["isPassed",isPassed],["type",type],["name",name]]);
    var url=GlobalService.baseUrl+'company/list/'+numPerPage+'/'+pageNum+"?";
    url = url+urlStr;
    if(AuthService.user.token){
      url = url+"&token="+AuthService.user.token
    }
    $http.get(url)
    .success(function(data, status, headers, config){
      if(data.callStatus=='SUCCEED'){
        deferred.resolve(data.data);
      }
      else{
        alert(data.errCode)
      }
    })
    .error(function(data, status, headers, config){
    });
    return deferred.promise;
  }
    //用户认证通过/否决
    this.passCompany = function(id,passFlag) {
      var token=AuthService.user.token;
      var url=GlobalService.baseUrl+'company/modify/approval?token='+token+'&companyId='+id+'&approvalStatus='+passFlag;
      var deferred = $q.defer();
      $http.get(url)
      .success(function(data, status, headers, config){
        if(data.callStatus=='SUCCEED'){
          alert('操作成功!');
          deferred.resolve('');
        }
        else{
          alert('操作失败'+data.errCode)
          deferred.resolve('');
        }
      })
      .error(function(data, status, headers, config){
        deferred.reject(data);
      });
      return deferred.promise;
    }

    //根据cmpID获取企业基本信息
    this.getComppanyById = function(cmpId){
      var deferred = $q.defer();
      var urlStr = GlobalService.getURLStr([["companyId",cmpId],["token",AuthService.getToken()]]);
      $http.get(GlobalService.baseUrl+'company/detail?'+urlStr).success(function (res) {
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


  }]);