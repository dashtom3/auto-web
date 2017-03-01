angular.module("auto-biz-user")
  .service('GlobalService', ["$filter",function ($filter) {
  	this.baseUrl = "http://123.56.220.72:3300/";
  	this.MD5Decode = function(input){
  		//return URLDecoder.decode(input,"utf-8");
  		return input;
  	}
  	this.headerList = [{name:"首页",title:"HOME",url:"http://www.auto-biz.cn"},{name:"资讯",title:"NEWS",url:"http://www.auto-biz.cn/toNews.html"},{name:"对话",title:"DIALOGUE",url:"http://www.auto-biz.cn/toTalks.html"},{name:"数据",title:"DATA",url:"http://www.auto-biz.cn/toData.html"},{name:"专栏",title:"COLUMNS",url:"http://www.auto-biz.cn/authors.html"},{name:"品车",title:"CARS",url:"http://www.auto-biz.cn/toTaste.html"},{name:"投稿",title:"CT",url:"http://www.auto-biz.cn/contribute.html"},{name:"企业平台",title:"INNOVATION",url:"/innovation"}];
    this.companyType=[{name:"初创企业",id:"CM"},{name:"互联网汽车",id:"CG"},{name:"人工智能",id:"CS"},{name:"自动驾驶",id:"NEC"},{name:"智慧交通",id:"NOC"},{name:"汽车金融",id:"CC"},{name:"清洁新能源",id:"CE"},{name:"汽车轻量化",id:"PT"},{name:"其它",id:"MOC"}];
    this.companyTypeIndex=[{name:"初创企业",id:"CM",imgblack:"black_1.png",imgwhite:"white_1.png"},{name:"互联网汽车",id:"CG",imgblack:"black_2.png",imgwhite:"white_2.png"},{name:"人工智能",id:"CS",imgblack:"black_3.png",imgwhite:"white_3.png"},{name:"自动驾驶",id:"NEC",imgblack:"black_4.png",imgwhite:"white_4.png"},{name:"智慧交通",id:"NOC",imgblack:"black_5.png",imgwhite:"white_5.png"},{name:"汽车金融",id:"CC",imgblack:"black_6.png",imgwhite:"white_6.png"},{name:"清洁新能源",id:"CE",imgblack:"black_7.png",imgwhite:"white_7.png"},{name:"汽车轻量化",id:"PT",imgblack:"black_8.png",imgwhite:"white_8.png"},{name:"其它",id:"MOC",imgblack:"black_9.png",imgwhite:"white_9.png"}];
    this.investType=[{name:"A轮",id:"A"},{name:"B轮",id:"B"}];
    this.testStatus=[{name:"已结束",id:"0"},{name:"测评中",id:"1"}];
  	this.testType=[{name:"实地",id:"local"},{name:"邮寄",id:"mail"}];
    this.innovationTime = [{name:"全部",id:""},{name:"一周内",id:-604800000},{name:"一个月内",id:-2592000000},{name:"三个月内",id:-7776000000},{name:"一年内",id:-31536000000}];
    this.innovationList=[["发现企业","innovationCompany","companyDiscover"],["最新资讯","null","innovationNews"],["最新产品","innovationProducts","hotProducts"],["热门测评","innovationTest","hotTest"]];
    this.innovationIndexList=[["发现企业","menu_company.png","menu_company_black.png","companyDiscover"],["最新资讯","menu_news.png","menu_news_black.png","innovationNews"],["最新产品","menu_product.png","menu_product_black.png","hotProducts"],["热门测评","menu_test.png","menu_test_black.png","hotTest"]];
    this.cmpDetailList=[["公司概况","companyOutline","outline"],["最新资讯","innovationNews","news"],["最新产品","hotProducts","product"],["热门测评","hotTest","test"],["财务状况","companyFinance","finance"]];
    this.directCityList = ["北京","上海","天津","重庆","香港","澳门"];
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
  .factory('loadingHttpInterceptor', ["$q","$timeout","$location","GlobalService" ,function loadingHttpInterceptor($q, $timeout,$location,GlobalService) {
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
        if (rejection.status ==  403 && rejection.data == "Forbidden"){
          console.log(localStorage);
          if(localStorage.auto_company){
            $location.path("/loginCompany");
          }
          if(localStorage.auto_user){
            var user =  JSON.parse(localStorage.auto_user);
            console.log(user);
            if (user.userType == "admin"){
              $location.path("/admin");
            }else {
              $location.path("/loginUser");
            }
          }
        }
        // do something on error
        // if (canRecover(rejection)) {
        //   return responseOrNewPromise
        // }
        return $q.reject(rejection);
      }
    };
  }]);