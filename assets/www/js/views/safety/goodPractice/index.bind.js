$(function() {
	$("#addNew").click(function() {
		getPage("file:///android_asset/www/views/pesticides/save.title.html", "file:///android_asset/www/views/pesticides/save.html");
	});
	$("#getHelp").click(function(){
		$("#helpBody").focus();
		getHelp("file:///android_asset/www/views/help/pesticides/titleHelp.html", "file:///android_asset/www/views/help/pesticides/bodyHelp.html");
	});
	$("#getHomeTablet").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
	$("#getHomePhone").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
	$('#sendAllEmail').click(function(){
		emailAll(completeModel);
	});
	$('#Sync').click(function(){		
		if(guidUserKey != null && guidUserKey != ""){
			SynchronizedPesticides(synchronizeModel);
			alert("Sincronizando con clave: " + guidUserKey);
		}
		else{
			navigator.notification.alert("Necesita registrar una clave válida.", alertMiss, "Registre su aplicación", "Aceptar");							
			getPage("file:///android_asset/www/views/configuration/index.title.html", "file:///android_asset/www/views/configuration/index.html");	
		}
	});
});