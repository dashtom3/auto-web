angular.module("auto-biz-user").controller("CompanyNewsDetailController",["$scope","CompanyNewsService","$routeParams",

function CompanyNewsDetailController($scope,CompanyNewsService,$routeParams) {
	
	if($routeParams.id != null){
		CompanyNewsService.getCompanyNewsDetail($routeParams.id).then(function(result){
			$scope.newsDetail = result;
		});
	}
}
]);
