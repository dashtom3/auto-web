function InnovationCompanyController($scope,GlobalService,$filter,CompanyService,$location) {
  console.log("InnovationCompanyController");
  $scope.navList = [
    {
      "name":"类型",
      "id":"1",
      "optionList":[
        {
          "name":"全部",
          "id":"0",
        },
        {
          "name":"汽车装饰",
          "id":"1",
        },
        {
          "name":"汽车部件",
          "id":"2",
        },
        {
          "name":"汽车周边",
          "id":"2",
        }
      ]
    },
    {
      "name":"投融资阶段",
      "id":"2",
      "optionList":[
        {
          "name":"全部",
          "id":"0",
        },
        {
          "name":"A轮",
          "id":"1",
        },
        {
          "name":"B轮",
          "id":"2",
        },
      ],
    },
    {
      "name":"所在地",
      "id":"3",
      "optionList":[
        {
          "name":"全部",
          "id":"0",
        },
        {
          "name":"北京",
          "id":"1",
        },{
          "name":"上海",
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



   $scope.toPage = function(cmpId){
     console.log("toPage"+cmpId);
     // $location.path("/companyDetail/"+cmpId);
   };
 
   $scope.cmps = {
    currentPage:1,
    pagePerNum:5,
    totalNum:-1,
    totalPage:-1,
  }
  
  loadCompanyInfosData($scope.cmps.pagePerNum, $scope.cmps.currentPage);
  function loadCompanyInfosData(pagePerNum,currentPage){
    CompanyService.getCompanyList(pagePerNum,currentPage,"","","").then(function(result){
    if($scope.companyList){
      $scope.companyList = $scope.companyList.concat(result.list);
    }else{
      $scope.companyList= result.list;
    }
    $scope.cmps.currentPage = result.currentPage;
    $scope.cmps.totalNum = result.totalNum;
    $scope.cmps.totalPage = result.totalPageNum;
  });
  }
  $scope.loadMore=function(){
    if($scope.cmps.currentPage < $scope.cmps.totalPage){
      loadCompanyInfosData($scope.cmps.pagePerNum,$scope.cmps.currentPage+1);
    }
  };
}