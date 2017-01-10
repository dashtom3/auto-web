function CompanyFinanceController($scope,GlobalService,$filter,CompanyFinanceService) {
  console.log("CompanyFinanceController");
  console.log($scope.leafShowStatus);
  $scope.cmpID = "585b7d66b6a493e45ea96060";
  $scope.finances = {
    currentPage:1,
    pagePerNum:4,
    totalNum:-1,
    totalPage:-1,
  }
  if ($scope.leafShowStatus == "公司概况"){
    $scope.status = "cmpDetailShow";
    $scope.finances.pagePerNum = 1;
  }
  
  loadCompanyFinanceData($scope.finances.pagePerNum, $scope.finances.currentPage);
  function loadCompanyFinanceData(pagePerNum,currentPage){
    CompanyFinanceService.getCompanyFinanceList($scope.cmpID,"","",pagePerNum,currentPage).then(function(result){
    if($scope.financeList){
      $scope.financeList = $scope.financeList.concat(result.list);
    }else{
      $scope.financeList= result.list;
    }
    $scope.finances.currentPage = result.currentPage;
    $scope.finances.totalNum = result.totalNum;
    $scope.finances.totalPage = result.totalPageNum;
  });
  }
  $scope.loadMore=function(){
    if($scope.finances.currentPage < $scope.finances.totalPage){
      loadCompanyFinanceData($scope.finances.pagePerNum,$scope.finances.currentPage+1);
    }
  };
}