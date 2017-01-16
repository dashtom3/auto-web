

var app = angular.module('auto-biz-user', ['ngRoute','bw.paging','ngFileUpload']);

app.config(["$locationProvider","$httpProvider","$routeProvider",function ($locationProvider,$httpProvider,$routeProvider) {
    console.log("载入angular config");
    $routeProvider
      .when('/', {
        templateUrl: '/page/project/html/views/user/innovation.html',
        controller: 'MainController'
      })
      .when('/innovation', {
        templateUrl: '/page/project/html/views/user/innovation.html',
        //redirectTo: '/error'
      })
      .when('/innovation/:name', {
        templateUrl: '/page/project/html/views/user/innovation.html',
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
  console.log("获取本地数据");
  AuthService.setInfoFromLocalStorage();
}]);

window.alert = function(str)
{
	var shield = document.createElement("DIV");
	shield.id = "shield";
	shield.style.position = "absolute";
	shield.style.left = "0px";
	shield.style.top = "0px";	     
	shield.style.width = "100%";
	shield.style.height = document.body.offsetHeight+"px";
	 //弹出对话框时的背景颜色
	 shield.style.background = "rgba(14,31,71,0.25)";
	 shield.style.textAlign = "center";
	 shield.style.zIndex = "25";
	 //背景透明 IE有效
	 //shield.style.filter = "alpha(opacity=0)";
	 var alertFram = document.createElement("DIV");
	 alertFram.id="alertFram";
	 alertFram.style.position = "fixed";
	 alertFram.style.left = "50%";
	 alertFram.style.top = "50%";
	 alertFram.style.marginLeft = "-155px";
	 alertFram.style.marginTop = "-64px";
	 alertFram.style.width = "310px";
	 alertFram.style.height = "128px";
	 alertFram.style.textAlign = "center";
	 alertFram.style.zIndex = "300";
	 alertFram.style.background = "white";
	 strHtml = "<ul class=\"modal-middle\">\n";
	 strHtml += " <li class=\"modal-top\"></li>\n";
	 strHtml += " <li class=\"modal-content2\"><img src=\"/page/project/images/company/warn.png\">"+str+"</li>\n";
	 //取消按钮
	 strHtml += " <li class=\"modal-def1\"><input class=\"inp1\" type=\"button\" value=\"取消\" onclick=\"doOk()\" /></li>\n";
	 //确定按钮
	 strHtml += " <li class=\"modal-def2\"><input class=\"inp2\" type=\"button\" value=\"确定\" onclick=\"doOk()\" /></li>\n";
	 strHtml += "</ul>\n";
	 alertFram.innerHTML = strHtml;
	 document.body.appendChild(alertFram);
	 document.body.appendChild(shield);	     
	 this.doOk = function(){
	 	alertFram.style.display = "none";
	 	shield.style.display = "none";
	 }
	 alertFram.focus();
	 document.body.onselectstart = function(){return false;};
}
angular.module('auto-biz-user').directive('mycarousel', function(){
	return {
		templateUrl: '/page/project/html/template/user/carousel.html',
		scope:{
			imageList:"=",
		}, 
		controller: function($scope, $element, $attrs) {
			$scope.imageList = $scope.imageList;
		},
		restrict: 'E', 
		link: function($scope, iElm, iAttrs, controller) {
			$scope.setCurrentCarouse = function(num){
				$scope.currentCarouse = num;
			}
			$scope.moveLeft = function(){
				console.log($scope.currentCarouse);
				if ($scope.currentCarouse == "0"){
					$scope.currentCarouse = $scope.imgList.length - 1;
				}else{
					$scope.currentCarouse --;
				}
			}
			$scope.moveRight = function(){
				console.log($scope.currentCarouse);
				if ($scope.currentCarouse == $scope.imgList.length - 1){
					$scope.currentCarouse = 0;
				}else{
					$scope.currentCarouse ++;
				}
			}
			function getImgList(){
				$scope.imgList = [];
				for ( i in $scope.imageList){
					var img = new Object();
					img.url = $scope.imageList[i];
					img.num = i;
					$scope.imgList.push(img);
				}
				$scope.currentCarouse = $scope.imgList[0].num;
			}
			$scope.$watch('imageList', function (oldVal, newVal) {
				if ($scope.imageList && $scope.imageList.length>0) {
					getImgList();
				}
			},true);
		}
	};
});
angular.module('auto-biz-user')
  .directive('HeaderCollapse', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        var ulElement = element.find('ul');
        var aElement = element.find('a');
        element.mouseenter(function(){
        	ulElement.stop().show(300);
          element.css('border-top','solid 5px #ed4f28');
          //element.css('margin-bottom','5px');

          aElement.css('margin-left','-1px');
          aElement.css('margin-right','-1px');
          aElement.css('padding-bottom','11px');
          aElement.css('border-left','solid 1px #cccccc');
          aElement.css('border-right','solid 1px #cccccc');
        });
        element.mouseleave(function(){
        	ulElement.stop().hide(300);
          // var aElement = angular.element(element.children()[0]);
          // aElement.css('padding-right','15px');
          element.css('border','none');
          element.css('margin-bottom','0px');
          aElement.css('border','none');
          aElement.css('padding-bottom','15px');
        });
      }
    };
  });
angular.module('auto-biz-user').directive('ueditor',["$timeout" ,function($timeout){
	return {
		restrict: 'E',
		require : 'ngModel',
		link: function(scope,element,attrs,ctrl){
			var id = 'ueditor_' + Date.now(); 
			element[0].id = id; 
			var ue = UE.getEditor(id, {
				initialFrameWidth: '100%', 
				initialFrameHeight: '200', 
				autoHeightEnabled: true 
			}); 
			ctrl.$render = function () {
					try {
						ue.setContent(ctrl.$modelValue);
					} catch (e) {

					}
				};
			ue.ready(function () { 
				ue.addListener('contentChange', function () { 
					ctrl.$setViewValue(ue.getContent()); 
					if (!scope.$$phase) { 
						scope.$apply(); 
					} 
				}); 
			}); 	
		}
	}
}]);
angular.module('auto-biz-user')
.filter('companyTypeFilter', function() {
  return function(input) {
    //CM汽车制作，CG汽车零部件，CS汽车销售与服务，NEC新能源汽车，NOC车联网，CC车用化工品，CE汽车金融，PT公共交通，MOC汽车媒体
    if(input=="CM") return "汽车制造";
    else if(input=="CG") return "汽车零部件";
    else if(input=="CS") return "汽车销售与服务";
    else if(input=="NEC") return "新能源汽车";
    else if(input=="NOC") return "车联网";
    else if(input=="CC") return "车用化工品";
    else if(input=="CE") return "汽车金融";
    else if(input=="PT") return "公共交通";
    else if(input=="MOC") return "汽车媒体";
    else return "未知";
};
});

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
angular.module('auto-biz-user')
  .filter('DataFilter', function () {
    return function(inputArray){
        console.log("载入过滤器dataFilter");
        return inputArray;
    };
});
angular.module('auto-biz-user')
    .filter('imageFilter', function() {
  return function(input) {
      return 'http://123.56.220.72:3300/image/'+input;
  };
});
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
.filter('typeFilter', function() {
	return function(input) {
		if(input=="normal") return "普通用户";
		else if(input=="vc") return "投资人";
		else if(input=="wr") return "作家";
		else if(input=="admin") return "管理员";
		else return "黑名单";
	};
});

angular.module('auto-biz-user')
.filter('testTypeFilter', function() {
	return function(input) {
		if(input) return "local";
		else if(!input) return "mail";
		else return "未知";
	};
});   
angular.module('auto-biz-user')
.filter('userTestTypeFilter', function() {
	return function(input) {
		if(input == 'local') return "实地";
		else if(input == 'mail') return "邮寄";
		else return "未知";
	};
}); 

angular.module("auto-biz-user")
  .service('AuthService',["$q","$http","GlobalService", function ($q,$http,GlobalService) {
  var self = this; 
  //用户登录
  this.userLogin = function (username, password) {
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl+'user/login?name='+username+'&password='+GlobalService.MD5Decode(password))
      .success(function (res) {
        if(res.callStatus == "SUCCEED"){
          self.kickOut();
          self.user = res.data;
          localStorage.auto_user = JSON.stringify(res.data);
          console.log("用户登录");
          deferred.resolve(res.data);
        }else{
          alert("用户名密码错误");
        }
      })
      .error(function (res) {
        alert("您好，您访问的内容出错");
      }); 
    return deferred.promise;
  };
  this.kickOut = function(){
    if (self.user){
      self.user = null;
      localStorage.auto_user = null;
    }
    if (self.company){
      self.company = null;
      localStorage.auto_company = null;
    }
  }
  //用户登出
  this.userLogout=function () {
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl+'user/logout?token='+self.user.token)
        .success(function (res) {
          if(res.callStatus == "SUCCEED"){
            console.log("用户登出");
            localStorage.auto_user = null;
            deferred.resolve();

          }else{
          alert("您好，用户登出失败");
        }
      })
      .error(function (res) {
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  //企业登录
  this.companyLogin = function(username,password){
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl+'company/login?name='+username+'&password='+password)
      .success(function (res) {
        if(res.callStatus == "SUCCEED"){
            self.kickOut();
            console.log("企业登录");
            self.company = res.data;
            localStorage.auto_company = JSON.stringify(res.data);
            deferred.resolve(res.data);
          }else{
            alert("用户名密码错误");
        }
      }) 
      .error(function (res) {
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  }
  //企业登出
  this.companyLogout = function(){
    var deferred = $q.defer();$http.get(GlobalService.baseUrl+'company/logout?token='+self.company.token)
      .success(function (res) {
        if(res.callStatus == "SUCCEED"){
          console.log("企业登出");
          localStorage.auto_company = null;
          deferred.resolve();
       }else{
          alert("您好，企业登出失败");
        }
      })
      .error(function (res) {
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  }
  this.setUserInfo = function(user){
    self.user = user;
    self.token = user.token;
  }
  this.setCompanyInfo = function(company){
    self.company = company;
    self.token = company.token;
  }
  this.getToken = function(){
      if(self.user){
        return self.user.token;
      }else if(self.company){
        return self.company.token;
      }
      return "guest";
  }
  this.setInfoFromLocalStorage = function(){
      if(localStorage.auto_user != null){
        self.user =  JSON.parse(localStorage.auto_user);
      }
      if(localStorage.auto_company != null){
        self.company =  JSON.parse(localStorage.auto_company);
      }
  }
}]);
angular.module("auto-biz-user")
  .service('CompanyFinanceService', ["$http","GlobalService","$q","AuthService", function ($http,GlobalService,$q,AuthService) {
  var self = this; 
  //获取企业财务列表
  this.getCompanyFinanceList = function (companyId,yearStart,yearEnd,numPerPage,pageNumber) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["companyId",companyId],["yearStart",yearStart],["yearEnd",yearEnd]]);
    $http.get(GlobalService.baseUrl+'finance/list/'+numPerPage+'/'+pageNumber+'?'+urlStr).success(function (res) {
        console.log("获取企业财务列表");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("获取失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.deleteCompanyFinance = function (financeRecordId) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["financeRecordId",financeRecordId],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'finance/delete?'+urlStr).success(function (res) {
        console.log("删除企业财务");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("删除失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.modifyCompanyFinance = function(finance){
    var deferred =$q.defer();
    var urlStr = GlobalService.getURLStr([["financeRecordId",finance._id],["year",finance.year],["ratio",finance.ratio],
      ["input",finance.input],["increase",finance.increase],["allCapital",finance.allCapital],["realCapital",finance.realCapital],
      ["allRatio",finance.allRatio],["realRatio",finance.realRatio],["debtRatio",finance.debtRatio],["inputRatio",finance.inputRatio],
      ["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'finance/modify?'+urlStr).success(function (res) {
        console.log("修改企业财务");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("修改失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  }
  this.addCompanyFinance = function (finance) {
    finance.token = AuthService.getToken();
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'finance/add',
          finance
      ).success(function (res) {
        console.log("添加财务");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("添加失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.updateCompanyFinance = function (finance) {
    finance.token = AuthService.getToken();
    console.log(finance);
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'finance/modify',
          finance
      ).success(function (res) {
        console.log("修改财务数据");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("修改失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
}]);
angular.module("auto-biz-user")
  .service('CompanyNewsService', ["$http","GlobalService","$q", "AuthService",function ($http,GlobalService,$q,AuthService) {
  var self = this; 
  //获取资讯
  this.getCompanyNewsList = function (title,author,isFirst,tag,isOnline,companyId,startTime,endTime,numPerPage,pageNumber) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["title",title],["author",author],["isFirst",isFirst],["tag",tag],["isOnline",isOnline],["companyId",companyId],["startTime",startTime],["endTime",endTime]]);
    var url = GlobalService.baseUrl+'news/list/'+numPerPage+'/'+pageNumber+'?'+urlStr;
    console.log(url);
    $http.get(url).success(function (res) {
        console.log("获取企业新闻列表");
        console.log(res);
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.getCompanyNewsDetail = function (newsId) {
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl+'news/detail?newsId='+newsId).success(function (res) {
        console.log("获取企业新闻详情");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  //isOnline true false
  this.changeCompanyNewsState = function(newsId,isOnline){
    var deferred = $q.defer();
    isOnline = ""+isOnline;
     var urlStr = GlobalService.getURLStr([["newsId",newsId],["isOnline",isOnline],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'news/modify/online?'+urlStr).success(function (res) {
        console.log("改变新闻状态");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  }
  this.changeCompanyNewsStateAdmin = function(newsId,isOnline){
    var deferred = $q.defer();
    isOnline = ""+isOnline;
     var urlStr = GlobalService.getURLStr([["newsId",newsId],["isOnline",isOnline],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'news/modify/online/admin?'+urlStr).success(function (res) {
        console.log("改变新闻状态");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  }
  this.deleteCompanyNews = function (newsId) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["newsId",newsId],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'news/delete?'+urlStr).success(function (res) {
        console.log("删除企业资讯");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("删除失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.addCompanyNews = function (news) {
    news.token = AuthService.getToken();
    console.log(news.token);
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'news/add',
          news
      ).success(function (res) {
        console.log("添加企业资讯");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("添加失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.updateCompanyNews = function (news) {
    news.token = AuthService.getToken();
    news.newsId = news._id;
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'news/modify/detail',
          news
      ).success(function (res) {
        console.log("修改资讯数据");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("修改失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };

}]);
angular.module("auto-biz-user")
  .service('CompanyPriReportService', ["$http","GlobalService","$q", "AuthService",function ($http,GlobalService,$q,AuthService) {
  var self = this; 
  //获取用户测评
  this.getCompanyPriReportList = function (productId,title,type,address,startDateStart,endDateStart,startDateEnd,endDateEnd,maxUserNum_Min,maxUserNum_Max,argc,state,signUser,passUser,startTime,endTime,companyId,numPerPage,pageNumber) {
    var deferred = $q.defer();
    console.log(startDateEnd);
    console.log(endDateEnd);
    var urlStr = GlobalService.getURLStr([["productId",productId],["title",title],["type",type],["address",address],["startDateStart",startDateStart],["endDateStart",endDateStart],
      ["startDateEnd",startDateEnd],["endDateEnd",endDateEnd],["maxUserNum_Min",maxUserNum_Min],["maxUserNum_Max",maxUserNum_Max],["argc",argc],["state",state],["signUser",signUser],["passUser",passUser],
      ["startTime",startTime],["endTime",endTime],["companyId",companyId]]);
    var url = GlobalService.baseUrl+'report/private/list/'+numPerPage+'/'+pageNumber+'?'+urlStr;
    $http.get(url).success(function (res) {
        console.log("获取用户测评列表");
        console.log(res);
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  //设置上下线
  this.changeCompanyPriReportOnline = function(reportId,isOnline){
    var deferred = $q.defer();
     var urlStr = GlobalService.getURLStr([["reportId",reportId],["isOnline",isOnline],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/modify/online?'+urlStr).success(function (res) {
        console.log("改变测评状态");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  }
  this.changeCompanyPriReportOnlineAdmin = function(reportId,isOnline){
    var deferred = $q.defer();
     var urlStr = GlobalService.getURLStr([["reportId",reportId],["isOnline",isOnline],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/modify/online/admin?'+urlStr).success(function (res) {
        console.log("改变测评状态");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  }
  this.changeCompanyPriReportState = function(reportId,state){
    var deferred = $q.defer();
     var urlStr = GlobalService.getURLStr([["reportId",reportId],["state",state],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/modify/approval?'+urlStr).success(function (res) {
        console.log("改变测评状态");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  }
  this.getCompanyPriReportDetail = function(reportId){
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl + 'report/private/detail?reportId='+reportId).success(function(res){
      console.log("获取用户测评详情");
      if(res.callStatus == "SUCCEED"){
        deferred.resolve(res.data);
      }else{
        alert("您好，您访问的内容出错");
      }
    }).error(function (res){
      alert("您好，您访问的内容出错");
    });
      return deferred.promise;
  }
  this.getReportSignUser = function(reportId,passed){
    var deferred = $q.defer();
    var  urlStr = GlobalService.getURLStr([["reportId",reportId],["passed",passed],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/signuser/list?'+urlStr).success(function (res) {
        console.log("获取报名用户");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.getReportPassUser = function(reportId,passed){
    var deferred = $q.defer();
    var  urlStr = GlobalService.getURLStr([["reportId",reportId],["passed",passed],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/passuser/list?'+urlStr).success(function (res) {
        console.log("获取测评用户用户");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.getCompanyPriReportComment = function(reportId){
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl + 'report/private/comment/list?reportId='+reportId).success(function(res){
      console.log("获取用户评论");
      if(res.callStatus == "SUCCEED"){
        deferred.resolve(res.data);
      }else{
        alert("您好，您访问的内容出错");
      }
    }).error(function (res){
      alert("您好，您访问的内容出错");
    });
      return deferred.promise;
  }
  // this.getCompanyPriReportSignList = function(reportId){
  //   var deferred = $q.defer();
  //   $http.get(GlobalService.baseUrl + 'report/private/signlist?reportId='+reportId).success(function(res){
  //     console.log("获取待审核用户");
  //     if(res.callStatus == "SUCCEED"){
  //       deferred.resolve(res.data);
  //     }else{
  //       alert("您好，您访问的内容出错");
  //     }
  //   }).error(function (res){
  //     alert("您好，您访问的内容出错");
  //   });
  //     return deferred.promise;
  // }
  // this.getCompanyPriReportToPassList = function(reportId){
  //   var deferred = $q.defer();
  //   $http.get(GlobalService.baseUrl + 'report/private/comment/topasslist?reportId='+reportId).success(function(res){
  //     console.log("获取测评中用户");
  //     if(res.callStatus == "SUCCEED"){
  //       deferred.resolve(res.data);
  //     }else{
  //       alert("您好，您访问的内容出错");
  //     }
  //   }).error(function (res){
  //     alert("您好，您访问的内容出错");
  //   });
  //     return deferred.promise;
  // }
  // this.getCompanyPriReportToRefused = function(reportId){
  //   var deferred = $q.defer();
  //   $http.get(GlobalService.baseUrl + 'report/private/refused?reportId='+reportId).success(function(res){
  //     console.log("获取被拒绝用户");
  //     if(res.callStatus == "SUCCEED"){
  //       deferred.resolve(res.data);
  //     }else{
  //       alert("您好，您访问的内容出错");
  //     }
  //   }).error(function (res){
  //     alert("您好，您访问的内容出错");
  //   });
  //     return deferred.promise;
  // }
  this.deleteCompanyPriReport = function (reportId) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["reportId",reportId],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/delete?'+urlStr).success(function (res) {
        console.log("删除专业测评");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("删除失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.addCompanyPriReport = function (report) {
    report.token = AuthService.getToken();
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'report/private/add',
          report
      ).success(function (res) {
        console.log("添加用户测评");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else if (res.errCode == "ALREADY_CREATE_PRIVATE_REPORT"){
          alert("该产品已经有用户测评了");
        }else{
          alert("添加失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.updateCompanyPriReport = function (report) {
    report.token = AuthService.getToken();
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'report/private/modify/detail',
          report
      ).success(function (res) {
        console.log("修改用户测评");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("修改失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  //用户报名参加测评
  this.signCompanyPriReport= function (reportId,phone,address) {
    var deferred = $q.defer();
   var urlStr = GlobalService.getURLStr([["reportId",reportId],["phone",phone],["address",address],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/sign?'+urlStr).success(function (res) {
        console.log("报名用户测评");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else if(res.errCode == "NOT_PASSED"){
          alert("您的用户审核还未通过");
        }else if (res.errCode == "ALREADY_SIGNED"){
          alert("您已经报名过该测评");
        }else{
          alert("报名失败，错误为"+res.errCode+"");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  //通过报名参加测评
  this.passCompanyPriReport= function (reportId,userId,passed) {
    var deferred = $q.defer();
   var urlStr = GlobalService.getURLStr([["reportId",reportId],["userId",userId],["passed",passed],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/pass?'+urlStr).success(function (res) {
        console.log("通过用户测评");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("通过失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  //用户发表评论
  this.commentCompanyPriReport= function (comment) {
    comment.token = AuthService.getToken();
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'report/private/comment',comment).success(function (res) {
        console.log("通过用户测评");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("评论失败");
        }
      }).error(function (res){
        alert("您好，您不是该测评的用户");
      });
      return deferred.promise;
  };
  //通过测评评论
  this.passCommentCompanyPriReport= function (reportId,userId,passed) {
    var deferred = $q.defer();
   var urlStr = GlobalService.getURLStr([["reportId",reportId],["userId",userId],["passed",passed],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/private/modify/commentpass?'+urlStr).success(function (res) {
        console.log("通过用户评论");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert(res.errCode);
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
}]);
angular.module("auto-biz-user")
  .service('CompanyProductsService',["$http","GlobalService","$q", "AuthService", function ($http,GlobalService,$q,AuthService) {
  var self = this; 
  //获取产品
  this.getCompanyProductsList = function (name,tag,state,argc,desc,companyId,startTime,endTime,numPerPage,pageNumber) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["name",name],["tag",tag],["state",state],["argc",argc],["desc",desc],["companyId",companyId],["startTime",startTime],["endTime",endTime]]);
    var url = GlobalService.baseUrl+'product/list/'+numPerPage+'/'+pageNumber+'?'+urlStr;
    $http.get(url).success(function (res) {
        console.log("获取企业产品列表");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  //获取产品详情
  this.getCompanyProductsDetail = function (productId) {
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl+'product/detail?productId='+productId).success(function (res) {
        console.log("获取企业产品详情");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  //state true false
  this.changeCompanyProductsState = function(productId,state){
    var deferred = $q.defer();
    state = ""+state;
     var urlStr = GlobalService.getURLStr([["productId",productId],["state",state],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'product/modify/online?'+urlStr).success(function (res) {
        console.log("改变产品状态");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  }
  this.changeCompanyProductsStateAdmin = function(productId,state){
    var deferred = $q.defer();
    state = ""+state;
     var urlStr = GlobalService.getURLStr([["productId",productId],["state",state],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'product/modify/online/admin?'+urlStr).success(function (res) {
        console.log("改变产品状态");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  }
  this.deleteCompanyProduct = function (productId) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["productId",productId],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'product/delete?'+urlStr).success(function (res) {
        console.log("删除产品");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("删除失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.addCompanyProduct = function (product) {
    product.token = AuthService.getToken();
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'product/add',
          product
      ).success(function (res) {
        console.log("添加产品");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("添加失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.updateCompanyProduct = function (product) {
    product.token = AuthService.getToken();
    product.productId = product._id;
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'product/modify/detail',
          product
      ).success(function (res) {
        console.log("修改产品");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("修改失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };

}]);
angular.module("auto-biz-user")
  .service('CompanyPubReportService',["$http","GlobalService","$q", "AuthService", function ($http,GlobalService,$q,AuthService) {
  var self = this; 
  //获取专业测评
  this.getCompanyPubReportList = function (productId,isOnline,testDesc,team,site,companyId,dateStart,dateEnd,numPerPage,pageNumber) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["productId",productId],["isOnline",isOnline],["testDesc",testDesc],["team",team],["site",site],["companyId",companyId],["dateStart",dateStart],["dateEnd",dateEnd]]);
    var url = GlobalService.baseUrl+'report/public/list/'+numPerPage+'/'+pageNumber+'?'+urlStr;
    console.log(url);
    $http.get(url).success(function (res) {
        console.log("获取企业专业测评列表");
        console.log(res);
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  //isOnline true false
  this.changeCompanyPubReportState = function(reportId,isOnline){
    var deferred = $q.defer();
     var urlStr = GlobalService.getURLStr([["reportId",reportId],["isOnline",isOnline],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/public/modify/online?'+urlStr).success(function (res) {
        console.log("改变测评状态");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  }
  this.changeCompanyPubReportStateAdmin = function(reportId,isOnline){
    var deferred = $q.defer();
     var urlStr = GlobalService.getURLStr([["reportId",reportId],["isOnline",isOnline],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/public/modify/online/admin?'+urlStr).success(function (res) {
        console.log("改变测评状态");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  }
  this.getCompanyPubReportDetail = function(productId){
    var deferred = $q.defer();
    $http.get(GlobalService.baseUrl + 'report/public/list/1/1?productId='+productId).success(function(res){
      console.log("获取专业测评详情");
      if(res.callStatus == "SUCCEED"){
        deferred.resolve(res.data);
      }else{
        alert("您好，您访问的内容出错");
      }
    }).error(function (res){
      alert("您好，您访问的内容出错");
    });
      return deferred.promise;
  }
  this.deleteCompanyPubReport = function (reportId) {
    var deferred = $q.defer();
    var urlStr = GlobalService.getURLStr([["reportId",reportId],["token",AuthService.getToken()]]);
    $http.get(GlobalService.baseUrl+'report/public/delete?'+urlStr).success(function (res) {
        console.log("删除专业测评");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("删除失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.addCompanyPubReport = function (report) {
    report.token = AuthService.getToken();
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'report/public/add',
          report
      ).success(function (res) {
        console.log("添加专业测评");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("添加失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  this.updateCompanyPubReport = function (report) {
    report.reportId = report._id;
    report.token = AuthService.getToken();
    var deferred = $q.defer();
    $http.post(GlobalService.baseUrl+'report/public/modify/detail',
          report
      ).success(function (res) {
        console.log("修改专业测评");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("修改失败");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };

}]);
angular.module("auto-biz-user")
.service('CompanyService', ["$http","GlobalService","$q", "AuthService",function ($http,GlobalService,$q,AuthService) {
  var self = this; 
  //注册公司
  this.registerCompany = function (company) {
    var deferred = $q.defer();
    console.log(company);
    $http.post(GlobalService.baseUrl+'company/signup',
      company
      ).success(function (res) {
        console.log("企业注册");
        if(res.callStatus == "SUCCEED"){
          AuthService.kickOut();
          deferred.resolve(res.data);
          AuthService.company = res.data;
          localStorage.auto_company = JSON.stringify(res.data);
        }else{
          alert(res.errCode);
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
    };

    //修改企业信息 
    this.modifyCompany = function (company) {
      company.token = AuthService.getToken();
      console.log(company);
      var deferred = $q.defer();
      $http.post(GlobalService.baseUrl+'company/modify/info',
        company
        ).success(function (res) {
          console.log("修改企业信息");
          if(res.callStatus == "SUCCEED"){
            deferred.resolve(res.data);
          }else{
            alert("您好，您访问的内容出错");
          }
        }).error(function (res){
          alert("您好，您访问的内容出错");
        });
        return deferred.promise;
      };
   
  this.getCompanysList = function(numPerPage,pageNum,isPassed,type,name) {
      var deferred = $q.defer();
      var urlStr = GlobalService.getURLStr([["isPassed",isPassed],["type",type],["name",name],["token",AuthService.getToken()]]);
      var url = GlobalService.baseUrl+'company/list/'+numPerPage+'/'+pageNum + '?' +urlStr;
      $http.get(url).success(function(res){
        console.log("获取企业列表");
        console.log(res);
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
  };
  //获取企业列表
  this.getCompanyList = function(numPerPage,pageNum,isPassed,type,name) {

    var deferred = $q.defer();
    console.log("读取getCompanyListService网络数据");
    var urlStr = GlobalService.getURLStr([["isPassed",isPassed],["type",type],["name",name]]);
    var url=GlobalService.baseUrl+'company/list/'+numPerPage+'/'+pageNum+"?";
    url = url+urlStr;
    if(AuthService.user.token){
      url = url+"&token="+AuthService.user.token
    }
    console.log(url);
    $http.get(url)
    .success(function(data, status, headers, config){
      console.log(data);
      if(data.callStatus=='SUCCEED'){
        deferred.resolve(data.data);
      }
      else{
        alert(data.errCode)
      }
    })
    .error(function(data, status, headers, config){
      console.log(data);
    });
    return deferred.promise;
  }
    //用户认证通过/否决
    this.passCompany = function(id,passFlag) {
      var token=AuthService.user.token;
      var url=GlobalService.baseUrl+'company/modify/approval?token='+token+'&companyId='+id+'&approvalStatus='+passFlag;
      var deferred = $q.defer();
      $http.get(url)
      .success(function(data, status, headers, config){
        if(data.callStatus=='SUCCEED'){
          alert('认证成功!');
          deferred.resolve('');
        }
        else{
          alert('认证失败'+data.errCode)
          deferred.resolve('');
        }
      })
      .error(function(data, status, headers, config){
        deferred.reject(data);
      });
      return deferred.promise;
    }

    //根据cmpID获取企业基本信息
    this.getComppanyById = function(cmpId){
      var deferred = $q.defer();
      var urlStr = GlobalService.getURLStr([["companyId",cmpId],["token",AuthService.getToken()]]);
      $http.get(GlobalService.baseUrl+'company/detail?'+urlStr).success(function (res) {
        console.log("获取企业信息");
        if(res.callStatus == "SUCCEED"){
          deferred.resolve(res.data);
        }else{
          alert("您好，您访问的内容出错");
        }
      }).error(function (res){
        alert("您好，您访问的内容出错");
      });
      return deferred.promise;
    };


  }]);
angular.module("auto-biz-user")
  .service('FileService', ["$q","$http","GlobalService", "Upload",function ($q,$http,GlobalService,Upload) {
  	//上传文件
  	this.uploadFile = function(file){
  		var deferred = $q.defer();
  		if(file){
		Upload.upload({
			url: GlobalService.baseUrl+'upload',
			file: file
		}).success(function (res) {
			if(res.callStatus=="SUCCEED"){
				console.log("上传文件成功");
				deferred.resolve(res.data);
			}else{
				alert("您好，上传文件失败");
			}
		}).error(function(){
			alert("您好，上传文件失败");
		});
		}
		return deferred.promise;
	};
}]);
angular.module("auto-biz-user")
  .service('GlobalService', ["$filter",function ($filter) {
  	this.baseUrl = "http://123.56.220.72:3300/";
  	this.MD5Decode = function(input){
  		//return URLDecoder.decode(input,"utf-8");
  		return input;
  	}

  	this.headerList = [{name:"首页",title:"HOME",url:"http://www.auto-biz.cn"},{name:"资讯",title:"NEWS",url:"http://www.auto-biz.cn/toNews.html"},{name:"对话",title:"DIALOGUE",url:"http://www.auto-biz.cn/toTalks.html"},{name:"数据",title:"DATA",url:"http://www.auto-biz.cn/toData.html"},{name:"专栏",title:"COLUMNS",url:"http://www.auto-biz.cn/authors.html"},{name:"品车",title:"CARS",url:"http://www.auto-biz.cn/toTaste.html"},{name:"投稿",title:"CT",url:"http://www.auto-biz.cn/contribute.html"},{name:"企业平台",title:"INNOVATION",url:"/innovation"}];
    this.companyType=[{name:"汽车制作",id:"CM"},{name:"汽车零部件",id:"CG"},{name:"汽车销售与服务",id:"CS"},{name:"新能源汽车",id:"NEC"},{name:"车联网",id:"NOC"},{name:"车用化工品",id:"CC"},{name:"汽车金融",id:"CE"},{name:"公共交通",id:"PT"},{name:"汽车媒体",id:"MOC"}];
    this.investType=[{name:"A轮",id:"A"},{name:"B轮",id:"B"}];
    this.testStatus=[{name:"已结束",id:"0"},{name:"测评中",id:"1"}];
  	this.testType=[{name:"实地",id:"local"},{name:"邮寄",id:"mail"}];
    this.innovationTime = [{name:"全部",id:""},{name:"一周内",id:-604800000},{name:"一个月内",id:-2592000000},{name:"三个月内",id:-7776000000},{name:"一年内",id:-31536000000}];
    this.innovationList=[["最新资讯","null","innovationNews"],["最新产品","innovationProducts","hotProducts"],["热门测评","innovationTest","hotTest"],["发现企业","innovationCompany","companyDiscover"]];
    this.cmpDetailList=[["公司概况","companyOutline","outline"],["最新资讯","innovationNews","news"],["最新产品","hotProducts","product"],["热门测评","hotTest","test"],["财务状况","companyFinance","finance"]];
    
    //拼接url inputArray [["username","XXXX"],["password","XXX"]]
    this.getURLStr = function(inputArray){
      var temp="";
      for(var i=0;i<inputArray.length;i++){
          if(inputArray[i][1]!= ""){
            if(temp != ""){
              temp = temp+"&"+inputArray[i][0]+"="+inputArray[i][1];
            }else{
               temp = inputArray[i][0]+"="+inputArray[i][1];
            }
          }
      }
      return temp;
      }
      //返回"2016/09/22"  距今多少毫秒 
      this.getDateStr = function(time){
        var date = new Date();
        date = date.setTime(date.getTime()+time);
        return $filter("date")(date,"yyyy-MM-dd");
      }

  }]);
angular.module("auto-biz-user")
  .factory('loadingHttpInterceptor', ["$q","$timeout" ,function loadingHttpInterceptor($q, $timeout) {
    var isLoading = false;
    return {
      'request': function(config) {
          if (isLoading == false){
           $.isLoading();
           isLoading = true;
          }
        return config || $q.when(config);
      },
      'requestError': function(config) {
        $timeout(function() {
          $.isLoading('hide');
          isLoading = false;
        }, 500);
        
        // do something on error
        // if (canRecover(rejection)) {
        //   return responseOrNewPromise
        // }
        return $q.reject(rejection);
      },
      'response': function(response) {
        $timeout(function() {
          $.isLoading('hide');
          isLoading = false;
        }, 500);
        
        // do something on success
        return response || $q.when(response);
      },
      'responseError': function(rejection) {
        $timeout(function() {
          $.isLoading('hide');
          isLoading = false;
        }, 500);
        
        // do something on error
        // if (canRecover(rejection)) {
        //   return responseOrNewPromise
        // }
        return $q.reject(rejection);
      }
    };
  }]);
angular.module("auto-biz-user")
.service('LocationService',["$q","$http","GlobalService", function ($q,$http,GlobalService) {
	var self = this;

	this.getProvinceList = function(){
		var deferred = $q.defer();
		var url = GlobalService.baseUrl+'list/prov';
		console.log(url);
		$http.get(url).success(function(res){
			console.log("获取省份列表");
			console.log(res);
			if(res.callStatus == "SUCCEED"){
			  deferred.resolve(res.data);
			}else{
			  alert("您好，您访问的内容出错");
			}
		}).error(function(res){
			alert("您好，您访问的内容出错");
		});
		return deferred.promise;
	};

	this.getCityListByProvince = function(provinceName){
		var deferred = $q.defer();
		var url = GlobalService.baseUrl+'list/cityof/' + provinceName;
		console.log(url);
		$http.get(url).success(function(res){
			console.log("获取市级列表");
			console.log(res);
			if(res.callStatus == "SUCCEED"){
			  deferred.resolve(res.data);
			}else{
			  alert("您好，您访问的内容出错");
			}
		}).error(function(res){
			alert("您好，您访问的内容出错");
		});
		return deferred.promise;
	}
	this.getCityByNum = function(no){
		var deferred = $q.defer();
		var url = GlobalService.baseUrl+'city/detail/' + no;
		console.log(url);
		$http.get(url).success(function(res){
			console.log("获取省市名字");
			console.log(res);
			if(res.callStatus == "SUCCEED"){
			  deferred.resolve(res.data);
			}else{
			  alert("您好，您访问的内容出错");
			}
		}).error(function(res){
			alert("您好，您访问的内容出错");
		});
		return deferred.promise;
	}

}]);
angular.module("auto-biz-user")
  .service('UserHeaderService', function () {
  	 console.log("读取userheader数据")
     this.headerList = [{name:"首页",title:"HOME",url:""},{name:"资讯",title:"NEWS",url:""},{name:"对话",title:"DIALOGUE",url:""},{name:"数据",title:"DATA",url:""},{name:"专栏",title:"COLUMNS",url:""},{name:"品车",title:"CARS",url:""},{name:"投稿",title:"CT",url:""},{name:"企业平台",title:"INNOVATION",url:""}];
});
angular.module('auto-biz-user')
  .service('UserService', ["$http","$q","GlobalService", "AuthService",function UserService($http, $q,GlobalService,AuthService) {
    //注册用户
    this.registerUser = function(user) {
        var deferred = $q.defer();
        $http.post(GlobalService.baseUrl+'user/signup',
          user
      ).success(function(data, status, headers, config){
                console.log("注册用户");
                if(data.callStatus=='SUCCEED'){
                    AuthService.kickOut();
                    deferred.resolve(data.data);
                    AuthService.user = data.data;
                    localStorage.auto_user = JSON.stringify(data.data);
                }else if (data.errCode == 'USER_EXIST'){
                    alert("账户名已存在");
                }
                else{
                    alert("注册失败"+data.errCode);
                }
            })
            .error(function(data, status, headers, config){
                alert("您好，访问的内容出错");
            });
        return deferred.promise;
    }
    //获取用户列表
    this.getUserList = function(numPerPage,pageNum,isPassed,nikeName) {
        var deferred = $q.defer();
        console.log("读取getUserListService网络数据");
        var url=GlobalService.baseUrl+'user/list/'+numPerPage+'/'+pageNum+"?token="+AuthService.user.token;
        if(isPassed!==''){
            url=url+'&isPassed='+isPassed;
            if(nikeName!==''){
            url=url+'&nikeName='+nikeName;
            }
        }
        else{
            if(nikeName!==''){
            url=url+'?nikeName='+nikeName;
            }
        } 
        console.log(url);
        $http.get(url)
            .success(function(data, status, headers, config){
                console.log(data);
                if(data.callStatus=='SUCCEED'){
                    deferred.resolve(data.data);
                }
                else{
                    alert("获取列表失败");
                }
            })
            .error(function(data, status, headers, config){
                alert("您好，访问的内容出错");
            });
        return deferred.promise;
    }
    //用户认证通过/否决
    this.passUser = function(id,passFlag) {
        var token=AuthService.user.token;
        var url=GlobalService.baseUrl+'user/modify/approval?token='+token+'&userId='+id+'&approvalStatus='+passFlag;
        var deferred = $q.defer();
        $http.get(url)
            .success(function(data, status, headers, config){
                if(data.callStatus=='SUCCEED'){
                    alert('用户认证成功');
                    deferred.resolve('');
                }
                else{
                    alert('用户认证失败');
                }
            })
            .error(function(data, status, headers, config){
                alert("您好，访问的内容出错");
            });
        return deferred.promise;
    }
    //用户权限更改
    this.updateUserType = function(id,newType) {
        var token=AuthService.user.token;
        var url=GlobalService.baseUrl+'user/modify/type?token='+token+'&userId='+id+'&newType='+newType;
        var deferred = $q.defer();
        $http.get(url)
            .success(function(data, status, headers, config){
                if(data.callStatus=='SUCCEED'){
                    alert('用户类型更改成功!');
                    deferred.resolve('');
                }
                else{
                    alert('用户类型更改失败');
                }
            })
            .error(function(data, status, headers, config){
                alert("您好，访问的内容出错");
            });
        return deferred.promise;
    }
}]);
angular.module("auto-biz-user").controller("AdminController",["$scope","AuthService","$location",
    function AdminController($scope,AuthService,$location) {
      console.log("载入AdminController");
      $scope.testShow = false;

      $scope.currentPage = "userList";
      if(!AuthService.user){
        $location.path("/admin");
      }else{
        if(AuthService.user.userType != "admin"){
          $location.path("/admin");
        }
      }
      $scope.toggleTestList = function(){
        $scope.testShow = !$scope.testShow;
      }
    // if(AuthService.user){
    // 	if(AuthService.user.userType == "admin"){
    // 		$scope.currentPage = "userList";
    // 	}else{
    // 		$location.path("admin");
    // 	}
    // }else{
    // 	$location.path("admin");
    // }

    $scope.setPage = function(page) {
      $scope.currentPage = page;
    }
    $scope.adminLogout = function(){
      AuthService.userLogout().then(function(result){
        $location.path("/admin");
        alert("退出登录成功");
      })
    }
  }
]
);
angular.module("auto-biz-user").controller("companyListController",["$scope","CompanyService",
function companyListController($scope,CompanyService) {
  console.log("载入companyListController");
  //数据初始化
  CompanyService.getCompanyList(10,1,'','','')
    .then(function(result){
      console.log(result);
      $scope.companyList = result.list;
      $scope.currentUser = result.list[0];
      //审核分类、行业分类
      $scope.passFlag = '';
      $scope.companyType = '';
      $scope.type="";
      //分页
	    $scope.pageSize = 10;
	    $scope.total = result.totalNum;
  })
  //分类目录
  $scope.navList = [
  	{
  		"name":"审核状态",
  		"optionList":[
        {
  				"name":"全部",
  				"id":"",
  			},
        {
  				"name":"已通过",
  				"id":"1",
  			},
  			{
  				"name":"待审核",
  				"id":"0",
  			},
  			{
  				"name":"未通过",
  				"id":"-1",
      }]
  	},
  	{
  		"name":"行业",
      //CM汽车制造，CG汽车零部件，CS汽车销售与服务，NEC新能源汽车，NOC车联网，CC车用化工品，CE汽车金融，PT公共交通，MOC汽车媒体
  		"optionList":[
        {
  				"name":"全部",
  				"id":'',
  			},
        {
  				"name":"汽车制造",
  				"id":"CM",
  			},
  			{
  				"name":"汽车零部件",
  				"id":"CG",
  			},
  			{
  				"name":"汽车销售与服务",
  				"id":"CS",
        },
        {
  				"name":"新能源汽车",
  				"id":'NEC',
  			},
        {
  				"name":"车联网",
  				"id":"NOC",
  			},
  			{
  				"name":"车用化工品",
  				"id":"CC",
  			},
  			{
  				"name":"汽车金融",
  				"id":"CE",
        },
        {
  				"name":"PT公共交通",
  				"id":"PT",
  			},
  			{
  				"name":"汽车媒体",
  				"id":"MOC",
       }]
  	}
  ];
  //高亮选中的分类
  $scope.currentOptionList = getCurrentOptionList();
  function getCurrentOptionList(){
  	var tmp = [];
  	for (i in $scope.navList){
  		var obj=new Object(); 
  		obj.type = $scope.navList[i].name;
  		obj.current = $scope.navList[i].optionList[0].name;
  		tmp.push(obj);
  	}
  	return tmp;
  }
  $scope.isCurrentOption = function(type,option){
  	for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			if ($scope.currentOptionList[i].current == option){
  				return true;
  			}
  		}
  	}
  	return false;
  };
  
  //获取企业列表:按审核状态、按行业分类、搜索
   $scope.setCurrentOption = function(type,option,searchWord){
    //高亮选中分类
    for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			$scope.currentOptionList[i].current = option.name;
  		}
  	}
	  console.log(type+option);
    //3个参数赋值
    var isPassed=$scope.passFlag;
    var newType=$scope.companyType;
    if(type=="审核状态"){
      isPassed=option.id;
    }
    if(type=="行业"){
      newType=option.id;
    }
    //console.log(isPassed+'###'+newType);
    //请求对应数据
    CompanyService.getCompanyList(10,1,isPassed,newType,searchWord)
      .then(function(result){
      $scope.companyList = result.list;
      //记录审核分类和行业分类选择，为分页做准备
      $scope.passFlag = isPassed;
      $scope.companyType = newType;
      //重置为第一页
      $scope.currentPage=1;
	    $scope.total = result.totalNum;
    });

  };
  //分页
  $scope.changePage = function(page){
  CompanyService.getCompanyList(10,page,$scope.passFlag,$scope.type,'')
      .then(function(result){
      $scope.companyList = result.list;
	    $scope.total = result.totalNum;
    });
 }
  //设置目前用户
  $scope.setCurrentCompany = function(user) {
  	//alert('user:' + (user || 'world') + '!');
    $scope.currentUser = user;
  }
  //通过/否决审核
  $scope.passUser = function(id,passFlag) {
    //alert('pass:' + passFlag + '!');
    CompanyService.passCompany(id,passFlag).then(function(result){
        CompanyService.getCompanyList(10,$scope.currentPage,$scope.passFlag,$scope.type,'').then(function(result){
          $scope.companyList = result.list;
          $scope.total = result.totalNum;
        });
    })
  }
}
]
);
angular.module("auto-biz-user").controller("companyNewsController",["$scope","CompanyNewsService",
function companyNewsController($scope,CompanyNewsService) {
  console.log("载入companyNewsController");
  //数据初始化
  CompanyNewsService.getCompanyNewsList("","","","","","","","",10,1)
    .then(function(result){
      //console.log(result);
      $scope.newsList = result.list;
      $scope.currentNews = result.list[0];
      //审核分类、行业分类
      $scope.passFlag = '';
      $scope.companyType = '';
      //分页
	    $scope.pageSize = 10;
	    $scope.total = result.totalNum;
  })
   //分类目录
  $scope.navList = [
  	{
  		"name":"上线状态",
  		"optionList":[
        {
  				"name":"全部",
  				"id":'',
  			},
        {
  				"name":"上线",
  				"id":"true",
  			},
  			{
  				"name":"下线",
  				"id":"false",
      }]
  	},
  	{
  		"name":"标签",
      //CM汽车制造，CG汽车零部件，CS汽车销售与服务，NEC新能源汽车，NOC车联网，CC车用化工品，CE汽车金融，PT公共交通，MOC汽车媒体
  		"optionList":[
        {
  				"name":"全部",
  				"id":'',
  			},
        {
  				"name":"汽车制造",
  				"id":"CM",
  			},
  			{
  				"name":"汽车零部件",
  				"id":"CG",
  			},
  			{
  				"name":"汽车销售与服务",
  				"id":"CS",
        },
        {
  				"name":"新能源汽车",
  				"id":'NEC',
  			},
        {
  				"name":"车联网",
  				"id":"NOC",
  			},
  			{
  				"name":"车用化工品",
  				"id":"CC",
  			},
  			{
  				"name":"汽车金融",
  				"id":"CE",
        },
        {
  				"name":"PT公共交通",
  				"id":"PT",
  			},
  			{
  				"name":"汽车媒体",
  				"id":"MOC",
       }]
  	}
  ];
  //高亮选中的分类
  $scope.currentOptionList = getCurrentOptionList();
  function getCurrentOptionList(){
  	var tmp = [];
  	for (i in $scope.navList){
  		var obj=new Object(); 
  		obj.type = $scope.navList[i].name;
  		obj.current = $scope.navList[i].optionList[0].name;
  		tmp.push(obj);
  	}
  	return tmp;
  }
  $scope.isCurrentOption = function(type,option){
  	for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			if ($scope.currentOptionList[i].current == option){
  				return true;
  			}
  		}
  	}
  	return false;
  };
  //获取资讯列表:按上线状态、按标签分类、搜索
   $scope.getCompanyNewsList = function(type,option,searchWord){
    //高亮选中分类
    for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			$scope.currentOptionList[i].current = option.name;
  		}
  	}
	  console.log(type+option);
    //3个参数赋值
    var isPassed=$scope.passFlag;
    var newType=$scope.companyType;
    if(type=="上线状态"){
      isPassed=option.id;
    }
    if(type=="标签"){
      newType=option.id;
    }
    //console.log(isPassed+'###'+newType);
    //请求对应数据
    CompanyNewsService.getCompanyNewsList(searchWord,"","",newType,isPassed,"","","",10,1)
      .then(function(result){
      $scope.newsList = result.list;
      //记录审核分类和行业分类选择，为分页做准备
      $scope.passFlag = isPassed;
      $scope.companyType = newType;
      //重置为第一页
      $scope.currentPage=1;
	    $scope.total = result.totalNum;
    });

  };
  //设置当前资讯
  $scope.setCurrentNews = function(id) {
  	//alert('user:' + (user || 'world') + '!');
		CompanyNewsService.getCompanyNewsDetail(id)
			.then(function(result){
				$scope.currentNews = result;
			});
  }
  //资讯上线／下线
  $scope.setNewsState = function(id,newState) {
    CompanyNewsService.changeCompanyNewsStateAdmin(id,newState).then(function(result){
      CompanyNewsService.getCompanyNewsList("","","",$scope.companyType,$scope.passFlag,"","","",10,$scope.currentPage)
      .then(function(result){
      $scope.newsList = result.list;
      $scope.total = result.totalNum;
      });
    })
  }
	//分页
  $scope.changePage = function(page){
	CompanyNewsService.getCompanyNewsList("","","",$scope.companyType,$scope.passFlag,"","","",10,page)
      .then(function(result){
      $scope.newsList = result.list;
	    $scope.total = result.totalNum;
    });
 }
}
]
);
angular.module("auto-biz-user").controller("companyPriReportController",["$scope","CompanyService","CompanyPriReportService",
function companyPriReportController($scope,CompanyService,CompanyPriReportService) {
  console.log("载入companyPriReportController");
   //初始化数据
  CompanyPriReportService.getCompanyPriReportList("","","","","","","","","","","","","","","","","",10,1)
    .then(function(result){
    $scope.priReportList = result.list;
      $scope.currentPriReport = result.list[0];
      //审核分类
      $scope.passFlag = '';
      //分页
	    $scope.pageSize = 10;
	    $scope.total = result.totalNum;
  })
  //分类目录
  $scope.navList = [
  	{
  		"name":"审核状态",
  		"optionList":[
        {
  				"name":"全部",
  				"id":"",
  			},
        {
  				"name":"已通过",
  				"id":"1",
  			},
  			{
  				"name":"待审核",
  				"id":"0",
      },{
          "name":"未通过",
          "id":"-1",
      }]
  	}
  ];
  //高亮选中的分类
  $scope.currentOptionList = getCurrentOptionList();
  function getCurrentOptionList(){
  	var tmp = [];
  	for (i in $scope.navList){
  		var obj=new Object(); 
  		obj.type = $scope.navList[i].name;
  		obj.current = $scope.navList[i].optionList[0].name;
  		tmp.push(obj);
  	}
  	return tmp;
  }
  $scope.isCurrentOption = function(type,option){
  	for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			if ($scope.currentOptionList[i].current == option){
  				return true;
  			}
  		}
  	}
  	return false;
  };
  //获取列表:按上线状态、搜索
   $scope.getCompanyPriReportList = function(type,option,searchWord){
    //高亮选中分类
    console.log(searchWord);
    for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			$scope.currentOptionList[i].current = option.name;
  		}
  	}
	  console.log(type+option);
    var isPassed=$scope.passFlag;
    if(type=="审核状态"){
      isPassed=option.id;
    }
    //console.log(isPassed+'###'+newType);
    //请求对应数据
    CompanyPriReportService.getCompanyPriReportList("",searchWord,"","","","","","","","","",isPassed,"","","","","",10,1)
      .then(function(result){
      $scope.priReportList = result.list;
      //记录审核分类和行业分类选择，为分页做准备
      $scope.passFlag = isPassed;
      //重置为第一页
      $scope.currentPage=1;
	    $scope.total = result.totalNum;
    });
  };
  $scope.setCurrentPriReport = function(data){
    $scope.currentPriReport = data;
  }
  //点击报名审核，获取报名用户
  $scope.getSignUser = function(priReport){
    $scope.currentPriReport = priReport;
    loadPriReportSignUser(priReport._id,"");
  } 
  // 根据参数获取报名用户列表
  $scope.getUserList = function(passed){
    loadPriReportSignUser($scope.currentPriReport._id,passed);
  }
  //点击报名审核，获取报名用户
  $scope.getPassUser = function(priReport){
    $scope.currentPriReport = priReport;
    loadPriReportPassUser(priReport._id,"");
  }
  //根据参数获取报名评论列表
  $scope.getPassUserList = function(passed){
    loadPriReportPassUser($scope.currentPriReport._id,passed);
  }
  function loadPriReportSignUser(reportId,passed){
    CompanyPriReportService.getReportSignUser(reportId,passed).then(function(result){
       $scope.signUserList = result;
       console.log(result);
    })
  }
  function loadPriReportPassUser(reportId,passed){
    CompanyPriReportService.getReportPassUser(reportId,passed).then(function(result){
       $scope.passUserList = result;
       console.log(result);
    })
  }
  //改变审核状态
  $scope.approveUser = function(user){
    console.log(user);
    CompanyPriReportService.passCompanyPriReport($scope.currentPriReport._id,user.signUser.userId[0]._id,1).then(function(result){
        console.log(result);
        user.signUser.passed = "1";
    });
  }
  $scope.denyUser = function(user){
    console.log(user);
    console.log("no");
    CompanyPriReportService.passCompanyPriReport($scope.currentPriReport._id,user.signUser.userId[0]._id,-1).then(function(result){
        console.log(result);
        user.signUser.passed = "-1";
    });
  }
  $scope.approveComment = function(user){
    console.log(user);
    CompanyPriReportService.passCommentCompanyPriReport($scope.currentPriReport._id,user.passUser.userId[0]._id,1).then(function(result){
        console.log(result);
        user.signUser.passed = "1";
    });
  }
  $scope.denyComment = function(user){
    CompanyPriReportService.passCommentCompanyPriReport($scope.currentPriReport._id,user.passUser.userId[0]._id,-1).then(function(result){
        console.log(result);
        user.signUser.passed = "-1";
    });
  };

  //设置审核
  $scope.passPriReport = function(id,state){
    CompanyPriReportService.changeCompanyPriReportState(id,state).then(function(result){
      CompanyPriReportService.getCompanyPriReportList("","","","","","","","","","","",$scope.passFlag,"","","","","",10,$scope.currentPage)
      .then(function(result){
        $scope.priReportList = result.list;
      //记录审核分类和行业分类选择，为分页做准备
        // $scope.passFlag = state;
        $scope.total = result.totalNum;
      });
    });
  }
  //设置上下线
  $scope.setPriReport = function(id,isOnline){
     CompanyPriReportService.changeCompanyPriReportOnlineAdmin(id,isOnline).then(function(result){
        CompanyPriReportService.getCompanyPriReportList("","","","","","","","","","","",$scope.passFlag,"","","","","",10,$scope.currentPage)
        .then(function(result){
        $scope.priReportList = result.list;
      //记录审核分类和行业分类选择，为分页做准备
        //$scope.passFlag = state;
        $scope.total = result.totalNum;
        });
     })
  }
//   //搜索
//   $scope.getPriReportByName = function(name) {
//     CompanyService.getPriReportByName(name);
//   }
  $scope.max = 5;
  $scope.onHover = function(val){
      $scope.hoverVal = val;
  };
  $scope.onLeave = function(){
      $scope.hoverVal = null;
  }
  $scope.onChange = function(val){
      $scope.ratingVal = val;
  }
}
]
);
angular.module("auto-biz-user").controller("companyProductController",["$scope","CompanyProductsService",
function companyProductController($scope,CompanyProductsService) {
  console.log("载入companyProductController");
  //数据初始化
  CompanyProductsService.getCompanyProductsList("","","","","","","","",10,1).
    then(function(result){
      $scope.productsList = result.list;
      //alert($scope.productsList[0]);
      $scope.currentProducts = result.list[0];
      //审核分类、行业分类
      $scope.passFlag = '';
      $scope.companyType = '';
      //分页
	    $scope.pageSize = 10;
	    $scope.total = result.totalNum;
  })
  //分类目录
  $scope.navList = [
  	{
  		"name":"上线状态",
  		"optionList":[
        {
  				"name":"全部",
  				"id":'',
  			},
        {
  				"name":"上线",
  				"id":"true",
  			},
  			{
  				"name":"下线",
  				"id":"false",
      }]
  	},
  	{
  		"name":"标签",
      //CM汽车制造，CG汽车零部件，CS汽车销售与服务，NEC新能源汽车，NOC车联网，CC车用化工品，CE汽车金融，PT公共交通，MOC汽车媒体
  		"optionList":[
        {
  				"name":"全部",
  				"id":'',
  			},
        {
  				"name":"汽车制造",
  				"id":"CM",
  			},
  			{
  				"name":"汽车零部件",
  				"id":"CG",
  			},
  			{
  				"name":"汽车销售与服务",
  				"id":"CS",
        },
        {
  				"name":"新能源汽车",
  				"id":'NEC',
  			},
        {
  				"name":"车联网",
  				"id":"NOC",
  			},
  			{
  				"name":"车用化工品",
  				"id":"CC",
  			},
  			{
  				"name":"汽车金融",
  				"id":"CE",
        },
        {
  				"name":"PT公共交通",
  				"id":"PT",
  			},
  			{
  				"name":"汽车媒体",
  				"id":"MOC",
       }]
  	}
  ];
  //高亮选中的分类
  $scope.currentOptionList = getCurrentOptionList();
  function getCurrentOptionList(){
  	var tmp = [];
  	for (i in $scope.navList){
  		var obj=new Object(); 
  		obj.type = $scope.navList[i].name;
  		obj.current = $scope.navList[i].optionList[0].name;
  		tmp.push(obj);
  	}
  	return tmp;
  }
  $scope.isCurrentOption = function(type,option){
  	for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			if ($scope.currentOptionList[i].current == option){
  				return true;
  			}
  		}
  	}
  	return false;
  };
  //获取产品列表:按上线状态、按标签分类、搜索
   $scope.getCompanyproductsList = function(type,option,searchWord){
    //高亮选中分类
    for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			$scope.currentOptionList[i].current = option.name;
  		}
  	}
	  //console.log(type+option);
    //3个参数赋值
    var isPassed=$scope.passFlag;
    var newType=$scope.companyType;
    if(type=="上线状态"){
      isPassed=option.id;
    }
    if(type=="标签"){
      newType=option.id;
    }
    //console.log(isPassed+'###'+newType);
    //请求对应数据
    CompanyProductsService.getCompanyProductsList(searchWord,newType,isPassed,"","","","","",10,1)
      .then(function(result){
      $scope.productsList = result.list;
      //记录审核分类和行业分类选择，为分页做准备
      $scope.passFlag = isPassed;
      $scope.companyType = newType;
      //重置为第一页
      $scope.currentPage=1;
	    $scope.total = result.totalNum;
    });

  };
  //设置当前产品
  $scope.setCurrentProduct = function(product) {
  	//alert('user:' + (user || 'world') + '!');
    $scope.currentProduct = product;
  }
  //产品上线／下线
  $scope.setProductState = function(id,newState) {
    CompanyProductsService.changeCompanyProductsStateAdmin(id,newState).then(function(result){
        CompanyProductsService.getCompanyProductsList("",$scope.companyType,$scope.passFlag,"","","","","",10,$scope.currentPage)
          .then(function(result){
          $scope.productsList = result.list;
          $scope.total = result.totalNum;
        });
    })
  }
  //分页
  $scope.changePage = function(page){
  CompanyProductsService.getCompanyProductsList("",$scope.companyType,$scope.passFlag,"","","","","",10,page)
      .then(function(result){
      $scope.productsList = result.list;
	    $scope.total = result.totalNum;
    });
 }
}
]
);
angular.module("auto-biz-user").controller("companyPubReportController",["$scope","CompanyPubReportService",
function companyPubReportController($scope,CompanyPubReportService) {
  console.log("载入companyPubReportController");
  //初始化数据
  CompanyPubReportService.getCompanyPubReportList("","","","","","","","",10,1)
    .then(function(result){
    $scope.pubReportList = result.list;
      $scope.currentPubReport = result.list[0];
      //审核分类
      $scope.passFlag = '';
      //分页
	    $scope.pageSize = 10;
	    $scope.total = result.totalNum;
  })
  //分类目录
  $scope.navList = [
  	{
  		"name":"上线状态",
  		"optionList":[
        {
  				"name":"全部",
  				"id":'',
  			},
        {
  				"name":"上线",
  				"id":"true",
  			},
  			{
  				"name":"下线",
  				"id":"false",
      }]
  	}
  ];
  //高亮选中的分类
  $scope.currentOptionList = getCurrentOptionList();
  function getCurrentOptionList(){
  	var tmp = [];
  	for (i in $scope.navList){
  		var obj=new Object(); 
  		obj.type = $scope.navList[i].name;
  		obj.current = $scope.navList[i].optionList[0].name;
  		tmp.push(obj);
  	}
  	return tmp;
  }
  $scope.isCurrentOption = function(type,option){
  	for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			if ($scope.currentOptionList[i].current == option){
  				return true;
  			}
  		}
  	}
  	return false;
  };
  //获取列表:按上线状态、搜索
   $scope.getCompanyPubReportList = function(type,option,searchWord){
    //高亮选中分类
    for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			$scope.currentOptionList[i].current = option.name;
  		}
  	}
	  //console.log(type+option);
    var isPassed=$scope.passFlag;
    if(type=="上线状态"){
      isPassed=option.id;
    }
    //console.log(isPassed+'###'+newType);
    //请求对应数据
    CompanyPubReportService.getCompanyPubReportList(searchWord,isPassed,"","","","","","",10,1)
      .then(function(result){
      $scope.pubReportList = result.list;
      //记录审核分类和行业分类选择，为分页做准备
      $scope.passFlag = isPassed;
      //重置为第一页
      $scope.currentPage=1;
	    $scope.total = result.totalNum;
    });
  };


  //设置当前测评
  $scope.setCurrentPubReport = function(report) {
  	//alert('user:' + (user || 'world') + '!');
    $scope.currentPubReport = report;
  }
  //测评上线／下线
  $scope.setPubReportState = function(id,newState) {
    CompanyPubReportService.changeCompanyPubReportStateAdmin(id,newState).then(function(result){
         CompanyPubReportService.getCompanyPubReportList("",$scope.passFlag,"","","","","","",10,$scope.currentPage)
            .then(function(result){
            $scope.pubReportList = result.list;
            $scope.total = result.totalNum;
          });
    });
  }
  //分页
  $scope.changePage = function(page){
  CompanyPubReportService.getCompanyPubReportList("",$scope.passFlag,"","","","","","",10,page)
      .then(function(result){
      $scope.pubReportList = result.list;
	    $scope.total = result.totalNum;
    });
 }
}
]);
angular.module("auto-biz-user").controller("userListController",["$scope","UserService",
function userListController($scope,UserService) {
  console.log("载入userListController");
  //数据初始化
  UserService.getUserList(10,1,'','').then(function(result){
      $scope.userList = result.list;
      //审核类型
      $scope.type = '';
      //分页
	    $scope.pageSize = 10;
	    $scope.total = result.totalNum;
  })
   //分类目录
  $scope.navList = [
  	{
  		"name":"审核状态",
  		"optionList":[
        {
  				"name":"全部",
  				"id":'',
  			},
        {
  				"name":"已通过",
  				"id":"1",
  			},
  			{
  				"name":"待审核",
  				"id":"0",
  			},
  			{
  				"name":"未通过",
  				"id":"-1",
      }]
  	}
  ];
  //高亮选中的分类
  $scope.currentOptionList = getCurrentOptionList();
  function getCurrentOptionList(){
  	var tmp = [];
  	for (i in $scope.navList){
  		var obj=new Object(); 
  		obj.type = $scope.navList[i].name;
  		obj.current = $scope.navList[i].optionList[0].name;
  		tmp.push(obj);
  	}
  	return tmp;
  }
  $scope.isCurrentOption = function(type,option){
  	for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			if ($scope.currentOptionList[i].current == option){
  				return true;
  			}
  		}
  	}
  	return false;
  };
  //获取用户：按审核状态、搜索
  $scope.getlist = function(type,newType) {
    //高亮选中分类
    for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			$scope.currentOptionList[i].current = newType;
  		}
  	}
  	//alert('newType:' + newType + '!');
    UserService.getUserList(10,1,newType,'')
      .then(function(result){
      $scope.userList = result.list;
      $scope.type = newType;
      $scope.currentPage=1;
	    $scope.total = result.totalNum;
    });
  }
  //设置目前用户
  $scope.setCurrentUser = function(user) {
  	//alert('user:' + (user || 'world') + '!');
    $scope.currentUser = user;
  }
  //通过/否决审核
  $scope.passUser = function(id,passFlag) {
    //alert('pass:' + passFlag + '!');
    UserService.passUser(id,passFlag).then(function(result){
      UserService.getUserList(10,$scope.currentPage,$scope.type,"").then(function(result){
              $scope.userList = result.list;
              $scope.total = result.totalNum;});
    })
  }
  //用户权限更改
  $scope.updateUserType = function(id,newType) {
    //alert(newType);
    UserService.updateUserType(id,newType).then(function(result){
          UserService.getUserList(10,$scope.currentPage,$scope.type,"").then(function(result){
              $scope.userList = result.list;
              $scope.total = result.totalNum;});
    });
  }
  //分页
  $scope.changePage = function(page){
  //console.log(page+'...'+$scope.type);
  UserService.getUserList(10,page,$scope.type,'')
      .then(function(result){
      $scope.userList = result.list;
	    $scope.total = result.totalNum;
    });
 }
 //搜索 
 $scope.searchUser = function(word) {
    //alert(word);
    UserService.getUserList(10,1,'',word)
      .then(function(result){
      $scope.userList = result.list;
      $scope.currentPage=1;
	    $scope.total = result.totalNum;
    });
  }
}
]);
angular.module("auto-biz-user").controller("CompanyBasicInfoController",["$scope","CompanyService","GlobalService","FileService","LocationService",
function CompanyBasicInfoController($scope,CompanyService,GlobalService,FileService,LocationService) {
	console.log("CompanyBasicInfoController");
	$("#form_datetime").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
	$scope.infoList = {};
	$scope.isEdit = false;
	$scope.infoList_backup = null;
	$scope.ctypeList = GlobalService.companyType;
	
	//获得省级列表
	LocationService.getProvinceList().then(function(result){
		$scope.provinceList = result;
	});
	$scope.getCityList = function(province){
		console.log(province);
		LocationService.getCityListByProvince(province.name).then(function(result){
			$scope.cityList = result;
		});
	};


	getData();
	function getData() {
		CompanyService.getComppanyById($scope.cmpId).then(function(result){
			$scope.infoList = result;
			$scope.ctype = getCtypeById($scope.infoList.type);
			LocationService.getCityByNum($scope.infoList.address).then(function(result){
				$scope.cityName = result.shi;
				$scope.cityNum = result.no;
				$scope.provinceName = result.sheng;
			})
		}); 
	}
	
	function getCtypeById(ctypeId){
		for (i in $scope.ctypeList){
			if (ctypeId == $scope.ctypeList[i].id){
				return $scope.ctypeList[i];
			}
		}
	}
	function getCIdByName(ctype){
		for (i in $scope.ctypeList){
			if (ctype == $scope.ctypeList[i].name){
				return $scope.ctypeList[i].id;
			}
		}
	}
	function getProvinceByName(pName){
		for (i in $scope.provinceList){
			if ($scope.provinceList[i].name == pName){
				return $scope.provinceList[i];
			}
		}
	}
	function getCityByNo(num){
		for (i in $scope.cityList){
			if ($scope.cityList[i].no == num){
				return $scope.cityList[i];
			}
		}
	}
	//点击编辑按钮
	$scope.startEdit = function(){
		$scope.infoList_backup = cloneObj($scope.infoList);
		$scope.isEdit =true;
		$scope.fileLogo = $scope.infoList_backup.logo;
		$scope.province = getProvinceByName($scope.provinceName);
		LocationService.getCityListByProvince($scope.province.name).then(function(result){
			$scope.cityList = result;
			$scope.city = getCityByNo($scope.cityNum);
		});
		console.log($scope.infoList);
		document.getElementById("form_datetime").value = $scope.infoList.regTime;
	}
	//取消编辑
	$scope.cancelEdit = function(){

		$scope.infoList = cloneObj($scope.infoList_backup);

		$scope.isEdit =false;
	}
	//保存编辑
	$scope.saveEdit = function(){
		$scope.infoList.type = $scope.ctype.id;
		$scope.infoList.regTime=document.getElementById("form_datetime").value;
		$scope.infoList.address = $scope.city.no;
		console.log($scope.infoList);
		CompanyService.modifyCompany($scope.infoList).then(function(result){
			getData();
		});
		$scope.isEdit=false;
	}

	var cloneObj = function (obj) {  
		var newObj = {};  
		if (obj instanceof Array) {  
			newObj = [];  
		}  
		for (var key in obj) {  
			var val = obj[key];  
			newObj[key] = typeof val === 'object' ? cloneObj(val): val;  
		}  
		return newObj;  	
	};

	//上传图片至服务器并保存返回的url
	$scope.uploadLogo = function(file){
		if(file){
			$scope.fileLogo = file;
			FileService.uploadFile(file).then(function(result) {
				$scope.infoList.logo = result.urls[0];
			});
		}
	}
}
]);
angular.module("auto-biz-user").controller("CompanyFinanceMngController",["$scope","CompanyFinanceService",
function CompanyFinanceMngController($scope,CompanyFinanceService) {
	console.log("CompanyFinanceMngController");
	$scope.tmpItem={};

	//数据初始化
	$scope.pageSize = 50;
	$scope.currentPage = 1;
	$scope.cmpId = $scope.leafCmpId;
	getData();

	function getData(){
		loadCompanyFinanceData($scope.pageSize,1);
	}

	function loadCompanyFinanceData(pagePerNum,currentPage){
		CompanyFinanceService.getCompanyFinanceList($scope.cmpId,"","",pagePerNum,currentPage).then(function(result){
			$scope.financeList= result.list;
			console.log($scope.financeList);
			$scope.currentPage = result.currentPage;
			$scope.total = result.totalNum;
		});
	}

	$scope.addFinance = function(){
		if (!validate()){
			return;
		}
		financeItem = new Object();
		financeItem.year = $scope.year;
		financeItem.ratio = $scope.winRate;
		financeItem.input = $scope.winMoney;
		financeItem.increase = $scope.winMoneyRate;
		financeItem.allCapital = $scope.totalProperty;
		financeItem.realCapital = $scope.trueProperty;
		financeItem.allRatio = $scope.grossProfitRate;
		financeItem.realRatio = $scope.netProfitRate;
		financeItem.debtRatio = $scope.assetLiabilityRatio;
		financeItem.inputRatio = $scope.returnOnAssets;
		//financeItem.hideEdit = true;
		CompanyFinanceService.addCompanyFinance(financeItem).then(function(result){
			getData();
			init();
			$scope.showAddPanel = false;
		});
		
	};
	$scope.addNewFinance = function(){
		init();
		$scope.showAddPanel = true;
	};
	$scope.cancelAdd = function(){
		init();
		$scope.showAddPanel = false;
	}

	//点击编辑按钮，开始编辑
	$scope.editPastFinance = function(finance){
		$scope.tmpItem = finance;
		$scope.tmpItem.hideEdit = false;
	}

	//点击取消按钮，取消编辑
	$scope.cancelEditPastFinance = function(finance){
		$scope.tmpItem = finance;
		$scope.tmpItem.hideEdit = true;
		getData();
	}

	//点击确认按钮，保存编辑
	$scope.savePastFinance = function(finance){
		console.log(finance);
		$scope.tmpItem = finance;
		$scope.tmpItem.hideEdit = true;
		if (!validate_money($scope.tmpItem.money)){
			console.log("钱不对");
			return false;
		}else {
			CompanyFinanceService.modifyCompanyFinance(finance).then(function(result){
				getData();
			});
		}

	}

	$scope.deletePastFinance =function(finance){
		$scope.deleteFinance = finance;
	}
	$scope.confirmDelete = function(){
		CompanyFinanceService.deleteCompanyFinance($scope.deleteFinance._id).then(function(result){
			getData();
		});

	};


	
	function validate(){
		var flag = true;
		if (!validate_money($scope.winMoney)){
			$scope.invalidWinMoney = true;
			flag = false;
		}
		if (!validate_year( $scope.year)){
			$scope.invalidYear = true;
			flag = false;
		}
		return flag;
	}
	function validate_money(money){
		if (money == ""){
			return false;
		}
		return true;
	}
	function validate_year( newYear ){
		for (i in $scope.financeList){
			if (newYear == $scope.financeList[i].year){
				return false;
			}
		}
		return true;
	}
	function init(){
		$scope.invalidYear = false;
		$scope.invalidWinMoney = false;
		$scope.year = "";
		$scope.winRate = "";
		$scope.winMoney = "";
		$scope.winMoneyRate = "";
		$scope.totalProperty = "";
		$scope.trueProperty = "";
		$scope.grossProfitRate = "";
		$scope.netProfitRate = "";
		$scope.assetLiabilityRatio = "";
		$scope.returnOnAssets = "";
	}
	var cloneObj = function (obj) {  
		var newObj = {};  
		if (obj instanceof Array) {  
			newObj = [];  
		}  
		for (var key in obj) {  
			var val = obj[key];  
			newObj[key] = typeof val === 'object' ? cloneObj(val): val;  
		}  
		return newObj;  
	};
}
]);
angular.module("auto-biz-user").controller("CompanyHeaderController",["$scope",
function CompanyHeaderController($scope) {
  console.log("CompanyHeaderController");
}
]);
angular.module("auto-biz-user").controller("CompanyMainController",["$scope","AuthService","$location",

function CompanyMainController($scope,AuthService,$location) {
    console.log("CompanyMainController");
   
    if(!AuthService.company){
      $location.path("/loginCompany");
    }
    else{
        $scope.currentPage = "companyBasicInfo";
        $scope.toPage = function(pageName){
            $scope.currentPage = pageName;
        }
        initCompany();

        function initCompany(){
            if (AuthService.company){
                console.log(AuthService.company);
                $scope.cmpId =AuthService.company._id; 
                $scope.leafCmpId =AuthService.company._id;
                $scope.companyLogo = AuthService.company.logo;
                $scope.companyName = AuthService.company.longName; 
            }else {
                alert("Invalid User");
            }
        }
    }   
}
]);

angular.module("auto-biz-user").controller("CompanyNewsMngController",["$scope","CompanyNewsService","FileService",
function CompanyNewsMngController($scope,CompanyNewsService,FileService) {
	console.log("CompanyNewsMngController");
	$scope.pageSize = 5;
	$scope.tmpNews={};

	//数据初始化
	$scope.searchStr="";
	$scope.currentPage = 1;
	$scope.cmpId = $scope.leafCmpId;
	getData();

	function getData(){
		loadCompanyNewsData($scope.pageSize,1);
	}

	function loadCompanyNewsData(pagePerNum,currentPage){
		console.log("readData");
		console.log($scope.searchStr);
		CompanyNewsService.getCompanyNewsList($scope.searchStr,"","","","",$scope.cmpId,"","",pagePerNum,currentPage).then(function(result){
			$scope.cmpNewsList= result.list;
			$scope.currentPage = result.currentPage;
			$scope.total = result.totalNum;
		});
	}


	$scope.confirm = function(addModal,lookModal,editModal){
		if (addModal){
			addNews();
		}
		if (lookModal){
			;
		}
		if (editModal) {
			editNews();
		}
	};
	$scope.cancel = function(addModal,lookModal,editModal){
		if (addModal){
			$scope.cancelAdd();
		}
		if (lookModal){
			;
		}
		if (editModal) {
			$scope.cancelAdd();
		}
	};
	$scope.uploadThumb = function(file){
		console.log("1");
		if(file){
			$scope.fileLogo = file;
			FileService.uploadFile(file).then(function(result) {
				$scope.imgUrl = result.urls[0];
			});
		}
	}
	//确认新建资讯
	function addNews(){
		console.log("上传，可能需要刷新表单。");
		var newsItem = new Object();
		newsItem.pic = $scope.imgUrl;
		newsItem.title = $scope.addNewsTheme;
		newsItem.author = $scope.addNewsAuthor;
		newsItem.tag = $scope.addNewsLabel;
		newsItem.desc = $scope.addNewsShortCut;
		newsItem.wysiwyg = $scope.tmpNews.ueditor;
		newsItem.isFirst = $scope.addNewsOption;
		console.log(newsItem);
		CompanyNewsService.addCompanyNews(newsItem).then(function(result){
			console.log(result);
			getData();
		});
		
	};

	//确认修改资讯
	function editNews(){
		CompanyNewsService.updateCompanyNews($scope.tmpNews).then(function(result){
			getData();
		});
	}

	//取消新建资讯，临时变量初始化。
	$scope.cancelAdd=function(){
		$scope.addNewsTheme = "";
		$scope.addNewsAuthor = "";
		$scope.addNewsOption1 = false;
		$scope.addNewsOption2 = false;
		$scope.addNewsLabel = "";
		$scope.addNewsShortCut = "";
		$scope.addNewshtmlVariable = "";
		$scope.fileLogo = null;
	};
	$scope.deleteNews=function(news){
		$scope.deleteNews = news;
	};
	$scope.confirmDelete = function(){
		CompanyNewsService.deleteCompanyNews($scope.deleteNews._id).then(function(result){
			getData();
		});
	}
	$scope.cancelDelete=function(){
		$scope.deleteID = null;
	};
	$scope.changeNewsStatus = function(news){
		CompanyNewsService.changeCompanyNewsState(news._id,!news.isOnline).then(function(result){
			news.isOnline = !news.isOnline;
		});
	};
	$scope.btnAddNews =function(){
		$scope.cancelAdd();
		$scope.addModal = true;
		$scope.lookModal = false;
		$scope.editModal = false;
	};
	$scope.btnLookNews =function(newsItem){
		$scope.addModal = false;
		$scope.lookModal = true;
		$scope.editModal = false;
		CompanyNewsService.getCompanyNewsDetail(newsItem._id).then(function(result){
			$scope.tmpNews  = result;
			$scope.fileLogo = $scope.tmpNews.pic;
		});
		
		
	};
	$scope.btnEditNews =function(newsItem){
		$scope.addModal = false;
		$scope.lookModal = false;
		$scope.editModal = true;
		CompanyNewsService.getCompanyNewsDetail(newsItem._id).then(function(result){
			$scope.tmpNews  = result;
			$scope.fileLogo = $scope.tmpNews.pic;
		});
	};

	$scope.btnSearch = function(){
		$scope.currentPage = 1;
		getData();
	}
	$scope.changePage = function(page){
		loadCompanyNewsData($scope.pageSize,page);
	}
}
]);

angular.module("auto-biz-user").controller("CompanyProductMngController",["$scope","FileService","CompanyProductsService","GlobalService","$filter",
function CompanyProductMngController($scope,FileService,CompanyProductsService,GlobalService,$filter) {
	console.log("CompanyProductMngController");
	$("#form_datetime").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
	$("#form_datetime2").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
	$scope.tmpProduct={};
	$scope.companyName="小软酱有限公司";
	$scope.deleteID ="";
	$scope.ctypeList = GlobalService.companyType;

	//数据初始化
	$scope.searchStr="";
	$scope.currentPage = 1;
	$scope.pageSize=5;
	$scope.cmpId = $scope.leafCmpId;
	getData();

	function getData(){
		loadCompanyProductsData($scope.pageSize,$scope.currentPage);
	}

	function loadCompanyProductsData(pagePerNum,currentPage){
		CompanyProductsService.getCompanyProductsList($scope.searchStr,"","","","",$scope.cmpId,"","",pagePerNum,currentPage).then(function(result){
			$scope.productList= result.list;
			$scope.currentPage = result.currentPage;
			$scope.total = result.totalNum;
		});
	}
	$scope.btnSearch = function(){
		$scope.currentPage = 1;
		getData();
	}
	$scope.changePage = function(page){
		loadCompanyProductsData($scope.pageSize,page);
	}
	function getCtypeById(ctypeId){
		for (i in $scope.ctypeList){
			if (ctypeId == $scope.ctypeList[i].id){
				return $scope.ctypeList[i];
			}
		}
	}
	function getCIdByName(ctype){
		for (i in $scope.ctypeList){
			if (ctype == $scope.ctypeList[i].name){
				return $scope.ctypeList[i].id;
			}
		}
	}


	function addProduct(){
		productItem = new Object();
		productItem.name = $scope.addProductName;
		productItem.images = $scope.images;
		productItem.tag = $scope.addSelectedTags.id;
		productItem.argc = $scope.addProductConf;
		productItem.version = $scope.addProductVersion;
		productItem.model = $scope.addProductModel;
		productItem.desc = $scope.addProductShortCut;
		productItem.releaseDate=document.getElementById("form_datetime").value;
		CompanyProductsService.addCompanyProduct(productItem).then(function(result){
			getData();
		});
	};
	$scope.confirm = function(addModal,lookModal,editModal){
		if (addModal){
			addProduct();
			cancelAdd();
		}
		if (lookModal){
			;
		}
		if (editModal) {
			editProduct();
		}
	};
	$scope.cancel = function(addModal,lookModal,editModal){
		if (addModal){
			cancelAdd();
		}
		if (lookModal){
			;
		}
		if (editModal) {
		}
	};
	function editProduct(){
		$scope.tmpProduct.releaseDate = document.getElementById("form_datetime2").value;
		$scope.tmpProduct.tag =getCIdByName($scope.cmpType.name);
		console.log($scope.tmpProduct);
		CompanyProductsService.updateCompanyProduct($scope.tmpProduct).then(function(result){
			getData();
		});
	}
	function cancelAdd(){
		$scope.addProductName = "";
		$scope.images= [];
		$scope.addSelectedTags = "";
		$scope.addProductConf = "";
		$scope.addProductShortCut="";
		$scope.addProductVersion = "";
		$scope.addProductModel = "";
		document.getElementById("form_datetime").value=null;

	};
	$scope.deleteProduct=function(product){
		$scope.deleteProduct = product;
	};
	$scope.confirmDelete = function(){
		CompanyProductsService.deleteCompanyProduct($scope.deleteProduct._id).then(function(result){
			getData();
		});
	}
	$scope.cancelDelete=function(){
		$scope.deleteProduct = null;
	};
	$scope.changeProductStatus = function(product){
		console.log("1");
		console.log(product);
		CompanyProductsService.changeCompanyProductsState(product._id,!product.state).then(function(result){
			product.state = !product.state;
			console.log("2");
			console.log(product);
		});
	};
	$scope.btnAddProduct =function(){
		$scope.addModal = true;
		$scope.lookModal = false;
		$scope.editModal = false;
	};
	$scope.btnLookProduct =function(product){
		$scope.addModal = false;
		$scope.lookModal = true;
		$scope.editModal = false;
		CompanyProductsService.getCompanyProductsDetail(product._id).then(function(result){
			$scope.tmpProduct = result;

		});
		
	};
	$scope.btnEditProduct =function(product){
		$scope.addModal = false;
		$scope.lookModal = false;
		$scope.editModal = true;
		CompanyProductsService.getCompanyProductsDetail(product._id).then(function(result){
			console.log(result);
			$scope.tmpProduct = result;
			$scope.cmpType = getCtypeById($scope.tmpProduct.tag);
			document.getElementById("form_datetime2").value = $filter('date')($scope.tmpProduct.releaseDate, 'yyyy/MM/dd');
		});
	};

	$scope.images = [];
	$scope.upload = function(file){
		if(file){
			FileService.uploadFile(file).then(function(result) {
				var url = result.urls[0];
				$scope.images.push(url);
			});
		}
	};
	$scope.delete_thumb = function(url){
		for (i in $scope.images){
			if ($scope.images[i] == url){
				$scope.images.splice(i,1);
			}
		}
	}

	$scope.uploadWhenEdit = function(file){
		if(file){
			FileService.uploadFile(file).then(function(result) {
				var url = result.urls[0];
				$scope.tmpProduct.images.push(url);
			});
		}
	}
	$scope.delete_thumb_edit = function(url){
		for (i in $scope.tmpProduct.images){
			if ($scope.tmpProduct.images[i] == url){
				$scope.tmpProduct.images.splice(i,1);
			}
		}
	}
	// $scope.uploadWhenEdit = function(file){
	// 	$scope.reader.readAsDataURL(file);
	// 	var imgItem = new Object();
	// 	imgItem.fileName = file.name;
	// 	$scope.reader.onload=function(e){  
			
	// 		imgItem.file = this.result;
	// 		$scope.tmpProduct.productThumbList.push(imgItem);

	// 	}  
	// 	console.log(file);
	// };
	
	// $scope.delete_thumbWhenEdit = function(item){
	// 	for (i in $scope.tmpProduct.productThumbList){
	// 		if ($scope.tmpProduct.productThumbList[i].fileName == item.fileName){
	// 			$scope.tmpProduct.productThumbList.splice(i,1);
	// 		}
	// 	}
	// }


	
}
]);

angular.module("auto-biz-user").controller("CompanySideBarController",["$scope",

function CompanySideBarController($scope) {
  console.log("CompanySideBarController");
  $scope.testShow = false;

  $scope.toggleTestList = function(){
  		$scope.testShow = !$scope.testShow;
  }
}
]);

angular.module("auto-biz-user").controller("CompanyTestController",["$scope","FileService","CompanyPubReportService","CompanyProductsService","$filter",

function CompanyTestController($scope,FileService,CompanyPubReportService,CompanyProductsService,$filter) {
	console.log("CompanyTestController");
	$scope.tmpTest={};
	$scope.companyName="小软酱有限公司";
	$scope.deleteID ="";


	//数据初始化
	$("#form_datetime").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
	$("#form_datetime2").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
	$scope.searchStr="";
	$scope.currentPage = 1;
	$scope.pageSize=5;
	$scope.cmpId = $scope.leafCmpId;
	getData();
	

	function getData(){
		loadCompanyTestData($scope.pageSize,$scope.currentPage);
		loadAllCompanyProuctData();
	}

	function loadCompanyTestData(pagePerNum,currentPage){
		CompanyPubReportService.getCompanyPubReportList("","","",$scope.searchStr,"",$scope.cmpId,"","",pagePerNum,currentPage).then(function(result){
			$scope.testList= result.list;
			$scope.currentPage = result.currentPage;
			$scope.total = result.totalNum;
			
		});
	}

	//获取该所有的产品
	function loadAllCompanyProuctData(){
		var nowPage = 1;
		var sizeOfPage = 1;
		CompanyProductsService.getCompanyProductsList("","","","","",$scope.cmpId,"","",sizeOfPage,nowPage).then(function(result){
			sizeOfPage = result.totalNum;
			CompanyProductsService.getCompanyProductsList("","","","","",$scope.cmpId,"","",sizeOfPage,nowPage).then(function(result){
				$scope.productList = result.list;
			});
		});
	}

	$scope.changePage = function(page){
		loadCompanyTestData($scope.pageSize,page);
	}
	$scope.btnSearch = function(){
		$scope.currentPage = 1;
		getData();
	}

	$scope.confirm = function(modalStatus){
		if (modalStatus == 'addModal'){
			addTest();
			clear();
		}
		if (modalStatus == 'editModal'){
			editTest();
		}
	};
	$scope.cancel = function(modalStatus){
		if (modalStatus == 'addModal'){
			clear();
		}
	}
	function addTest(){
		var testItem = new Object();
		testItem.productId = $scope.addTestProduct._id;
		testItem.date = document.getElementById("form_datetime").value;
		testItem.team = $scope.addTestTeam;
		testItem.site = $scope.addTestAddress;
		testItem.report = $scope.fileUrl;
		CompanyPubReportService.addCompanyPubReport(testItem).then(function(result){
			getData();
		});
	}
	function clear(){
		$scope.addTestProduct = null;
		document.getElementById("form_datetime").value = null;
		$scope.addTestTeam = null;
		$scope.addTestAddress= null;
		$scope.fileUrl= null;
	}
	// 下载
	$scope.btnDownloadTest = function(test){
		var a = document.createElement('a');
		var url = test.report;
		var index = url.indexOf("upload_");
		var filename = url.substring(index);
		a.href = url;
		a.download = filename;
		a.click();
	};
	//点击删除按钮
	$scope.btnDeleteTest = function(test){
		$scope.deleteTest = test;
	};
	//确认删除
	$scope.confirmDelete = function(){
		CompanyPubReportService.deleteCompanyPubReport($scope.deleteTest._id).then(function(result){
			getData();
		});
	}; 
	//取消删除
	$scope.cancelDelete = function(){
		$scope.deleteTest = null;
	};
	// 点击编辑
	$scope.btnEditTest = function(test){
		$scope.setModalStatus('editModal');
		CompanyPubReportService.getCompanyPubReportDetail(test.productId._id).then(function(result){
			$scope.tmpTest = result.list[0];
			$scope.tmpProduct = getProduct($scope.tmpTest.productId._id);
			document.getElementById("form_datetime2").value = $filter('date')($scope.tmpTest.date, 'yyyy/MM/dd');
		});
	};
	//保存编辑
	function editTest(){
		// $scope.tmpTest.date = document.getElementById("form_datetime2").value;
		var date  = document.getElementById("form_datetime2").value;
		date = new Date(Date.parse(date));
		$scope.tmpTest.date = date.getTime();
		CompanyPubReportService.updateCompanyPubReport($scope.tmpTest).then(function(result){
			getData();
		});
	}
	
	function getProduct(pId){
		for (i in $scope.productList){
			if ($scope.productList[i]._id == pId){
				return $scope.productList[i];
			}
		}
	}

	//弹出框
	$scope.setModalStatus = function(statusName){
		$scope.modalStatus = statusName;
	}
	$scope.upload = function(file){
		if(file){
			FileService.uploadFile(file).then(function(result) {
				$scope.fileUrl = result.urls[0];
			});
		}
	}
	$scope.uploadWhenEdit = function(file){
		if(file){
			FileService.uploadFile(file).then(function(result) {
				$scope.tmpTest.report = result.urls[0];
			});
		}
	}
}
]);

angular.module("auto-biz-user").controller("CompanyUserTestController",["$scope","FileService","CompanyPriReportService","CompanyProductsService","$filter",
function CompanyUserTestController($scope,FileService,CompanyPriReportService,CompanyProductsService,$filter) {
	console.log("CompanyUserTestController");
	$scope.tmpUserTest={};
	$scope.companyName="小软酱有限公司";
	$scope.deleteID ="";


	//数据初始化
	$("#form_datetimeStart").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
	$("#form_datetimeEnd").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
	$scope.searchStr="";
	$scope.currentPage = 1;
	$scope.pageSize=5;
	$scope.cmpId = $scope.leafCmpId;
	getData();
	

	function getData(){
		loadCompanyUserTestData($scope.pageSize,$scope.currentPage);
	}
	function getProduct(pId){
		for (i in $scope.productList){
			if ($scope.productList[i]._id == pId){
				console.log($scope.productList[i]);
				return $scope.productList[i];
			}
		}
	}
	function getProductName(pId){
		for (i in $scope.productList){
			if ($scope.productList[i]._id == pId){
				return $scope.productList[i].name;
			}
		}
	}
	$scope.getName = function(pId){
		return getProductName(pId);
	};
	function loadCompanyUserTestData(pagePerNum,currentPage){
		CompanyPriReportService.getCompanyPriReportList("",$scope.searchStr,"","","","","","","","","","","","","","",$scope.cmpId,pagePerNum,currentPage).then(function(result){
			$scope.userTestList= result.list;
			$scope.currentPage = result.currentPage;
			$scope.total = result.totalNum;
			loadAllCompanyProuctData();
		});
	}

	//获取该所有的产品
	function loadAllCompanyProuctData(){
		var nowPage = 1;
		var sizeOfPage = 1;
		CompanyProductsService.getCompanyProductsList("","","","","",$scope.cmpId,"","",sizeOfPage,nowPage).then(function(result){
			sizeOfPage = result.totalNum;
			CompanyProductsService.getCompanyProductsList("","","","","",$scope.cmpId,"","",sizeOfPage,nowPage).then(function(result){
				$scope.productList = result.list;
			});
		});
	}

	$scope.changePage = function(page){
		loadCompanyUserTestData($scope.pageSize,page);
	}
	$scope.btnSearch = function(){
		$scope.currentPage = 1;
		getData();
	}

	$scope.confirm = function(modalStatus){
		if (modalStatus == 'addModal'){
			addUserTest();
			clear();
		}
		if (modalStatus == 'lookModal'){
			// editUserTest();
		}
	};
	$scope.cancel = function(modalStatus){
		if (modalStatus == 'addModal'){
			clear();
		}
	}
	
	$scope.setModalStatus = function(status){
		$scope.modalStatus = status;
	}

	//添加测评
	function addUserTest(){
		console.log($scope.addType);
		var userTestItem = new Object();
		userTestItem.productId = $scope.addTestProduct._id;
		userTestItem.title = $scope.addUserTestTitle;
		userTestItem.dateStart = document.getElementById("form_datetimeStart").value;
		userTestItem.dateEnd = document.getElementById("form_datetimeEnd").value;
		userTestItem.type = $filter('testTypeFilter')($scope.addType);
		userTestItem.address = $scope.addUserTestAddress;
		userTestItem.argc = $scope.addTagList;
		userTestItem.maxUserNum = Number($scope.addUserTestPeople);
		userTestItem.images = $scope.imgList;
		console.log(userTestItem);
		CompanyPriReportService.addCompanyPriReport(userTestItem).then(function(result){
			getData();
		})
	}
	function clear(){

		$scope.addTestProduct = null;
		$scope.addUserTestTitle = null;
		$scope.addUserTestAddress = null;
		$scope.addType = null;
		$scope.addTagList = [];
		$scope.addUserTestPeople = null;
		$scope.imgList = [];
	}

	

	//处理图片组
	$scope.imgList = [];
	$scope.upload = function(file){
		if(file){
			FileService.uploadFile(file).then(function(result) {
				var url = result.urls[0];
				$scope.imgList.push(url);
			});
		}
	};
	$scope.delete_thumb = function(url){
		for (i in $scope.imgList){
			if ($scope.imgList[i] == url){
				$scope.imgList.splice(i,1);
			}
		}
	}

	//查看测评
	$scope.btnLookUserTest = function(userTest){
		$scope.setModalStatus('lookModal');
		console.log(userTest.productId);
		CompanyPriReportService.getCompanyPriReportDetail(userTest._id).then(function(result){
			$scope.tmpUserTest = result;
		});

	};

	//点击删除按钮
	$scope.btnDeleteUserTest = function(userTest){
		$scope.deleteUserTest = userTest;
	};
	//确认删除
	$scope.confirmDelete = function(){
		CompanyPriReportService.deleteCompanyPriReport($scope.deleteUserTest._id).then(function(result){
			getData();
		});
	}; 
	//取消删除
	$scope.cancelDelete = function(){
		$scope.deleteUserTest = null;
	};





	//新评分参数
	$scope.addTagList = [];
	
	$scope.newTag = function(){
		$scope.tmpTagName = "";
	}
	$scope.confirmNewTag = function(){
		console.log("tmpTagName")
		$scope.addTagList.push($scope.tmpTagName);
		console.log($scope.addTagList);
		$scope.tmpTagName = "";
		console.log($scope.addTagList);
	}
	$scope.cancelNewTag = function(){
		$scope.tmpTagName = "";
	}
	$scope.deleteTag = function(tag){
		for (i in $scope.addTagList){
			if (tag == $scope.addTagList[i]){
				$scope.addTagList.splice(i,1);
			}
		}
	}

	//tab框控制
	$scope.btnShowParticipant = function(userTest){
		console.log(userTest);
		CompanyPriReportService.getCompanyPriReportDetail(userTest._id).then(function(result){
			$scope.nowUserTest = result;
			CompanyPriReportService.getReportPassUser($scope.nowUserTest._id,"1").then(function(result){
				console.log(result);
				$scope.testedList = result;
			});
		});
		$scope.currentTab = "testedUser";
	};

	
	$scope.toTab = function(tabName){
		$scope.currentTab=tabName;
		if ($scope.currentTab == 'testingUser'){
			CompanyPriReportService.getReportPassUser($scope.nowUserTest._id,"0").then(function(result){
				console.log(result);
				$scope.testingList = result;
			});
		}else if ($scope.currentTab == 'passedUser'){
			CompanyPriReportService.getReportSignUser($scope.nowUserTest._id,"1").then(function(result){
				console.log(result);
				$scope.passList = result;
			});
		}else if ($scope.currentTab == 'signUser'){
			CompanyPriReportService.getReportSignUser($scope.nowUserTest._id,"0").then(function(result){
				console.log(result);
				$scope.signList = result;
			});
		}else if ($scope.currentTab == 'testedUser'){
			CompanyPriReportService.getReportPassUser($scope.nowUserTest._id,"1").then(function(result){
				console.log(result);
				$scope.testedList = result;
			});
		}
	}



	//星星评分
	$scope.max = 5;
	$scope.readonly = true;
	$scope.onHover = function(val){
		$scope.hoverVal = val;
	};
	$scope.onLeave = function(){
		$scope.hoverVal = null;
	}
	$scope.onChange = function(val){
		$scope.ratingVal = val;
	}
}
]);
angular.module("auto-biz-user").controller("AuthController",["$scope","AuthService","UserService","$location","FileService",

function AuthController($scope,AuthService,UserService,$location,FileService){
  console.log("载入AuthController");
  $scope.userType=[["普通用户","normal"],["专栏作者","wr"]];
  $scope.regUserType = $scope.userType[0];
  $scope.user = {
    idImg1:"",
    idImg2:""
  }
  $scope.clickLoginUser = function(){
    console.log($scope.user);
    AuthService.userLogin($scope.user.name,$scope.user.password).then(function(){
      $location.path("/innovation");
    })
  }
  $scope.clickLoginAdmin = function(){
    AuthService.userLogin($scope.user.name,$scope.user.password).then(function(result){
      if(result.userType == "admin"){
        $location.path("/adminPage");
      }else{
        alert("权限不足，请重新登录");
        AuthService.userLogout();
      }
    })
  }
  $scope.uploadFirPic = function(file){
    if(file){

      FileService.uploadFile(file).then(function(result) {
        $scope.user.idImg1  = result.urls[0];
        $scope.firpic = file;
      });
    }
  }
  $scope.uploadSecPic = function(file){
    if(file){

      FileService.uploadFile(file).then(function(result) {
        $scope.user.idImg2 = result.urls[0];
        $scope.secpic = file;
      });
    }
  }
  $scope.clickRegisterUser = function(){
    $scope.user.userType = $scope.regUserType[1];
    console.log($scope.user);
    if (!$scope.user.name || $scope.user.name == ""){
      alert("请输入用户名");
      return ;
    } 
    if (!$scope.user.nikeName ||$scope.user.nikeName == ""){
      alert("请输入昵称");
      return;
    }
    if (!$scope.user.password ||$scope.user.password == ""){
      alert("请输入密码");
      return;
    }
    if ($scope.user.password != $scope.user.repass){
      alert("两次密码不一致");
      return;
    }
    if($scope.user.idImg1 == "" || $scope.user.idImg2 == ""){
      alert("请上传用户认证照片");
    }else{
      UserService.registerUser($scope.user).then(function(){
        $location.path("/innovation");
      });
    }

  }
  $scope.clickLoginCompany = function(){
    console.log($scope.cmp);
    AuthService.companyLogin($scope.cmp.cmpName,$scope.cmp.cmpPass).then(function(res){
      $location.path("/innovation");
    })
  }
}
]);

angular.module("auto-biz-user").controller("CompanyCreateController",["$scope","FileService","CompanyService","GlobalService","AuthService","LocationService","$location",
function CompanyCreateController($scope,FileService,CompanyService,GlobalService,AuthService,LocationService,$location) {
  console.log("载入CompanyCreateController");
  //初始化
  $scope.ctypeList = GlobalService.companyType;
  $scope.cmptype = $scope.ctypeList[0];
  $scope.company = {
    regTime:"",
    type:"CM"
  };
  LocationService.getProvinceList().then(function(result){
    $scope.provinceList = result;
  });
  $scope.getCityList = function(province){
    console.log(province);
    LocationService.getCityListByProvince(province.name).then(function(result){
      $scope.cityList = result;
    });
  };
  $scope.company.type = $scope.ctypeList[0].id;
  $("#form_datetime").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
  //交互
  $scope.uploadLogo = function(file){
  	if(file){
  		$scope.cmpLogo = file;
		FileService.uploadFile(file).then(function(result) {
  			$scope.company.logo = result.urls[0];
  		});
	}
  }
  $scope.uploadCertificate = function(file){
  	if(file){
  		FileService.uploadFile(file).then(function(result) {
  			$scope.company.info = result.urls[0];
  		});
  	}
  }
  $scope.registerCompany  = function(){
  		$scope.company.type = $scope.cmptype.id;
      $scope.company.regTime=document.getElementById("form_datetime").value;
      if ($scope.city){
        $scope.company.address = $scope.city.no || null;
      }
      if (!$scope.company.name ||$scope.company.name == ""){
        alert("请输入用户名");
        return;
      }
      if (!$scope.company.password ||$scope.company.password == ""){
        alert("请输入密码");
        return;
      }
       if ($scope.company.password != $scope.company.repass){
        alert("两次密码不一致");
        return;
      }
      if (!$scope.company.position ||$scope.company.position == ""){
        alert("请输入注册人职位");
        return;
      }
      if (!$scope.company.info ||$scope.company.info == ""){
        alert("请上传认证信息");
        return;
      }
      if (!$scope.company.longName ||$scope.company.longName == ""){
        alert("请输入公司名称");
        return;
      }
      if (!$scope.company.logo ||$scope.company.logo == ""){
        alert("请上传公司logo");
        return;
      }
      if (!$scope.company.shortName ||$scope.company.shortName == ""){
        alert("请输入业务简述");
        return;
      }
      if (!$scope.company.type ||$scope.company.type == ""){
        alert("请选择公司类型");
        return;
      }
      if (!$scope.company.phone ||$scope.company.phone == ""){
        alert("请输入联系方式");
        return;
      }
      if (!$scope.company.address ||$scope.company.address == ""){
        alert("请选择公司地址");
        return;
      }
      if (!$scope.company.field ||$scope.company.field == ""){
        alert("请输入详细地址");
        return;
      }
      if (!$scope.company.legalEntity ||$scope.company.legalEntity == ""){
        alert("请输入法人代表");
        return;
      }
      if (!$scope.company.regCapital ||$scope.company.regCapital == ""){
        alert("请输入注册资本");
        return;
      }
       if (!$scope.company.regTime ||$scope.company.regTime == ""){
        alert("请选择成立时间");
        return;
      }
       if ($scope.company.regTime==null ||$scope.company.regTime == ""){
        alert("请选择是否需要投融资");
        return;
      }
  		CompanyService.registerCompany($scope.company).then(function(result){
  			 $location.path("/innovation");
  		});
  }
}]);
angular.module("auto-biz-user").controller("CompanyDetailController",["$scope","GlobalService","CompanyNewsService","$routeParams","CompanyService","CompanyProductsService","CompanyPriReportService","CompanyFinanceService","AuthService","LocationService",
function CompanyDetailController($scope,GlobalService,CompanyNewsService,$routeParams,CompanyService,CompanyProductsService,CompanyPriReportService,CompanyFinanceService,AuthService,LocationService) {
  console.log("CompanyDetailController");


    //初始化company基本数据
    $scope.cmpId = $routeParams.id;
    CompanyService.getComppanyById($scope.cmpId).then(function(result){
        $scope.companyDetail = result;
        if($scope.companyDetail.address != ""){
            LocationService.getCityByNum($scope.companyDetail.address).then(function(result){
                $scope.city = result.shi;
            });
        }
    }); 

    $scope.cmpDetailList = GlobalService.cmpDetailList;
    $scope.currentPage=$scope.cmpDetailList[0][0];
    $scope.selectItem = function(item){
        $scope.currentPage=item;
    }

    $scope.cmpNews = {
        currentPage:1,
        pagePerNum:10,
        totalNum:-1,
        totalPage:-1,
        list:null
    };
    $scope.cmpProducts = {
        currentPage:1,
        pagePerNum:6,
        totalNum:-1,
        totalPage:-1,
        list:null
    };
    $scope.cmpTests = {
        currentPage:1,
        pagePerNum:6,
        totalNum:-1,
        totalPage:-1,
        list:null
    };
    $scope.cmpFinances = {
        currentPage:1,
        pagePerNum:3,
        totalNum:-1,
        totalPage:-1,
        list:null
    };


    init($routeParams.name);
    function init(routeParams){
        $scope.cmpDetail = {
            list : GlobalService.cmpDetailList
        }
        if(routeParams == "news"){
            $scope.currentPage = GlobalService.cmpDetailList[1][0];
            initNewsPage();
        }else if(routeParams == "product"){
            $scope.currentPage = GlobalService.cmpDetailList[2][0];
            initProductsPage();
        }else if(routeParams == "test"){
            $scope.currentPage = GlobalService.cmpDetailList[3][0];
            initTestsPage();
        }else if(routeParams == "finance"){
            $scope.currentPage = GlobalService.cmpDetailList[4][0];
            initFinancesPage();
        }else{
            $scope.currentPage = GlobalService.cmpDetailList[0][0];
            initOutlinePage();
        }
    }


    function initOutlinePage(){
        //获取新闻数据
        getCompanyNewsData(3,1);
        //获取产品数据
        getCompanyProductsData(3,1);
        //获取测评数据
        getCompanyTestsData(3,1);
        //获取财务数据
        getCompanyFinancesData(1,1);
    }


    //当选择的是news页面时

    function initNewsPage(){
        getCompanyNewsData($scope.cmpNews.pagePerNum,$scope.cmpNews.currentPage);
    }
    $scope.loadMoreNews=function(){
        if($scope.cmpNews.currentPage < $scope.cmpNews.totalPage){
            getCompanyNewsData($scope.cmpNews.pagePerNum,$scope.cmpNews.currentPage+1);
        }
    };

    //当选择的是产品界面时

    function initProductsPage(){
        getCompanyProductsData($scope.cmpProducts.pagePerNum,$scope.cmpProducts.currentPage);
    }
    $scope.loadMoreProducts=function(){
        if($scope.cmpProducts.currentPage < $scope.cmpProducts.totalPage){
            getCompanyProductsData($scope.cmpProducts.pagePerNum,$scope.cmpProducts.currentPage+1);
        }
    };

    //当选择的是测评界面时

    function initTestsPage(){
        getCompanyTestsData($scope.cmpTests.pagePerNum,$scope.cmpTests.currentPage);
    }
    $scope.loadMoreTests=function(){
        if($scope.cmpTests.currentPage < $scope.cmpTests.totalPage){
            getCompanyTestsData($scope.cmpTests.pagePerNum,$scope.cmpTests.currentPage+1);
        }
    };

    //当选择的是财务界面时
    function initFinancesPage(){
        getCompanyFinancesData($scope.cmpFinances.pagePerNum,$scope.cmpFinances.currentPage);
    }
    $scope.loadMoreFinances=function(){
        if($scope.cmpFinances.currentPage < $scope.cmpFinances.totalPage){
            getCompanyFinancesData($scope.cmpFinances.pagePerNum,$scope.cmpFinances.currentPage+1);
        }
    };


    //获取企业新闻
    function getCompanyNewsData(pagePerNum,currentPage){
        CompanyNewsService.getCompanyNewsList("","","","","",$scope.cmpId,"","",pagePerNum,currentPage).then(function(result){
            if($scope.cmpNews.list){
                $scope.cmpNews.list = $scope.cmpNews.list.concat(result.list);
            }else{
                $scope.cmpNews.list= result.list;
            }
            $scope.cmpNews.currentPage = result.currentPage;
            $scope.cmpNews.totalNum = result.totalNum;
            $scope.cmpNews.totalPage = result.totalPageNum;
        });
    }
    //获取企业产品
    function getCompanyProductsData(pagePerNum,currentPage){
        CompanyProductsService.getCompanyProductsList("","","","","",$scope.cmpId,"","",pagePerNum,currentPage).then(function(result){
            if($scope.cmpProducts.list){
                $scope.cmpProducts.list = $scope.cmpProducts.list.concat(result.list);
            }else{
                $scope.cmpProducts.list= result.list;
            }
            $scope.cmpProducts.currentPage = result.currentPage;
            $scope.cmpProducts.totalNum = result.totalNum;
            $scope.cmpProducts.totalPage = result.totalPageNum;
        });
    }   
    //获取企业测评
    function getCompanyTestsData(pagePerNum,currentPage){
        CompanyPriReportService.getCompanyPriReportList("","","","","","","","","","","","","","","","",$scope.cmpId,pagePerNum,currentPage).then(function(result){
            $scope.timeNow = new Date().getTime();
            if($scope.cmpTests.list){
                $scope.cmpTests.list = $scope.cmpTests.list.concat(result.list);
            }else{
                $scope.cmpTests.list= result.list;
            }
            $scope.cmpTests.currentPage = result.currentPage;
            $scope.cmpTests.totalNum = result.totalNum;
            $scope.cmpTests.totalPage = result.totalPageNum;
        });
    }
    //获取企业财务
    function getCompanyFinancesData(pagePerNum,currentPage){
        CompanyFinanceService.getCompanyFinanceList($scope.cmpId,"","",pagePerNum,currentPage).then(function(result){
            if($scope.cmpFinances.list){
             $scope.cmpFinances.list = $scope.cmpFinances.list.concat(result.list);
         }else{
            $scope.cmpFinances.list= result.list;
        }
        $scope.cmpFinances.currentPage = result.currentPage;
        $scope.cmpFinances.totalNum = result.totalNum;
        $scope.cmpFinances.totalPage = result.totalPageNum;
    });
    }


    //点击test页面的报名测评
    $scope.signTest = function(test){
        $scope.currentTest = test;
        $scope.testImgList = $scope.currentTest.images;

    };  
    $scope.testSignTest = function(phone,address){
        if (!phone){
            alert("请填写手机号");
            return;
        }
        if(address == null){
            address = "暂无";
        }
        if(AuthService.getToken() == "guest"){
            alert("用户尚未登录，请注册并且通过审核");
        }else if(AuthService.company){
            alert("您现在是企业账号，请以用户身份报名");
        }else if (AuthService.user){
            CompanyPriReportService.signCompanyPriReport($scope.currentTest._id,phone,address).then(function(result){
                alert("申请报名成功，请等待工作人员联系");
            });
        }
    };
}
]);

angular.module("auto-biz-user").controller("CompanyNewsDetailController",["$scope","CompanyNewsService","$routeParams",

function CompanyNewsDetailController($scope,CompanyNewsService,$routeParams) {
	console.log("载入CompanyNewsDetailController");

	if($routeParams.id != null){
		CompanyNewsService.getCompanyNewsDetail($routeParams.id).then(function(result){
			$scope.newsDetail = result;
		});
	}
}
]);

angular.module("auto-biz-user").controller("CompanyNewsDetailController",["$scope","CompanyNewsService","$routeParams",
function CompanyNewsDetailController($scope,CompanyNewsService,$routeParams) {
	console.log("载入CompanyNewsDetailController");

	if($routeParams.id != null){
		CompanyNewsService.getCompanyNewsDetail($routeParams.id).then(function(result){
			$scope.newsDetail = result;
		});
	}
}
]);

angular.module("auto-biz-user").controller("CompanyProductDetailController",["$scope","GlobalService","$routeParams","CompanyProductsService","CompanyPubReportService","CompanyPriReportService","AuthService",
function CompanyProductDetailController($scope,GlobalService,$routeParams,CompanyProductsService,CompanyPubReportService,CompanyPriReportService,AuthService) {
    console.log("载入CompanyProductDetailController");
     $scope.productType = GlobalService.companyType;
     $scope.newComment = {
        "score":[],
        "content":"",
        "reportId":""
     }
     $scope.commentLength = 0;


    $scope.getStatus = function(privateReport){
        if (!privateReport){
            return 'noReport'
        }
        if (privateReport.isOnline == false){
            return 'offline'
        }
        if (privateReport.state == 0 || privateReport.state == -1){
            return 'auditing'
        }
        if (!isStart(privateReport.dateStart)){
            return 'unstart'
        }
        if($scope.commentList.length == 0){
            return 'noComment'
        }
        return 'showComment';
    };

    function isStart(timeStamp){
        var nowTime =new Date().getTime();
        if (timeStamp > nowTime){
            return false;
        }
        return true;
    }

    if($routeParams.id != null){
        CompanyProductsService.getCompanyProductsDetail($routeParams.id).then(function(result){
           $scope.productDetail = result;
           console.log(result);
           if($scope.productDetail.publicReport){
            CompanyPubReportService.getCompanyPubReportDetail($routeParams.id).then(function(result){
            $scope.productPubReport = result.list[0];
            console.log(result.list[0]);
            })
            }

            if($scope.productDetail.privateReport){
                CompanyPriReportService.getCompanyPriReportDetail($scope.productDetail.privateReport).then(function(result){
                    $scope.productPriReport = result;
                    
                    $scope.scores = getAverageScore($scope.productPriReport.scores,$scope.productPriReport.scoredUserNum);
                    $scope.totalAverageScore = getTotalAverageScore($scope.scores);
                    console.log(result);
                });
                CompanyPriReportService.getCompanyPriReportComment($scope.productDetail.privateReport).then(function(result){
                    $scope.commentList = result;
                    $scope.commentLength = $scope.commentList.length;
                    console.log(result);
                });
            }
        });   
    }
    $scope.commitComment = function(){
        console.log($scope.newComment);
        if (isPassUser()){
            $scope.newComment.reportId = $scope.productDetail.privateReport;
            CompanyPriReportService.commentCompanyPriReport($scope.newComment).then(function(result){
                console.log(result);
            });
        }else {
            alert("你不是报名用户");
            return;
        }
        
    }

    function isPassUser(){
        var passList = $scope.productPriReport.passUser;
        if (AuthService.user){
            console.log(AuthService.user);
            for (i in passList){
                if (AuthService.user._id == passList[i].userId){
                    return true;
                }
            }
        }
        return false;
    }

    function getAverageScore(scrs,num){
        var scores = [];
        for (i in scrs){
            if (num != 0){
                scores[i] = scrs[i] / num;
            }
        }
        return scores;
    }
    function getTotalAverageScore(scrs){
        var total = 0;
        if (scrs.length != 0){
            for (i in scrs){
                total += scrs[i];
            }
            return (total/ scrs.length); 
        }
        return 0;
    }

    $scope.max = 5;
    $scope.onHover = function(val){
        $scope.hoverVal = val;
    };
    $scope.onLeave = function(){
        $scope.hoverVal = null;
    }
    $scope.onChange = function(val){
        $scope.ratingVal = val;
    }
}
]);

angular.module("auto-biz-user").controller("FooterController",["$scope",

function FooterController($scope) {
  console.log("载入FooterController");
    
}
]);

angular.module("auto-biz-user").controller("HeaderController",["$scope","GlobalService","$filter","AuthService",
  function HeaderController($scope,GlobalService,$filter,AuthService) {
    console.log("载入HeaderController");
    $scope.headerItems = [{name:"首页",title:"HOME",url:"http://www.auto-biz.cn"},{name:"资讯",title:"NEWS",url:"http://www.auto-biz.cn/toNews.html"},{name:"对话",title:"DIALOGUE",url:"http://www.auto-biz.cn/toTalks.html"},{name:"数据",title:"DATA",url:"http://www.auto-biz.cn/toData.html"},{name:"专栏",title:"COLUMNS",url:"http://www.auto-biz.cn/authors.html"},{name:"品车",title:"CARS",url:"http://www.auto-biz.cn/toTaste.html"},{name:"投稿",title:"CT",url:"http://www.auto-biz.cn/contribute.html"},{name:"企业平台",title:"PLATFORM",url:"/innovation"}];
    ;
    $scope.currentPage = "innovation";
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
          window.location.href="/innovation";
        });
      }else if(AuthService.company){
        AuthService.companyLogout().then(function(result){
          getLoginState();
          window.location.href="/innovation";
        });
      }
    }
  }
  ]


  );

angular.module("auto-biz-user").controller("InnovationController",["$scope","GlobalService","CompanyNewsService","$routeParams","CompanyProductsService","CompanyService","CompanyPriReportService","AuthService","$filter",
function InnovationController($scope,GlobalService,CompanyNewsService,$routeParams,CompanyProductsService,CompanyService,CompanyPriReportService,AuthService,$filter) {
	console.log("载入InnovationController");
	//初始化
	$scope.cmpNews = {
		currentPage:1,
		pagePerNum:10,
		totalNum:-1,
		totalPage:-1,
		list:null
	};
	$scope.cmpProducts = {
		currentPage:1,
		pagePerNum:6,
		totalNum:-1,
		totalPage:-1,
		list:null
	};
	$scope.cmpTests = {
		currentPage:1,
		pagePerNum:6,
		totalNum:-1,
		totalPage:-1,
		list:null
	};
	$scope.cmpCompanys = {
		currentPage:1,
		pagePerNum:5,
		totalNum:-1,
		totalPage:-1,
		list:null
	};
	$scope.timeNow = new Date().getTime();
	$scope.cmpProductType = [{
		current:{name:"全部",id:""},
		name:"时间：",
		list:GlobalService.innovationTime
	},{
		current:{name:"全部",id:""},
		name:"分类：",
		list:[{name:"全部",id:""}].concat(GlobalService.companyType)
	}];

	$scope.cmpCompanyType = [{
		current:{name:"全部",id:""},
		name:"类型：",
		list:[{name:"全部",id:""}].concat(GlobalService.companyType)
	}

	];	

	$scope.cmpTestType = [{
		current:{name:"全部",id:""},
		name:"状态：",
		list:[{name:"全部",id:"all"}].concat(GlobalService.testStatus)
	},{
		current:{name:"全部",id:""},
		name:"时间：",
		list:GlobalService.innovationTime
	},{
		current:{name:"全部",id:""},
		name:"类型：",
		list:[{name:"全部",id:""}].concat(GlobalService.testType)
	}];

	init($routeParams.name);
	//初始化加载页面
	function init(routeParams){
		$scope.innovation = {
			list : GlobalService.innovationList
		}
		if(routeParams == "hotProducts"){
			$scope.innovation.currentPage = GlobalService.innovationList[1][0];
			getCompanyProductsData("","",$scope.cmpProducts.pagePerNum,$scope.cmpProducts.currentPage);
		}else if(routeParams == "hotTest"){
			$scope.innovation.currentPage = GlobalService.innovationList[2][0];
			getCompanyTestsData("","","",$scope.cmpTests.pagePerNum,$scope.cmpTests.currentPage);
		}else if(routeParams == "companyDiscover"){
			$scope.innovation.currentPage = GlobalService.innovationList[3][0];
			getCompanyCompanysData("",$scope.cmpCompanys.pagePerNum,$scope.cmpCompanys.currentPage);
		}else{
			$scope.innovation.currentPage = GlobalService.innovationList[0][0];
			getCompanyNewsData($scope.cmpNews.pagePerNum,$scope.cmpNews.currentPage);
		}
	}

	//加载更多新闻
	$scope.loadMoreNews=function(){
		if($scope.cmpNews.currentPage < $scope.cmpNews.totalPage){
			getCompanyNewsData($scope.cmpNews.pagePerNum,$scope.cmpNews.currentPage+1);
		}
	};
	


    //筛选产品
    $scope.selectCompanyProductsData = function(selectNumber,option){
		//设置选中
		$scope.cmpProductType[selectNumber].current = option;
    	//请求对应数据
    	$scope.cmpProducts.list = null;
    	getCompanyProductsData($scope.cmpProductType[1].current.id,getProductDateStr(),$scope.cmpProducts.pagePerNum,1);
    };
 	//获取当前产品时间选项
 	function getProductDateStr(){
 		if($scope.cmpProductType[0].current.id == ""){
 			return "";
 		}else{
 			return GlobalService.getDateStr($scope.cmpProductType[0].current.id);
 		}
 	}
 	//加载更多产品
 	$scope.loadMoreProducts = function(){
 		if($scope.cmpProducts.currentPage < $scope.cmpProducts.totalPage){
 			getCompanyProductsData($scope.cmpProductType[1].current.id,getProductDateStr(),$scope.cmpProducts.pagePerNum,$scope.cmpProducts.currentPage+1);
 		}};

	//获取企业新闻
	function getCompanyNewsData(pagePerNum,currentPage){
		CompanyNewsService.getCompanyNewsList("","","","",true,"","","",pagePerNum,currentPage).then(function(result){
			if($scope.cmpNews.list){
				$scope.cmpNews.list = $scope.cmpNews.list.concat(result.list);
			}else{
				$scope.cmpNews.list= result.list;
			}
			$scope.cmpNews.currentPage = result.currentPage;
			$scope.cmpNews.totalNum = result.totalNum;
			$scope.cmpNews.totalPage = result.totalPageNum;
		});}
	//获取企业产品
	function getCompanyProductsData(cmpType,startTime,pagePerNum,currentPage){
		CompanyProductsService.getCompanyProductsList('',cmpType,'',"","","",startTime,"",pagePerNum,currentPage).then(function(result){
			if($scope.cmpProducts.list){
				$scope.cmpProducts.list = $scope.cmpProducts.list.concat(result.list);
			}else{
				$scope.cmpProducts.list= result.list;
			}
			$scope.cmpProducts.currentPage = result.currentPage;
			$scope.cmpProducts.totalNum = result.totalNum;
			$scope.cmpProducts.totalPage = result.totalPageNum;
		});}

	//筛选公司
	$scope.selectCompanyCompanysData = function(selectNumber,option){
		//设置选中
		$scope.cmpCompanyType[selectNumber].current = option;
    	//请求对应数据
    	$scope.cmpCompanys.list = null;
    	getCompanyCompanysData($scope.cmpCompanyType[0].current.id,$scope.cmpCompanys.pagePerNum,1);
    };	
	//加载更多企业
	$scope.loadMoreCompanys = function(){
		if($scope.cmpCompanys.currentPage < $scope.cmpCompanys.totalPage){
			getCompanyCompanysData($scope.cmpCompanyType[0].current.id,$scope.cmpCompanys.pagePerNum,$scope.cmpCompanys.currentPage+1);
		}};
	//获取企业列表
	function getCompanyCompanysData(cmpType,pagePerNum,currentPage){
		console.log(cmpType);
		console.log(pagePerNum);
		console.log(currentPage);
		CompanyService.getCompanysList(pagePerNum,currentPage,1,cmpType,"").then(function(result){
			if($scope.cmpCompanys.list){
				$scope.cmpCompanys.list = $scope.cmpCompanys.list.concat(result.list);
			}else{
				$scope.cmpCompanys.list= result.list;
			}
			console.log($scope.cmpCompanys.list);
			$scope.cmpCompanys.currentPage = result.currentPage;
			$scope.cmpCompanys.totalNum = result.totalNum;
			$scope.cmpCompanys.totalPage = result.totalPageNum;
		});}



	//加载更多测评
	$scope.loadMoreTests = function(){
		if($scope.cmpTests.currentPage < $scope.cmpTests.totalPage){
			getCompanyTestsData($scope.cmpTestType[0].current.id,getTestDateStr(),$scope.cmpTestType[2].current.id,$scope.cmpTests.pagePerNum,$scope.cmpTests.currentPage+1);
		}};	
 	 //筛选测评
 	 $scope.selectCompanyTestsData = function(selectNumber,option){
		//设置选中
		$scope.cmpTestType[selectNumber].current = option;
    	//请求对应数据
    	$scope.cmpTests.list = null;
    	console.log($scope.cmpTestType[0].current.id);
    	getCompanyTestsData($scope.cmpTestType[0].current.id,getTestDateStr(),$scope.cmpTestType[2].current.id,$scope.cmpTests.pagePerNum,1);
    };
 	//获取当前测评时间选项
 	function getTestDateStr(){
 		if($scope.cmpTestType[1].current.id == ""){
 			return "";
 		}else{
 			return GlobalService.getDateStr($scope.cmpTestType[1].current.id);
 		}
 	}
 	//获取用户测评
 	function getCompanyTestsData(testStatus,startTime,testType,pagePerNum,currentPage){
 		$scope.timeNow = new Date().getTime();
 		var startDateEnd = "";
 		var endDateEnd = "";
 		if (testStatus == "0"){
 			endDateEnd = $filter("date")($scope.timeNow,"yyyy-MM-dd");
 			startDateEnd = "";
 		}else if (testStatus == "1"){
 			startDateEnd = $filter("date")($scope.timeNow,"yyyy-MM-dd");;
 			endDateEnd = "";
 		}else if (testStatus == "all"){
 			startDateEnd = "";
 			endDateEnd = "";
 		}
 		CompanyPriReportService.getCompanyPriReportList("","",testType,"","","",startDateEnd,endDateEnd,"","","","1","","",startTime,"","",pagePerNum,currentPage).then(function(result){
 			if($scope.cmpTests.list){
 				$scope.cmpTests.list = $scope.cmpTests.list.concat(result.list);
 			}else{
 				$scope.cmpTests.list= result.list;
 			}
 			$scope.cmpTests.currentPage = result.currentPage;
 			$scope.cmpTests.totalNum = result.totalNum;
 			$scope.cmpTests.totalPage = result.totalPageNum;
 		});}
	//点击报名测评
	$scope.signTest = function(test){
		$scope.currentTest = test;
		$scope.testImgList = $scope.currentTest.images;
		$scope.currentTest.signTestPhone=null;
		$scope.currentTest.signTestAddress=null;
		$scope.currentTest.address=null;
	};	
	$scope.testSignTest = function(phone,address){
		if (!phone){
			alert("请填写手机号");
			return;
		}
		if(address == null){
			address = "暂无";
		}
		if(AuthService.getToken() == "guest"){
			alert("用户尚未登录，请注册并且通过审核");
			
		}else if (AuthService.company){
			alert("您现在是企业账号，请以用户身份报名");
		}else if (AuthService.user){
			CompanyPriReportService.signCompanyPriReport($scope.currentTest._id,phone,address).then(function(result){
				alert("申请报名成功，请等待工作人员联系");
			});
		}
	};
}
]);

angular.module("auto-biz-user").controller("CompanyBasicInfoController",["$scope",
function MainController($scope) {
  console.log("载入MainController");
  // $scope.currentPage = "partA";
}
]);

angular.module('auto-biz-user').directive('star', ["$timeout",function ($timeout) {
  return {
    template: '<ul class="rating" ng-mouseleave="leave()">' +
    '<li ng-repeat="star in stars" ng-class="star" ng-click="click($index + 1)" ng-mouseover="over($index + 1)">' +
    '\u2605' +
    '</li>' +
    '</ul>',
    scope: {
      ratingValue: '=',
      max: '=',
      readonly: '@',
      onHover: '=',
      onLeave: '='
    },  
    controller: function($scope){
      $scope.ratingValue = $scope.ratingValue || 0;
      $scope.max = $scope.max || 5;
      $scope.click = function(val){
        if ($scope.readonly && $scope.readonly === 'true') {
          return;
        }
        $scope.ratingValue = val;
      };
      $scope.over = function(val){
        $scope.onHover(val);
      };
      $scope.leave = function(){
        $scope.onLeave();
      }
    } ,
    link: function (scope, elem, attrs) {
      elem.css("text-align", "center");
      var updateStars = function () {
        scope.stars = [];
          for (var i = 0; i < scope.max; i++) {
            scope.stars.push({
              filled: i < scope.ratingValue
            });
          }
      };
      updateStars();

      scope.$watch('ratingValue', function (oldVal, newVal) {
        if(newVal != oldVal){
          updateStars();
          
        }
      });
      scope.$watch('max', function (oldVal, newVal) {
        if(newVal){
          updateStars();
        }
      });
    }
  };
}]);
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