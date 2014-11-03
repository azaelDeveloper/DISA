$(function (){
	$("#home").click(function() {
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
		//Cambie el title para ver si desaparecen algunos errores simples (como no existe title deja el anterior)
	});
	
	$("#logOut").click(function() {
		window.localStorage.clear();
		$("#Log").show("fast");
		$("#Admin").hide("fast");
		$("#User").hide("fast");
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
		//Regresar a la página principal de donde quiera que esté de logout
	});
	
	$("#sessionPromptModal").click(function() {
		sessionPrompt.dialog("open");
	});

	$("#endApp").click(function() { 
		navigator.app.exitApp();
	});

	$("#pauseApp").click(function() { 
		backTitleUrl = "";
		backBodyUrl = "";
		getBackTo();
	});
});