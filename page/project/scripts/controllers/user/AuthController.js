function AuthController($scope,AuthService,UserService){
  console.log("载入AuthController");
  
  $scope.clickLoginUser = function(){
    console.log($scope.user);
  	AuthService.userLogin($scope.user.name,$scope.user.password).then(function(){
		window.location.href="/innovation";
  	})
  }
  $scope.clickRegisterUser = function(){
  console.log($scope.user);
  	UserService.registerUser($scope.user).then(function(){
  		window.location.href="/innovation";
  	})
  }
  $scope.clickLoginCompany = function(){
    console.log($scope.cmp);
  	AuthService.companyLogin($scope.cmp.cmpName,$scope.cmp.cmpPass).then(function(res){
  		window.location.href="/innovation";
  	})
  }
  $scope.uploadFirPic = function(file){
    if(file){
      $scope.firpic = file;
      FileService.uploadFile(file).then(function(result) {
        $scope.company.logo = result.urls[0];
      });
    }
  }
  $scope.uploadSecPic = function(file){
    if(file){
      $scope.secpic = file;
      FileService.uploadFile(file).then(function(result) {
        $scope.company.logo = result.urls[0];
      });
    }
  }
}