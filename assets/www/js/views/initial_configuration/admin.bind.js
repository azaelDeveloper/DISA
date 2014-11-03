$(function (){
	$("#back").click(function(){
		getPage("file:///android_asset/www/views/initial_configuration/account_types.title.html", "file:///android_asset/www/views/initial_configuration/account_types.html")
	});
	$("#getHome").click(function() {
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/home/login/index.html");
	});
	
	$("#next").click(function(){
		var ready = validateUserForm();
		if (ready){
			Save();
		}
	});
	
	$("#AdminName").focusout(function() {
		validateName();
	});
	
	$("#AdminLastName").focusout(function() {
		validateLastName();
	});
	
	$("#AdminEmail").focusout(function() {
		validateEmail();
	});
	
	$("#AdminPassword").focusout(function() {
		validatePassword();
	});
	
	$("#AdminRepeatPassword").focusout(function() {
		validateRepeatPassword();
	});
});
