angular.module("auto-biz-user")
  .service('GlobalService', function () {
  	//this.baseUrl = "http://123.56.220.72:3200/";
  	this.baseUrl = "http://mintsweet.imwork.net:3300/";
  	this.MD5Decode = function(input){
  		//return URLDecoder.decode(input,"utf-8");
  		return input;
  	}
  	this.headerList = [{name:"首页",title:"HOME",url:""},{name:"资讯",title:"NEWS",url:""},{name:"对话",title:"DIALOGUE",url:""},{name:"数据",title:"DATA",url:""},{name:"专栏",title:"COLUMNS",url:""},{name:"品车",title:"CARS",url:""},{name:"投稿",title:"CT",url:""},{name:"创新工坊",title:"INNOVATION",url:""}];
  	this.companyType=[{name:"汽车制作",id:"CM"},{name:"汽车零部件",id:"CG"},{name:"汽车销售与服务",id:"CS"},{name:"新能源汽车",id:"NEC"},{name:"车联网",id:"NOC"},{name:"车用化工品",id:"CC"},{name:"汽车金融",id:"CE"},{name:"公共交通",id:"PT"},{name:"汽车媒体",id:"MOC"}];
    this.innovationList=[["最新资讯","innovationNews"],["最新产品","innovationProducts"],["热门测评","innovationTest"],["发现企业","innovationCompany"]];
    
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
  });
angular.module("auto-biz-user")
  .factory('loadingHttpInterceptor', function loadingHttpInterceptor($q, $timeout) {
    return {
      'request': function(config) {
        if($(".isloading-overlay").is(":hidden")){
          console.log(config);
           $.isLoading();
        }
        return config || $q.when(config);
      },
      'requestError': function(config) {
        $timeout(function() {
          $.isLoading('hide');
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
        }, 500);
        
        // do something on success
        return response || $q.when(response);
      },
      'responseError': function(rejection) {
        $timeout(function() {
          $.isLoading('hide');
        }, 500);
        
        // do something on error
        // if (canRecover(rejection)) {
        //   return responseOrNewPromise
        // }
        return $q.reject(rejection);
      }
    };
  });