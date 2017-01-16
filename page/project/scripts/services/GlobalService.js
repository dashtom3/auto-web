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