function orchardMasterModel(orchardsMaster) {
	var self = this;
	self.orchardsMaster = ko.observableArray(orchardsMaster);	
	
	self.selectOrchardMaster = function(orchardsMaster) {
		orchardMasterId = $(this).attr("id");
		ochardMasterName = $(this).attr("name");
		Message = 'Selecciono la huerta "' + ochardMasterName + '"';		
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
	};
	
	self.deleteOrchardMaster = function(orchardsMaster) {
		orchardMasterId = $(this).attr("id");		
		ochardMasterName = $(this).attr("name");
		getPage("file:///android_asset/www/views/orchards/delete.title.html", "file:///android_asset/www/views/orchards/delete.html");
	};
};

// Query the database
//
function queryDB(tx) {	
	tx.executeSql('SELECT * FROM orchard', [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
	var len = results.rows.length;
	var orchardsMaster = [];	

	if (len > 0) {
		for ( var i = 0; i < len; i++) {
			orchardsMaster[i] = results.rows.item(i);
		}
		ko.mapping.toJSON(orchardsMaster);
		Indexer = results.rows.length;		
		$("#noRecordsFound").hide("fast");
	} else {
		
		$("#noRecordsFound").show("fast");
	}	
	viewModel = new orchardMasterModel(eval(orchardsMaster));
	ko.applyBindings(viewModel);	
	if (Message != null && Message != "")
	{		
		writeMessage(Message);
	}
	else
		Message = null;	
}
function queryCount(tx){
	tx.executeSql('SELECT COUNT (*) AS COUNTING FROM orchard', [], onComplete, errorCB)
}
function onComplete(tx, results){
	var len = results.rows.length;
	var available = 5;
	var orchardLeft;

	if (len > 0){
		for ( var i = 0; i < len; i++) {
			orchardLeft = results.rows.item(i).COUNTING;
		}
		if (orchardLeft  == 1){
			orchardMasterId = results.rows.item(0).id;
			ochardMasterName = results.rows.item(0).name;			
		}
	}		
	orchardsLeft = (available - orchardLeft);	
}
