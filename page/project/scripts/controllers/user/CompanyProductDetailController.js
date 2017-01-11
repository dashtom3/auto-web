function CompanyProductDetailController($scope,GlobalService,$routeParams,CompanyProductsService,CompanyPubReportService,CompanyPriReportService,AuthService) {
    console.log("载入CompanyProductDetailController");
     $scope.productType = GlobalService.companyType;
     $scope.newComment = {
        "score":[],
        "content":"",
        "reportId":""
     }
     $scope.commentLength = 0;

    if($routeParams.id != null){
        CompanyProductsService.getCompanyProductsDetail($routeParams.id).then(function(result){
           $scope.productDetail = result;
           console.log(result);
           if($scope.productDetail.publicReport){
            CompanyPubReportService.getCompanyPubReportDetail($routeParams.id).then(function(result){
            $scope.productPubReport = result.list[0];
            console.log(result.list[0]);
            })
            }

            if($scope.productDetail.privateReport){
                CompanyPriReportService.getCompanyPriReportDetail($scope.productDetail.privateReport).then(function(result){
                    $scope.productPriReport = result;
                    
                    $scope.scores = getAverageScore($scope.productPriReport.scores,$scope.productPriReport.scoredUserNum);
                    $scope.totalAverageScore = getTotalAverageScore($scope.scores);
                    console.log(result);
                });
                CompanyPriReportService.getCompanyPriReportComment($scope.productDetail.privateReport).then(function(result){
                    $scope.commentList = result;
                    $scope.commentLength = $scope.commentList.length;
                    console.log(result);
                });
            }
        });   
    }
    $scope.commitComment = function(){
        console.log($scope.newComment);
        if (isPassUser()){
            $scope.newComment.reportId = $scope.productDetail.privateReport;
            CompanyPriReportService.commentCompanyPriReport($scope.newComment).then(function(result){
                console.log(result);
            });
        }else {
            alert("你不是报名用户");
            return;
        }
        
    }

    function isPassUser(){
        var passList = $scope.productPriReport.passUser;
        if (AuthService.user){
            console.log(AuthService.user);
            for (i in passList){
                if (AuthService.user._id == passList[i].userId){
                    return true;
                }
            }
        }
        return false;
    }

    function getAverageScore(scrs,num){
        var scores = [];
        for (i in scrs){
            if (num != 0){
                scores[i] = scrs[i] / num;
            }
        }
        return scores;
    }
    function getTotalAverageScore(scrs){
        var total = 0;
        if (scrs.length != 0){
            for (i in scrs){
                total += scrs[i];
            }
            return (total/ scrs.length); 
        }
        return 0;
    }

    $scope.max = 5;
    $scope.onHover = function(val){
        $scope.hoverVal = val;
    };
    $scope.onLeave = function(){
        $scope.hoverVal = null;
    }
    $scope.onChange = function(val){
        $scope.ratingVal = val;
    }
}