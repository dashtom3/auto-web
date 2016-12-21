function CompanyBasicInfoController($scope,fileReader) {
	console.log("CompanyBasicInfoController");
	$scope.isEdit = false;
	$scope.infoList = {"companyFullName":"小酱软件有限公司","companyShortName":"小软酱","companyLocation":"上海","companyArea":"底盘","startYear":"1998",
	"startMonth":"12","startDay":"1","lawPerson":"李大宝","companyProperty":"100","companyAdress":"上海市杨浦区阳普鲁100号","companyShortCut":"这是一家位于上海的软件公司，这是一家位于上海的软件公司，这是一家位于上海的软件公司",
	"companyProduct":"公司的产品十分好，公司的产品十分好，公司的产品十分好，公司的产品十分好，公司的产品十分好","companyGoalUser":"任何人都是目标用户，任何人都是目标用户，任何人都是目标用户，任何人都是目标用户，任何人都是目标用户"};
	$scope.infoList_backup = null;
	$scope.startEdit = function(){
		$scope.infoList_backup = cloneObj($scope.infoList);
		$scope.isEdit =true;
	}
	$scope.cancelEdit = function(){
		console.log($scope.infoList);
		console.log( $scope.infoList_backup);
		$scope.infoList = cloneObj($scope.infoList_backup);
		$scope.isEdit =false;
	}
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
	$scope.getFile = function (fileName) {
		fileReader.readAsDataUrl($scope.file, $scope)
		.then(function(result) {
			$scope.imageSrc = result;
		});
	};
	$scope.upload = function(file){
		console.log(file);
		$scope.file = file;
	}

}