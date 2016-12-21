
angular.module('auto-biz-user')
.directive('fileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, ngModel) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;
			element.bind('change', function(event){
				scope.$apply(function(){
					//console.log(event);
					console.log(attrs);
					modelSetter(scope, element[0].files[0]);
				});
				//附件预览
					 scope.file = (event.srcElement || event.target).files[0];
				console.log("filemodel");
				console.log(scope.file.size);
				scope.getFile(attrs.fileModel);
			});
		}
	};

}]);