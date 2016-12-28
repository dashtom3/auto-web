function InnovationTestController($scope,GlobalService) {
  $scope.navList = [
  	{
  		"name":"状态",
  		"id":"1",
  		"optionList":[
  			{
  				"name":"全部",
  				"id":"0",
  			},
  			{
  				"name":"已测评",
  				"id":"1",
  			},
  			{
  				"name":"测评中",
  				"id":"2",
  			},
  		]
  	},
  	{
  		"name":"时间",
  		"id":"2",
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
  		],
  	},
  	{
  		"name":"类型",
  		"id":"3",
  		"optionList":[
  			{
  				"name":"全部",
  				"id":"0",
  			},
  			{
  				"name":"实地",
  				"id":"1",
  			},{
  				"name":"邮寄",
  				"id":"2",
  			}
  		],
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
  $scope.setCurrentOption = function(type,option){
  	for ( i in $scope.currentOptionList){
  		if ($scope.currentOptionList[i].type == type){
  			$scope.currentOptionList[i].current = option;
  		}
  	}
  };


  $scope.testList = [{},{},{},{},{},{},{},{}];

  $scope.liList = [
    {
      "num":"0"
    },
    {
      "num":"1"
    },
    {
      "num":"2"
    }
  ];
  $scope.carouselList = [
    {
      "url":"page/project/images/company/warn.png",
      "num":"0"
    },
    {
      "url":"page/project/images/company/edit.png",
      "num":"1"
    },
    {
      "url":"page/project/images/company/delete.png",
      "num":"2"
    }
  ];
  $scope.currentCarouse = $scope.liList[0].num;
  $scope.setCurrentCarouse = function(num){
     $scope.currentCarouse = num;
  }
  $scope.moveLeft = function(){
    if ($scope.currentCarouse == "0"){
      $scope.currentCarouse = $scope.liList.length - 1;
    }else{
      $scope.currentCarouse --;
    }
  }
  $scope.moveRight = function(){
    if ($scope.currentCarouse == $scope.liList.length - 1){
      $scope.currentCarouse = 0;
    }else{
      $scope.currentCarouse ++;
    }
  }
}