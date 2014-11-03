$(function() {
	$("#returnPage").click(function() {
		getPage("file:///android_asset/www/views/monthly_master/index.title.html", "file:///android_asset/www/views/monthly_master/index.html");		
	});
	$("#getHomeTablet").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
	$("#getHomePhone").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
});