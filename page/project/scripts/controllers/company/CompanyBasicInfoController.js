function CompanyBasicInfoController($scope,CompanyService,GlobalService,FileService) {
	console.log("CompanyBasicInfoController");
	$("#form_datetime").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
	$scope.infoList = {};
	$scope.isEdit = false;
	$scope.infoList_backup = null;
	$scope.ctypeList = GlobalService.companyType;
	CompanyService.getComppanyById($scope.cmpId).then(function(result){
		$scope.infoList = result;
		console.log($scope.infoList);
		$scope.ctype = getCtypeById($scope.infoList.type);
	}); 
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
	//点击编辑按钮
	$scope.startEdit = function(){
		$scope.infoList_backup = cloneObj($scope.infoList);
		$scope.isEdit =true;
		document.getElementById("form_datetime").value = $scope.infoList.regTime;
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
		$scope.infoList.type = $scope.ctype.id;
		$scope.infoList.regTime=document.getElementById("form_datetime").value;
		$scope.infoList.address="";

		console.log($scope.infoList);
		CompanyService.modifyCompany($scope.infoList).then(function(result){
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

	$scope.uploadLogo = function(file){
  	if(file){
  		$scope.fileLogo = file;
		FileService.uploadFile(file).then(function(result) {
  			$scope.infoList.logo = result.urls[0];
  		});
	}
  }
}