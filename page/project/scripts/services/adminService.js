angular.module('auto-biz-user')
  .service('adminService', function adminService($http, $q) {
    //获取用户列表
    this.getUserList = function() {
        var deferred = $q.defer();
        console.log("读取data网络数据");
        $http.get('http://123.56.220.72:3300/user/getUserList')//http://localhost:3300/user/getUserList
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
    //获取公司列表
    this.getCompanyList = function() {
        var deferred = $q.defer();
        console.log("读取data网络数据");
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
});