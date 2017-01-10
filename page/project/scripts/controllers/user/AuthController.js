function AuthController($scope,AuthService,UserService,$location,FileService){
  console.log("载入AuthController");
   $scope.userType=[["普通用户","normal"],["专栏作者","wr"]];
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
    AuthService.userLogin($scope.user.name,$scope.user.password).then(function(result){
      if(result.userType == "admin"){
          $location.path("/adminPage");
      }else{
          alert("权限不足，请重新登录");
          AuthService.userLogout();
      }
    })
  }
  $scope.uploadFirPic = function(file){
    if(file){
      
    FileService.uploadFile(file).then(function(result) {
        $scope.user.idImg1  = result.urls[0];
        $scope.firpic = file;
      });
    }
  }
  $scope.uploadSecPic = function(file){
    if(file){
      
      FileService.uploadFile(file).then(function(result) {
        $scope.user.idImg2 = result.urls[0];
        $scope.secpic = file;
      });
    }
  }
  $scope.clickRegisterUser = function(){
    $scope.user.userType = $scope.regUserType[1];
    console.log($scope.user);
    if($scope.user.idImg1 == "" || $scope.user.idImg2 == ""){
      alert("请上传用户认证照片");
    }else{
      UserService.registerUser($scope.user).then(function(){
      $location.path("/innovation");
      })
    }
  	
  }
  $scope.clickLoginCompany = function(){
    console.log($scope.cmp);
  	AuthService.companyLogin($scope.cmp.cmpName,$scope.cmp.cmpPass).then(function(res){
  		$location.path("/innovation");
  	})
  }
}