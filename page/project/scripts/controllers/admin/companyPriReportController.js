function companyPriReportController($scope,CompanyService) {
  console.log("载入companyPriReportController");
//   companyService.getPriReportList().then(function(result){
//       console.log(result);
//       $scope.priReportList = result;
//       $scope.pageCount = 5;
// 	  $scope.pageSize = 4;
// 	  $scope.total = 50;
//       $scope.userList = '';
//       $scope.contentList = '';
//   })

  $scope.priReportList = [
{
    "_id":"111",
    "title":"ts1",
    "companyName":"xj",
    "product":"aaa",
    "desc":"aaa",
    "date":"xxx",
    "type":"1",
    "state":"1",
    "maxUserNum":"20",
    "signUserNum":"13",
    "passUserNum":"5"
},
{
    "_id":"111",
    "title":"ts1",
    "companyName":"xj",
    "product":"aaa",
    "desc":"aaa",
    "date":"xxx",
    "type":"1",
    "state":"1",
    "maxUserNum":"20",
    "signUserNum":"13",
    "passUserNum":"5"
},
{
    "_id":"111",
    "title":"ts1",
    "companyName":"xj",
    "product":"aaa",
    "desc":"aaa",
    "date":"xxx",
    "type":"1",
    "state":"1",
    "maxUserNum":"20",
    "signUserNum":"13",
    "passUserNum":"5"
}
];
      $scope.pageCount = 5;
	  $scope.pageSize = 4;
	  $scope.total = 50;
      $scope.userList = '';
      $scope.contentList = '';

  //获取用户测评评论
  $scope.getPriReportContent = function(flag) {
  	//alert('user:' + (user || 'world') + '!');
    if(flag=='1'){
        $scope.userFilter = '1';
        alert('haha'+flag);
    }
    else{
        $scope.userFilter = '0';
    }
  }
  //获取报名用户列表
  $scope.getUserList = function(flag) {
  	//alert('newType:' + newType + '!');
    if(flag=='1'){
        $scope.contentFilter = '1';
    }
    else if(flag=='0'){
        $scope.contentFilter = '0';
        alert('haha'+flag);
    }
    else{
        $scope.contentFilter = '-1';
    }
  }
//   //搜索
//   $scope.getPriReportByName = function(name) {
//     CompanyService.getPriReportByName(name);
//   }
}