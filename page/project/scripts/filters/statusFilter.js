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
.filter('haveOrNoFilter', function() {
  return function(input) {
    if(input) return "有";
    else return "无";
  };
});
angular.module('auto-biz-user')
.filter('productFilter', function() {
  return function(input) {
    if(input) return "展示中";
    else return "隐藏中";
  };
});    

angular.module('auto-biz-user')
.filter('statusFilter3', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});

angular.module('auto-biz-user')
.filter("trustHtmlFilter", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);
angular.module('auto-biz-user')
.filter('newsFirstFilter', function() {
  return function(input) {
    if(input== true ) return "原创";
    else return "摘抄";
  };
});
angular.module('auto-biz-user')
.filter('avePointFilter', function() {
  return function(input) {
    var a=0.0;
    for(var i=0;i<input.length;i++){
      a = a+parseFloat(input[i]);
    }
    return a/input.length;
  };
});
angular.module('auto-biz-user')
.filter('needInvestFilter', function() {
  return function(input) {
    if(input==true) return "有投融资需求";
    else return "暂无投融资需求";
  };
});
angular.module('auto-biz-user')
.filter('countFilter', function() {
  return function(input) {
    if(input == null){
      return 0;
    }
    return input.length;
  };
});

angular.module('auto-biz-user')
.filter('isPassedFilter', function() {
  return function(input) {
    if(input=='1') return "已通过";
    else if(input=='0') return "待审核";
    else if(input=='-1') return "未通过";
    else return "错误";
  };
});

