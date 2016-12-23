function InnovationController($scope,GlobalService) {
	console.log("载入InnovationController");
	$socpe.innovationList = GlobalService.innovationList;
	$scope.currentPage=$scope.innovationList[0][1];

	//$scope.newsList = 
}