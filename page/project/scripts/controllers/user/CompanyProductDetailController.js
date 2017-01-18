angular.module("auto-biz-user").controller("CompanyProductDetailController",["$scope","GlobalService","$routeParams","CompanyProductsService","CompanyPubReportService","CompanyPriReportService","AuthService",
function CompanyProductDetailController($scope,GlobalService,$routeParams,CompanyProductsService,CompanyPubReportService,CompanyPriReportService,AuthService) {
     $scope.productType = GlobalService.companyType;
     $scope.newComment = {
        "score":[],
        "content":"",
        "reportId":""
     }
     $scope.commentLength = 0;


    $scope.getStatus = function(privateReport){
        if (!privateReport){
            return 'noReport'
        }
        if (privateReport.isOnline == false){
            return 'offline'
        }
        if (privateReport.state == 0 || privateReport.state == -1){
            return 'auditing'
        }
        if (!isStart(privateReport.dateStart)){
            return 'unstart'
        }
        if($scope.commentList && $scope.commentList.length == 0){
            return 'noComment'
        }
        return 'showComment';
    };

    function isStart(timeStamp){
        var nowTime =new Date().getTime();
        if (timeStamp > nowTime){
            return false;
        }
        return true;
    }

    if($routeParams.id != null){
        CompanyProductsService.getCompanyProductsDetail($routeParams.id).then(function(result){
           $scope.productDetail = result;
           if($scope.productDetail.publicReport){
            CompanyPubReportService.getCompanyPubReportDetail($routeParams.id).then(function(result){
            $scope.productPubReport = result.list[0];
            })
            }
            if($scope.productDetail.privateReport){
                CompanyPriReportService.getCompanyPriReportDetail($scope.productDetail.privateReport).then(function(result){
                    $scope.productPriReport = result;
                    $scope.scores = getAverageScore($scope.productPriReport.scores,$scope.productPriReport.scoredUserNum);
                    $scope.totalAverageScore = getTotalAverageScore($scope.scores);
                });
                CompanyPriReportService.getCompanyPriReportComment($scope.productDetail.privateReport).then(function(result){
                    $scope.commentList = result;
                    $scope.commentLength = $scope.commentList.length;
                });
            }
        });   
    }
    $scope.commitComment = function(){
        if (isPassUser()){
            $scope.newComment.reportId = $scope.productDetail.privateReport;
            CompanyPriReportService.commentCompanyPriReport($scope.newComment).then(function(result){
                
            });
        }else {
            alert("你不是报名用户");
            return;
        }
        
    };

    function isPassUser(){
        var passList = $scope.productPriReport.passUser;
        if (AuthService.user){
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
    };
    $scope.onChange = function(val){
        $scope.ratingVal = val;
    };
}
]);
