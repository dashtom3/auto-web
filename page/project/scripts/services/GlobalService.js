angular.module("auto-biz-user")
  .service('GlobalService', function () {
  	this.baseUrl = "http://123.56.220.72:3200/";
  	this.MD5Decode = function(input){
  		//return URLDecoder.decode(input,"utf-8");
  		return input;
  	}
  });