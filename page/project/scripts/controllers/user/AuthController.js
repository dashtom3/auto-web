function AuthController($scope,AuthService,UserService,$location,FileService){
  console.log("载入AuthController");
   $scope.userType=[["普通用户","normal"],["专栏作者","wr"],["投资人","vc"]];
  $scope.regUserType = $scope.userType[0];
  $scope.user = {
    idImg1:"",
    idImg2:""
  }
  $scope.clickLoginUser = function(){
    console.log($scope.user);
  	AuthService.userLogin($scope.user.name,$scope.user.password).then(function(){
		$location.path("/innovation");
  	})
  }
  $scope.clickLoginAdmin = function(){
    console.log($scope.user);
    AuthService.userLogin($scope.user.name,$scope.user.password).then(function(){
      $location.path("/adminPage");
    })
  }
  $scope.uploadFirPic = function(file){
    if(file){
      $scope.firpic = file;
    FileService.uploadFile(file).then(function(result) {
        $scope.user.idImg1  = result.urls[0];
      });
    }
  }
  $scope.uploadSecPic = function(file){
    if(file){
      $scope.secpic = file;
      FileService.uploadFile(file).then(function(result) {
        $scope.user.idImg2 = result.urls[0];
      });
    }
  }
  $scope.clickRegisterUser = function(){
    $scope.user.userType = $scope.regUserType[1];
    console.log($scope.user);
  	UserService.registerUser($scope.user).then(function(){
  		$location.path("/innovation");
  	})
  }
  $scope.clickLoginCompany = function(){
    console.log($scope.cmp);
  	AuthService.companyLogin($scope.cmp.cmpName,$scope.cmp.cmpPass).then(function(res){
  		$location.path("/company");
  	})
  }
}