function CompanyCreateController($scope,FileService) {
  console.log("载入CompanyCreateController");
  
  $scope.upload = function(file){
  	FileService.uploadFile(file).then(function(result) {
  		alert("上传成功");
  	});
  }
  
}