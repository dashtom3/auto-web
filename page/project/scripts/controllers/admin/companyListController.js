function companyListController($scope,CompanyService) {
  console.log("载入companyListController");
  //数据初始化
  CompanyService.getCompanyList(10,1,'','','')
    .then(function(result){
      console.log(result);
      $scope.companyList = result.list;
      $scope.currentUser = result.list[0];
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
  	},
  	{
  		"name":"行业",
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
  
  //获取企业列表:按审核状态、按行业分类、搜索
   $scope.setCurrentOption = function(type,option,searchWord){
    //高亮选中分类
    for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			$scope.currentOptionList[i].current = option.name;
  		}
  	}
	  console.log(type+option);
    //3个参数赋值
    var isPassed=$scope.passFlag;
    var newType=$scope.companyType;
    if(type=="审核状态"){
      isPassed=option.id;
    }
    if(type=="行业"){
      newType=option.id;
    }
    //console.log(isPassed+'###'+newType);
    //请求对应数据
    CompanyService.getCompanyList(10,1,isPassed,newType,searchWord)
      .then(function(result){
      $scope.companyList = result.list;
      //记录审核分类和行业分类选择，为分页做准备
      $scope.passFlag = isPassed;
      $scope.companyType = newType;
      //重置为第一页
      $scope.currentPage=1;
	    $scope.total = result.totalNum;
    });

  };
  //分页
  $scope.changePage = function(page){
  CompanyService.getCompanyList(10,page,$scope.passFlag,$scope.type,'')
      .then(function(result){
      $scope.companyList = result.list;
	    $scope.total = result.totalNum;
    });
 }
  //设置目前用户
  $scope.setCurrentCompany = function(user) {
  	//alert('user:' + (user || 'world') + '!');
    $scope.currentUser = user;
  }
  //通过/否决审核
  $scope.passUser = function(id,passFlag) {
    //alert('pass:' + passFlag + '!');
    CompanyService.passUser(id,passFlag);
  }
}