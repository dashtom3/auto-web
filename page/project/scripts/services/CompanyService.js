angular.module("auto-biz-user")
.service('CompanyService', function ($http,GlobalService,$q,AuthService) {
  var self = this; 
  //注册公司
  this.registerCompany = function (company) {
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'company/signup',
      company
      ).success(function (res) {
        console.log("企业注册");
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
   

  //获取企业列表
  this.getCompanyList = function(numPerPage,pageNum,isPassed,type,name) {
    var deferred = $q.defer();
    console.log("读取getCompanyListService网络数据");
    var url='http://123.56.220.72:3300/company/list/'+numPerPage+'/'+pageNum;
    var paras = [];
    if(isPassed!==''){
      var obj1=new Object(); 
      obj1.name="isPassed";
      obj1.value=isPassed;
      paras.push(obj1);
    }
    if(type!==''){
      var obj2=new Object(); 
      obj2.name="type";
      obj2.value=type;
      paras.push(obj2);
    }
    if(name!==''){
      var obj3=new Object(); 
      obj3.name="name";
      obj3.value=name;
      paras.push(obj3);
    }
    if(paras.length!==0){
      url=url+'?'+paras[0].name+'='+paras[0].value;
      for(var i=1;i<paras.length;i++){
        console.log(i);
        console.log('then:'+paras[i].name);
        url=url+'&'+paras[i].name+'='+paras[i].value;
      }
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
        deferred.resolve("");
      }
    })
    .error(function(data, status, headers, config){
      console.log(data);
      deferred.reject(data);
    });
    return deferred.promise;
  }
    //用户认证通过/否决
    this.passUser = function(id,passFlag) {
      var token=AuthService.user.token;
      var url='http://123.56.220.72:3300/user/modify/approval?token='+token+'&companyId='+id+'&approvalStatus='+passFlag;
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
      $http.get(GlobalService.baseUrl+'company/detail?companyId='+cmpId).success(function (res) {
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