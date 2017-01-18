angular.module("auto-biz-user").controller("CompanyNewsMngController",["$scope","CompanyNewsService","FileService",
function CompanyNewsMngController($scope,CompanyNewsService,FileService) {
	$scope.pageSize = 5;
	$scope.tmpNews={};

	//数据初始化
	$scope.searchStr="";
	$scope.currentPage = 1;
	$scope.cmpId = $scope.leafCmpId;
	getData();

	function getData(){
		loadCompanyNewsData($scope.pageSize,1);
	}

	function loadCompanyNewsData(pagePerNum,currentPage){
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
			$scope.cancelAdd();
		}
		if (lookModal){
			;
		}
		if (editModal) {
			$scope.cancelAdd();
		}
	};
	$scope.uploadThumb = function(file){
		if(file){
			$scope.fileLogo = file;
			FileService.uploadFile(file).then(function(result) {
				$scope.imgUrl = result.urls[0];
			});
		}
	}
	//确认新建资讯
	function addNews(){
		var newsItem = new Object();
		newsItem.pic = $scope.imgUrl;
		newsItem.title = $scope.addNewsTheme;
		newsItem.author = $scope.addNewsAuthor;
		newsItem.tag = $scope.addNewsLabel;
		newsItem.desc = $scope.addNewsShortCut;
		newsItem.wysiwyg = $scope.tmpNews.ueditor;
		newsItem.isFirst = $scope.addNewsOption;
		CompanyNewsService.addCompanyNews(newsItem).then(function(result){
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
		$scope.fileLogo = null;
	};
	$scope.deleteNews = function(news){
		console.log(news);
		$scope.nowDeleteNews = news;
	};
	$scope.confirmDelete = function(){
		CompanyNewsService.deleteCompanyNews($scope.nowDeleteNews._id).then(function(result){
			getData();
		});
	}
	$scope.cancelDelete = function(){
		$scope.nowDeleteNews = null;
	};
	$scope.changeNewsStatus = function(news){
		CompanyNewsService.changeCompanyNewsState(news._id,!news.isOnline).then(function(result){
			news.isOnline = !news.isOnline;
		});
	};
	$scope.btnAddNews =function(){
		$scope.cancelAdd();
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
		$scope.currentPage = 1;
		getData();
	}
	$scope.changePage = function(page){
		loadCompanyNewsData($scope.pageSize,page);
	}
}
]);
