function CompanyFinanceController($scope,GlobalService,$filter) {
  console.log("CompanyFinanceController");
  $scope.financeList=[
       {
         "_id": "5861d2a659a4d64a50bf2ee9",
         "companyId": "585b7d66b6a493e45ea96060",
         "year": 2015,
         "ratio": "45",
         "input": "1000000",
         "increase": "",
         "allCapital": "",
         "realCapital": "",
         "allRatio": "",
         "realRatio": "",
         "debtRatio": "",
         "inputRatio": ""
       },
       {
         "_id": "5861d4d9630a764aff64eeb4",
         "companyId": "585b7d66b6a493e45ea96060",
         "year": 1998,
         "ratio": "45",
         "input": "100000",
         "increase": "",
         "allCapital": "",
         "realCapital": "",
         "allRatio": "",
         "realRatio": "",
         "debtRatio": "",
         "inputRatio": ""
       },
       {
         "_id": "5861d50f630a764aff64eeb7",
         "companyId": "585b7d66b6a493e45ea96060",
         "year": 1991,
         "ratio": "",
         "input": "100000",
         "increase": "12",
         "allCapital": "",
         "realCapital": "",
         "allRatio": "",
         "realRatio": "",
         "debtRatio": "",
         "inputRatio": "30"
       }
     ];
}