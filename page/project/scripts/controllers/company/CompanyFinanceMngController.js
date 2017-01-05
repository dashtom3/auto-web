function CompanyFinanceMngController($scope,CompanyFinanceService) {
	console.log("CompanyFinanceMngController");
	$scope.tmpItem={};

	//数据初始化
	$scope.pageSize = 50;
	$scope.currentPage = 1;
	$scope.cmpId = $scope.leafCmpId;
	getData();

	function getData(){
		loadCompanyFinanceData($scope.pageSize,1);
	}

	function loadCompanyFinanceData(pagePerNum,currentPage){
		console.log("readData");
		CompanyFinanceService.getCompanyFinanceList($scope.cmpId,"","",pagePerNum,currentPage).then(function(result){
			$scope.financeList= result.list;
			console.log($scope.financeList);
			$scope.currentPage = result.currentPage;
			$scope.total = result.totalNum;
		});
	}

	$scope.addFinance = function(){
		if (!validate()){
			return;
		}
		financeItem = new Object();
		financeItem.year = $scope.year;
		financeItem.ratio = $scope.winRate;
		financeItem.input = $scope.winMoney;
		financeItem.increase = $scope.winMoneyRate;
		financeItem.allCapital = $scope.totalProperty;
		financeItem.realCapital = $scope.trueProperty;
		financeItem.allRatio = $scope.grossProfitRate;
		financeItem.realRatio = $scope.netProfitRate;
		financeItem.debtRatio = $scope.assetLiabilityRatio;
		financeItem.inputRatio = $scope.returnOnAssets;
		//financeItem.hideEdit = true;
		CompanyFinanceService.addCompanyFinance(financeItem).then(function(result){
			getData();
			init();
			$scope.showAddPanel = false;
		});
		
	};
	$scope.addNewFinance = function(){
		init();
		$scope.showAddPanel = true;
	};
	$scope.cancelAdd = function(){
		init();
		$scope.showAddPanel = false;
	}

	//点击编辑按钮，开始编辑
	$scope.editPastFinance = function(finance){
		$scope.tmpItem = finance;
		$scope.tmpItem.hideEdit = false;
	}

	//点击取消按钮，取消编辑
	$scope.cancelEditPastFinance = function(finance){
		$scope.tmpItem = finance;
		$scope.tmpItem.hideEdit = true;
		getData();
	}

	//点击确认按钮，保存编辑
	$scope.savePastFinance = function(finance){
		console.log(finance);
		$scope.tmpItem = finance;
		$scope.tmpItem.hideEdit = true;
		if (!validate_money($scope.tmpItem.money)){
			console.log("钱不对");
			return false;
		}else {
			CompanyFinanceService.updateCompanyFinance(finance).then(function(result){
				getData();
			});
		}

	}

	$scope.deletePastFinance =function(finance){
		$scope.deleteFinance = finance;
	}
	$scope.confirmDelete = function(){
		CompanyFinanceService.deleteCompanyFinance($scope.deleteFinance._id).then(function(result){
			getData();
		});

	};


	
	function validate(){
		var flag = true;
		if (!validate_money($scope.winMoney)){
			$scope.invalidWinMoney = true;
			flag = false;
		}
		if (!validate_year( $scope.year)){
			$scope.invalidYear = true;
			flag = false;
		}
		return flag;
	}
	function validate_money(money){
		if (money == ""){
			return false;
		}
		return true;
	}
	function validate_year( newYear ){
		for (i in $scope.financeList){
			if (newYear == $scope.financeList[i].year){
				return false;
			}
		}
		return true;
	}
	function init(){
		$scope.invalidYear = false;
		$scope.invalidWinMoney = false;
		$scope.year = "";
		$scope.winRate = "";
		$scope.winMoney = "";
		$scope.winMoneyRate = "";
		$scope.totalProperty = "";
		$scope.trueProperty = "";
		$scope.grossProfitRate = "";
		$scope.netProfitRate = "";
		$scope.assetLiabilityRatio = "";
		$scope.returnOnAssets = "";
	}
	var cloneObj = function (obj) {  
		var newObj = {};  
		if (obj instanceof Array) {  
			newObj = [];  
		}  
		for (var key in obj) {  
			var val = obj[key];  
			newObj[key] = typeof val === 'object' ? cloneObj(val): val;  
		}  
		return newObj;  
	};
}