function CompanyMainController($scope,AuthService) {
  console.log("CompanyMainController1");
  $scope.currentPage = "companyUserTest";
  $scope.toPage = function(pageName){
  	$scope.currentPage = pageName;
  }
  $scope.cmpId ="585b7d66b6a493e45ea96060"; 
  AuthService.companyLogin("companytest123","aabbccdd").then(function(res){
  	$scope.rootCompany = res;
  	console.log($scope.rootCompany);
  	});
}