angular.module('auto-biz-user').directive('ueditor',function($timeout){
	return {
		restrict: 'E',
		require : 'ngModel',
		link: function(scope,element,attrs,ctrl){
			var id = 'ueditor_' + Date.now(); 
			element[0].id = id; 
			var ue = UE.getEditor(id, {
				initialFrameWidth: '100%', 
				initialFrameHeight: '200', 
				autoHeightEnabled: true 
			}); 
			ctrl.$render = function () {
					try {
						ue.setContent(ctrl.$modelValue);
					} catch (e) {

					}
				};
			ue.ready(function () { 
				ue.addListener('contentChange', function () { 
					ctrl.$setViewValue(ue.getContent()); 
					if (!scope.$$phase) { 
						scope.$apply(); 
					} 
				}); 
			}); 	
		}
	}
});