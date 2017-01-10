function CompanyMainController($scope,AuthService) {
    console.log("CompanyMainController");
    $scope.currentPage = "companyBasicInfo";
    $scope.toPage = function(pageName){
        $scope.currentPage = pageName;
    }
    // $scope.cmpId ="585b7d66b6a493e45ea96060"; 
    // $scope.leafCmpId ="585b7d66b6a493e45ea96060"; 
    // AuthService.companyLogin("companytest123","aabbccdd").then(function(res){
    // 	$scope.rootCompany = res;
    // 	console.log($scope.rootCompany);
    //   $scope.companyLogo = $scope.rootCompany.logo;
    //   $scope.companyName = $scope.rootCompany.longName;
    // });
  

    initCompany();

    function initCompany(){
        if (AuthService.company){
            console.log(AuthService.company);
            $scope.cmpId =AuthService.company._id; 
            $scope.leafCmpId =AuthService.company._id;
            $scope.companyLogo = AuthService.company.logo;
            $scope.companyName = AuthService.company.longName; 
        }else {
            alert("Invalid User");
        }
    }
}