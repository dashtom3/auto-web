function CompanyUserTestController($scope,Upload) {
	console.log("CompanyUserTestController");
	$scope.tmpProduct={};
	$scope.companyName="小软酱有限公司";
	$scope.deleteID ="";
	$scope.userTestList = [
	{
		"userTestID":"123",
		"userTestName":"1-2-3",
		"userTestProduct":"小米轮胎",
		"userTestDate":"2016/12/1-2016/12/2",
		"userTestType":"线下",
		"userTestStatus":"待审核",
		"numberLimit":"100",
		"numberSign":"0",
		"numberPass":"0"
	},
	{
		"userTestID":"123",
		"userTestName":"1-2-3",
		"userTestProduct":"小米轮胎",
		"userTestDate":"2016/12/1-2016/12/2",
		"userTestType":"线下",
		"userTestStatus":"已发布",
		"numberLimit":"100",
		"numberSign":"50",
		"numberPass":"40"
	}
	];
	$scope.btnShowParticipant = function(){
		;
	};


	//弹出框
	$scope.userTestProductNameList=["轮胎","车门","车床","后座"];
	$scope.setModalStatus = function(statusName){
		$scope.modalStatus = statusName;
	}





	//新评分参数
	$scope.addTagList = [];
	
	$scope.newTag = function(){
		$scope.tmpTagName = "";
	}
	$scope.confirmNewTag = function(){
		console.log("tmpTagName")
		$scope.addTagList.push($scope.tmpTagName);
		console.log($scope.addTagList);
		$scope.tmpTagName = "";
		console.log($scope.addTagList);
	}
	$scope.cancelNewTag = function(){
		$scope.tmpTagName = "";
	}
	$scope.deleteTag = function(tag){
		for (i in $scope.addTagList){
			if (tag == $scope.addTagList[i]){
				$scope.addTagList.splice(i,1);
			}
		}
	}

	$scope.pageCount = 5;
	$scope.pageSize = 4;
	$scope.total = 50;
}