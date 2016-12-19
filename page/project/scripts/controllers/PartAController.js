function PartAController($scope,DataService) {
  console.log("载入PartAController");
  DataService.dataList().then(function(result){
      $scope.userList = result;
  })
}