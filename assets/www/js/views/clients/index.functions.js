function clientsViewModel(clients){
	var self = this;
	self.clients = ko.observableArray([clients]);
}
function getClients(tx) {
	tx.executeSql('SELECT * FROM clients', [], clients, errorCB);
}
function clients(tx, results) {
	var len = results.rows.length;
	var clients = [];	
	for (var i = 0; i < len; i++){		
		clients.push(results.rows.item(i));
		$("#noRecordsFound").hide("fast");
	}
	var viewModel = clientsViewModel(eval(clients));
	ko.applyBindings(viewModel);		
	$("#bodyTable").html(table);
}
