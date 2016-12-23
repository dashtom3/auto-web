function CompanyCreateController($scope,FileService,CompanyService,GlobalService) {
  console.log("载入CompanyCreateController");
  //初始化
  $scope.ctypeList = GlobalService.companyType;
  $scope.cmptype = $scope.ctypeList[0];
  $scope.company = {
    regTime:"",
    type:"CM"
  };
  $scope.company.type = $scope.ctypeList[0].id;
  $("#form_datetime").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
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
  		$scope.company.type = $scope.cmptype.id;
      $scope.company.regTime=document.getElementById("form_datetime").value;
  		$scope.company.address="";
  		CompanyService.registerCompany($scope.company).then(function(result){
  			
  		});
  }
}