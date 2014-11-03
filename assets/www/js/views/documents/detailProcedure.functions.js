function queryDB(tx) {
	tx.executeSql('SELECT * FROM documents where documentType = 4 and parentDoc = ' + procedureId, [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
	var len = results.rows.length;	
	var requirementArray = [];
	if (len > 0) {
		for ( var i = 0; i < len; i++) {
			requirementArray[i] = results.rows.item(i);
			requirementArray[i]["number"] = (i+1);
		}
		$("#noRecordsFound").hide("fast");
	} else {
		$("#noRecordsFound").show("fast");
	}

		var requirementModel = function(requirementArray){
			var self = this;
			self.requirementArray = ko.observable(requirementArray);
			self.detailDocumentRequirement = function(requirementArray) {
				requirementId = $(this).attr("id");
				requirementTitle = $(this).attr("title");
				requirementHTML = $(this).attr("html");
				getPage("file:///android_asset/www/views/documents/detailRequirement.title.html", "file:///android_asset/www/views/documents/detailRequirement.html#top");			
			};
		};

	vm = new requirementModel(eval(requirementArray));
	ko.applyBindings(vm);		
}

function errorCB(err) {
	console.log("Error processing SQL: " + err.code);
}