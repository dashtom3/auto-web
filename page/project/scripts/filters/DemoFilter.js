angular.module('auto-biz-user')
  .filter('DataFilter', function () {
    return function(inputArray){
        return inputArray;
    };
});