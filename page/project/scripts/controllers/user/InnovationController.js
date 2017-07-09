angular.module("auto-biz-user").controller("InnovationController",["$scope","GlobalService","CompanyNewsService","$routeParams","CompanyProductsService","CompanyService","CompanyPriReportService","AuthService","$filter","$ocLazyLoad",
function InnovationController($scope,GlobalService,CompanyNewsService,$routeParams,CompanyProductsService,CompanyService,CompanyPriReportService,AuthService,$filter,$ocLazyLoad) {
	//初始化
	$scope.cmpNews = {
		currentPage:1,
		pagePerNum:10,
		totalNum:-1,
		totalPage:-1,
		list:null
	};
	$scope.cmpProducts = {
		currentPage:1,
		pagePerNum:6,
		totalNum:-1,
		totalPage:-1,
		list:null
	};
	$scope.cmpTests = {
		currentPage:1,
		pagePerNum:6,
		totalNum:-1,
		totalPage:-1,
		list:null
	};
	$scope.cmpCompanys = {
		currentPage:1,
		pagePerNum:5,
		totalNum:-1,
		totalPage:-1,
		list:null
	};
	$scope.timeNow = new Date().getTime();
	$scope.cmpProductType = [{
		current:{name:"全部",id:""},
		name:"时间：",
		list:GlobalService.innovationTime
	},{
		current:{name:"全部",id:""},
		name:"分类：",
		list:[{name:"全部",id:""}].concat(GlobalService.companyTypeForProduct)
	}];

	$scope.cmpCompanyType = [{
		current:{name:"全部",id:""},
		name:"类型：",
		list:[{name:"全部",id:""}].concat(GlobalService.companyType)
	}

	];	

	$scope.cmpTestType = [{
		current:{name:"全部",id:""},
		name:"状态：",
		list:[{name:"全部",id:"all"}].concat(GlobalService.testStatus)
	},{
		current:{name:"全部",id:""},
		name:"时间：",
		list:GlobalService.innovationTime
	},{
		current:{name:"全部",id:""},
		name:"类型：",
		list:[{name:"全部",id:""}].concat(GlobalService.testType)
	}];

	init($routeParams.name);
	//初始化加载页面
	function init(routeParams){
		$scope.innovation = {
			list : GlobalService.innovationList
		}
		if(routeParams == "hotProducts"){
			$scope.innovation.currentPage = GlobalService.innovationList[2][0];
			getCompanyProductsData("","",$scope.cmpProducts.pagePerNum,$scope.cmpProducts.currentPage);
		}else if(routeParams == "hotTest"){
			$scope.innovation.currentPage = GlobalService.innovationList[3][0];
			getCompanyTestsData("","","",$scope.cmpTests.pagePerNum,$scope.cmpTests.currentPage);
		}else if(routeParams == "innovationNews"){
			$scope.innovation.currentPage = GlobalService.innovationList[1][0];
			getCompanyNewsData($scope.cmpNews.pagePerNum,$scope.cmpNews.currentPage);
		}else{
			$scope.innovation.currentPage = GlobalService.innovationList[0][0];
			getCompanyCompanysData("",$scope.cmpCompanys.pagePerNum,$scope.cmpCompanys.currentPage);
		}
	}

	//加载更多新闻
	$scope.loadMoreNews=function(){
		if($scope.cmpNews.currentPage < $scope.cmpNews.totalPage){
			getCompanyNewsData($scope.cmpNews.pagePerNum,$scope.cmpNews.currentPage+1);
		}
	};
	


    //筛选产品
    $scope.selectCompanyProductsData = function(selectNumber,option){
		//设置选中
		$scope.cmpProductType[selectNumber].current = option;
    	//请求对应数据
    	$scope.cmpProducts.list = null;
    	getCompanyProductsData($scope.cmpProductType[1].current.id,getProductDateStr(),$scope.cmpProducts.pagePerNum,1);
    };
 	//获取当前产品时间选项
 	function getProductDateStr(){
 		if($scope.cmpProductType[0].current.id == ""){
 			return "";
 		}else{
 			return GlobalService.getDateStr($scope.cmpProductType[0].current.id);
 		}
 	}
 	//加载更多产品
 	$scope.loadMoreProducts = function(){
 		if($scope.cmpProducts.currentPage < $scope.cmpProducts.totalPage){
 			getCompanyProductsData($scope.cmpProductType[1].current.id,getProductDateStr(),$scope.cmpProducts.pagePerNum,$scope.cmpProducts.currentPage+1);
 		}};

	//获取企业新闻
	function getCompanyNewsData(pagePerNum,currentPage){
		CompanyNewsService.getCompanyNewsList("","","","",true,"","","",pagePerNum,currentPage).then(function(result){
			if($scope.cmpNews.list){
				$scope.cmpNews.list = $scope.cmpNews.list.concat(result.list);
			}else{
				$scope.cmpNews.list= result.list;
			}
			$scope.cmpNews.currentPage = result.currentPage;
			$scope.cmpNews.totalNum = result.totalNum;
			$scope.cmpNews.totalPage = result.totalPageNum;
		});}
	//获取企业产品
	function getCompanyProductsData(cmpType,startTime,pagePerNum,currentPage){
		CompanyProductsService.getCompanyProductsList('',cmpType,'',"","","",startTime,"",pagePerNum,currentPage).then(function(result){
			if($scope.cmpProducts.list){
				$scope.cmpProducts.list = $scope.cmpProducts.list.concat(result.list);
			}else{
				$scope.cmpProducts.list= result.list;
			}
			$scope.cmpProducts.currentPage = result.currentPage;
			$scope.cmpProducts.totalNum = result.totalNum;
			$scope.cmpProducts.totalPage = result.totalPageNum;
		});}

	//筛选公司
	$scope.selectCompanyCompanysData = function(selectNumber,option){
		//设置选中
		$scope.cmpCompanyType[selectNumber].current = option;
    	//请求对应数据
    	$scope.cmpCompanys.list = null;
    	getCompanyCompanysData($scope.cmpCompanyType[0].current.id,$scope.cmpCompanys.pagePerNum,1);
    };	
	//加载更多企业
	$scope.loadMoreCompanys = function(){
		if($scope.cmpCompanys.currentPage < $scope.cmpCompanys.totalPage){
			getCompanyCompanysData($scope.cmpCompanyType[0].current.id,$scope.cmpCompanys.pagePerNum,$scope.cmpCompanys.currentPage+1);
		}};
	//获取企业列表
	function getCompanyCompanysData(cmpType,pagePerNum,currentPage){
		CompanyService.getCompanysList(pagePerNum,currentPage,1,cmpType,"").then(function(result){
			if($scope.cmpCompanys.list){
				$scope.cmpCompanys.list = $scope.cmpCompanys.list.concat(result.list);
			}else{
				$scope.cmpCompanys.list= result.list;
			}
			$scope.cmpCompanys.currentPage = result.currentPage;
			$scope.cmpCompanys.totalNum = result.totalNum;
			$scope.cmpCompanys.totalPage = result.totalPageNum;
		});}



	//加载更多测评
	$scope.loadMoreTests = function(){
		if($scope.cmpTests.currentPage < $scope.cmpTests.totalPage){
			getCompanyTestsData($scope.cmpTestType[0].current.id,getTestDateStr(),$scope.cmpTestType[2].current.id,$scope.cmpTests.pagePerNum,$scope.cmpTests.currentPage+1);
		}};	
 	 //筛选测评
 	 $scope.selectCompanyTestsData = function(selectNumber,option){
		//设置选中
		$scope.cmpTestType[selectNumber].current = option;
    	//请求对应数据
    	$scope.cmpTests.list = null;
    	getCompanyTestsData($scope.cmpTestType[0].current.id,getTestDateStr(),$scope.cmpTestType[2].current.id,$scope.cmpTests.pagePerNum,1);
    };
 	//获取当前测评时间选项
 	function getTestDateStr(){
 		if($scope.cmpTestType[1].current.id == ""){
 			return "";
 		}else{
 			return GlobalService.getDateStr($scope.cmpTestType[1].current.id);
 		}
 	}
 	//获取用户测评
 	function getCompanyTestsData(testStatus,startTime,testType,pagePerNum,currentPage){
 		$scope.timeNow = new Date().getTime();
 		var startDateEnd = "";
 		var endDateEnd = "";
 		if (testStatus == "0"){
 			endDateEnd = $filter("date")($scope.timeNow,"yyyy-MM-dd");
 			startDateEnd = "";
 		}else if (testStatus == "1"){
 			startDateEnd = $filter("date")($scope.timeNow,"yyyy-MM-dd");;
 			endDateEnd = "";
 		}else if (testStatus == "all"){
 			startDateEnd = "";
 			endDateEnd = "";
 		}
 		CompanyPriReportService.getCompanyPriReportList("","",testType,"","","",startDateEnd,endDateEnd,"","","","1","","",startTime,"","",pagePerNum,currentPage).then(function(result){
 			if($scope.cmpTests.list){
 				$scope.cmpTests.list = $scope.cmpTests.list.concat(result.list);
 			}else{
 				$scope.cmpTests.list= result.list;
 			}
 			$scope.cmpTests.currentPage = result.currentPage;
 			$scope.cmpTests.totalNum = result.totalNum;
 			$scope.cmpTests.totalPage = result.totalPageNum;
 		});}
	//点击报名测评
	$scope.signTest = function(test){
		$scope.currentTest = test;
		$scope.testImgList = $scope.currentTest.images;
		$scope.currentTest.signTestPhone=null;
		$scope.currentTest.signTestAddress=null;
		$scope.currentTest.address=null;
	};	
	$scope.testSignTest = function(phone,address){
		if (!phone){
			alert("请填写手机号");
			return;
		}
		if(address == null){
			address = "暂无";
		}
		if(AuthService.getToken() == "guest"){
			alert("用户尚未登录，请注册并且通过审核");
			
		}else if (AuthService.company){
			alert("您现在是企业账号，请以用户身份报名");
		}else if (AuthService.user){
			CompanyPriReportService.signCompanyPriReport($scope.currentTest._id,phone,address).then(function(result){
				alert("申请报名成功，请等待工作人员联系");
			});
		}
	};
}
]);
