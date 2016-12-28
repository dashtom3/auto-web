function AdminController($scope,AuthService,$location) {
  console.log("载入AdminController");
  $scope.currentPage = "userList";
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