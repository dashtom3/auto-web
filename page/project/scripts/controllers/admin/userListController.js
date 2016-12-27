function userListController($scope,UserService) {
  console.log("载入userListController");
  UserService.getUserList(10,1,'').then(function(result){
      $scope.userList = result.list;
      //审核类型
      $scope.type = '';
      //分页
	    $scope.pageSize = 10;
	    $scope.total = result.totalNum;
  })
  //设置目前用户
  $scope.setCurrentUser = function(user) {
  	//alert('user:' + (user || 'world') + '!');
    $scope.currentUser = user;
  }
  //按是否通过审核获取用户
  $scope.getlist = function(newType) {
  	//alert('newType:' + newType + '!');
    UserService.getUserList(10,1,newType)
      .then(function(result){
      $scope.userList = result.list;
      $scope.type = newType;
      $scope.currentPage=1;
	    $scope.total = result.totalNum;
    });
  }
  //通过/否决审核
  $scope.passUser = function(id,passFlag) {
    //alert('pass:' + passFlag + '!');
    // UserService.passUser(id,passFlag);
  }
  //用户权限更改
  $scope.updateUserType = function(newType) {
    // UserService.updateUserType(newType);
  }
  //分页
  $scope.changePage = function(page){
  //console.log(page+'...'+$scope.type);
  UserService.getUserList(10,page,$scope.type)
      .then(function(result){
      $scope.userList = result.list;
	    $scope.total = result.totalNum;
    });
 }

}