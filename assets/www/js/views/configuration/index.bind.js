$(function() {	
	$("#getHomePhone").click(function() {		
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
	});
	$("#getHomeTablet").click(function() {		
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
	});	
	$("#showTermsOfUse").click(function(){
		getPage("", "file:///android_asset/www/views/initial_configuration/terms_of_use.html");
	});	
	$("#showPrivacyPolicy").click(function(){
		getPage("", "file:///android_asset/www/views/initial_configuration/privacy_policy.html");
	});
	$("#backChange").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
	});	
	$("#confirm").click(function(){
		var guidUserKey = document.getElementById('guidUser').value;		
		guidUserKey = trim(guidUserKey);
		if(guidUserKey != "")
			sendGuid(guidUserKey);
	});
});
