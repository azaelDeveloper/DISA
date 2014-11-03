backTitleUrl = "file:///android_asset/www/views/orchards/index.title.html";
backBodyUrl = "file:///android_asset/www/views/orchards/index.html";
$("#addOrchard").click(function(){		
	if(orchardsLeft != 0){
		db.transaction(queryAddOrchard, errorCB);
	}
	else
		navigator.notification.alert("Alcanzó el límite de Huertas.", alertMiss, "Error", "Aceptar");		
});
$("#getHomeTablet").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
});
$("#getHomePhone").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
});
$("#numberOrchards").html(orchardsLeft);