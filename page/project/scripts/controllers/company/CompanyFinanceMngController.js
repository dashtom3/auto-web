function CompanyFinanceMngController($scope) {
	console.log("CompanyFinanceMngController");
	$scope.tmpItem={};
	$scope.financeList = [
	{"year":"2015",
	"winRate":"1.5",
	"winMoney":"100",
	"winMoneyRate":"1.7",
	"totalProperty":"150",
	"trueProperty":"100",
	"grossProfitRate":"1.6",
	"netProfitRate":"1.2",
	"assetLiabilityRatio":"1.3",
	"returnOnAssets":"2",
	"hideEdit":"true"
	},
	{"year":"2014",
	"winRate":"1.5",
	"winMoney":"100",
	"winMoneyRate":"1.7",
	"totalProperty":"150",
	"trueProperty":"100",
	"grossProfitRate":"1.6",
	"netProfitRate":"1.2",
	"assetLiabilityRatio":"1.3",
	"returnOnAssets":"2",
	"hideEdit":"true"
	}
]
$scope.addFinance = function(){
	if (!validate()){
		return;
	}
	financeItem = new Object();
	financeItem.year = $scope.year;
	financeItem.winRate = $scope.winRate;
	financeItem.winMoney = $scope.winMoney;
	financeItem.winMoneyRate = $scope.winMoneyRate;
	financeItem.totalProperty = $scope.totalProperty;
	financeItem.trueProperty = $scope.trueProperty;
	financeItem.grossProfitRate = $scope.grossProfitRate;
	financeItem.netProfitRate = $scope.netProfitRate;
	financeItem.assetLiabilityRatio = $scope.assetLiabilityRatio;
	financeItem.returnOnAssets = $scope.returnOnAssets;
	financeItem.hideEdit = true;
	$scope.financeList.push(financeItem);
	console.log($scope.financeList);
	init();
	$scope.showAddPanel = false;
};
$scope.addNewFinance = function(){
	init();
	$scope.showAddPanel = true;
};
$scope.cancelAdd = function(){
	init();
	$scope.showAddPanel = false;
}
$scope.editPastFinance = function(mYear){
	var item = getItemByYear(mYear);
	// for (i in item){
	// 	item[i] = Number(item[i]);
	// }
	$scope.tmpItem = cloneObj(item);
	item.hideEdit = false;
	console.log($scope.tmpItem);

}
$scope.deletePastFinance =function(mYear){
	for (i in $scope.financeList){
		if (mYear == $scope.financeList[i].year)
			$scope.financeList.splice(i,1);
	}
	console.log("http上传 删除item");
}
$scope.cancelEditPastFinance = function(mYear){
	for (i in $scope.financeList){
		if (mYear == $scope.financeList[i].year)

			$scope.financeList.splice(i,1,$scope.tmpItem);
	}
}
$scope.savePastFinance = function(mYear){
	var item = getItemByYear(mYear);
	item.hideEdit = true;
	if (!validate_money(item.money)){
		console.log("钱不对");
		return false;
	}else {
		console.log("http上传");
	}

}
function getItemByYear(mYear){
	for (i in $scope.financeList){
		if (mYear == $scope.financeList[i].year)
			return $scope.financeList[i];
	}
} 
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