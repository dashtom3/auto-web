var app = angular.module('auto-biz-user', ['ngRoute']);
app.config(function ($locationProvider,$httpProvider,$routeProvider) {
    console.log("载入angular config");
    $routeProvider
      .when('/', {
        templateUrl: 'page/project/html/views/user/news.html',
        controller: 'MainController'
      })
      .when('/home', {
        templateUrl: 'page/project/html/views/user/news.html',
        controller: 'MainController'
        //redirectTo: '/error'
      })
      
      $locationProvider.html5Mode(true);
  });
    // $routeProvider
    // .when('/PARisk/EnterpriseRisk', {
    //     templateUrl:'page/project/html/main.html',
    //     controller: 'PAMainController'
    //   })
    // .otherwise({redirectTo: '/PARisk/home'});
    // $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    //$locationProvider.html5Mode(true);
// app.run(function(AuthService,$rootScope) {
//   AuthService.loginIntern().then(function(result) {
//     console.log("广播用户登录数据");
//     $rootScope.$broadcast('UserLogin');
//   });
// });