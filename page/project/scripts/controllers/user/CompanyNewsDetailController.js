function CompanyNewsDetailController($scope,CompanyNewsService,$routeParams) {
	console.log("载入CompanyNewsDetailController");

	if($routeParams.id != null){
		CompanyNewsService.getCompanyProductsDetail($routeParams.id).then(function(result){
			$scope.newsDetail = result;
		});
	}
}