function pestsMasterModel(pestsMasters, completeModel) {
	var self = this;
	self.pestsMasters = ko.observableArray(pestsMasters);
	self.sincronizeMasters = ko.observableArray(completeModel);
	
	self.editPestsMaster = function(pestMaster) {
		pestsMasterId = $(this).attr("id");
		pestsMasterDate = $(this).attr("timestamp");		
		getPage("file:///android_asset/www/views/pests/edit.title.html", "file:///android_asset/www/views/pests/edit.html");
	};
	
	self.detailPestsMaster = function(pestMaster) {
		pestsMasterId = $(this).attr("id");
		pestsMasterDate = $(this).attr("timestamp");
		getPage("file:///android_asset/www/views/pests/detail.title.html", "file:///android_asset/www/views/pests/detail.html");		
	};
	
	self.deletePestsMaster = function(pestMaster) {		
		pestsMasterId = $(this).attr("id");
		pestsMasterDate = $(this).attr("timestamp");
		getPage("file:///android_asset/www/views/pests/detail.title.html", "file:///android_asset/www/views/pests/detail.html");
	};
};

// Query the database
//
function queryDB(tx) {
	tx.executeSql('SELECT * FROM pests WHERE idOrchard = ' + orchardMasterId, [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
	var len = results.rows.length;	
	var pestsMasters = [];

	if (len > 0) {
		for ( var i = 0; i < len; i++) {
			pestsMasters[i] = results.rows.item(i);								
			if(results.rows.item(i).finished == 0 && results.rows.item(i).synchronized == 0)				
				synchronizePests[i] = results.rows.item(i);								
		}
		emailModel = pestsMasters;
		$("#noRecordsFound").hide("fast");
	} else {
		$("#noRecordsFound").show("fast");
	}

	viewModel = new pestsMasterModel(eval(pestsMasters),  eval(synchronizePests));
	ko.applyBindings(viewModel);
	if (Message != null && Message != "")
	{		
		writeMessage(Message);
	}
	else
		Message = null;	
}

// Transaction error callback
//
function errorCB(err) {
	console.log("Error processing SQL: " + err.code);
}