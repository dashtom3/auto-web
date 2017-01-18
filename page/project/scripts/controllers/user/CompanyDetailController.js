angular.module("auto-biz-user").controller("CompanyDetailController",["$scope","GlobalService","CompanyNewsService","$routeParams","CompanyService","CompanyProductsService","CompanyPriReportService","CompanyFinanceService","AuthService","LocationService",
function CompanyDetailController($scope,GlobalService,CompanyNewsService,$routeParams,CompanyService,CompanyProductsService,CompanyPriReportService,CompanyFinanceService,AuthService,LocationService) {

    //初始化company基本数据
    $scope.cmpId = $routeParams.id;
    CompanyService.getComppanyById($scope.cmpId).then(function(result){
        $scope.companyDetail = result;
        if($scope.companyDetail.address != ""){
            LocationService.getCityByNum($scope.companyDetail.address).then(function(result){
                $scope.city = result.shi;
                $scope.province = result.sheng;
                $scope.locationStr = getLocationStr($scope.province,$scope.city);
            });
        }
    }); 
    

    $scope.directCity = GlobalService.directCityList;
    function getLocationStr(province,city){
        var flag = false;
        for (var i = 0; i < $scope.directCity.length; i++) {
             if (province == $scope.directCity[i]){
                flag = true;
             }
         } 
         if (flag){
            return province+"市"+city;
         }else{
            return province+"省"+city+"市";
         }
    }

    $scope.cmpDetailList = GlobalService.cmpDetailList;
    $scope.currentPage=$scope.cmpDetailList[0][0];
    $scope.selectItem = function(item){
        $scope.currentPage=item;
    };

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
            $scope.currentPage = GlobalService.cmpDetailList[1][0];
            initNewsPage();
        }else if(routeParams == "product"){
            $scope.currentPage = GlobalService.cmpDetailList[2][0];
            initProductsPage();
        }else if(routeParams == "test"){
            $scope.currentPage = GlobalService.cmpDetailList[3][0];
            initTestsPage();
        }else if(routeParams == "finance"){
            $scope.currentPage = GlobalService.cmpDetailList[4][0];
            initFinancesPage();
        }else{
            $scope.currentPage = GlobalService.cmpDetailList[0][0];
            initOutlinePage();
        }
    }


    function initOutlinePage(){
        //获取新闻数据
        getCompanyNewsData(3,1);
        //获取产品数据
        getCompanyProductsData(3,1);
        //获取测评数据
        getCompanyTestsData(3,1);
        //获取财务数据
        getCompanyFinancesData(1,1);
    }


    //当选择的是news页面时

    function initNewsPage(){
        getCompanyNewsData($scope.cmpNews.pagePerNum,$scope.cmpNews.currentPage);
    }
    $scope.loadMoreNews=function(){
        if($scope.cmpNews.currentPage < $scope.cmpNews.totalPage){
            getCompanyNewsData($scope.cmpNews.pagePerNum,$scope.cmpNews.currentPage+1);
        }
    };

    //当选择的是产品界面时

    function initProductsPage(){
        getCompanyProductsData($scope.cmpProducts.pagePerNum,$scope.cmpProducts.currentPage);
    }
    $scope.loadMoreProducts=function(){
        if($scope.cmpProducts.currentPage < $scope.cmpProducts.totalPage){
            getCompanyProductsData($scope.cmpProducts.pagePerNum,$scope.cmpProducts.currentPage+1);
        }
    };

    //当选择的是测评界面时

    function initTestsPage(){
        getCompanyTestsData($scope.cmpTests.pagePerNum,$scope.cmpTests.currentPage);
    }
    $scope.loadMoreTests=function(){
        if($scope.cmpTests.currentPage < $scope.cmpTests.totalPage){
            getCompanyTestsData($scope.cmpTests.pagePerNum,$scope.cmpTests.currentPage+1);
        }
    };

    //当选择的是财务界面时
    function initFinancesPage(){
        getCompanyFinancesData($scope.cmpFinances.pagePerNum,$scope.cmpFinances.currentPage);
    }
    $scope.loadMoreFinances=function(){
        if($scope.cmpFinances.currentPage < $scope.cmpFinances.totalPage){
            getCompanyFinancesData($scope.cmpFinances.pagePerNum,$scope.cmpFinances.currentPage+1);
        }
    };


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
    //获取企业财务
    function getCompanyFinancesData(pagePerNum,currentPage){
        CompanyFinanceService.getCompanyFinanceList($scope.cmpId,"","",pagePerNum,currentPage).then(function(result){
            if($scope.cmpFinances.list){
             $scope.cmpFinances.list = $scope.cmpFinances.list.concat(result.list);
         }else{
            $scope.cmpFinances.list= result.list;
        }
        $scope.cmpFinances.currentPage = result.currentPage;
        $scope.cmpFinances.totalNum = result.totalNum;
        $scope.cmpFinances.totalPage = result.totalPageNum;
    });
    }


    //点击test页面的报名测评
    $scope.signTest = function(test){
        $scope.currentTest = test;
        $scope.testImgList = $scope.currentTest.images;

    };  
    $scope.testSignTest = function(phone,address){
        if (!phone){
            alert("请填写手机号");
            return;
        }
        if(address == null){
            address = "暂无";
        }
        if(AuthService.getToken() == "guest"){
            alert("用户尚未登录，请注册并且通过审核");
        }else if(AuthService.company){
            alert("您现在是企业账号，请以用户身份报名");
        }else if (AuthService.user){
            CompanyPriReportService.signCompanyPriReport($scope.currentTest._id,phone,address).then(function(result){
                alert("申请报名成功，请等待工作人员联系");
            });
        }
    };

}


]);
