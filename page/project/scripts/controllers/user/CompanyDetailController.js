function CompanyDetailController($scope,GlobalService,CompanyNewsService,$routeParams,CompanyService) {
  console.log("CompanyDetailController");
    $scope.leafCmpId = "585b7d66b6a493e45ea96060"; 
    $scope.cmpId = $scope.leafCmpId;
    CompanyService.getComppanyById($scope.cmpId).then(function(result){
        $scope.companyDetail = result;
        if ( $scope.companyDetail.isNeedCapital == 'true'){
             $scope.isNeedInvestContent = "有投融资需求";
        }else{
            $scope.isNeedInvestContent = "暂无投融资需求";
        }
    }); 
    // $scope.companyDetail={
    // 	"logo":"page/project/images/web_header_logo.png",
    // 	"shortName":"恒昌好车",
    // 	"areaList":[
    // 		{"areaName":"汽车配件"},
    // 		{"areaName":"汽车装饰"}
    // 	],
    // 	"shortCut":"互联网汽车金融平台O2O平台, 提供线上交易、金融解决方案、后市场服务",
    // 	"city":"上海",
    // 	"regTime":"2014/12/13",
    // 	"isNeedInvest":"1"
    // }
    

    $scope.cmpDetailList = GlobalService.cmpDetailList;
	$scope.currentPage=$scope.cmpDetailList[0][0];
    $scope.leafShowStatus = $scope.currentPage;
	$scope.selectItem = function(item){
		$scope.currentPage=item;
        $scope.leafShowStatus = item;
	}


	$scope.productList = [{},{},{},{}];
	$scope.testList = [{},{},{},{}];

}