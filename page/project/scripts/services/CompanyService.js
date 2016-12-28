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
  //获取企业列表
    this.getCompanyList = function(numPerPage,pageNum,isPassed,type,name) {
        var deferred = $q.defer();
        console.log("读取getCompanyListService网络数据");
        var url='http://123.56.220.72:3300/company/list/'+numPerPage+'/'+pageNum;
        if(isPassed!==''){
            url=url+'?isPassed='+isPassed;
        }
         if(type!==''){
            url=url+'?type='+type;
        }
        if(name!==''){
            url=url+'?longName='+name;
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
})