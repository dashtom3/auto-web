function InnovationNewsController($scope,CompanyNewsService) {
	console.log("InnovationNewsController");




	$scope.cmpNews = {
		currentPage:1,
		pagePerNum:10,
		totalNum:-1,
		totalPage:-1,
	}
	//如果是在公司概况页面，则只显示三条
	if ($scope.leafShowStatus == "公司概况"){
		$scope.status = "cmpDetailShow";
		$scope.cmpNews.pagePerNum = 3;
	}
	if ($scope.leafCmpId){
		$scope.cmpId = $scope.leafCmpId;
	}else{
		$scope.cmpId = "";
	}
	console.log("cmpid: "+$scope.cmpId);

	loadCompanyNewsData($scope.cmpNews.pagePerNum,$scope.cmpNews.currentPage);
	function loadCompanyNewsData(pagePerNum,currentPage){
		console.log("readData");
		CompanyNewsService.getCompanyNewsList("","","","","",$scope.cmpId,"","",pagePerNum,currentPage).then(function(result){
			if($scope.cmpNewsList){
				$scope.cmpNewsList = $scope.cmpNewsList.concat(result.list);
			}else{
				$scope.cmpNewsList= result.list;
				console.log($scope.cmpNewsList);
			}
			$scope.cmpNews.currentPage = result.currentPage;
			console.log($scope.cmpNews.currentPage);
			$scope.cmpNews.totalNum = result.totalNum;
			$scope.cmpNews.totalPage = result.totalPageNum;
			console.log($scope.cmpNews.totalPage);
		});
	}

	$scope.loadMore=function(){
		if($scope.cmpNews.currentPage < $scope.cmpNews.totalPage){
			loadCompanyNewsData($scope.cmpNews.pagePerNum,$scope.cmpNews.currentPage+1);
		}
	};
}