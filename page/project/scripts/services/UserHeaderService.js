angular.module("auto-biz-user")
  .service('UserHeaderService', function () {
  	 console.log("读取userheader数据")
     this.headerList = [{name:"首页",title:"HOME",url:""},{name:"资讯",title:"NEWS",url:""},{name:"对话",title:"DIALOGUE",url:""},{name:"数据",title:"DATA",url:""},{name:"专栏",title:"COLUMNS",url:""},{name:"品车",title:"CARS",url:""},{name:"投稿",title:"CT",url:""},{name:"创新工坊",title:"INNOVATION",url:""}];
});