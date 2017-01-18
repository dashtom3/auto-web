angular.module("auto-biz-user").controller("CompanyMainController",["$scope","AuthService","$location",

function CompanyMainController($scope,AuthService,$location) {
   
    if(!AuthService.company){
      $location.path("/loginCompany");
    }
    else{
        $scope.currentPage = "companyBasicInfo";
        $scope.toPage = function(pageName){
            $scope.currentPage = pageName;
        }
        initCompany();

        function initCompany(){
            if (AuthService.company){
                $scope.cmpId =AuthService.company._id; 
                $scope.leafCmpId =AuthService.company._id;
                $scope.companyLogo = AuthService.company.logo;
                $scope.companyName = AuthService.company.longName; 
            }else {
                alert("Invalid User");
            }
        }
    }   
}
]);
