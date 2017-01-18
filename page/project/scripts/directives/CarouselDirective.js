angular.module('auto-biz-user').directive('mycarousel', function(){
	return {
		templateUrl: '/page/project/html/template/user/carousel.html',
		scope:{
			imageList:"=",
		}, 
		controller: function($scope, $element, $attrs) {
			$scope.imageList = $scope.imageList;
		},
		restrict: 'E', 
		link: function($scope, iElm, iAttrs, controller) {
			$scope.setCurrentCarouse = function(num){
				$scope.currentCarouse = num;
			}
			$scope.moveLeft = function(){
				if ($scope.currentCarouse == "0"){
					$scope.currentCarouse = $scope.imgList.length - 1;
				}else{
					$scope.currentCarouse --;
				}
			}
			$scope.moveRight = function(){
				if ($scope.currentCarouse == $scope.imgList.length - 1){
					$scope.currentCarouse = 0;
				}else{
					$scope.currentCarouse ++;
				}
			}
			function getImgList(){
				$scope.imgList = [];
				for ( i in $scope.imageList){
					var img = new Object();
					img.url = $scope.imageList[i];
					img.num = i;
					$scope.imgList.push(img);
				}
				$scope.currentCarouse = $scope.imgList[0].num;
			}
			$scope.$watch('imageList', function (oldVal, newVal) {
				if ($scope.imageList && $scope.imageList.length>0) {
					getImgList();
				}
			},true);
		}
	};
});