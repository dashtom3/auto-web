
var app = angular.module('auto-biz-user', ['ngRoute','textAngular','bw.paging','ngFileUpload']);

app.config(function ($locationProvider,$httpProvider,$routeProvider) {
    console.log("载入angular config");
    $routeProvider
      .when('/', {
        templateUrl: '/page/project/html/views/user/innovation.html',
        controller: 'MainController'
      })
      .when('/innovation', {
        templateUrl: '/page/project/html/views/user/innovation.html',
        controller: 'MainController'
        //redirectTo: '/error'
      })
      .when('/registerCompany', {
        templateUrl: '/page/project/html/views/user/companyCreate.html',
        //controller: 'MainController'
        //redirectTo: '/error'
      })
      .when('/registerUser', {
        templateUrl: '/page/project/html/views/user/userRegister.html',
        //controller: 'MainController'
        //redirectTo: '/error'
      })
      .when('/loginUser', {
        templateUrl: '/page/project/html/views/user/userLogin.html',
        //controller: 'MainController'
        //redirectTo: '/error'
      })
      .when('/loginCompany', {
        templateUrl: '/page/project/html/views/user/companyLogin.html',
        //controller: 'MainController'
        //redirectTo: '/error'
      })
      .when('/companyDetail', {
        templateUrl: '/page/project/html/views/user/companyDetail.html',
        // controller: 'CompanyDetailController'
        //redirectTo: '/error'
      })
      .when('/companyDetail', {
        templateUrl: 'page/project/html/views/user/companyDetail.html',
        // controller: 'CompanyDetailController'
        //redirectTo: '/error'
      })
      .when('/company',{
        templateUrl: 'page/project/html/views/company/company.html',
        // controller: 'CompanyMainController'
      })
      .when('/adminPage', {
        templateUrl: 'page/project/html/views/admin/admin.html',
        controller: 'AdminController'
        //redirectTo: '/error'
      })
      .when('/admin', {
        templateUrl: 'page/project/html/views/admin/adminLogin.html',
        controller: 'AuthController'
        //redirectTo: '/error'
      });
      $locationProvider.html5Mode(true);
      // $httpProvider.interceptors.push('loadingHttpInterceptor');
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
//   AuthService.userLogin("aaa","123").then(function(result) {
//     console.log("广播用户登录数据"+result.name);
//     $rootScope.$broadcast('UserLogin');
//   });
// });
