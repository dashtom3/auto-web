function companyPubReportController($scope,CompanyPubReportService) {
  console.log("载入companyPubReportController");
  //初始化数据
  CompanyPubReportService.getCompanyPubReportList("","","","","","","","",10,1)
    .then(function(result){
    $scope.pubReportList = result.list;
      $scope.currentPubReport = result.list[0];
      //审核分类
      $scope.passFlag = '';
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
  //获取列表:按上线状态、搜索
   $scope.getCompanyPubReportList = function(type,option,searchWord){
    //高亮选中分类
    for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			$scope.currentOptionList[i].current = option.name;
  		}
  	}
	  //console.log(type+option);
    var isPassed=$scope.passFlag;
    if(type=="上线状态"){
      isPassed=option.id;
    }
    //console.log(isPassed+'###'+newType);
    //请求对应数据
    CompanyPubReportService.getCompanyPubReportList(searchWord,isPassed,"","","","","","",10,1)
      .then(function(result){
      $scope.pubReportList = result.list;
      //记录审核分类和行业分类选择，为分页做准备
      $scope.passFlag = isPassed;
      //重置为第一页
      $scope.currentPage=1;
	    $scope.total = result.totalNum;
    });
  };


  //设置当前测评
  $scope.setCurrentPubReport = function(report) {
  	//alert('user:' + (user || 'world') + '!');
    $scope.currentPubReport = report;
  }
  //测评上线／下线
  $scope.setPubReportState = function(id,newState) {
    CompanyPubReportService.changeCompanyPubReportState(id,newState);
  }
  //分页
  $scope.changePage = function(page){
  CompanyPubReportService.getCompanyPubReportList("",$scope.passFlag,"","","","","","",10,page)
      .then(function(result){
      $scope.pubReportList = result.list;
	    $scope.total = result.totalNum;
    });
 }
}