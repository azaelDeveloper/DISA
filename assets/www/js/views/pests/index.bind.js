$(function() {
	$("#addNew").click(function() {
		getPage("file:///android_asset/www/views/pests/save.title.html", "file:///android_asset/www/views/pests/save.html");
	});
	$("#getHelp").click(function(){
		$("#helpBody").focus();
		getHelp("file:///android_asset/www/views/help/pests/titleHelp.html", "file:///android_asset/www/views/help/pests/bodyHelp.html");
	});
	$("#getHomeTablet").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
	$("#getHomePhone").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
	$('#sendAllEmail').click(function(){
		emailAll(emailModel);
	});
	$('#Sync').click(function(){		
		if(guidUserKey != null && guidUserKey != ""){
			db.transaction(SelectIDs, errorCB);
			SynchronizedPests(synchronizePests);			
		}
		else{
			navigator.notification.alert("Necesita registrar una clave válida.", alertMiss, "Registre su aplicación", "Aceptar");							
			getPage("file:///android_asset/www/views/configuration/index.title.html", "file:///android_asset/www/views/configuration/index.html");	
		}
	});
});