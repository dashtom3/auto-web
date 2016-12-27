angular.module('auto-biz-user')
    .filter('dateFilter', function() {
  return function(input) {
      return new Date(parseInt(input)).toLocaleDateString();
  };
});