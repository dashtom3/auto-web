function AdminController($scope,AuthService,$location) {
  console.log("载入AdminController");
  $scope.testShow = false;

  $scope.currentPage = "userList";
  if(!AuthService.user){
    $location.path("/admin");
  }else{
    if(AuthService.user.userType != "admin"){
      $location.path("/admin");
    }
  }
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
  $scope.adminLogout = function(){
    AuthService.userLogout().then(function(result){
      $location.path("/admin");
      alert("退出登录成功");
    })
  }
}