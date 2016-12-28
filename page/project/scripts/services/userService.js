angular.module('auto-biz-user')
  .service('UserService', function UserService($http, $q,GlobalService,AuthService) {
    //注册用户
    this.registerUser = function(user) {
        var deferred = $q.defer();
        $http.post(GlobalService.baseUrl+'user/signup',
          user
      ).success(function(data, status, headers, config){
                console.log("注册用户");
                if(data.isSuccess=='0'){
                    alert(data.data)
                    deferred.resolve("");
                }
                else{
                    deferred.resolve(data.data);
                }
            })
            .error(function(data, status, headers, config){
                console.log(data);
                deferred.reject(data);
            });
        return deferred.promise;
    }
    //获取用户列表
    this.getUserList = function(numPerPage,pageNum,isPassed,nikeName) {
        var deferred = $q.defer();
        console.log("读取getUserListService网络数据");
        var url='http://123.56.220.72:3300/user/list/'+numPerPage+'/'+pageNum;
        if(isPassed!==''){
            url=url+'?isPassed='+isPassed;
        }
        if(nikeName!==''){
            url=url+'?nikeName='+nikeName;
        }
        $http.get(url)
            .success(function(data, status, headers, config){
                //console.log(data);
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
        var url='http://123.56.220.72:3300/user/modify/approval?token='+token+'&userId='+id+'&approvalStatus='+passFlag;
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
    //用户权限更改
    this.updateUserType = function(id,newType) {
        var token=AuthService.user.token;
        console.log('newType:'+newType);
        var url='http://123.56.220.72:3300/user/modify/type?token='+token+'&userId='+id+'&newType='+newType;
        console.log('url:'+url);
        var deferred = $q.defer();
        $http.get(url)
            .success(function(data, status, headers, config){
                if(data.callStatus=='SUCCEED'){
                    alert('更改成功!');
                    deferred.resolve('');
                }
                else{
                    alert('更改失败'+data.errCode)
                    deferred.resolve('');
                }
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
            });
        return deferred.promise;
    }
});