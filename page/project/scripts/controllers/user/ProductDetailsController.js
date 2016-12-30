function ProductDetailsController($scope,CompanyProductsService) {
  console.log("加载ProductDetailsController");
  //数据初始化
  CompanyProductsService.getCompanyProductsDetail("58622b368c1c3d6846f820f1")
    .then(function(result){
      $scope.product = result;
      $scope.liList = [];
      $scope.carouselList = [];
      var i=0;
      console.log('image length:'+result.images.length);
      for(var ima in result.images){
          var liObj = new Object();
          liObj.num=i;
          $scope.liList.push(liObj);

          var carouseObj = new Object();
          carouseObj.url=ima;
          carouseObj.num=i;
          $scope.carouselList.push(carouseObj);

          i++;
      }

      $scope.currentCarouse = $scope.liList[0].num;
  })

  //评分
  $scope.ratingVal = 2;
  

//   $scope.liList = [
//     {
//       "num":"0"
//     }
//   ];
//   $scope.carouselList = [
//     {
//       "url":"page/project/images/company/warn.png",
//       "num":"0"
//     }
//   ];

  //点击跳转
  $scope.setCurrentCarouse = function(num){
     $scope.currentCarouse = num;
  }
  //左移
  $scope.moveLeft = function(){
    if ($scope.currentCarouse == "0"){
      $scope.currentCarouse = $scope.liList.length - 1;
    }else{
      $scope.currentCarouse --;
    }
  }
  //右移
  $scope.moveRight = function(){
    if ($scope.currentCarouse == $scope.liList.length - 1){
      $scope.currentCarouse = 0;
    }else{
      $scope.currentCarouse ++;
    }
  }

}