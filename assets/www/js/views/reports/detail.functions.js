function reportMasterModel(report){
	var self = this;
	self.reportsArray = ko.observable([]);
	self.reportsArray(report);
	self.deleteThisView = function() {			
		$(function() {			
			$('#deleteModal').modal('hide');
			db.transaction(deleteView, errorCB);
		});	
	}
	self.sendByMail = function(){
		var emailBody = $('#reportComplete').html();		
		emailBody += $('#bodyReport').html();		
		var photoAttachment = [self.reportsArray()[0].photoReport];						
		alert(photoAttachment);
		window.plugins.emailComposer.showEmailComposer("Reporte de Incidente #" + reportId, emailBody,[],[],[], true, photoAttachment);		
	}	
}

function deleteView(tx) {
	query = 'DELETE FROM reports WHERE id=' + reportId;
	tx.executeSql(query);
	Message = "Se borro reporte correctamente..."
	getPage("file:///android_asset/www/views/reports/index.title.html", "file:///android_asset/www/views/reports/index.html");
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
}
$("#getHomeTablet").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
$("#getHomePhone").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
//window.plugins.emailComposer.showEmailComposer("Look at this photo","Take a look at <b>this<b/>:",["example@email.com", "johndoe@email.org"],[],[],true,["/storage/sdcard0/DCIM/Camera/IMG_20130812_113011.jpg", "/storage/sdcard0/DCIM/Camera/IMG_20130812_113011.jpg"]);