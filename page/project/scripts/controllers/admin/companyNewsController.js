function companyNewsController($scope,companyService) {
  console.log("载入companyNewsController");
  companyService.getNewsList().then(function(result){
      console.log(result);
      $scope.newsList = result;
      $scope.pageCount = 5;
	  $scope.pageSize = 4;
	  $scope.total = 50;
  })
  //设置当前资讯
  $scope.setCurrentNews = function(product) {
  	//alert('user:' + (user || 'world') + '!');
    $scope.currentNews = product;
  }
  //设置按审核状态过滤方式
  $scope.setFilterType = function(newType) {
  	//alert('newType:' + newType + '!');
    $scope.filterType = newType;
  }
  //资讯上线／下线
  $scope.setNewsState = function(id,newState) {
    companyService.setNewsState(id,newState);
  }
  //搜索
  $scope.getNewsByName = function(name) {
    companyService.getNewsByName(name);
  }
}