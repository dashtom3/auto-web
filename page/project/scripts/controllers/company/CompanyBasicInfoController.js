function CompanyBasicInfoController($scope) {
	console.log("CompanyBasicInfoController");
	$scope.companyName = "XJ";
	$("#form_datetime").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });





	// BasicInfoService.getBasicInfo($scope.companyName)
	// .then(function(result){
	// 	$scope.infoList = result;
	// 	console.log($scope.infoList);	
	// });


	$scope.infoList = {};
	$scope.isEdit = false;
	$scope.infoList_backup = null;
	//点击编辑按钮
	$scope.startEdit = function(){
		$scope.infoList_backup = cloneObj($scope.infoList);
		$scope.isEdit =true;
	}
	//取消编辑
	$scope.cancelEdit = function(){
		console.log($scope.infoList);
		console.log( $scope.infoList_backup);
		$scope.infoList = cloneObj($scope.infoList_backup);
		$scope.isEdit =false;
	}
	//保存编辑
	$scope.saveEdit = function(){
		console.log("开始post");
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
	$scope.upload = function(file){
		if (file != null){
			$scope.fileLogo = file;
			console.log(file);
		}
		
		//$scope.file = file;
	}




	//date picker
	// var datepicker1 = $('#datetimepicker1').datetimepicker({  
	// 	format: 'YYYY/MM/DD',  
	// 	locale: moment.locale('zh-cn')  
	// })
	// // .on('dp.change', function (e) {  
	// // 	var result = new moment(e.date).format('YYYY-MM-DD');  
	// // 	$scope.dateOne = result;  
	// // 	$scope.$apply();  
	// // }); 
	// $scope.$watch('datetime',function(){
	// 	console.log($scope.datetime);
	// })
}