function CompanyOutlineController($scope,CompanyService) {
  console.log("CompanyOutlineController");
  //   $scope.infoList = {
  //   	"shortCut":"在学校创业谷的大力支持下，2016年12月15日晚，我们邀请到我院07级校友， UniCareer公司创始人、CEO余佳，在济人楼312为同学们带来了个人学习成长和创业经验分享。余佳学姐2007年就读我院",
		// "product":"在学校创业谷的大力支持下，2016年12月15日晚，我们邀请到我院07级校友， UniCareer公司创始人",
		// "goalUser":"我们邀请到我院07级校友， UniCareer公司创始人"    	
  //   };
  $scope.cmpId = $scope.leafCmpId;
  CompanyService.getComppanyById($scope.cmpId).then(function(result){
  	$scope.infoList = result;
  });
    
}