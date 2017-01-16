angular.module('auto-biz-user')
  .directive('headerloginbg',["AuthService",function (AuthService) {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        if(AuthService.company){
          element.css('background-image','url('+AuthService.company.logo+')');
        }else{
          element.css('background-image','url(/page/project/images/web_header_user.png)');
        }
      }
    };
  }]);