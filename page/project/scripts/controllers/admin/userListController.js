function userListController($scope,UserService) {
  console.log("载入userListController");
  //数据初始化
  UserService.getUserList(10,1,'','').then(function(result){
      $scope.userList = result.list;
      //审核类型
      $scope.type = '';
      //分页
	    $scope.pageSize = 10;
	    $scope.total = result.totalNum;
  })
   //分类目录
  $scope.navList = [
  	{
  		"name":"审核状态",
  		"optionList":[
        {
  				"name":"全部",
  				"id":'',
  			},
        {
  				"name":"已通过",
  				"id":"1",
  			},
  			{
  				"name":"待审核",
  				"id":"0",
  			},
  			{
  				"name":"未通过",
  				"id":"－1",
      }]
  	}
  ];
  //高亮选中的分类
  $scope.currentOptionList = getCurrentOptionList();
  function getCurrentOptionList(){
  	var tmp = [];
  	for (i in $scope.navList){
  		var obj=new Object(); 
  		obj.type = $scope.navList[i].name;
  		obj.current = $scope.navList[i].optionList[0].name;
  		tmp.push(obj);
  	}
  	return tmp;
  }
  $scope.isCurrentOption = function(type,option){
  	for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			if ($scope.currentOptionList[i].current == option){
  				return true;
  			}
  		}
  	}
  	return false;
  };
  //获取用户：按审核状态、搜索
  $scope.getlist = function(type,newType) {
    //高亮选中分类
    for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			$scope.currentOptionList[i].current = newType;
  		}
  	}
  	//alert('newType:' + newType + '!');
    UserService.getUserList(10,1,newType,'')
      .then(function(result){
      $scope.userList = result.list;
      $scope.type = newType;
      $scope.currentPage=1;
	    $scope.total = result.totalNum;
    });
  }
  //设置目前用户
  $scope.setCurrentUser = function(user) {
  	//alert('user:' + (user || 'world') + '!');
    $scope.currentUser = user;
  }
  //通过/否决审核
  $scope.passUser = function(id,passFlag) {
    //alert('pass:' + passFlag + '!');
    UserService.passUser(id,passFlag);
  }
  //用户权限更改
  $scope.updateUserType = function(id,newType) {
    //alert(newType);
    UserService.updateUserType(id,newType);
  }
  //分页
  $scope.changePage = function(page){
  //console.log(page+'...'+$scope.type);
  UserService.getUserList(10,page,$scope.type,'')
      .then(function(result){
      $scope.userList = result.list;
	    $scope.total = result.totalNum;
    });
 }
 //搜索 
 $scope.searchUser = function(word) {
    //alert(word);
    UserService.getUserList(10,1,'',word)
      .then(function(result){
      $scope.userList = result.list;
      $scope.currentPage=1;
	    $scope.total = result.totalNum;
    });
  }

}