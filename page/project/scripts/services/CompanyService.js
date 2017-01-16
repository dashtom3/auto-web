angular.module("auto-biz-user")
.service('CompanyService', function ($http,GlobalService,$q,AuthService) {
  var self = this; 
  //注册公司
  this.registerCompany = function (company) {
    var deferred = $q.defer();
    console.log(company);
    $http.post(GlobalService.baseUrl+'company/signup',
      company
      ).success(function (res) {
        console.log("企业注册");
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
      console.log(company);
      var deferred = $q.defer();
      $http.post(GlobalService.baseUrl+'company/modify/info',
        company
        ).success(function (res) {
          console.log("修改企业信息");
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
        console.log("获取企业列表");
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
  //获取企业列表
  this.getCompanyList = function(numPerPage,pageNum,isPassed,type,name) {

    var deferred = $q.defer();
    console.log("读取getCompanyListService网络数据");
    var urlStr = GlobalService.getURLStr([["isPassed",isPassed],["type",type],["name",name]]);
    var url=GlobalService.baseUrl+'company/list/'+numPerPage+'/'+pageNum+"?";
    url = url+urlStr;
    if(AuthService.user.token){
      url = url+"&token="+AuthService.user.token
    }
    console.log(url);
    $http.get(url)
    .success(function(data, status, headers, config){
      console.log(data);
      if(data.callStatus=='SUCCEED'){
        deferred.resolve(data.data);
      }
      else{
        alert(data.errCode)
      }
    })
    .error(function(data, status, headers, config){
      console.log(data);
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
          alert('认证成功!');
          deferred.resolve('');
        }
        else{
          alert('认证失败'+data.errCode)
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
        console.log("获取企业信息");
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