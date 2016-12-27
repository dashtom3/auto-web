angular.module('auto-biz-user')
  .filter('DataFilter', function () {
    return function(inputArray){
        console.log("载入过滤器dataFilter");
        return inputArray;
    };
});