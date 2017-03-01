

var app = angular.module('auto-biz-user', ['ngRoute','bw.paging','ngFileUpload','oc.lazyLoad']);

app.config(["$locationProvider","$httpProvider","$routeProvider",function ($locationProvider,$httpProvider,$routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/page/project/html/views/user/innovationIndex.html',
        // controller: 'MainController'
      })
      .when('/innovation', {
        templateUrl: '/page/project/html/views/user/innovation.html',
        //redirectTo: '/error'
      })
      .when('/innovationIndex', {
        templateUrl: '/page/project/html/views/user/innovationIndex.html',
        //redirectTo: '/error'
      })
      .when('/innovation/:name', {
        templateUrl: '/page/project/html/views/user/innovation.html',
        //redirectTo: '/error'
      })
      .when('/innovationIndex/:name', {
        templateUrl: '/page/project/html/views/user/innovationIndex.html',
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
      .when('/companyInfo/:id', {
        templateUrl: '/page/project/html/views/user/companyDetail.html',
        // controller: 'CompanyDetailController'
        //redirectTo: '/error'
      })
      .when('/companyInfo/:id/:name', {
        templateUrl: '/page/project/html/views/user/companyDetail.html',
        // controller: 'CompanyDetailController'
        //redirectTo: '/error'
      })
      .when('/companyInfos', {
        templateUrl: '/page/project/html/views/user/companyDetails.html',
        // controller: 'CompanyDetailController'
        //redirectTo: '/error'
      })
      .when('/companyInfos/:id', {
        templateUrl: '/page/project/html/views/user/companyDetails.html',
        // controller: 'CompanyDetailController'
        //redirectTo: '/error'
      })
      .when('/companyNews/:id', {
        templateUrl: '/page/project/html/views/user/companyNewsDetail.html',
        // controller: 'CompanyDetailController'
        //redirectTo: '/error'
      })
      .when('/company',{
        templateUrl: '/page/project/html/views/company/company.html',
        // controller: 'CompanyMainController'
      })
      .when('/adminPage', {
        templateUrl: '/page/project/html/views/admin/admin.html',
        controller: 'AdminController'
        //redirectTo: '/error'
      })
      .when('/admin', {
        templateUrl: '/page/project/html/views/admin/adminLogin.html'
        //redirectTo: '/error'
      })
      .when('/companyProduct/:id', {
        templateUrl: '/page/project/html/views/user/companyProductDetail.html'
        //redirectTo: '/error'
      });
      $locationProvider.html5Mode(true);
      $httpProvider.interceptors.push('loadingHttpInterceptor');

  }]);
    // $routeProvider
    // .when('/PARisk/EnterpriseRisk', {
    //     templateUrl:'page/project/html/main.html',
    //     controller: 'PAMainController'
    //   })
    // .otherwise({redirectTo: '/PARisk/home'});
    // $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    //$locationProvider.html5Mode(true);
app.run(["AuthService","$rootScope",function(AuthService,$rootScope) {
  AuthService.setInfoFromLocalStorage();
}]);
