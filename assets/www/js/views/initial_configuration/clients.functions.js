function synclients() {
	var url = "http://www.siaa.mx/app/AppDataService.asmx/Clientes";
	$.ajax({
	    type: "POST",
	    url: url,
	    data: { guid: guidUserKey},
	    contentType: "text/json",
	    dataType: "text",
	    cache: false,
	    success: function(result) {       	    	
	      	if (result != null){	      		
				chargeClients(result);
				pass = true;
				navigator.notification.alert("Se actualizaron clientes...", alertMiss, "Respuesta del servidor", "Aceptar");	            
	      	}
	      	else
	      		navigator.notification.alert("Problemas con el servidor, contacte a soporte.", alertMiss, "Respuesta del servidor", "Aceptar");	            					
	    },
	    error:function (xhr, ajaxOptions, thrownError){
	        navigator.notification.alert("No se puede contactar al servidor", alertMiss, "Respuesta del servidor", "Aceptar");
	        pass = true;
	        //getPage("file:///android_asset/www/views/initial_configuration/clients.title.html", "file:///android_asset/www/views/initial_configuration/clients.html");
	    },
	    async: true
	});
}
function chargeClients(json) {		
	var viewModel = clientsViewModel(eval(json));
	ko.applyBindings(viewModel);		
}
function clientsViewModel(clients){
	self.clients = ko.observableArray([]);	
	self.clients(clients);
	db.transaction(saveClients, errorCB);
	function saveClients(tx){
		//tx.executeSql('CREATE TABLE IF NOT EXISTS clients(id INTEGER PRIMARY KEY, idClient TEXT, nameClient TEXT, creditLimit TEXT, active TEXT, route TEXT, timestamp NUMERIC)');		
		for (var x = 0; x < self.clients().length; x++){			
			var query = "INSERT INTO clients (IdClient, nameClient, creditLimit, active, route, timestamp) VALUES ("+ self.clients()[x].IdClient +", '"+ self.clients()[x].nameClient +"', '"+ self.clients()[x].limit +"', '"+ self.clients()[x].Active +"', '"+ self.clients()[x].route +"', '"+ getCurrentDateTime() +"')";				
			tx.executeSql(query);
		}
	}
}

/*
{"menu": { 
  "id": "file",
  "value": "File",
  "popup": {
    "menuitem": [
      {"value": "New", "onclick": "CreateNewDoc()"},
      {"value": "Open", "onclick": "OpenDoc()"},
      {"value": "Close", "onclick": "CloseDoc()"}
    ]
  }
}}
*/