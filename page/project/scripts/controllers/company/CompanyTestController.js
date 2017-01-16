angular.module("auto-biz-user").controller("CompanyTestController",["$scope","FileService","CompanyPubReportService","CompanyProductsService","$filter",

function CompanyTestController($scope,FileService,CompanyPubReportService,CompanyProductsService,$filter) {
	console.log("CompanyTestController");
	$scope.tmpTest={};
	$scope.companyName="小软酱有限公司";
	$scope.deleteID ="";


	//数据初始化
	$("#form_datetime").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
	$("#form_datetime2").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
	$scope.searchStr="";
	$scope.currentPage = 1;
	$scope.pageSize=5;
	$scope.cmpId = $scope.leafCmpId;
	getData();
	

	function getData(){
		loadCompanyTestData($scope.pageSize,$scope.currentPage);
		loadAllCompanyProuctData();
	}

	function loadCompanyTestData(pagePerNum,currentPage){
		CompanyPubReportService.getCompanyPubReportList("","","",$scope.searchStr,"",$scope.cmpId,"","",pagePerNum,currentPage).then(function(result){
			$scope.testList= result.list;
			$scope.currentPage = result.currentPage;
			$scope.total = result.totalNum;
			
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
		loadCompanyTestData($scope.pageSize,page);
	}
	$scope.btnSearch = function(){
		$scope.currentPage = 1;
		getData();
	}

	$scope.confirm = function(modalStatus){
		if (modalStatus == 'addModal'){
			addTest();
			clear();
		}
		if (modalStatus == 'editModal'){
			editTest();
		}
	};
	$scope.cancel = function(modalStatus){
		if (modalStatus == 'addModal'){
			clear();
		}
	}
	function addTest(){
		var testItem = new Object();
		testItem.productId = $scope.addTestProduct._id;
		testItem.date = document.getElementById("form_datetime").value;
		testItem.team = $scope.addTestTeam;
		testItem.site = $scope.addTestAddress;
		testItem.report = $scope.fileUrl;
		CompanyPubReportService.addCompanyPubReport(testItem).then(function(result){
			getData();
		});
	}
	function clear(){
		$scope.addTestProduct = null;
		document.getElementById("form_datetime").value = null;
		$scope.addTestTeam = null;
		$scope.addTestAddress= null;
		$scope.fileUrl= null;
	}
	// 下载
	$scope.btnDownloadTest = function(test){
		var a = document.createElement('a');
		var url = test.report;
		var index = url.indexOf("upload_");
		var filename = url.substring(index);
		a.href = url;
		a.download = filename;
		a.click();
	};
	//点击删除按钮
	$scope.btnDeleteTest = function(test){
		$scope.deleteTest = test;
	};
	//确认删除
	$scope.confirmDelete = function(){
		CompanyPubReportService.deleteCompanyPubReport($scope.deleteTest._id).then(function(result){
			getData();
		});
	}; 
	//取消删除
	$scope.cancelDelete = function(){
		$scope.deleteTest = null;
	};
	// 点击编辑
	$scope.btnEditTest = function(test){
		$scope.setModalStatus('editModal');
		CompanyPubReportService.getCompanyPubReportDetail(test.productId._id).then(function(result){
			$scope.tmpTest = result.list[0];
			$scope.tmpProduct = getProduct($scope.tmpTest.productId._id);
			document.getElementById("form_datetime2").value = $filter('date')($scope.tmpTest.date, 'yyyy/MM/dd');
		});
	};
	//保存编辑
	function editTest(){
		// $scope.tmpTest.date = document.getElementById("form_datetime2").value;
		var date  = document.getElementById("form_datetime2").value;
		date = new Date(Date.parse(date));
		$scope.tmpTest.date = date.getTime();
		CompanyPubReportService.updateCompanyPubReport($scope.tmpTest).then(function(result){
			getData();
		});
	}
	
	function getProduct(pId){
		for (i in $scope.productList){
			if ($scope.productList[i]._id == pId){
				return $scope.productList[i];
			}
		}
	}

	//弹出框
	$scope.setModalStatus = function(statusName){
		$scope.modalStatus = statusName;
	}
	$scope.upload = function(file){
		if(file){
			FileService.uploadFile(file).then(function(result) {
				$scope.fileUrl = result.urls[0];
			});
		}
	}
	$scope.uploadWhenEdit = function(file){
		if(file){
			FileService.uploadFile(file).then(function(result) {
				$scope.tmpTest.report = result.urls[0];
			});
		}
	}
}
]);
