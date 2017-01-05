function CompanyNewsMngController($scope,CompanyNewsService,FileService) {
	console.log("CompanyNewsMngController");
	$scope.pageSize = 5;
	$scope.tmpNews={};
	$scope.companyName="小软酱有限公司";
	$scope.deleteID ="";

	//数据初始化
	$scope.searchStr="";
	$scope.currentPage = 1;
	$scope.cmpId = $scope.leafCmpId;
	getData();

	function getData(){
		loadCompanyNewsData($scope.pageSize,1);
	}

	function loadCompanyNewsData(pagePerNum,currentPage){
		console.log("readData");
		console.log($scope.searchStr);
		CompanyNewsService.getCompanyNewsList($scope.searchStr,"","","","",$scope.cmpId,"","",pagePerNum,currentPage).then(function(result){
			$scope.cmpNewsList= result.list;
			$scope.currentPage = result.currentPage;
			$scope.total = result.totalNum;
		});
	}


	$scope.confirm = function(addModal,lookModal,editModal){
		if (addModal){
			addNews();
		}
		if (lookModal){
			;
		}
		if (editModal) {
			editNews();
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
	$scope.uploadThumb = function(file){
		console.log("1");
		if(file){
			$scope.fileLogo = file;
			FileService.uploadFile(file).then(function(result) {
				$scope.imgUrl = result.urls[0];
			});
		}
	}
	//确认新建资讯
	function addNews(){
		console.log("上传，可能需要刷新表单。");
		var newsItem = new Object();
		newsItem.pic = $scope.imgUrl;
		newsItem.title = $scope.addNewsTheme;
		newsItem.author = $scope.addNewsAuthor;
		newsItem.tag = $scope.addNewsLabel;
		newsItem.desc = $scope.addNewsShortCut;
		newsItem.wysiwyg = $scope.tmpNews.ueditor;
		newsItem.isFirst = $scope.addNewsOption;
		console.log(newsItem);
		CompanyNewsService.addCompanyNews(newsItem).then(function(result){
			console.log(result);
			getData();
		});
		
	};

	//确认修改资讯
	function editNews(){
		CompanyNewsService.updateCompanyNews($scope.tmpNews).then(function(result){
			getData();
		});
	}

	//取消新建资讯，临时变量初始化。
	$scope.cancelAdd=function(){
		$scope.addNewsTheme = "";
		$scope.addNewsAuthor = "";
		$scope.addNewsOption1 = false;
		$scope.addNewsOption2 = false;
		$scope.addNewsLabel = "";
		$scope.addNewsShortCut = "";
		$scope.addNewshtmlVariable = "";
		
	};
	$scope.deleteNews=function(news){
		$scope.deleteNews = news;
	};
	$scope.confirmDelete = function(){
		CompanyNewsService.deleteCompanyNews($scope.deleteNews._id).then(function(result){
			getData();
		});
	}
	$scope.cancelDelete=function(){
		$scope.deleteID = null;
	};
	$scope.changeNewsStatus = function(news){
		CompanyNewsService.changeCompanyNewsState(news._id,!news.isOnline).then(function(result){
			news.isOnline = !news.isOnline;
		});
	};
	$scope.btnAddNews =function(){
		$scope.addModal = true;
		$scope.lookModal = false;
		$scope.editModal = false;
	};
	$scope.btnLookNews =function(newsItem){
		$scope.addModal = false;
		$scope.lookModal = true;
		$scope.editModal = false;
		CompanyNewsService.getCompanyNewsDetail(newsItem._id).then(function(result){
			$scope.tmpNews  = result;
			$scope.fileLogo = $scope.tmpNews.pic;
		});
		
		
	};
	$scope.btnEditNews =function(newsItem){
		$scope.addModal = false;
		$scope.lookModal = false;
		$scope.editModal = true;
		CompanyNewsService.getCompanyNewsDetail(newsItem._id).then(function(result){
			$scope.tmpNews  = result;
			$scope.fileLogo = $scope.tmpNews.pic;
		});
	};

	$scope.btnSearch = function(){
		getData();
	}
	$scope.changePage = function(page){
		loadCompanyNewsData($scope.pageSize,page);
	}
}