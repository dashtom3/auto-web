angular.module("auto-biz-user").controller("companyPriReportController",["$scope","CompanyService","CompanyPriReportService",
function companyPriReportController($scope,CompanyService,CompanyPriReportService) {
  console.log("载入companyPriReportController");
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
  		"name":"审核状态",
  		"optionList":[
        {
  				"name":"全部",
  				"id":"",
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
    console.log(searchWord);
    for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			$scope.currentOptionList[i].current = option.name;
  		}
  	}
	  console.log(type+option);
    var isPassed=$scope.passFlag;
    if(type=="审核状态"){
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
  //点击报名审核，获取报名用户
  $scope.getSignUser = function(priReport){
    $scope.currentPriReport = priReport;
    loadPriReportSignUser(priReport._id,"");
  } 
  // 根据参数获取报名用户列表
  $scope.getUserList = function(passed){
    loadPriReportSignUser($scope.currentPriReport._id,passed);
  }
  //点击报名审核，获取报名用户
  $scope.getPassUser = function(priReport){
    $scope.currentPriReport = priReport;
    loadPriReportPassUser(priReport._id,"");
  }
  //根据参数获取报名评论列表
  $scope.getPassUserList = function(passed){
    loadPriReportPassUser($scope.currentPriReport._id,passed);
  }
  function loadPriReportSignUser(reportId,passed){
    CompanyPriReportService.getReportSignUser(reportId,passed).then(function(result){
       $scope.signUserList = result;
       console.log(result);
    })
  }
  function loadPriReportPassUser(reportId,passed){
    CompanyPriReportService.getReportPassUser(reportId,passed).then(function(result){
       $scope.passUserList = result;
       console.log(result);
    })
  }
  //改变审核状态
  $scope.approveUser = function(user){
    console.log(user);
    CompanyPriReportService.passCompanyPriReport($scope.currentPriReport._id,user.signUser.userId[0]._id,1).then(function(result){
        console.log(result);
        user.signUser.passed = "1";
    });
  }
  $scope.denyUser = function(user){
    console.log(user);
    console.log("no");
    CompanyPriReportService.passCompanyPriReport($scope.currentPriReport._id,user.signUser.userId[0]._id,-1).then(function(result){
        console.log(result);
        user.signUser.passed = "-1";
    });
  }
  $scope.approveComment = function(user){
    console.log(user);
    CompanyPriReportService.passCommentCompanyPriReport($scope.currentPriReport._id,user.passUser.userId[0]._id,1).then(function(result){
        console.log(result);
        user.signUser.passed = "1";
    });
  }
  $scope.denyComment = function(user){
    CompanyPriReportService.passCommentCompanyPriReport($scope.currentPriReport._id,user.passUser.userId[0]._id,-1).then(function(result){
        console.log(result);
        user.signUser.passed = "-1";
    });
  };

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
  $scope.max = 5;
  $scope.onHover = function(val){
      $scope.hoverVal = val;
  };
  $scope.onLeave = function(){
      $scope.hoverVal = null;
  }
  $scope.onChange = function(val){
      $scope.ratingVal = val;
  }
}
]
);