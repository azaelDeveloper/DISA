function pesticidesMasterModel(pesticidesMasters, completeModel) {
	var self = this;
	self.pesticidesMasters = ko.observableArray(pesticidesMasters);
	self.sincronizeMasters = ko.observableArray(completeModel);
	
	self.editPesticideMaster = function(pesticidesMaster) {
		pesticidesMasterId = $(this).attr("id");
		pesticidesMasterDate = $(this).attr("timestamp");
		getPage("file:///android_asset/www/views/pesticides/edit.title.html", "file:///android_asset/www/views/pesticides/edit.html");
	};
	
	self.detailPesticideMaster = function(pesticidesMaster) {
		pesticidesMasterId = $(this).attr("id");
		pesticidesMasterDate = $(this).attr("timestamp");
		getPage("file:///android_asset/www/views/pesticides/detail.title.html", "file:///android_asset/www/views/pesticides/detail.html");		
	};
};

// Query the database
//
function queryDB(tx) {
	tx.executeSql('SELECT * FROM pesticides WHERE idOrchard = ' + orchardMasterId, [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {	
	var len = results.rows.length;
	var pesticidesMasters = [];	

	if (len > 0) {
		for ( var i = 0; i < len; i++) {
			pesticidesMasters[i] = results.rows.item(i);
			if(results.rows.item(i).finished == 0 && results.rows.item(i).synchronized == 0)
				synchronizeModel[i] = results.rows.item(i);								
			
		}		
		completeModel = pesticidesMasters;
		$("#noRecordsFound").hide("fast");
	} else {
		
		$("#noRecordsFound").show("fast");
	}

	viewModel = new pesticidesMasterModel(eval(pesticidesMasters), eval(synchronizeModel));
	ko.applyBindings(viewModel);
	if (Message != null && Message != "")
	{		
		writeMessage(Message);
	}
	else
		Message = null;
}
