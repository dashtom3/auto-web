function CompanyDetailController($scope,GlobalService,CompanyNewsService,$routeParams,CompanyService,CompanyProductsService,CompanyPriReportService,CompanyFinanceService) {
  console.log("CompanyDetailController");


    //初始化company基本数据
    $scope.cmpId = $routeParams.id;
    CompanyService.getComppanyById($scope.cmpId).then(function(result){
        $scope.companyDetail = result;
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
        $scope.testLiList = [];
        $scope.testImgList = [];
        CompanyService.getComppanyById(test.companyId).then(function(result){
            console.log(result);
            $scope.currentTest.companyInfo = result;
        });
        console.log($scope.currentTest.images);
        getImgList($scope.currentTest.images);

    };  
    function getImgList(imgList){
        for (i in imgList){
            var img = new Object();
            img.url = imgList[i];
            img.num = i;
            $scope.testImgList.push(img);
            var li = new Object();
            li.num = i ;
            $scope.testLiList.push(li);
        }
        console.log($scope.testImgList);
        console.log($scope.testLiList);
        $scope.testCurrentCarouse = $scope.testLiList[0].num;
    }
    $scope.setTestCurrentCarouse = function(num){
        $scope.testCurrentCarouse = num;
    }
    $scope.testMoveLeft = function(){
        console.log($scope.testCurrentCarouse);
        if ($scope.testCurrentCarouse == "0"){
            $scope.testCurrentCarouse = $scope.testLiList.length - 1;
        }else{
            $scope.testCurrentCarouse --;
        }
    }
    $scope.testMoveRight = function(){
        console.log($scope.testCurrentCarouse);
        if ($scope.testCurrentCarouse == $scope.testLiList.length - 1){
            $scope.testCurrentCarouse = 0;
        }else{
            $scope.testCurrentCarouse ++;
        }
    }
    $scope.testSignTest = function(phone,address){
        if (!phone){
            alert("手机号");
            return;
        }
        if (!address){
            alert("请填地址");
            return;
        }
        console.log(phone);
        console.log(address);
        CompanyPriReportService.signCompanyPriReport($scope.currentTest._id,phone,address).then(function(result){
            console.log(result);
        });
    };
}