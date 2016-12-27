angular.module('auto-biz-user')
    .filter('typeFilter', function() {
  return function(input) {
    if(input=="normal") return "普通用户";
    else if(input=="vc") return "投资人";
    else if(input=="wr") return "作家";
    else return "黑名单";
  };
});