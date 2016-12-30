function InnovationProductController($scope,CompanyProductsService) {
  //数据初始化
  CompanyProductsService.getCompanyProductsList("","","","","","","","",6,1).
    then(function(result){
      $scope.productsList = result.list;
      //时间分类、行业分类
      $scope.timeType = '';
      $scope.companyType = '';
      //加载更多
			$scope.currentPages = 6;
	    $scope.total = result.totalNum;
			//评分
  		$scope.ratingVal = 3;
  })
  //分类
  $scope.navList = [
  	{
  		"name":"时间",
  		"id":"0",
  		"optionList":[
  			{
  				"name":"全部",
  				"id":"0",
  			},
  			{
  				"name":"一周内",
  				"id":"1",
  			},
  			{
  				"name":"一个月内",
  				"id":"2",
  			},
  			{
  				"name":"一年内",
  				"id":"3",
  			},
            {
  				"name":"三年内",
  				"id":"4",
  			}
  		]
  	},
    {
  		"name":"分类",
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
  //默认高亮
  $scope.isCurrentOption = function(type,option){
  	for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			if ($scope.currentOptionList[i].current == option){
  				return true;
  			}
  		}
  	}
  	return false;
  }
  //根据选项获取产品
  $scope.getCompanyProductsList = function(type,option){
    //高亮选中
  	for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			$scope.currentOptionList[i].current = option.name;
  		}
  	}
    //获取数据
    var timeType=$scope.timeType;
    var companyType=$scope.companyType;
    if(type=="时间"){
        //TODO
      if(option.id==0) timeType='';
      else if(option.id==1) timeType=new Date().getTime() - 7*86400000;//一周
      else if(option.id==2) timeType=new Date().setMonth(new Date().getMonth()-1);
      else if(option.id==3) timeType=new Date().setFullYear(new Date().getFullYear()-1);
      else if(option.id==4) timeType=new Date().setFullYear(new Date().getFullYear()-3);
      else timeType='';
    }
    if(type=="分类"){
      companyType=option.id;
    }
		var testDate=new Date(timeType);
    //console.log(companyType+'###'+testDate);
    //请求对应数据
    CompanyProductsService.getCompanyProductsList('',companyType,'',"","","",timeType,"",6,1)
      .then(function(result){
      $scope.productsList = result.list;
      //记录审核分类和行业分类选择，为分页做准备
      $scope.timeType = timeType;
      $scope.companyType = companyType;
			$scope.currentPages = 6;
	    $scope.total = result.totalNum;
    });
  };
	//加载更多
  $scope.loadMore = function(){
  CompanyProductsService.getCompanyProductsList("",$scope.companyType,'',"","","",$scope.timeType,"",$scope.currentPages+6,1)
      .then(function(result){
      $scope.productsList = result.list;
	    $scope.total = result.totalNum;
			if($scope.total<$scope.currentPages){
				alert("没有更多数据了");
			}
			$scope.currentPages=$scope.currentPages+6;
			
    });
 }
 //跳转到产品详情
  $scope.toProductDetails = function(id){
			alert("产品："+id);
	}
	//跳转到公司介绍
	$scope.toCompany = function(id){
			alert("公司："+id);
	}

}