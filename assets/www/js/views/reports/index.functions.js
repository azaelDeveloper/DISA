function reportsMasterModel(reports) {
	var self = this;
	self.reports = ko.observableArray(reports);
	
	self.editReports = function(dailyMaster) {
		reportId = $(this).attr("id");
		reportDate = $(this).attr("timestamp");
		getPage("file:///android_asset/www/views/reports/edit.title.html", "file:///android_asset/www/views/reports/edit.html");
	};
	
	self.detailReports = function(dailyMaster) {
		reportId = $(this).attr("id");		
		reportDate = $(this).attr("timestamp");
		getPage("file:///android_asset/www/views/reports/detail.title.html", "file:///android_asset/www/views/reports/detail.html");		
	};
};

// Query the database
//
function queryDB(tx) {	
	tx.executeSql('SELECT * FROM reports WHERE idOrchard = ' + orchardMasterId, [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
	var len = results.rows.length;
	var reports = [];	

	if (len > 0) {
		for ( var i = 0; i < len; i++) {
			reports[i] = results.rows.item(i);
		}
		ko.mapping.toJSON(reports);
		Indexer = results.rows.length;		
		$("#noRecordsFound").hide("fast");
	} else {
		
		$("#noRecordsFound").show("fast");
	}

	viewModel = new reportsMasterModel(eval(reports));
	ko.applyBindings(viewModel);
	if (Message != null && Message != "")
	{		
		writeMessage(Message);
	}
	else
		Message = null;
}