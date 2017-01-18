angular.module("auto-biz-user")
.service('LocationService',["$q","$http","GlobalService", function ($q,$http,GlobalService) {
	var self = this;

	this.getProvinceList = function(){
		var deferred = $q.defer();
		var url = GlobalService.baseUrl+'list/prov';
		$http.get(url).success(function(res){
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
		$http.get(url).success(function(res){
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
		$http.get(url).success(function(res){
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