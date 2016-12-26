function CompanyTestController($scope,Upload) {
	console.log("CompanyTestController");
	$scope.tmpProduct={};
	$scope.companyName="小软酱有限公司";
	$scope.deleteID ="";
	$scope.testList =[
	{
		"testProductID":"321-123-321",
		"testProductName":"流体力学方向盘",
		"testDate":"2016/10/10",
		"testTeamName":"小江测评团",
		"testLocation":"上海市杨浦区"
	},
	{
		"testProductID":"321-123-321",
		"testProductName":"流体力学方向盘",
		"testDate":"2016/10/10",
		"testTeamName":"小江测评团",
		"testLocation":"上海市杨浦区"
	}
	];


	//弹出框
	$scope.TestProductNameList=["轮胎","车门","车床","后座"];
	$scope.setModalStatus = function(statusName){
		$scope.modalStatus = statusName;
	}


	$scope.pageCount = 5;
	$scope.pageSize = 4;
	$scope.total = 50;



}