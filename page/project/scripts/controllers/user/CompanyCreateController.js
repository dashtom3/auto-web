angular.module("auto-biz-user").controller("CompanyCreateController",["$scope","FileService","CompanyService","GlobalService","AuthService","LocationService","$location",
function CompanyCreateController($scope,FileService,CompanyService,GlobalService,AuthService,LocationService,$location) {
  console.log("载入CompanyCreateController");
  //初始化
  $scope.ctypeList = GlobalService.companyType;
  $scope.cmptype = $scope.ctypeList[0];
  $scope.company = {
    regTime:"",
    type:"CM"
  };
  LocationService.getProvinceList().then(function(result){
    $scope.provinceList = result;
  });
  $scope.getCityList = function(province){
    console.log(province);
    LocationService.getCityListByProvince(province.name).then(function(result){
      $scope.cityList = result;
    });
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
      if ($scope.city){
        $scope.company.address = $scope.city.no || null;
      }
      if (!$scope.company.name ||$scope.company.name == ""){
        alert("请输入用户名");
        return;
      }
      if (!$scope.company.password ||$scope.company.password == ""){
        alert("请输入密码");
        return;
      }
       if ($scope.company.password != $scope.company.repass){
        alert("两次密码不一致");
        return;
      }
      if (!$scope.company.position ||$scope.company.position == ""){
        alert("请输入注册人职位");
        return;
      }
      if (!$scope.company.info ||$scope.company.info == ""){
        alert("请上传认证信息");
        return;
      }
      if (!$scope.company.longName ||$scope.company.longName == ""){
        alert("请输入公司名称");
        return;
      }
      if (!$scope.company.logo ||$scope.company.logo == ""){
        alert("请上传公司logo");
        return;
      }
      if (!$scope.company.shortName ||$scope.company.shortName == ""){
        alert("请输入业务简述");
        return;
      }
      if (!$scope.company.type ||$scope.company.type == ""){
        alert("请选择公司类型");
        return;
      }
      if (!$scope.company.phone ||$scope.company.phone == ""){
        alert("请输入联系方式");
        return;
      }
      if (!$scope.company.address ||$scope.company.address == ""){
        alert("请选择公司地址");
        return;
      }
      if (!$scope.company.field ||$scope.company.field == ""){
        alert("请输入详细地址");
        return;
      }
      if (!$scope.company.legalEntity ||$scope.company.legalEntity == ""){
        alert("请输入法人代表");
        return;
      }
      if (!$scope.company.regCapital ||$scope.company.regCapital == ""){
        alert("请输入注册资本");
        return;
      }
       if (!$scope.company.regTime ||$scope.company.regTime == ""){
        alert("请选择成立时间");
        return;
      }
       if ($scope.company.isNeedCapital==null ||$scope.company.isNeedCapital == ""){
        $scope.company.isNeedCapital = false;
      }
  		CompanyService.registerCompany($scope.company).then(function(result){
  			 $location.path("/innovation");
  		});
  }
}]);