angular.module('auto-biz-user')
  .service('DataService', function DataService($http, $q) {
    var self = this;
    //假设数据已经在内部
    this.userList={"data":"abc"};
    this.dataList = function(userName,password) {
        var deferred = $q.defer();
        // if(self.userList){
        //     console.log("读取data本地数据");
        //     deferred.resolve(self.userList);
        // }else{
        console.log("读取data网络数据");
        $http.get('http://127.0.0.1:3300/user/login?name=aaa&password=123')
            .success(function(data, status, headers, config){
                console.log(data);
                if(data.isSuccess == "1"){
                    deferred.resolve(data.data);
                    self.userList = data.data;
                }else{
                    alert("数据读取失败");
                }
                
            })
            .error(function(data, status, headers, config){
                deferred.reject(data);
            });
        // };
        return deferred.promise;
    }
});