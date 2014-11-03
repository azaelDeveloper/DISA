function suppliersMasterModel(suppliersMasters, SyncModel) {
	var self = this;
	self.suppliersMasters = ko.observableArray(suppliersMasters);
	self.sincronizeMasters = ko.observableArray(SyncModel);
	
	self.editSupplierMaster = function(supplierMaster) {
		supplierMasterId = $(this).attr("id");
		supplierMasterDate = $(this).attr("timestamp");
		getPage("file:///android_asset/www/views/suppliers/edit.title.html", "file:///android_asset/www/views/suppliers/edit.html");
	};
	
	self.detailSupplierMaster = function(supplierMaster) {
		supplierMasterId = $(this).attr("id");
		supplierMasterDate = $(this).attr("timestamp");
		getPage("file:///android_asset/www/views/suppliers/detail.title.html", "file:///android_asset/www/views/suppliers/detail.html");		
	};
};

// Query the database
//
function queryDB(tx) {
	tx.executeSql('SELECT * FROM suppliers WHERE idOrchard = ' + orchardMasterId, [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
	var len = results.rows.length;
	var suppliersMasters = [];

	if (len > 0) {
		for ( var i = 0; i < len; i++) {
			suppliersMasters[i] = results.rows.item(i);
			if (results.rows.item(i).finished == 0 && results.rows.item(i).synchronized == 0)
				synchronizeSuppliers[i] = results.rows.item(i);
		}
		completeModel = suppliersMasters;
		$("#noRecordsFound").hide("fast");
	} else {
		$("#noRecordsFound").show("fast");
	}

	viewModel = new suppliersMasterModel(eval(suppliersMasters), eval(synchronizeSuppliers));
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