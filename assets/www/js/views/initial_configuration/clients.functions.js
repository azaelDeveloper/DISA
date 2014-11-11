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
				//chargeClients(result);
			result = [{
	"IdClient": 1001,
	"nameClient": "Jesús Corona Hurtado",
	"direction": "San jóse de la mina #123",
	"poblation": "Carapan",
	"entity": "Michoacan",
	"colony": "Dr. Miguel Silva",
	"cp": 60021,
	"limit": 67079,
	"Active": true,
	"route": "Carapan",
	"timestamp": "12/03/2003"
},
{
	"IdClient": 1002,
	"nameClient": "Azael Sánchez Oritz",
	"direction": "San jóse #1223343",
	"poblation": "Uruapan",
	"entity": "Michoacan",
	"colony": "Dr. Miguel Silva",
	"cp": 60021,
	"limit": 67079,
	"Active": true,
	"route": "Carapan",
	"timestamp": "12/03/2003"
},
{
	"IdClient": 1003,
	"nameClient": "Rafael Larios Rufian",
	"direction": "La mina #123",
	"poblation": "Los Reyes",
	"entity": "Michoacan",
	"colony": "Centro",
	"cp": 60021,
	"limit": 67079,
	"Active": true,
	"route": "Carapan",
	"timestamp": "12/03/2003"
},
{
	"IdClient": 1004,
	"nameClient": "Alberto Lopez Marroquin",
	"direction": "Reforma #123",
	"poblation": "Los Reyes",
	"entity": "Michoacan",
	"colony": "Dr. Miguel Silva",
	"cp": 60021,
	"limit": 67079,
	"Active": true,
	"route": "Los Reyes",
	"timestamp": "12/03/2003"
},
{
	"IdClient": 1005,
	"nameClient": "Juan Luis Corona Hurtado",
	"direction": "Heóres de Nocupetaro #123",
	"poblation": "Uruapan",
	"entity": "Michoacan",
	"colony": "Benito Juárez",
	"cp": 60021,
	"limit": 67079,
	"Active": true,
	"route": "Uruapan",
	"timestamp": "12/03/2003"
},
{
	"IdClient": 1006,
	"nameClient": "Roberto Pérez Melgoza",
	"direction": "San jóse de la mina #123",
	"poblation": "Uruapan",
	"entity": "Michoacan",
	"colony": "Silvando",
	"cp": 60021,
	"limit": 67079,
	"Active": true,
	"route": "Uruapan",
	"timestamp": "12/03/2003"
}];
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
		alert(self.clients().length);
		for (var x = 0; x < self.clients().length; x++){			
			var query = "INSERT INTO clients (IdClient, nameClient, direction, poblation, entity, colony, cp, creditLimit, active, route, timestamp) VALUES ("+ self.clients()[x].IdClient +", '"+ self.clients()[x].nameClient +"', '" + self.clients()[x].direction +"', '"+ self.clients()[x].poblation +"', '"+ self.clients()[x].entity +"', '"+ self.clients()[x].colony +"', '"+ self.clients()[x].cp +"', '"+ self.clients()[x].limit +"', '"+ self.clients()[x].Active +"', '"+ self.clients()[x].route +"', '"+ self.clients()[x].timestamp +"')";				
			tx.executeSql(query);
		}
	}
}

/*
[{
	"IdClient": 1001,
	"nameClient": "Jesús Corona Hurtado",
	"direction": "San jóse de la mina #123",
	"poblation": "Carapan",
	"entity": "Michoacan",
	"colony": "Dr. Miguel Silva",
	"cp": 60021,
	"limit": 67079,
	"Active": true,
	"route": "Carapan",
	"TimeStamp": "12/03/2003"
},
{
	"IdClient": 1002,
	"nameClient": "Azael Sánchez Oritz",
	"direction": "San jóse #1223343",
	"poblation": "Uruapan",
	"entity": "Michoacan",
	"colony": "Dr. Miguel Silva",
	"cp": 60021,
	"limit": 67079,
	"Active": true,
	"route": "Carapan",
	"TimeStamp": "12/03/2003"
},
{
	"IdClient": 1003,
	"nameClient": "Rafael Larios Rufian",
	"direction": "La mina #123",
	"poblation": "Los Reyes",
	"entity": "Michoacan",
	"colony": "Centro",
	"cp": 60021,
	"limit": 67079,
	"Active": true,
	"route": "Carapan",
	"TimeStamp": "12/03/2003"
},
{
	"IdClient": 1004,
	"nameClient": "Alberto Lopez Marroquin",
	"direction": "Reforma #123",
	"poblation": "Los Reyes",
	"entity": "Michoacan",
	"colony": "Dr. Miguel Silva",
	"cp": 60021,
	"limit": 67079,
	"Active": true,
	"route": "Los Reyes",
	"TimeStamp": "12/03/2003"
},
{
	"IdClient": 1005,
	"nameClient": "Juan Luis Corona Hurtado",
	"direction": "Heóres de Nocupetaro #123",
	"poblation": "Uruapan",
	"entity": "Michoacan",
	"colony": "Benito Juárez",
	"cp": 60021,
	"limit": 67079,
	"Active": true,
	"route": "Uruapan",
	"TimeStamp": "12/03/2003"
},
{
	"IdClient": 1006,
	"nameClient": "Roberto Pérez Melgoza",
	"direction": "San jóse de la mina #123",
	"poblation": "Uruapan",
	"entity": "Michoacan",
	"colony": "Silvando",
	"cp": 60021,
	"limit": 67079,
	"Active": true,
	"route": "Uruapan",
	"TimeStamp": "12/03/2003"
}]
*/