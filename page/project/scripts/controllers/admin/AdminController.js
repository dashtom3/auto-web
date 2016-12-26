function AdminController($scope) {
  console.log("载入AdminController");
  $scope.currentPage = "userList";

  $scope.setPage = function(page) {
  	// alert('Hello ' + (page || 'world') + '!');
    $scope.currentPage = page;
  }
}