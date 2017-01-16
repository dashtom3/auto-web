angular.module("auto-biz-user").controller("CompanySideBarController",["$scope",

function CompanySideBarController($scope) {
  console.log("CompanySideBarController");
  $scope.testShow = false;

  $scope.toggleTestList = function(){
  		$scope.testShow = !$scope.testShow;
  }
}
]);
