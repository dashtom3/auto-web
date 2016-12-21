function userListController($scope,adminService) {
  console.log("载入userListController");
  adminService.getUserList().then(function(result){
      console.log(result);
      $scope.userList = result;
      $scope.passFlag = '';
      $scope.type = '';
  })
  //设置目前用户
  $scope.setCurrentUser = function(user) {
  	//alert('user:' + (user || 'world') + '!');
    $scope.currentUser = user;
  }
  //设置过滤方式
  $scope.setType = function(newType) {
  	//alert('newType:' + newType + '!');
    $scope.type = newType;
  }
  //用户审核
  $scope.setIsPass = function(isPass) {
    $scope.passFlag = isPass;
  }
}