$(function (){
	$("#back").click(function(){
		getPage("file:///android_asset/www/views/initial_configuration/admin.title.html", "file:///android_asset/www/views/initial_configuration/admin.html");
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
