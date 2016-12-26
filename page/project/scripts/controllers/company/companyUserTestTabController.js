function CompanyUserTestTabController($scope,Upload) {
	$scope.currentTab = "testedUser";
	$scope.toTab = function(tabName){
		$scope.currentTab=tabName;
		console.log($scope.currentTab);
	}
	$scope.userList = [
	{
		"userName":"宝马嘛嘛嘛没",
		"testTime":"2016/11/30",
		"testContent":"多DUU嘟嘟嘟嘟嘟嘟嘟嘟嘟",
		"outlookRate":"4",
		"colorRate":"4",
		"quanlityRate":"2",
		"sensityRate":"3",
		"mailAddress":"上海市杨浦区阳浦路100号",
		"registerTime":"2016/11/20"
	},
	{
		"userName":"宝马嘛嘛嘛没",
		"testTime":"2016/11/30",
		"testContent":"多DUU嘟嘟嘟嘟嘟嘟嘟嘟嘟",
		"outlookRate":"4",
		"colorRate":"4",
		"quanlityRate":"2",
		"sensityRate":"3",
		"mailAddress":"上海市杨浦区阳浦路100号",
		"registerTime":"2016/11/20"
	}
	]

	//星星评分
	$scope.max = 5;
	$scope.readonly = true;
	$scope.onHover = function(val){
		$scope.hoverVal = val;
	};
	$scope.onLeave = function(){
		$scope.hoverVal = null;
	}
	$scope.onChange = function(val){
		$scope.ratingVal = val;
	}


	//点击加载更多
	$scope.pageIndex=1;
	$scope.pageSize =5;
	$scope.totalUser = 28;

	var getRestUser = function(){
		var tmp = $scope.totalUser-$scope.userList.length;
		if (tmp >0) {
			$scope.loadMoreText = "还剩"+tmp+"条,点击加载更多";
		}else{
			$scope.loadMoreText = "没有更多了";
		}
		return tmp;
	};
	$scope.restUser = getRestUser();
	$scope.loadMoreText = "还剩"+$scope.restUser+"条,点击加载更多";
	$scope.loadMore= function(){
		$scope.pageIndex ++;
		//在这里向服务器获取一个pageSize的数据。
	};
	
}