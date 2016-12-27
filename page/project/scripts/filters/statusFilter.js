angular.module('auto-biz-user')
    .filter('statusFilter', function() {
  return function(input) {
    if(input=='1') return "已通过";
    else if(input=='0') return "待审核";
    else return "未通过";
  };
});