window.alert = function(str)
{
	var shield = document.createElement("DIV");
	shield.id = "shield";
	shield.style.position = "absolute";
	shield.style.left = "0px";
	shield.style.top = "0px";	     
	shield.style.width = "100%";
	shield.style.height = document.body.offsetHeight+"px";
	 //弹出对话框时的背景颜色
	 shield.style.background = "rgba(14,31,71,0.25)";
	 shield.style.textAlign = "center";
	 shield.style.zIndex = "25";
	 //背景透明 IE有效
	 //shield.style.filter = "alpha(opacity=0)";
	 var alertFram = document.createElement("DIV");
	 alertFram.id="alertFram";
	 alertFram.style.position = "fixed";
	 alertFram.style.left = "50%";
	 alertFram.style.top = "50%";
	 alertFram.style.marginLeft = "-155px";
	 alertFram.style.marginTop = "-64px";
	 alertFram.style.width = "310px";
	 alertFram.style.height = "128px";
	 alertFram.style.textAlign = "center";
	 alertFram.style.zIndex = "300";
	 alertFram.style.background = "white";
	 strHtml = "<ul class=\"modal-middle\">\n";
	 strHtml += " <li class=\"modal-top\"></li>\n";
	 strHtml += " <li class=\"modal-content2\"><img src=\"/page/project/images/company/warn.png\">"+str+"</li>\n";
	 //取消按钮
	 strHtml += " <li class=\"modal-def1\"><input class=\"inp1\" type=\"button\" value=\"取消\" onclick=\"doOk()\" /></li>\n";
	 //确定按钮
	 strHtml += " <li class=\"modal-def2\"><input class=\"inp2\" type=\"button\" value=\"确定\" onclick=\"doOk()\" /></li>\n";
	 strHtml += "</ul>\n";
	 alertFram.innerHTML = strHtml;
	 document.body.appendChild(alertFram);
	 document.body.appendChild(shield);	     
	 this.doOk = function(){
	 	alertFram.style.display = "none";
	 	shield.style.display = "none";
	 }
	 alertFram.focus();
	 document.body.onselectstart = function(){return false;};
}