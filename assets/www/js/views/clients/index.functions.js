function TickViewModel(tickets){
	var self = this;
	self.clients = ko.observableArray([]);	
	self.clients(tickets);
	self.checkTickets = function(client){
		clientID = client.idClient;		
		nameClient = client.nameClient;		
		getPage("file:///android_asset/www/views/clients/tickets.title.html", "file:///android_asset/www/views/clients/tickets.html");
	}
}
function fillClients(tx) {	
	tx.executeSql('SELECT * FROM clients', [], allclients, errorCB);
}
function allclients(tx, results) {
	var len = results.rows.length;
	var tickets = [];		
	for (var i = 0; i < len; i++){				
		tickets.push(results.rows.item(i));
		$("#noRecordsFound").hide("fast");
	}
	var viewModel = TickViewModel(eval(tickets));
	ko.applyBindings(viewModel);			
}
