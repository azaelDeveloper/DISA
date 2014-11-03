function queryDB(tx) {
	tx.executeSql('SELECT * FROM documents where documentType = 2 and parentDoc = ' + manualId, [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
	var len = results.rows.length;	
	var planArray = [];
	if (len > 0) {
		for ( var i = 0; i < len; i++) {
			planArray[i] = results.rows.item(i);
			planArray[i]["number"] = (i+1);
		}
		$("#noRecordsFound").hide("fast");
	} else {
		$("#noRecordsFound").show("fast");
	}

		var planModel = function(planArray){
			var self = this;
			self.planArray = ko.observable(planArray);
			self.detailDocumentPlan = function(planArray) {
				planId = $(this).attr("id");
				planTitle = $(this).attr("title");
				planHTML = $(this).attr("html");
				getPage("file:///android_asset/www/views/documents/detailPlan.title.html", "file:///android_asset/www/views/documents/detailPlan.html#top");
			};
		};

	vm = new planModel(eval(planArray));
	ko.applyBindings(vm);		
}

function errorCB(err) {
	console.log("Error processing SQL: " + err.code);
}