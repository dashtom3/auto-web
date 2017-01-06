angular.module('auto-biz-user')
.filter('typeFilter', function() {
	return function(input) {
		if(input=="normal") return "普通用户";
		else if(input=="vc") return "投资人";
		else if(input=="wr") return "作家";
		else if(input=="admin") return "管理员";
		else return "黑名单";
	};
});

angular.module('auto-biz-user')
.filter('testTypeFilter', function() {
	return function(input) {
		if(input) return "local";
		else if(!input) return "mail";
		else return "未知";
	};
});   
angular.module('auto-biz-user')
.filter('userTestTypeFilter', function() {
	return function(input) {
		if(input == 'local') return "实地";
		else if(input == 'mail') return "邮寄";
		else return "未知";
	};
}); 
