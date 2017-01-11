function companyPriReportController($scope,CompanyService,CompanyPriReportService) {
  console.log("载入companyPriReportController");
  //TODO 后端接口未完成
   //初始化数据
  CompanyPriReportService.getCompanyPriReportList("","","","","","","","","","","","","","","","","",10,1)
    .then(function(result){
    $scope.priReportList = result.list;
      $scope.currentPriReport = result.list[0];
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
  				"name":"已通过",
  				"id":"1",
  			},
  			{
  				"name":"待审核",
  				"id":"0",
      },{
          "name":"未通过",
          "id":"-1",
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
   $scope.getCompanyPriReportList = function(type,option,searchWord){
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
    CompanyPriReportService.getCompanyPriReportList("",searchWord,"","","","","","","","","",isPassed,"","","","","",10,1)
      .then(function(result){
      $scope.priReportList = result.list;
      //记录审核分类和行业分类选择，为分页做准备
      $scope.passFlag = isPassed;
      //重置为第一页
      $scope.currentPage=1;
	    $scope.total = result.totalNum;
    });
  };
  $scope.setCurrentPriReport = function(data){
    $scope.currentPriReport = data;
  }
  $scope.getSignUser = function(priReport){
    $scope.currentPriReport = priReport;
    CompanyPriReportService.getCompanyPriReportToPassList(priReport._id).then(function(result){
      $scope.signUserList = result;
    })
  } 
  //获取用户测评评论
  $scope.getPriReportContent = function(flag) {
  	//alert('user:' + (user || 'world') + '!');
    if(flag=='1'){
        $scope.userFilter = '1';
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
    }
    else{
        $scope.contentFilter = '-1';
    }
  }
  //设置审核
  $scope.passPriReport = function(id,state){
    CompanyPriReportService.changeCompanyPriReportState(id,state).then(function(result){
      CompanyPriReportService.getCompanyPriReportList("","","","","","","","","","","",$scope.passFlag,"","","","","",10,$scope.currentPage)
      .then(function(result){
        $scope.priReportList = result.list;
      //记录审核分类和行业分类选择，为分页做准备
        // $scope.passFlag = state;
        $scope.total = result.totalNum;
      });
    });
  }
  //设置上下线
  $scope.setPriReport = function(id,isOnline){
     CompanyPriReportService.changeCompanyPriReportOnlineAdmin(id,isOnline).then(function(result){
        CompanyPriReportService.getCompanyPriReportList("","","","","","","","","","","",$scope.passFlag,"","","","","",10,$scope.currentPage)
        .then(function(result){
        $scope.priReportList = result.list;
      //记录审核分类和行业分类选择，为分页做准备
        //$scope.passFlag = state;
        $scope.total = result.totalNum;
        });
     })
  }
//   //搜索
//   $scope.getPriReportByName = function(name) {
//     CompanyService.getPriReportByName(name);
//   }
}