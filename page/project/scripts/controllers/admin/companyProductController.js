function companyProductController($scope,CompanyProductsService) {
  console.log("载入companyProductController");
  //数据初始化
  CompanyProductsService.getCompanyProductsList("","","","","","","","",10,1).
    then(function(result){
      $scope.productsList = result.list;
      //alert($scope.productsList[0]);
      $scope.currentProducts = result.list[0];
      //审核分类、行业分类
      $scope.passFlag = '';
      $scope.companyType = '';
      //分页
	    $scope.pageSize = 10;
	    $scope.total = result.totalNum;
  })
  //分类目录
  $scope.navList = [
  	{
  		"name":"上线状态",
  		"optionList":[
        {
  				"name":"全部",
  				"id":'',
  			},
        {
  				"name":"上线",
  				"id":"true",
  			},
  			{
  				"name":"下线",
  				"id":"false",
      }]
  	},
  	{
  		"name":"标签",
      //CM汽车制造，CG汽车零部件，CS汽车销售与服务，NEC新能源汽车，NOC车联网，CC车用化工品，CE汽车金融，PT公共交通，MOC汽车媒体
  		"optionList":[
        {
  				"name":"全部",
  				"id":'',
  			},
        {
  				"name":"汽车制造",
  				"id":"CM",
  			},
  			{
  				"name":"汽车零部件",
  				"id":"CG",
  			},
  			{
  				"name":"汽车销售与服务",
  				"id":"CS",
        },
        {
  				"name":"新能源汽车",
  				"id":'NEC',
  			},
        {
  				"name":"车联网",
  				"id":"NOC",
  			},
  			{
  				"name":"车用化工品",
  				"id":"CC",
  			},
  			{
  				"name":"汽车金融",
  				"id":"CE",
        },
        {
  				"name":"PT公共交通",
  				"id":"PT",
  			},
  			{
  				"name":"汽车媒体",
  				"id":"MOC",
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
  //获取产品列表:按上线状态、按标签分类、搜索
   $scope.getCompanyproductsList = function(type,option,searchWord){
    //高亮选中分类
    for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			$scope.currentOptionList[i].current = option.name;
  		}
  	}
	  //console.log(type+option);
    //3个参数赋值
    var isPassed=$scope.passFlag;
    var newType=$scope.companyType;
    if(type=="上线状态"){
      isPassed=option.id;
    }
    if(type=="标签"){
      newType=option.id;
    }
    //console.log(isPassed+'###'+newType);
    //请求对应数据
    CompanyProductsService.getCompanyProductsList(searchWord,newType,isPassed,"","","","","",10,1)
      .then(function(result){
      $scope.productsList = result.list;
      //记录审核分类和行业分类选择，为分页做准备
      $scope.passFlag = isPassed;
      $scope.companyType = newType;
      //重置为第一页
      $scope.currentPage=1;
	    $scope.total = result.totalNum;
    });

  };
  //设置当前产品
  $scope.setCurrentProduct = function(product) {
  	//alert('user:' + (user || 'world') + '!');
    $scope.currentProduct = product;
  }
  //产品上线／下线
  $scope.setProductState = function(id,newState) {
    CompanyProductsService.changeCompanyProductsState(id,newState);
  }
  //分页
  $scope.changePage = function(page){
  CompanyProductsService.getCompanyProductsList("",$scope.companyType,$scope.passFlag,"","","","","",10,page)
      .then(function(result){
      $scope.productsList = result.list;
	    $scope.total = result.totalNum;
    });
 }
}