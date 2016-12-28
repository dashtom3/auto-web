function CompanyDetailController($scope,GlobalService,CompanyNewsService) {
  console.log("CompanyDetailController");
    $scope.companyDetail={
    	"logo":"page/project/images/web_header_logo.png",
    	"shortName":"恒昌好车",
    	"areaList":[
    		{"areaName":"汽车配件"},
    		{"areaName":"汽车装饰"}
    	],
    	"shortCut":"互联网汽车金融平台O2O平台, 提供线上交易、金融解决方案、后市场服务",
    	"city":"上海",
    	"regTime":"2014/12/13",
    	"isNeedInvest":"1"
    }
    if ( $scope.companyDetail.isNeedInvest == 1){
    	 $scope.isNeedInvestContent = "有投融资需求";
    }else{
    	$scope.isNeedInvestContent = "暂无投融资需求";
    }

    $scope.cmpDetailList = GlobalService.cmpDetailList;
	$scope.currentPage=$scope.cmpDetailList[0][0];
	$scope.selectItem = function(item){
		$scope.currentPage=item;
	}


	// $scope.cmpNews = {
	// 	currentPage:-1,
	// 	pagePerNum:3,
	// 	totalNum:-1,
	// 	totalPage:-1,
	// }
	// CompanyNewsService.getCompanyNewsList("","","","","",$scope.cmpNews.currentPage,$scope.cmpNews.pagePerNum).then(function(result){
	// 	$scope.cmpNewsList = result;
	// });
	$scope.productList = [{},{},{},{}];
	$scope.testList = [{},{},{},{}];

}