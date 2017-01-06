function InnovationController($scope,GlobalService,CompanyNewsService,$routeParams,CompanyProductsService) {
	console.log("载入InnovationController");
	//初始化
	$scope.cmpNews = {
		currentPage:1,
		pagePerNum:10,
		totalNum:-1,
		totalPage:-1,
		list:null
	}
	$scope.cmpProducts = {
		currentPage:1,
		pagePerNum:6,
		totalNum:-1,
		totalPage:-1,
		list:null
	}
	$scope.cmpProductType = [{
			current:{name:"全部",id:""},
			name:"时间：",
			list:GlobalService.innovationTime
		},{
			current:{name:"全部",id:""},
			name:"分类：",
			list:[{name:"全部",id:""}].concat(GlobalService.companyType)
		}];
	init($routeParams.name);
	//初始化加载页面
	function init(routeParams){
		$scope.innovation = {
			list : GlobalService.innovationList
		}
		if(routeParams == "hotProducts"){
			$scope.innovation.currentPage = GlobalService.innovationList[1][0];
			getCompanyProductsData("","",$scope.cmpProducts.pagePerNum,$scope.cmpProducts.currentPage);
		}else if(routeParams == "hotTest"){
			$scope.innovation.currentPage = GlobalService.innovationList[2][0];
			getCompanyNewsData($scope.cmpNews.pagePerNum,$scope.cmpNews.currentPage);
		}else if(routeParams == "companyDiscover"){
			$scope.innovation.currentPage = GlobalService.innovationList[3][0];
			getCompanyNewsData($scope.cmpNews.pagePerNum,$scope.cmpNews.currentPage);
		}else{
			$scope.innovation.currentPage = GlobalService.innovationList[0][0];
			getCompanyNewsData($scope.cmpNews.pagePerNum,$scope.cmpNews.currentPage);
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
		}}
	//获取企业新闻
	function getCompanyNewsData(pagePerNum,currentPage){
		CompanyNewsService.getCompanyNewsList("","","","","","","","",pagePerNum,currentPage).then(function(result){
		if($scope.cmpNews.list){
			$scope.cmpNews.list = $scope.cmpNews.list.concat(result.list);
		}else{
			$scope.cmpNews.list= result.list;
		}
		$scope.cmpNews.currentPage = result.currentPage;
		$scope.cmpNews.totalNum = result.totalNum;
		$scope.cmpNews.totalPage = result.totalPageNum;
	});}
	//获取企业新闻
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
}