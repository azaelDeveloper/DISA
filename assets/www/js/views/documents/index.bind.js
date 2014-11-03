$(function() {	
	$("#getHomePhone").click(function() {		
		getPage(backTitleUrl, backBodyUrl);
	});
	$("#getHomeTablet").click(function() {		
		getPage(backTitleUrl, backBodyUrl);
	});	
	$("#backChange").click(function(){
		getPage(backTitleUrl, backBodyUrl);
	});	
	$("#update").click(function(){
		getUpdate();
	});	
});
