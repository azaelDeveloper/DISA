$(function() {
	$("#cancelAll").click(function() {
		navigator.app.exitApp();
	});
	
	$("#agree").click(function() {
		setAsAgreed();
		getPage("file:///android_asset/www/views/initial_configuration/license.title.html", "file:///android_asset/www/views/initial_configuration/license.html");
	});
	
	$("#showTermsOfUse").click(function(){
		getPage("", "file:///android_asset/www/views/initial_configuration/terms_of_use.html");
	});
	
	$("#showPrivacyPolicy").click(function(){
		getPage("", "file:///android_asset/www/views/initial_configuration/privacy_policy.html");
	});
});
