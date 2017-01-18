angular.module("auto-biz-user").controller("CompanyUserTestController",["$scope","FileService","CompanyPriReportService","CompanyProductsService","$filter",
function CompanyUserTestController($scope,FileService,CompanyPriReportService,CompanyProductsService,$filter) {
	$scope.tmpUserTest={};
	$scope.companyName="小软酱有限公司";
	$scope.deleteID ="";


	//数据初始化
	$("#form_datetimeStart").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
	$("#form_datetimeEnd").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
	$scope.searchStr="";
	$scope.currentPage = 1;
	$scope.pageSize=5;
	$scope.cmpId = $scope.leafCmpId;
	getData();
	

	function getData(){
		loadCompanyUserTestData($scope.pageSize,$scope.currentPage);
	}
	function getProduct(pId){
		for (i in $scope.productList){
			if ($scope.productList[i]._id == pId){
				return $scope.productList[i];
			}
		}
	}
	function getProductName(pId){
		for (i in $scope.productList){
			if ($scope.productList[i]._id == pId){
				return $scope.productList[i].name;
			}
		}
	}
	$scope.getName = function(pId){
		return getProductName(pId);
	};
	function loadCompanyUserTestData(pagePerNum,currentPage){
		CompanyPriReportService.getCompanyPriReportList("",$scope.searchStr,"","","","","","","","","","","","","","",$scope.cmpId,pagePerNum,currentPage).then(function(result){
			$scope.userTestList= result.list;
			$scope.currentPage = result.currentPage;
			$scope.total = result.totalNum;
			loadAllCompanyProuctData();
		});
	}

	//获取该所有的产品
	function loadAllCompanyProuctData(){
		var nowPage = 1;
		var sizeOfPage = 1;
		CompanyProductsService.getCompanyProductsList("","","","","",$scope.cmpId,"","",sizeOfPage,nowPage).then(function(result){
			sizeOfPage = result.totalNum;
			CompanyProductsService.getCompanyProductsList("","","","","",$scope.cmpId,"","",sizeOfPage,nowPage).then(function(result){
				$scope.productList = result.list;
			});
		});
	}

	$scope.changePage = function(page){
		loadCompanyUserTestData($scope.pageSize,page);
	}
	$scope.btnSearch = function(){
		$scope.currentPage = 1;
		getData();
	}

	$scope.confirm = function(modalStatus){
		if (modalStatus == 'addModal'){
			addUserTest();
			clear();
		}
		if (modalStatus == 'lookModal'){
			// editUserTest();
		}
	};
	$scope.cancel = function(modalStatus){
		if (modalStatus == 'addModal'){
			clear();
		}
	}
	
	$scope.setModalStatus = function(status){
		$scope.modalStatus = status;
	}

	//添加测评
	function addUserTest(){
		var userTestItem = new Object();
		userTestItem.productId = $scope.addTestProduct._id;
		userTestItem.title = $scope.addUserTestTitle;
		userTestItem.dateStart = document.getElementById("form_datetimeStart").value;
		userTestItem.dateEnd = document.getElementById("form_datetimeEnd").value;
		userTestItem.type = $filter('testTypeFilter')($scope.addType);
		userTestItem.address = $scope.addUserTestAddress;
		userTestItem.argc = $scope.addTagList;
		userTestItem.maxUserNum = Number($scope.addUserTestPeople);
		userTestItem.images = $scope.imgList;
		CompanyPriReportService.addCompanyPriReport(userTestItem).then(function(result){
			getData();
		})
	}
	function clear(){

		$scope.addTestProduct = null;
		$scope.addUserTestTitle = null;
		$scope.addUserTestAddress = null;
		$scope.addType = null;
		$scope.addTagList = [];
		$scope.addUserTestPeople = null;
		$scope.imgList = [];
	}

	

	//处理图片组
	$scope.imgList = [];
	$scope.upload = function(file){
		if(file){
			FileService.uploadFile(file).then(function(result) {
				var url = result.urls[0];
				$scope.imgList.push(url);
			});
		}
	};
	$scope.delete_thumb = function(url){
		for (i in $scope.imgList){
			if ($scope.imgList[i] == url){
				$scope.imgList.splice(i,1);
			}
		}
	}

	//查看测评
	$scope.btnLookUserTest = function(userTest){
		$scope.setModalStatus('lookModal');
		CompanyPriReportService.getCompanyPriReportDetail(userTest._id).then(function(result){
			$scope.tmpUserTest = result;
		});

	};

	//点击删除按钮
	$scope.btnDeleteUserTest = function(userTest){
		$scope.deleteUserTest = userTest;
	};
	//确认删除
	$scope.confirmDelete = function(){
		CompanyPriReportService.deleteCompanyPriReport($scope.deleteUserTest._id).then(function(result){
			getData();
		});
	}; 
	//取消删除
	$scope.cancelDelete = function(){
		$scope.deleteUserTest = null;
	};





	//新评分参数
	$scope.addTagList = [];
	
	$scope.newTag = function(){
		$scope.tmpTagName = "";
	}
	$scope.confirmNewTag = function(){
		$scope.addTagList.push($scope.tmpTagName);
		$scope.tmpTagName = "";
	}
	$scope.cancelNewTag = function(){
		$scope.tmpTagName = "";
	}
	$scope.deleteTag = function(tag){
		for (i in $scope.addTagList){
			if (tag == $scope.addTagList[i]){
				$scope.addTagList.splice(i,1);
			}
		}
	}

	//tab框控制
	$scope.btnShowParticipant = function(userTest){
		CompanyPriReportService.getCompanyPriReportDetail(userTest._id).then(function(result){
			$scope.nowUserTest = result;
			CompanyPriReportService.getReportPassUser($scope.nowUserTest._id,"1").then(function(result){
				$scope.testedList = result;
			});
		});
		$scope.currentTab = "testedUser";
	};

	
	$scope.toTab = function(tabName){
		$scope.currentTab=tabName;
		if ($scope.currentTab == 'testingUser'){
			CompanyPriReportService.getReportPassUser($scope.nowUserTest._id,"0").then(function(result){
				$scope.testingList = result;
			});
		}else if ($scope.currentTab == 'passedUser'){
			CompanyPriReportService.getReportSignUser($scope.nowUserTest._id,"1").then(function(result){
				$scope.passList = result;
			});
		}else if ($scope.currentTab == 'signUser'){
			CompanyPriReportService.getReportSignUser($scope.nowUserTest._id,"0").then(function(result){
				$scope.signList = result;
			});
		}else if ($scope.currentTab == 'testedUser'){
			CompanyPriReportService.getReportPassUser($scope.nowUserTest._id,"1").then(function(result){
				$scope.testedList = result;
			});
		}
	}



	//星星评分
	$scope.max = 5;
	$scope.readonly = true;
	$scope.onHover = function(val){
		$scope.hoverVal = val;
	};
	$scope.onLeave = function(){
		$scope.hoverVal = null;
	}
	$scope.onChange = function(val){
		$scope.ratingVal = val;
	}
}
]);