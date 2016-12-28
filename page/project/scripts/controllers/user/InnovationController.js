function InnovationController($scope,GlobalService,CompanyNewsService) {
	console.log("载入InnovationController");
	//初始化
	$scope.innovationList = GlobalService.innovationList;
	$scope.currentPage=$scope.innovationList[0][0];
	$scope.selectItem = function(item){
		$scope.currentPage=item;
	}
	// $scope.cmpNews = {
	// 	currentPage:1,
	// 	pagePerNum:10,
	// 	totalNum:-1,
	// 	totalPage:-1,
	// }
	// loadCompanyNewsData($scope.cmpNews.pagePerNum,$scope.cmpNews.currentPage);
	// function loadCompanyNewsData(pagePerNum,currentPage){
	// 	CompanyNewsService.getCompanyNewsList("","","","","","","","",pagePerNum,currentPage).then(function(result){
	// 	if($scope.cmpNewsList){
	// 		$scope.cmpNewsList = $scope.cmpNewsList.concat(result.list);
	// 	}else{
	// 		$scope.cmpNewsList= result.list;
	// 	}
	// 	$scope.cmpNews.currentPage = result.currentPage;
	// 	$scope.cmpNews.totalNum = result.totalNum;
	// 	$scope.cmpNews.totalPage = result.totalPageNum;
	// });
	// }
	// //$scope.newsList = 

	// $scope.loadMore=function(){
	// 	if($scope.cmpNews.currentPage < $scope.cmpNews.totalPage){
	// 		loadCompanyNewsData($scope.cmpNews.pagePerNum,$scope.cmpNews.currentPage+1);
	// 	}
	// };
}