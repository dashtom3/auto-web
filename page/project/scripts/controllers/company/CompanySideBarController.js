angular.module("auto-biz-user").controller("CompanySideBarController",["$scope",

function CompanySideBarController($scope) {
  $scope.testShow = false;

  $scope.toggleTestList = function(){
  		$scope.testShow = !$scope.testShow;
  }
}
]);
