function InnovationController($scope,GlobalService,CompanyNewsService) {
	console.log("载入InnovationController");
	//初始化
	$scope.innovationList = GlobalService.innovationList;
	$scope.currentPage=$scope.innovationList[0][0];

	$scope.cmpNews = {
		currentPage:-1,
		pagePerNum:10,
		totalNum:-1,
		totalPage:-1,
	}
	CompanyNewsService.getCompanyNewsList("","","","","",$scope.cmpNews.currentPage,$scope.cmpNews.pagePerNum).then(function(result){
		$scope.cmpNewsList = result;
	});
	//$scope.newsList = 
	$scope.selectItem = function(item){
		$scope.currentPage=item;
	}
	$scope.loadMore=function(){

	}
}