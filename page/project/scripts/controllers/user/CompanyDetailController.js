function CompanyDetailController($scope,GlobalService,CompanyNewsService,$routeParams,CompanyService,CompanyProductsService,CompanyPriReportService,CompanyFinanceService) {
  console.log("CompanyDetailController");


    //初始化company基本数据
    $scope.cmpId = $routeParams.id;
    CompanyService.getComppanyById($scope.cmpId).then(function(result){
        $scope.companyDetail = result;
        console.log(result);
    }); 

    $scope.cmpDetailList = GlobalService.cmpDetailList;
    $scope.currentPage=$scope.cmpDetailList[0][0];
    $scope.selectItem = function(item){
        $scope.currentPage=item;
    }

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
    $scope.cmpFinances = {
        currentPage:1,
        pagePerNum:3,
        totalNum:-1,
        totalPage:-1,
        list:null
    };

    init($routeParams.name);
    function init(routeParams){
        $scope.cmpDetail = {
            list : GlobalService.cmpDetailList
        }
        if(routeParams == "news"){
            $scope.cmpDetail.currentPage = GlobalService.cmpDetailList[1][0];
        }else if(routeParams == "product"){
            $scope.cmpDetail.currentPage = GlobalService.cmpDetailList[2][0];
        }else if(routeParams == "test"){
            $scope.cmpDetail.currentPage = GlobalService.cmpDetailList[3][0];
        }else if(routeParams == "finance"){
            $scope.cmpDetail.currentPage = GlobalService.cmpDetailList[4][0];
        }else{
            $scope.cmpDetail.currentPage = GlobalService.cmpDetailList[0][0];
            initOutlinePage();
        }
    }


    function initOutlinePage(){
        // // 获取outline数据
        // CompanyService.getComppanyById($scope.cmpId).then(function(result){
        //     $scope.outlineList = result;
        // });
        //获取新闻数据
        // getCompanyNewsData(3,1);
        //获取产品数据
        // getCompanyProductsData(3,1);
        //获取新闻数据

    }


    //获取企业新闻
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

}