function InnovationController($scope,GlobalService,CompanyNewsService) {
	console.log("载入InnovationController");
	//初始化
	$scope.innovationList = GlobalService.innovationList;
	$scope.currentPage=$scope.innovationList[0][0];

	$scope.cmpNews = {
		currentPage:1,
		pagePerNum:10
	}
	// CompanyNewsService.getCompanyNewsList("","","","","",$scope.cmpNews.currentPage,$scope.cmpNews.pagePerNum).then(function(result){
	// 	$scope.cmpNewsList = result;
	// });
	$scope.cmpNewsList = [{"title":"bl2321","author":"auor","isFirst":"1","isOnline":"1","company":"XJ2","tag":"1","desc":"122331","pic":"111","wysiwyg":"cntent"},
	{"title":"bl2321","author":"auor","isFirst":"1","isOnline":"1","company":"XJ2","tag":"1","desc":"122331","pic":"111","wysiwyg":"cntent"}];
	//$scope.newsList = 
}