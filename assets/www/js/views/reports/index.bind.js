function getNewReport () {	
	getPage("file:///android_asset/www/views/reports/save.title.html", "file:///android_asset/www/views/reports/save.html");
}
$("#graphics").click(function(){
		getPage("file:///android_asset/www/views/reports/graphics.title.html", "file:///android_asset/www/views/reports/graphics.html");		
	});
$("#getHomeTablet").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
$("#getHomePhone").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});