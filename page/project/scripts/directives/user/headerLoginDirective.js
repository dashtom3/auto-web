angular.module('auto-biz-user')
  .directive('headerloginbg',function (AuthService) {
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
  });
  // angular.module('auto-biz-user')
  // .directive('newsloadingshow',function () {
  //   return {
  //     restrict: 'A',
  //     link: function postLink(scope, element,attrs) {
  //       scope.$watch(function(){
  //         return [scope.cmpNews.currentPage,scope.cmpNews.totalPage,scope.cmpDetailShow];
  //       },function(){
  //         if(scope.cmpNews.currentPage != scope.cmpNews.totalPage){
  //         element.find('button').css('display','block');
  //         element.find('p').css('display','none');
  //         }else{
  //         element.find('button').css('display','none');
  //         element.find('p').css('display','block');
  //         }
  //       });
  //     }
  //   }
  // });