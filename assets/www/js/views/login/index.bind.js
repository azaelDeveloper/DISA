$(function() {
	$("#LogIn").click(function() {
		var ready = validateUserLogIn();
		if (ready){
			LogIn();
		}
	});
});