function CompanyProductDetailController($scope,GlobalService,$routeParams,CompanyProductsService,CompanyPubReportService,CompanyPriReportService) {
    console.log("载入CompanyProductDetailController");
     $scope.productType = GlobalService.companyType;
    if($routeParams.id != null){
        CompanyProductsService.getCompanyProductsDetail($routeParams.id).then(function(result){
           $scope.productDetail = result;
        });
        CompanyPubReportService.getCompanyPubReportDetail($routeParams.id).then(function(result){
            $scope.productPubReport = result;
        })
        CompanyPriReportService.getCompanyPriReportDetail($routeParams.id).then(function(result){
            $scope.productPriReport = result;
        })
    }
}