function userListController($scope,userService) {
  console.log("载入userListController");
  userService.getgetUserList().then(function(result){
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
  //设置当前选择的审核分类
  $scope.setcurrentPassFlag = function(passFlag) {
    $scope.currentPassFlag = passFlag;
  }
  //通过/否决审核
  $scope.passUser = function(passFlag) {
    userService.passUser(passFlag);
  }
  //用户权限更改
  $scope.updateUserType = function(newType) {
    userService.updateUserType(newType);
  }

}