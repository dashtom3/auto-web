function CompanyCreateController($scope,FileService,CompanyService,GlobalService) {
  console.log("载入CompanyCreateController");
  //初始化
  $scope.ctypeList = GlobalService.companyType;
  $scope.cmptype = $scope.ctypeList[0];
  $(".form_datetime").datetimepicker({format:'YYYY/MM/DD'});
  //交互
  $scope.uploadLogo = function(file){
  	if(file){
  		$scope.cmpLogo = file;
		FileService.uploadFile(file).then(function(result) {
  			$scope.company.logo = result.urls[0];
  		});
	}
  }
  $scope.uploadCertificate = function(file){
  	if(file){
  		FileService.uploadFile(file).then(function(result) {
  			$scope.company.info = result.urls[0];
  		});
  	}
  }
  $scope.registerCompany  = function(){
  		//console.log($scope.cmptype);
  		$scope.company.type = $scope.cmptype.id;
  		console.log($scope.company);
  		$scope.company.address="";
  		CompanyService.registerCompany($scope.company).then(function(result){
  			alert("注册成功");
  		});
  }
}