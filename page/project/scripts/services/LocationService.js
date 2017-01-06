angular.module("auto-biz-user")
.service('LocationService', function ($q,$http,GlobalService) {
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
});