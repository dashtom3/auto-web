function CompanyProductDetailController($scope,GlobalService,$routeParams,CompanyProductsService,CompanyPubReportService,CompanyPriReportService) {
    console.log("载入CompanyProductDetailController");
     $scope.productType = GlobalService.companyType;
    if($routeParams.id != null){
        CompanyProductsService.getCompanyProductsDetail($routeParams.id).then(function(result){
           $scope.productDetail = result;
           console.log(result);
           getImgList(result.images);
           if($scope.productDetail.publicReport){
           CompanyPubReportService.getCompanyPubReportDetail($routeParams.id).then(function(result){
            $scope.productPubReport = result.list[0];
            console.log(result.list[0]);
            })
            }

            if($scope.productDetail.privateReport){
                CompanyPriReportService.getCompanyPriReportDetail($scope.productDetail.privateReport._id).then(function(result){
                $scope.productPriReport = result;
                console.log(result);
                })
            }
        });   
    }
    function getImgList(imgList){
        $scope.testLiList = [];
        $scope.testImgList = [];
        for (i in imgList){
            var img = new Object();
            img.url = imgList[i];
            img.num = i;
            $scope.testImgList.push(img);
            var li = new Object();
            li.num = i ;
            $scope.testLiList.push(li);
        }
        $scope.detailCurrentCarouse = $scope.testLiList[0].num;
    }
    $scope.setdetailCurrentCarouse = function(num){
        $scope.detailCurrentCarouse = num;
    }
    $scope.detailMoveLeft = function(){
        console.log($scope.detailCurrentCarouse);
        if ($scope.detailCurrentCarouse == "0"){
            $scope.detailCurrentCarouse = $scope.testLiList.length - 1;
        }else{
            $scope.detailCurrentCarouse --;
        }
    }
    $scope.detailMoveRight = function(){
        console.log($scope.detailCurrentCarouse);
        if ($scope.detailCurrentCarouse == $scope.testLiList.length - 1){
            $scope.detailCurrentCarouse = 0;
        }else{
            $scope.detailCurrentCarouse ++;
        }
    }
}