$(function() {	
	$("#getHomePhone").click(function() {		
		getPage(backTitleUrl, backBodyUrl);
	});
	$("#getHomeTablet").click(function() {		
		getPage(backTitleUrl, backBodyUrl);
	});	
	$("#backChange").click(function(){
		getPage("file:///android_asset/www/views/documents/detailManual.title.html", "file:///android_asset/www/views/documents/detailManual.html");
	});
});
