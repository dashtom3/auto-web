angular.module("auto-biz-user")
  .service('FileService', function ($q,$http,GlobalService,Upload) {
  	//上传文件
  	this.uploadFile = function(file){
  		var deferred = $q.defer();
		Upload.upload({
			url: GlobalService.baseUrl+'upload',
			file: file
		}).success(function (res) {
			if(res.callStatus=="SUCCEED"){
				deferred.resolve(res.data);
			}else{
				alert("您好，上传文件失败");
          		deferred.resolve();
			}
		}).error(function(){
			alert("您好，上传文件失败");
          	deferred.resolve();
		});
		return deferred.promise;
	};
});