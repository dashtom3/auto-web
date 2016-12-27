angular.module('auto-biz-user')
    .filter('imageFilter', function() {
  return function(input) {
      return 'http://123.56.220.72:3300/image/'+input;
  };
});