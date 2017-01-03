function HeaderController($scope,GlobalService,$filter,AuthService) {
  console.log("载入HeaderController");
  $scope.headerItems = GlobalService.headerList;
  $scope.currentPage = "innovation";
  
}