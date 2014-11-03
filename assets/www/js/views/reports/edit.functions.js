function reportMasterModel(report){
	var self = this;
	self.reportsArray = ko.observableArray([]);
	self.reportsArray(report);

	self.takePhotoReport = function() {		
		var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true};
		navigator.camera.getPicture(onSuccess, onFail,options); 
		
		function onSuccess(imageURI){			
			self.reportsArray()[0].photoReport = getRootName(imageURI);												
			var image = document.getElementById('ImageReport');
			image.src = imageURI;
			navigator.notification.alert("Foto de Reporte actualizado con éxito", alertMiss, "Foto de Reporte actualizada", "Aceptar");
		}

		function onFail(message) {
    		navigator.notification.alert("Se canceló foto del Reporte", alertMiss, "Cancelado", "Aceptar");
		}
	}
	self.updateAll = function(){
		var disinfectantsToJSON = ko.mapping.toJSON(self.reportsArray);					
		db.transaction(updateDB, errorCB);
		function updateDB(tx) {			
			getGPS();
			var query = 'UPDATE reports SET report =';
			query += "'"+ disinfectantsToJSON + "', gps = '" + gps + "', timestamp = '" + getCurrentDateTime() + "' WHERE id =" + reportId;			
			tx.executeSql(query);
			Message = "Se acutalizo reporte correctamente..."
			getPage("file:///android_asset/www/views/reports/index.title.html",
				"file:///android_asset/www/views/reports/index.html");
		}
		function errorCB(err) {
			console.log("Error processing SQL: " + err.code);
		}
	}

}
function queryDB(tx) {
	var QUERY = 'SELECT * FROM reports where id=' + reportId;
	tx.executeSql(QUERY, [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
	var len = results.rows.length;

	if (len > 0) {				
		report = results.rows.item(0).report;
		currentDate = results.rows.item(0).timestamp;				
	}	
	viewModel = new reportMasterModel(eval(report));
	ko.applyBindings(viewModel);
	fillImage(eval(report));
}
function fillImage(report)
{
	self.reporPhoto = ko.observableArray([]);
	self.reporPhoto(report);	
	var imgR = document.getElementById('ImageReport');
	imgR.src = self.reporPhoto()[0].photoReport;
}
$("#getHomeTablet").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
$("#getHomePhone").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});