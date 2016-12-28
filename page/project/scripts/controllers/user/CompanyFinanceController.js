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
  // $scope.financeList=[
  //      {
  //        "_id": "5861d2a659a4d64a50bf2ee9",
  //        "companyId": "585b7d66b6a493e45ea96060",
  //        "year": 2015,
  //        "ratio": "45",
  //        "input": "1000000",
  //        "increase": "",
  //        "allCapital": "",
  //        "realCapital": "",
  //        "allRatio": "",
  //        "realRatio": "",
  //        "debtRatio": "",
  //        "inputRatio": ""
  //      },
  //      {
  //        "_id": "5861d4d9630a764aff64eeb4",
  //        "companyId": "585b7d66b6a493e45ea96060",
  //        "year": 1998,
  //        "ratio": "45",
  //        "input": "100000",
  //        "increase": "",
  //        "allCapital": "",
  //        "realCapital": "",
  //        "allRatio": "",
  //        "realRatio": "",
  //        "debtRatio": "",
  //        "inputRatio": ""
  //      },
  //      {
  //        "_id": "5861d50f630a764aff64eeb7",
  //        "companyId": "585b7d66b6a493e45ea96060",
  //        "year": 1991,
  //        "ratio": "",
  //        "input": "100000",
  //        "increase": "12",
  //        "allCapital": "",
  //        "realCapital": "",
  //        "allRatio": "",
  //        "realRatio": "",
  //        "debtRatio": "",
  //        "inputRatio": "30"
  //      }
  //    ];
}