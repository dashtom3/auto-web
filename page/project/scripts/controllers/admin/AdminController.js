function AdminController($scope,AuthService,$location) {
  console.log("载入AdminController");
  $scope.testShow = false;
  $scope.currentPage = "userList";

  $scope.toggleTestList = function(){
  		$scope.testShow = !$scope.testShow;
  }
  // if(AuthService.user){
  // 	if(AuthService.user.userType == "admin"){
  // 		$scope.currentPage = "userList";
  // 	}else{
  // 		$location.path("admin");
  // 	}
  // }else{
  // 	$location.path("admin");
  // }

  $scope.setPage = function(page) {
    $scope.currentPage = page;
  }
}