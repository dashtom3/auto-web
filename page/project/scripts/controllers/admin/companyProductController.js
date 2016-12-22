function companyProductController($scope,companyService) {
  console.log("载入companyProductController");
  companyService.getProductList().then(function(result){
      console.log(result);
      $scope.productList = result;
      $scope.pageCount = 5;
	  $scope.pageSize = 4;
	  $scope.total = 50;
  })
  //根据分类获取产品
  $scope.getProductListByTag = function(productTag) {
      //TODO
  	  companyService.getProductListByTag(productTag).then(function(result){
      $scope.productList = result;
    })
  }
  //设置当前产品
  $scope.setCurrentProduct = function(product) {
  	//alert('user:' + (user || 'world') + '!');
    $scope.currentProduct = product;
  }
  //设置按审核状态过滤方式
  $scope.setFilterType = function(newType) {
  	//alert('newType:' + newType + '!');
    $scope.filterType = newType;
  }
  //产品上线／下线
  $scope.setProductState = function(id,newState) {
    companyService.setProductState(id,newState);
  }
  //搜索
  $scope.getProductByName = function(name) {
    companyService.getProductByName(name);
  }
}