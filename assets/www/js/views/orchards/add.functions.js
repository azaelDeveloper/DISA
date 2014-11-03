function queryAddOrchard(tx){	
	var nameOrchard = document.getElementById("newName").value;
	nameOrchard = trim(nameOrchard);	
	if(nameOrchard != ""){
		getGPS();
		var query = "INSERT INTO orchard (name, timestamp, gps)"
		query += "VALUES('" + nameOrchard + "', '" + getCurrentDateTime() + "', '" + gps + "')";
		tx.executeSql(query);		
		Message = 'Se guardo huerta de nombre: "' + nameOrchard + '"';
		getPage("file:///android_asset/www/views/orchards/index.title.html", "file:///android_asset/www/views/orchards/index.html");
	}
	else
		navigator.notification.alert("No se puede continuar hasta que ponga un nombre a la huerta.", alertMiss, "Error", "Aceptar");	
	
}
