angular.module('auto-biz-user')
    .filter('statusFilter', function() {
  return function(input) {
    if(input=='1') return "已通过";
    else if(input=='0') return "待审核";
    else if(input=='-1') return "未通过";
    else return "错误";
  };
});

angular.module('auto-biz-user')
    .filter('statusFilter2', function() {
  return function(input) {
    if(input) return "上线";
    else return "下线";
  };
});

angular.module('auto-biz-user')
    .filter('yesOrNoFilter', function() {
  return function(input) {
    if(input) return "是";
    else return "否";
  };
});

angular.module('auto-biz-user')
    .filter('statusFilter3', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});

app.filter("trustHtmlFilter", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);
