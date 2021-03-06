angular.module("auto-biz-user").controller("InnovationIndexController",["$scope","GlobalService","$filter","AuthService","$location","$routeParams","CompanyService",
  function HeaderController($scope,GlobalService,$filter,AuthService,$location,$routeParams,CompanyService) {
    $scope.inoIndexList = GlobalService.innovationIndexList;
    $scope.inoIndexList2 = GlobalService.innovationIndexList2;
    $scope.inoTypeList = GlobalService.companyTypeIndex;
    $scope.inoTypeSecondList = [{name:"全部",id:""}].concat(GlobalService.companyType);
    $scope.currentPage = "发现企业";
    $scope.homePage = false;
    $scope.cmpCompanys = {
      currentPage:1,
      pagePerNum:18,
      totalNum:-1,
      totalPage:-1,
      list:null,
      currentType:"",
    };


    $scope.setCurrentPage = function(name,link){
      $scope.currentPage = name;

      if (name != "发现企业"){
        $location.path("/innovation/"+link);
      }else{
        $scope.homePage=false;
        $scope.cmpCompanys.currentType = "";
       $scope.cmpCompanys.list = null;
       getCompanyCompanysData("",$scope.cmpCompanys.pagePerNum,1);
      }
    }
    $scope.setCurrentCmpType = function(typeId){
      $scope.homePage = false;
       $scope.cmpCompanys.currentType = typeId;
       $scope.cmpCompanys.list = null;
       getCompanyCompanysData(typeId,$scope.cmpCompanys.pagePerNum,1);
    }

    init($routeParams.name);
    //初始化加载页面   非九宫格版本
    function init(routeParams){
      if(routeParams == "hotProducts"){
        $location.path("/innovation/"+routeParams);
      }else if(routeParams == "hotTest"){
        $location.path("/innovation/"+routeParams);
      }else if(routeParams == "innovationNews"){
        $location.path("/innovation/"+routeParams);
      }else{
        $scope.homePage = false;
        $scope.currentPage = GlobalService.innovationIndexList[0][0];
        getCompanyCompanysData($scope.cmpCompanys.currentType,$scope.cmpCompanys.pagePerNum,$scope.cmpCompanys.currentPage);
      }

  //初始化加载页面   九宫格版本
  // function init(routeParams){
  //   if(routeParams == "hotProducts"){
  //     $location.path("/innovation/"+routeParams);
  //   }else if(routeParams == "hotTest"){
  //     $location.path("/innovation/"+routeParams);
  //   }else if(routeParams == "innovationNews"){
  //     $location.path("/innovation/"+routeParams);
  //   }else if(routeParams == "companyDiscover"){
  //     $scope.homePage = false;
  //     $scope.currentPage = GlobalService.innovationIndexList[0][0];
  //     getCompanyCompanysData($scope.cmpCompanys.currentType,$scope.cmpCompanys.pagePerNum,$scope.cmpCompanys.currentPage);
  //   }else{
  //     $scope.homePage = false;
  //   }
    
  }
  //获取企业列表
    function getCompanyCompanysData(cmpType,pagePerNum,currentPage){
      CompanyService.getCompanysList(pagePerNum,currentPage,1,cmpType,"").then(function(result){
        if($scope.cmpCompanys.list){
          $scope.cmpCompanys.list = $scope.cmpCompanys.list.concat(result.list);
        }else{
          $scope.cmpCompanys.list= result.list;
        }
        $scope.cmpCompanys.currentPage = result.currentPage;
        $scope.cmpCompanys.totalNum = result.totalNum;
        $scope.cmpCompanys.totalPage = result.totalPageNum;
      });}

     $scope.loadMoreCompanys = function(){
    if($scope.cmpCompanys.currentPage < $scope.cmpCompanys.totalPage){
      getCompanyCompanysData($scope.cmpCompanys.currentType,$scope.cmpCompanys.pagePerNum,$scope.cmpCompanys.currentPage+1);
    }}; 
  }
]);
