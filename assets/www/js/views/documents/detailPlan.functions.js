function queryDB(tx) {
	tx.executeSql('SELECT * FROM documents where documentType = 3 and parentDoc = ' + planId, [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
	var len = results.rows.length;	
	var procedureArray = [];
	if (len > 0) {
		for ( var i = 0; i < len; i++) {
			procedureArray[i] = results.rows.item(i);
			procedureArray[i]["number"] = (i+1);
		}
		$("#noRecordsFound").hide("fast");
	} else {
		$("#noRecordsFound").show("fast");
	}

		var procedureModel = function(procedureArray){
			var self = this;
			self.procedureArray = ko.observable(procedureArray);
			self.detailDocumentProcedure = function(procedureArray) {
				procedureId = $(this).attr("id");
				procedureTitle = $(this).attr("title");
				procedureHTML = $(this).attr("html");
				getPage("file:///android_asset/www/views/documents/detailProcedure.title.html", "file:///android_asset/www/views/documents/detailProcedure.html#top");			
			};
		};

	vm = new procedureModel(eval(procedureArray));
	ko.applyBindings(vm);		
}

function errorCB(err) {
	console.log("Error processing SQL: " + err.code);
}