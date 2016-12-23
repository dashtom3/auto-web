function CompanyNewsMngController($scope) {
	console.log("CompanyNewsMngController");
	$scope.tmpNews={};
	$scope.companyName="小软酱有限公司";
	$scope.deleteID ="";
	$scope.newsList = [
	{
		"newsThumb":"imgs/thumb_news.jpg",
		"newsID":"1",
		"newsdate":"2016/12/13",
		"newsTheme":"安全驾驶，佳通轮胎荣获两项“国际比赛大奖国际比赛大奖”",
		"newsAuthor":"李晓明",
		"newsStatus":"展示中",
		"newsIsOriginal":"true"
	},
	{
		"newsThumb":"imgs/thumb_news.jpg",
		"newsID":"2",
		"newsdate":"2016/12/13",
		"newsTheme":"安全驾驶，佳通轮胎荣获两项“国际比赛大奖”",
		"newsAuthor":"李晓明",
		"newsStatus":"展示中",
		"newsIsOriginal":"true"
	},
	{
		"newsThumb":"imgs/thumb_news.jpg",
		"newsID":"3",
		"newsdate":"2016/12/13",
		"newsTheme":"安全驾驶，佳通轮胎荣获两项“国际比赛大奖”",
		"newsAuthor":"李晓明",
		"newsStatus":"展示中",
		"newsIsOriginal":"true"
	},
	{
		"newsThumb":"imgs/thumb_news.jpg",
		"newsID":"4",
		"newsdate":"2016/12/13",
		"newsTheme":"安全驾驶，佳通轮胎荣获两项“国际比赛大奖”",
		"newsAuthor":"李晓明",
		"newsStatus":"展示中",
		"newsIsOriginal":"true"
	},
	{
		"newsThumb":"imgs/thumb_news.jpg",
		"newsID":"5",
		"newsdate":"2016/12/13",
		"newsTheme":"安全驾驶，佳通轮胎荣获两项“国际比赛大奖”",
		"newsAuthor":"李晓明",
		"newsStatus":"展示中",
		"newsIsOriginal":"true"
	}
	];
	$scope.getFile = function (fileName) {
		fileReader.readAsDataUrl($scope.file, $scope)
		.then(function(result) {
			$scope.imgSrc = result;
		});
	};
	function addNews(){
		console.log("上传，可能需要刷新表单。");
		newsItem = new Object();
		newsItem.newsTheme = $scope.addNewsTheme;
		//
		//newsItem.newsdate = $scope.addNewsdate;
		newsItem.newsAuthor = $scope.addNewsAuthor;
		newsItem.newsThumb = "imgs/thumb_news.jpg";
		//newsItem.newsStatus = $scope.newsStatus;
		var d = new Date();
		var str = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
		newsItem.newsdate = str;
		if ($scope.addNewsOption1 == true){
			newsItem.newsIsOriginal = true;
		}else{
			newsItem.newsIsOriginal = false;
		}
		$scope.newsList.push(newsItem);
	};
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
			//editNews();
		}
	};
	function editNews(){
		for (i in $scope.newsList){
			if ( $scope.tmpNews.newsID == $scope.newsList[i].newsID){
				$scope.newsList.splice(i,1,$scope.tmpNews);
			}
		}
	}
	$scope.cancelAdd=function(){
		$scope.addNewsTheme = "";
		$scope.addNewsAuthor = "";
		$scope.addNewsOption1 = false;
		$scope.addNewsOption2 = false;
		$scope.addNewsLabel = "";
		$scope.addNewsShortCut = "";
		$scope.addNewshtmlVariable = "";
		
	};
	$scope.deleteNews=function(id){
		$scope.deleteID = id;
	};
	$scope.confirmDelete = function(){
		for (i in $scope.newsList){
			if ( $scope.deleteID == $scope.newsList[i].newsID){
				$scope.newsList.splice(i,1);
			}
		}
	}
	$scope.cancelDelete=function(){
		$scope.deleteID = "";
	};
	$scope.changeNewsStatus = function(id){
		console.log("如果post修改成功，");
		for (i in $scope.newsList){
			if ( id == $scope.newsList[i].newsID){
				if ($scope.newsList[i].newsStatus== "展示中"){
					$scope.newsList[i].newsStatus= "隐藏";
				}else if ($scope.newsList[i].newsStatus== "隐藏") {
					$scope.newsList[i].newsStatus= "展示中";
				}
			}
		}
	};
	$scope.btnAddNews =function(){
		$scope.addModal = true;
		$scope.lookModal = false;
		$scope.editModal = false;
	};
	$scope.btnLookNews =function(newsItem){
		console.log(newsItem);
		$scope.addModal = false;
		$scope.lookModal = true;
		$scope.editModal = false;
		$scope.tmpNews  = newsItem;
		
	};
	$scope.btnEditNews =function(newsItem){
		$scope.addModal = false;
		$scope.lookModal = false;
		$scope.editModal = true;
		$scope.tmpNews  = cloneObj(newsItem);
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

	$scope.pageCount = 5;
	$scope.pageSize = 4;
	$scope.total = 50;
}