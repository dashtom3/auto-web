function CompanyProductMngController($scope,Upload) {
	console.log("CompanyProductMngController");
	$scope.tmpProduct={};
	$scope.companyName="小软酱有限公司";
	$scope.deleteID ="";
	$scope.productList = [
	{
		"productThumb":"imgs/thumb_product.jpg",
		"productID":"1",
		"productDate":"2016/12/13",
		"productName":"安全驾驶，佳通轮胎荣获两项“国际比赛大奖国际比赛大奖”",
		"productStatus":"展示中",
		"productIsOriginal":"true"
	},
	{
		"productThumb":"imgs/thumb_product.jpg",
		"productID":"2",
		"productDate":"2016/12/13",
		"productName":"安全驾驶，佳通轮胎荣获两项“国际比赛大奖”",
		"productStatus":"展示中",
		"productIsOriginal":"true"
	},
	{
		"productThumb":"imgs/thumb_product.jpg",
		"productID":"3",
		"productDate":"2016/12/13",
		"productName":"安全驾驶，佳通轮胎荣获两项“国际比赛大奖”",
		"productStatus":"展示中",
		"productIsOriginal":"true"
	},
	{
		"productThumb":"imgs/thumb_product.jpg",
		"productID":"4",
		"productDate":"2016/12/13",
		"productName":"安全驾驶，佳通轮胎荣获两项“国际比赛大奖”",
		"productStatus":"展示中",
		"productIsOriginal":"true"
	},
	{
		"productThumb":"imgs/thumb_product.jpg",
		"productID":"5",
		"productDate":"2016/12/13",
		"productName":"安全驾驶，佳通轮胎荣获两项“国际比赛大奖”",
		"productStatus":"展示中",
		"productIsOriginal":"true"
	}
	];
	$scope.getFile = function (fileName) {
		fileReader.readAsDataUrl($scope.file, $scope)
		.then(function(result) {
			$scope.imgSrc = result;
		});
	};
	function addProduct(){
		console.log("上传，可能需要刷新表单。");
		productItem = new Object();
		productItem.productName = $scope.addProductName;
		productItem.productThumb = $scope.thumb[0].file;
		productItem.productThumbList = cloneObj($scope.thumb);
		productItem.productTags = $scope.addSelectedTags;
		productItem.productConf = $scope.addProductConf;
		productItem.productShortCut = $scope.addProductShortCut;
		var d = new Date();
		var str = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
		productItem.productDate = str;

		$scope.productList.push(productItem);
	};
	$scope.confirm = function(addModal,lookModal,editModal){
		if (addModal){
			addProduct();
			cancelAdd();
		}
		if (lookModal){
			;
		}
		if (editModal) {
			editProduct();
		}
	};
	$scope.cancel = function(addModal,lookModal,editModal){
		if (addModal){
			cancelAdd();
		}
		if (lookModal){
			;
		}
		if (editModal) {
			//editProduct();
		}
	};
	function editProduct(){
		for (i in $scope.productList){
			if ( $scope.tmpProduct.productName == $scope.productList[i].productName){
				$scope.productList.splice(i,1,$scope.tmpProduct);
			}
		}
	}
	function cancelAdd(){
		$scope.addProductName = "";
		$scope.thumb= [];
		$scope.addSelectedTags = "";
		$scope.addProductConf = "";
		$scope.addProductShortCut="";
		
	};
	$scope.deleteProduct=function(id){
		$scope.deleteID = id;
	};
	$scope.confirmDelete = function(){
		for (i in $scope.productList){
			if ( $scope.deleteID == $scope.productList[i].productID){
				$scope.productList.splice(i,1);	
			}
		}
	}
	$scope.cancelDelete=function(){
		$scope.deleteID = "";
	};
	$scope.changeProductStatus = function(id){
		console.log("如果post修改成功，");
		for (i in $scope.productList){
			if ( id == $scope.productList[i].productID){
				if ($scope.productList[i].productStatus== "展示中"){
					$scope.productList[i].productStatus= "隐藏";
				}else if ($scope.productList[i].productStatus== "隐藏") {
					$scope.productList[i].productStatus= "展示中";
				}
			}
		}
	};
	$scope.btnAddProduct =function(){
		console.log("dasd");
		$scope.addModal = true;
		$scope.lookModal = false;
		$scope.editModal = false;
	};
	$scope.btnLookProduct =function(productItem){
		console.log(productItem);
		$scope.addModal = false;
		$scope.lookModal = true;
		$scope.editModal = false;
		$scope.tmpProduct  = productItem;
		
	};
	$scope.btnEditProduct =function(productItem){
		$scope.addModal = false;
		$scope.lookModal = false;
		$scope.editModal = true;
		console.log(productItem);
		$scope.tmpProduct  = cloneObj(productItem);
	};
	var cloneObj = function (obj) {  
		var newObj = {};  
		if (obj instanceof Array) {  
			newObj = [];  
		}  
		for (var key in obj) {  
			var val = obj[key];  
			newObj[key] = typeof val === 'object' ? cloneObj(val): val;  
		}  
		return newObj;  
	};

	$scope.currentPage=1;
	$scope.pageCount = 5;
	$scope.pageSize = 4;
	$scope.total = 50;
	$scope.changePage = function(page){
		console.log(page);
	}
	// $scope.$watch(
	// 	'currentPage',function(newValue,oldValue,scope){
	// 		console.log(newValue);

	// 		console.log(oldValue);
	// 	}
	// 	);

	$scope.thumb=[];
	$scope.reader = new FileReader();


	$scope.upload = function(file){
		$scope.reader.readAsDataURL(file);
		var item = new Object();
		item.fileName = file.name;
		$scope.reader.onload=function(e){  
			
			item.file = this.result;
			$scope.thumb.push(item);

		}  
		console.log(file);
		Upload.upload({
			url: 'upload',
			data: {'fileName': item.fileName},
			file: file
		}).then(function (resp) {
			console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
		}, function (resp) {
			console.log('Error status: ' + resp.status);
		});
	};
	// $scope.upload = function(file){
	// 	console.log(file);
	// }
	$scope.uploadWhenEdit = function(file){
		$scope.reader.readAsDataURL(file);
		var imgItem = new Object();
		imgItem.fileName = file.name;
		$scope.reader.onload=function(e){  
			
			imgItem.file = this.result;
			$scope.tmpProduct.productThumbList.push(imgItem);

		}  
		console.log(file);
	};
	$scope.delete_thumb = function(item){
		for (i in $scope.thumb){
			if ($scope.thumb[i].fileName == item.fileName){
				$scope.thumb.splice(i,1);
			}
		}
	}
	$scope.delete_thumbWhenEdit = function(item){
		for (i in $scope.tmpProduct.productThumbList){
			if ($scope.tmpProduct.productThumbList[i].fileName == item.fileName){
				$scope.tmpProduct.productThumbList.splice(i,1);
			}
		}
	}
}