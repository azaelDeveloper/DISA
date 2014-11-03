$(function() {
	$("#clean").click(function() {
		getPage("file:///android_asset/www/views/safety/clean/index.title.html", "file:///android_asset/www/views/safety/clean/index.html");
	});
	$("#pesticides").click(function() {
		getPage("file:///android_asset/www/views/safety/pesticides/save.title.html", "file:///android_asset/www/views/safety/pesticides/save.html");
	});
	$("#traps").click(function() {
		getPage("file:///android_asset/www/views/safety/traps/save.title.html", "file:///android_asset/www/views/safety/traps/save.html");
	});
	$("#equipment").click(function() {
		getPage("file:///android_asset/www/views/safety/equipment/save.title.html", "file:///android_asset/www/views/safety/equipment/save.html");
	});
	$("#goodPractices").click(function() {
		getPage("file:///android_asset/www/views/safety/goodPractices/save.title.html", "file:///android_asset/www/views/safety/goodPractices/save.html");
	});
	$("#production").click(function() {
		getPage("file:///android_asset/www/views/safety/production/save.title.html", "file:///android_asset/www/views/safety/production/save.html");
	});
	$("#getHomeTablet").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
	$("#getHomePhone").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
});
