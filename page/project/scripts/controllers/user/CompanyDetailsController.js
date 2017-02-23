angular.module("auto-biz-user").controller("CompanyDetailsController",["$scope","GlobalService","CompanyNewsService","$routeParams","CompanyService","CompanyProductsService","CompanyPriReportService","CompanyFinanceService","AuthService","LocationService",
function CompanyDetailController($scope,GlobalService,CompanyNewsService,$routeParams,CompanyService,CompanyProductsService,CompanyPriReportService,CompanyFinanceService,AuthService,LocationService) {

    //初始化company基本数据
    // $scope.cmpId = $routeParams.id;
    $scope.cmpId = "58746628a25f1810ad295a6a";
    CompanyService.getComppanyById($scope.cmpId).then(function(result){
        $scope.companyDetail = result;
        
    }); 

    $scope.cmpNews = {
        currentPage:1,
        pagePerNum:10,
        totalNum:-1,
        totalPage:-1,
        list:null
    };
     $scope.cmpProducts = {
        currentPage:1,
        pagePerNum:6,
        totalNum:-1,
        totalPage:-1,
        list:null
    };
    $scope.cmpTests = {
        currentPage:1,
        pagePerNum:6,
        totalNum:-1,
        totalPage:-1,
        list:null
    };
    
    initOutlinePage();
    function initOutlinePage(){
        //获取新闻数据
        getCompanyNewsData(6,1);
        //获取产品数据
        getCompanyProductsData(6,1);
        //获取测评数据
        getCompanyTestsData(3,1);
    }

    //获取企业资讯
    function getCompanyNewsData(pagePerNum,currentPage){
        CompanyNewsService.getCompanyNewsList("","","","","",$scope.cmpId,"","",pagePerNum,currentPage).then(function(result){
           
            if($scope.cmpNews.list){
                $scope.cmpNews.list = $scope.cmpNews.list.concat(result.list);
            }else{
                $scope.cmpNews.list= result.list;
            }
            $scope.cmpNews.currentPage = result.currentPage;
            $scope.cmpNews.totalNum = result.totalNum;
            $scope.cmpNews.totalPage = result.totalPageNum;
        });
    }

    //获取企业产品
    function getCompanyProductsData(pagePerNum,currentPage){
        CompanyProductsService.getCompanyProductsList("","","","","",$scope.cmpId,"","",pagePerNum,currentPage).then(function(result){
            if($scope.cmpProducts.list){
                $scope.cmpProducts.list = $scope.cmpProducts.list.concat(result.list);
            }else{
                $scope.cmpProducts.list= result.list;
            }
            $scope.cmpProducts.currentPage = result.currentPage;
            $scope.cmpProducts.totalNum = result.totalNum;
            $scope.cmpProducts.totalPage = result.totalPageNum;
        });
    }

    //获取企业测评
    function getCompanyTestsData(pagePerNum,currentPage){
        
        CompanyPriReportService.getCompanyPriReportList("","","","","","","","","","","","","","","","",$scope.cmpId,pagePerNum,currentPage).then(function(result){
            $scope.timeNow = new Date().getTime();
            if($scope.cmpTests.list){
                $scope.cmpTests.list = $scope.cmpTests.list.concat(result.list);
            }else{
                $scope.cmpTests.list= result.list;
            }
            $scope.cmpTests.currentPage = result.currentPage;
            $scope.cmpTests.totalNum = result.totalNum;
            $scope.cmpTests.totalPage = result.totalPageNum;
        });
    }
}


]);
