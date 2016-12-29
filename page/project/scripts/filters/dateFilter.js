angular.module('auto-biz-user')
    .filter('dateFilter', function() {
  return function(input) {
      return new Date(parseInt(input)).toLocaleDateString();
  };
});

angular.module('auto-biz-user')
    .filter('dayFilter', function() {
  return function(input) {
      return new Date(parseInt(input)).getDate();
  };
});

angular.module('auto-biz-user')
    .filter('yearFilter', function() {
  return function(input) {
      var date = new Date(parseInt(input));
      return date.getFullYear()+'/'+date.getMonth();
  };
});