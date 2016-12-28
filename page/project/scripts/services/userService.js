angular.module('auto-biz-user')
  .service('UserService', function UserService($http, $q,GlobalService,AuthService) {
    //注册用户
    this.registerUser = function(user) {
        var deferred = $q.defer();
        $http.post(GlobalService.baseUrl+'user/signup',
          user
      ).success(function(data, status, headers, config){
                console.log("注册用户");
                if(data.callStatus=='SUCCEED'){
                    deferred.resolve(data.data);
                }
                else{
                    alert("注册失败");
                }
            })
            .error(function(data, status, headers, config){
                alert("您好，访问的内容出错");
            });
        return deferred.promise;
    }
    //获取用户列表
    this.getUserList = function(numPerPage,pageNum,isPassed,nikeName) {
        var deferred = $q.defer();
        console.log("读取getUserListService网络数据");
        var url=GlobalService.baseUrl+'user/list/'+numPerPage+'/'+pageNum;
        if(isPassed!==''){
            url=url+'?isPassed='+isPassed;
            if(nikeName!==''){
            url=url+'&nikeName='+nikeName;
            }
        }
        else{
            if(nikeName!==''){
            url=url+'?nikeName='+nikeName;
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
                    alert("获取列表失败");
                }
            })
            .error(function(data, status, headers, config){
                alert("您好，访问的内容出错");
            });
        return deferred.promise;
    }
    //用户认证通过/否决
    this.passUser = function(id,passFlag) {
        var token=AuthService.user.token;
        var url=GlobalService.baseUrl+'user/modify/approval?token='+token+'&userId='+id+'&approvalStatus='+passFlag;
        var deferred = $q.defer();
        $http.get(url)
            .success(function(data, status, headers, config){
                if(data.callStatus=='SUCCEED'){
                    alert('用户认证成功');
                    deferred.resolve('');
                }
                else{
                    alert('用户认证失败');
                }
            })
            .error(function(data, status, headers, config){
                alert("您好，访问的内容出错");
            });
        return deferred.promise;
    }
    //用户权限更改
    this.updateUserType = function(id,newType) {
        var token=AuthService.user.token;
        console.log('newType:'+newType);
        var url=GlobalService.baseUrl+'user/modify/type?token='+token+'&userId='+id+'&newType='+newType;
        console.log('url:'+url);
        var deferred = $q.defer();
        $http.get(url)
            .success(function(data, status, headers, config){
                if(data.callStatus=='SUCCEED'){
                    alert('用户类型更改成功!');
                    deferred.resolve('');
                }
                else{
                    alert('用户类型更改失败');
                }
            })
            .error(function(data, status, headers, config){
                alert("您好，访问的内容出错");
            });
        return deferred.promise;
    }
});