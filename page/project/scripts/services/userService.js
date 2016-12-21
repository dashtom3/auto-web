angular.module('auto-biz-user')
  .service('userService', function userService($http, $q) {

    //获取用户列表
    this.getUserList = function() {
        var deferred = $q.defer();
        console.log("读取getUserListService网络数据");
        // $http.get('http://123.56.220.72:3300/user/getUserList')
        $http.get('http://localhost:3300/user/getUserList')
            .success(function(data, status, headers, config){
                console.log(data);
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
    //用户认证通过/否决
    this.passUser = function(ispassed) {
        var url='xxx'+ispassed;
        var deferred = $q.defer();
        $http.get(url)
            .success(function(data, status, headers, config){
                if(data.isSuccess=='0'){
                    alert('认证失败');
                    deferred.resolve('');
                }
                else{
                    alert('认证成功!');
                    deferred.resolve('');
                }

            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
            });
        return deferred.promise;
    }
    //用户权限更改
    this.updateUserType = function(newType) {
        var url='xxx'+newType;
        var deferred = $q.defer();
        $http.get(url)
            .success(function(data, status, headers, config){
                if(data.isSuccess=='0'){
                    alert('操作失败');
                    deferred.resolve('');
                }
                else{
                    alert('操作成功!');
                    deferred.resolve('');
                }

            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
            });
        return deferred.promise;
    }
});