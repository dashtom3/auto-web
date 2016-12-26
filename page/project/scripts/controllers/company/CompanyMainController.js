function CompanyMainController($scope) {
  console.log("CompanyMainController1");
  $scope.currentPage = "companyUserTest";
  $scope.toPage = function(pageName){
  	$scope.currentPage = pageName;
  } 
}