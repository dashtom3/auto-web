function AdminController($scope,AuthService,$location) {
  console.log("载入AdminController");
  if(AuthService.user){
  	if(AuthService.user.userType == "admin"){
  		$scope.currentPage = "userList";
  	}else{
  		$location.path("loginAdmin");
  	}
  }else{
  	$location.path("loginAdmin");
  }

  $scope.setPage = function(page) {
    $scope.currentPage = page;
  }
}