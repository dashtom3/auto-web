angular.module("auto-biz-user").controller("CompanyProductMngController",["$scope","FileService","CompanyProductsService","GlobalService","$filter",
function CompanyProductMngController($scope,FileService,CompanyProductsService,GlobalService,$filter) {
	$("#form_datetime").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
	$("#form_datetime2").datetimepicker({format:'YYYY/MM/DD',locale: moment.locale('zh-cn') });
	$scope.tmpProduct={};
	$scope.companyName="小软酱有限公司";
	$scope.deleteID ="";
	$scope.ctypeList = GlobalService.companyTypeForProduct;

	//数据初始化
	$scope.searchStr="";
	$scope.currentPage = 1;
	$scope.pageSize=5;
	$scope.cmpId = $scope.leafCmpId;
	getData();

	function getData(){
		loadCompanyProductsData($scope.pageSize,$scope.currentPage);
	}

	function loadCompanyProductsData(pagePerNum,currentPage){
		CompanyProductsService.getCompanyProductsList($scope.searchStr,"","","","",$scope.cmpId,"","",pagePerNum,currentPage).then(function(result){
			$scope.productList= result.list;
			$scope.currentPage = result.currentPage;
			$scope.total = result.totalNum;
		});
	}
	$scope.btnSearch = function(){
		$scope.currentPage = 1;
		getData();
	}
	$scope.changePage = function(page){
		loadCompanyProductsData($scope.pageSize,page);
	}
	function getCtypeById(ctypeId){
		for (i in $scope.ctypeList){
			if (ctypeId == $scope.ctypeList[i].id){
				return $scope.ctypeList[i];
			}
		}
	}
	function getCIdByName(ctype){
		for (i in $scope.ctypeList){
			if (ctype == $scope.ctypeList[i].name){
				return $scope.ctypeList[i].id;
			}
		}
	}


	function addProduct(){
		productItem = new Object();
		productItem.name = $scope.addProductName;
		productItem.images = $scope.images;
		productItem.tag = $scope.addSelectedTags.id;
		productItem.argc = $scope.addProductConf;
		productItem.version = $scope.addProductVersion;
		productItem.model = $scope.addProductModel;
		productItem.desc = $scope.addProductShortCut;
		productItem.releaseDate=document.getElementById("form_datetime").value;
		CompanyProductsService.addCompanyProduct(productItem).then(function(result){
			getData();
		});
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
		}
	};
	function editProduct(){
		$scope.tmpProduct.releaseDate = document.getElementById("form_datetime2").value;
		$scope.tmpProduct.tag =getCIdByName($scope.cmpType.name);
		CompanyProductsService.updateCompanyProduct($scope.tmpProduct).then(function(result){
			getData();
		});
	}
	function cancelAdd(){
		$scope.addProductName = "";
		$scope.images= [];
		$scope.addSelectedTags = "";
		$scope.addProductConf = "";
		$scope.addProductShortCut="";
		$scope.addProductVersion = "";
		$scope.addProductModel = "";
		document.getElementById("form_datetime").value=null;

	};
	$scope.deleteProduct=function(product){
		$scope.nowDeleteProduct = product;
	};
	$scope.confirmDelete = function(){
		CompanyProductsService.deleteCompanyProduct($scope.nowDeleteProduct._id).then(function(result){
			getData();
		});
	}
	$scope.cancelDelete=function(){
		$scope.nowDeleteProduct = null;
	};
	$scope.changeProductStatus = function(product){
		CompanyProductsService.changeCompanyProductsState(product._id,!product.state).then(function(result){
			product.state = !product.state;
		});
	};
	$scope.btnAddProduct =function(){
		$scope.addModal = true;
		$scope.lookModal = false;
		$scope.editModal = false;
	};
	$scope.btnLookProduct =function(product){
		$scope.addModal = false;
		$scope.lookModal = true;
		$scope.editModal = false;
		CompanyProductsService.getCompanyProductsDetail(product._id).then(function(result){
			$scope.tmpProduct = result;

		});
		
	};
	$scope.btnEditProduct =function(product){
		$scope.addModal = false;
		$scope.lookModal = false;
		$scope.editModal = true;
		CompanyProductsService.getCompanyProductsDetail(product._id).then(function(result){
			$scope.tmpProduct = result;
			$scope.cmpType = getCtypeById($scope.tmpProduct.tag);
			document.getElementById("form_datetime2").value = $filter('date')($scope.tmpProduct.releaseDate, 'yyyy/MM/dd');
		});
	};

	$scope.images = [];
	$scope.upload = function(file){
		if(file){
			FileService.uploadFile(file).then(function(result) {
				var url = result.urls[0];
				$scope.images.push(url);
			});
		}
	};
	$scope.delete_thumb = function(url){
		for (i in $scope.images){
			if ($scope.images[i] == url){
				$scope.images.splice(i,1);
			}
		}
	}

	$scope.uploadWhenEdit = function(file){
		if(file){
			FileService.uploadFile(file).then(function(result) {
				var url = result.urls[0];
				$scope.tmpProduct.images.push(url);
			});
		}
	}
	$scope.delete_thumb_edit = function(url){
		for (i in $scope.tmpProduct.images){
			if ($scope.tmpProduct.images[i] == url){
				$scope.tmpProduct.images.splice(i,1);
			}
		}
	}
	// $scope.uploadWhenEdit = function(file){
	// 	$scope.reader.readAsDataURL(file);
	// 	var imgItem = new Object();
	// 	imgItem.fileName = file.name;
	// 	$scope.reader.onload=function(e){  
			
	// 		imgItem.file = this.result;
	// 		$scope.tmpProduct.productThumbList.push(imgItem);

	// 	}  
	// 	console.log(file);
	// };
	
	// $scope.delete_thumbWhenEdit = function(item){
	// 	for (i in $scope.tmpProduct.productThumbList){
	// 		if ($scope.tmpProduct.productThumbList[i].fileName == item.fileName){
	// 			$scope.tmpProduct.productThumbList.splice(i,1);
	// 		}
	// 	}
	// }


	
}
]);
