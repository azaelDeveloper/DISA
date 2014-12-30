function ClientsOrderViewModel(clients){
	var self = this;
	self.clients = ko.observableArray([]);	
	self.clients(clients);	
	self.detailReports = function(client) {				
		clientID = client.idClient;
		clientName = client.nameClient;
		route = client.route;
		direction = client.direction;
		entity = client.entity;
		colony = client.colony;
		cp = client.cp;
		creditLimit = client.creditLimit
		getPage("file:///android_asset/www/views/orders/newOrder.title.html", "file:///android_asset/www/views/orders/newOrder.html");
		//tx.executeSql('CREATE TABLE IF NOT EXISTS clients(id INTEGER PRIMARY KEY, idClient TEXT, nameClient TEXT, direction TEXT, poblation TEXT, entity TEXT, colony TEXT, cp TEXT, creditLimit TEXT, active INTEGER, route TEXT, timestampp NUMERIC)');
	};
}
function getClients(tx) {
	tx.executeSql('SELECT * FROM clients', [], clients, errorCB);
}
function clients(tx, results) {
	var len = results.rows.length;
	var clients = [];		
	for (var i = 0; i < len; i++){
		if(results.rows.item(i).active == 1){									
			clients.push(results.rows.item(i));
			$("#noRecordsFound").hide("fast");
		}		
	}
	var viewModel = ClientsOrderViewModel(eval(clients));
	ko.applyBindings(viewModel);			
}
