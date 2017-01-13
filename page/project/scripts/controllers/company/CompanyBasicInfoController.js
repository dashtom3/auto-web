function CompanyBasicInfoController($scope,CompanyService,GlobalService,FileService,LocationService) {
	console.log("CompanyBasicInfoController");
	$("#form_datetime").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
	$scope.infoList = {};
	$scope.isEdit = false;
	$scope.infoList_backup = null;
	$scope.ctypeList = GlobalService.companyType;
	
	//获得省级列表
	LocationService.getProvinceList().then(function(result){
		$scope.provinceList = result;
	});
	$scope.getCityList = function(province){
		console.log(province);
		LocationService.getCityListByProvince(province.name).then(function(result){
			$scope.cityList = result;
		});
	};


	getData();
	function getData() {
		CompanyService.getComppanyById($scope.cmpId).then(function(result){
			$scope.infoList = result;
			$scope.ctype = getCtypeById($scope.infoList.type);
			LocationService.getCityByNum($scope.infoList.address).then(function(result){
				$scope.cityName = result.shi;
				$scope.cityNum = result.no;
				$scope.provinceName = result.sheng;
			})
		}); 
	}
	
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
	function getProvinceByName(pName){
		for (i in $scope.provinceList){
			if ($scope.provinceList[i].name == pName){
				return $scope.provinceList[i];
			}
		}
	}
	function getCityByNo(num){
		for (i in $scope.cityList){
			if ($scope.cityList[i].no == num){
				return $scope.cityList[i];
			}
		}
	}
	//点击编辑按钮
	$scope.startEdit = function(){
		$scope.infoList_backup = cloneObj($scope.infoList);
		$scope.isEdit =true;
		$scope.fileLogo = $scope.infoList_backup.logo;
		$scope.province = getProvinceByName($scope.provinceName);
		LocationService.getCityListByProvince($scope.province.name).then(function(result){
			$scope.cityList = result;
			$scope.city = getCityByNo($scope.cityNum);
		});
		console.log($scope.infoList);
		document.getElementById("form_datetime").value = $scope.infoList.regTime;
	}
	//取消编辑
	$scope.cancelEdit = function(){

		$scope.infoList = cloneObj($scope.infoList_backup);

		$scope.isEdit =false;
	}
	//保存编辑
	$scope.saveEdit = function(){
		$scope.infoList.type = $scope.ctype.id;
		$scope.infoList.regTime=document.getElementById("form_datetime").value;
		$scope.infoList.address = $scope.city.no;
		console.log($scope.infoList);
		CompanyService.modifyCompany($scope.infoList).then(function(result){
			getData();
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

	//上传图片至服务器并保存返回的url
	$scope.uploadLogo = function(file){
		if(file){
			$scope.fileLogo = file;
			FileService.uploadFile(file).then(function(result) {
				$scope.infoList.logo = result.urls[0];
			});
		}
	}
}