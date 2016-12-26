function companyPubReportController($scope,companyService) {
  console.log("载入companyPubReportController");
  companyService.getPubReportList().then(function(result){
      console.log(result);
      $scope.pubReportList = result;
      $scope.pageCount = 5;
	  $scope.pageSize = 4;
	  $scope.total = 50;
  })
  //设置当前测评
  $scope.setCurrentPubReport = function(report) {
  	//alert('user:' + (user || 'world') + '!');
    $scope.currentPubReport = report;
  }
  //设置按审核状态过滤方式
  $scope.setFilterType = function(newType) {
  	//alert('newType:' + newType + '!');
    $scope.filterType = newType;
  }
  //测评上线／下线
  $scope.setPubReportState = function(id,newState) {
    companyService.setPubReportState(id,newState);
  }
  //搜索
  $scope.getPubReportByName = function(name) {
    companyService.getPubReportByName(name);
  }
}