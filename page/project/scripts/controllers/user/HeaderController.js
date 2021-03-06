angular.module("auto-biz-user").controller("HeaderController",["$scope","GlobalService","$filter","AuthService",
  function HeaderController($scope,GlobalService,$filter,AuthService) {
    $scope.headerItems = [{name:"首页",title:"HOME",url:"http://www.auto-biz.cn"},{name:"资讯",title:"NEWS",url:"http://www.auto-biz.cn/toNews.html"},{name:"对话",title:"DIALOGUE",url:"http://www.auto-biz.cn/toTalks.html"},{name:"数据",title:"DATA",url:"http://www.auto-biz.cn/toData.html"},{name:"专栏",title:"COLUMNS",url:"http://www.auto-biz.cn/authors.html"},{name:"品车",title:"CARS",url:"http://www.auto-biz.cn/toTaste.html"},{name:"投稿",title:"CT",url:"http://www.auto-biz.cn/contribute.html"},{name:"企业平台",title:"PLATFORM",url:"/innovationIndex"}];
    ;
    $scope.currentPage = "platform";
    getLoginState();
    function getLoginState(){
      if(AuthService.user){
        $scope.loginState = "user";
      }else if(AuthService.company){
        $scope.loginState = "cmp";
      }else {
        $scope.loginState = null;
      }
    }
    $scope.logout = function(){
      if(AuthService.user){
        AuthService.userLogout().then(function(result){
          getLoginState();
          window.location.href="/innovationIndex";
        });
      }else if(AuthService.company){
        AuthService.companyLogout().then(function(result){
          getLoginState();
          window.location.href="/innovationIndex";
        });
      }
    }
  }
  ]


  );
