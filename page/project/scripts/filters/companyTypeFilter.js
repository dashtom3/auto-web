angular.module('auto-biz-user')
.filter('companyTypeFilter', function() {
  return function(input) {
    //CM初创企业，CG互联网汽车，CS人工智能，NEC自动驾驶，NOC智慧交通，CC汽车金融，CE清洁新能源，PT汽车轻量化，MOC其它
    if(input=="CM") return "初创企业";
    else if(input=="CG") return "智能网联汽车";
    else if(input=="CS") return "人工智能";
    else if(input=="NEC") return "智慧交通";
    else if(input=="NOC") return "汽车共享";
    else if(input=="CC") return "汽车金融";
    else if(input=="CE") return "清洁新能源";
    else if(input=="PT") return "汽车轻量化";
    else if(input=="MOC") return "其它";
    else return "未知";
};
});
