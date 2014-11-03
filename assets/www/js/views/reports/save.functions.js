function Report(answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8, answer9, answer10, photo){
		var self1 = this;
		self1.answerReport1 = ko.observable(answer1);
		self1.answerReport2 = ko.observable(answer2);
		self1.answerReport3 = ko.observable(answer3);
		self1.answerReport4 = ko.observable(answer4);
		self1.answerReport5 = ko.observable(answer5);
		self1.answerReport6 = ko.observable(answer6);
		self1.answerReport7 = ko.observable(answer7);
		self1.answerReport8 = ko.observable(answer8);
		self1.answerReport9 = ko.observable(answer9);
		self1.answerReport10 = ko.observable(answer10);		
		self1.photoReport = ko.observable(photo);
		self.takePhotoReport = function() {
		var self = this;		
		var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true};
		navigator.camera.getPicture(onSuccess, onFail,options); 

		function onSuccess(imageURI){			
			self.photoReport = getRootName(imageURI);						
			var image = document.getElementById('ImageReport');
			image.src = imageURI;
			Message = "Reporte Guardado...";
		}   	

		function onFail(message) {
    		navigator.notification.alert("Se canceló foto del Reporte", alertMiss, "Se cancelo foto del reporte", "Aceptar");
		}
	}
}
function reportViewModel() {
	self = this;
	reportModel(self);
}
function reportModel(self){

	self.reports = ko.observableArray([ new Report("", "", "", "", "", "", "",
		"", 0, "", "")]);	
}	
function saveAll() {
		db.transaction(save, errorCB);
	}
	function save(tx) {
		var d = new Date();
		// BUILDING JSON DISINFECTANTS			
		var reportsToJson = ko.mapping.toJSON(self.reports);				
		getGPS();
		var query = 'INSERT INTO reports (report, gps, month, year, timestamp, idOrchard)';
		query += "VALUES ('" + reportsToJson + "', '"  + gps + "', "+ (d.getUTCMonth() + 1) +", " + (d.getFullYear()) +", '" + getCurrentDateTime() + "', "+ orchardMasterId +")";				
		tx.executeSql(query);
		Message = "Se guardo reporte correctamente...";
		getPage(
				"file:///android_asset/www/views/reports/index.title.html",
				"file:///android_asset/www/views/reports/index.html");
	}
$("#getHomeTablet").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
$("#getHomePhone").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});


