function getAllTickets() {
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
	"clientID": 1002,
	"nameClient": "Azael Sánchez Ortiz",
	"num_Fact": 3399,
	"amount": 6000,
	"paid": 2000,
	"expiration": "2",	
	"timestamp": "12/03/2003"
},
{
	"clientID": 1002,
	"nameClient": "Azael Sánchez Ortiz",
	"num_Fact": 100000000,
	"amount": 1000,
	"paid": 900,
	"expiration": "1",	
	"timestamp": "12/03/2003"
},
{
	"clientID": 1002,
	"nameClient": "Azael Sánchez Ortiz",
	"num_Fact": 23423,
	"amount": 2000,
	"paid": 1000,
	"expiration": "3",	
	"timestamp": "12/03/2003"
},
{
	"clientID": 1002,
	"nameClient": "Azael Sánchez Ortiz",
	"num_Fact": 3321,
	"amount": 800,
	"paid": 600,
	"expiration": "4",	
	"timestamp": "12/03/2003"
},
{
	"clientID": 1002,
	"nameClient": "Azael Sánchez Ortiz",
	"num_Fact": 76867,
	"amount": 800,
	"paid": 400,
	"expiration": "9",	
	"timestamp": "12/03/2003"
},
{
	"clientID": 1001,
	"nameClient": "Jesús Corona Hurtado",
	"num_Fact": 16879,
	"amount": 500,
	"paid": 100,
	"expiration": "5",	
	"timestamp": "10/11/2014"
},
{
	"clientID": 1001,
	"nameClient": "Jesús Corona Hurtado",
	"num_Fact": 16880,
	"amount": 1100,
	"paid": 500,
	"expiration": "4",	
	"timestamp": "10/11/2014"
},
{
	"clientID": 1001,
	"nameClient": "Jesús Corona Hurtado",
	"num_Fact": 16907,
	"amount": 800,
	"paid": 700,
	"expiration": "3",	
	"timestamp": "10/11/2014"
},
{
	"clientID": 1001,
	"nameClient": "Jesús Corona Hurtado",
	"num_Fact": 17932,
	"amount": 1500,
	"paid": 1100,
	"expiration": "2",	
	"timestamp": "10/11/2014"
},
{
	"clientID": 1001,
	"nameClient": "Jesús Corona Hurtado",
	"num_Fact": 17964,
	"amount": 1000,
	"paid": 400,
	"expiration": "1",	
	"timestamp": "10/11/2014"
},
{
	"clientID": 1003,
	"nameClient": "Rafael Larios Rufian",
	"num_Fact": 15721,
	"amount": 1000,
	"paid": 500,
	"expiration": "1",	
	"timestamp": "10/11/2014"
},
{
	"clientID": 1003,
	"nameClient": "Rafael Larios Rufian",
	"num_Fact": 15838,
	"amount": 2000,
	"paid": 700,
	"expiration": "2",	
	"timestamp": "10/11/2014"
},
{
	"clientID": 1003,
	"nameClient": "Rafael Larios Rufian",
	"num_Fact": 15840,
	"amount": 1000,
	"paid": 200,
	"expiration": "2",	
	"timestamp": "10/11/2014"
},
{
	"clientID": 1004,
	"nameClient": "Alberto Lopez Marroquin",
	"num_Fact": 15768,
	"amount": 800,
	"paid": 200,
	"expiration": "3",	
	"timestamp": "10/11/2014"
},
{
	"clientID": 1004,
	"nameClient": "Alberto Lopez Marroquin",
	"num_Fact": 15794,
	"amount": 700,
	"paid": 350,
	"expiration": "1",	
	"timestamp": "10/11/2014"
},
{
	"clientID": 1004,
	"nameClient": "Alberto Lopez Marroquin",
	"num_Fact": 15856,
	"amount": 1200,
	"paid": 600,
	"expiration": "1",	
	"timestamp": "10/11/2014"
},
{
	"clientID": 1005,
	"nameClient": "Juan Luis Corona Hurtado",
	"num_Fact": 15624,
	"amount": 200,
	"paid": 150,
	"expiration": "4",
	"timestamp": "10/11/2014"
},
{
	"clientID": 1005,
	"nameClient": "Juan Luis Corona Hurtado",
	"num_Fact": 15744,
	"amount": 350,
	"paid": 70,
	"expiration": "3",
	"timestamp": "10/11/2014"
},
{
	"clientID": 1005,
	"nameClient": "Juan Luis Corona Hurtado",
	"num_Fact": 15765,
	"amount": 900,
	"paid": 780,
	"expiration": "2",
	"timestamp": "10/11/2014"
},
{
	"clientID": 1005,
	"nameClient": "Juan Luis Corona Hurtado",
	"num_Fact": 15804,
	"amount": 600,
	"paid": 400,
	"expiration": "1",
	"timestamp": "10/11/2014"
},
{
	"clientID": 1006,
	"nameClient": "Roberto Pérez Melgoza",
	"num_Fact": 15721,
	"amount": 800,
	"paid": 600,
	"expiration": "3",
	"timestamp": "10/11/2014"
},
{
	"clientID": 1006,
	"nameClient": "Roberto Pérez Melgoza",
	"num_Fact": 15731,
	"amount": 900,
	"paid": 700,
	"expiration": "2",
	"timestamp": "10/11/2014"
},
{
	"clientID": 1006,
	"nameClient": "Roberto Pérez Melgoza",
	"num_Fact": 15812,
	"amount": 1300,
	"paid": 800,
	"expiration": "0",
	"timestamp": "10/11/2014"
}];
			newTickets(result);
				pass = true;
				//navigator.notification.alert("Se actualizaron facturas...", alertMiss, "Respuesta del servidor", "Aceptar");	            
				getPage("file:///android_asset/www/views/clients/tickets.title.html", "file:///android_asset/www/views/clients/tickets.html");
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
function newTickets(json) {		
	var viewModel = newTicketsViewModel(eval(json));	
}
function newTicketsViewModel(tickets){
	self.tickets2 = ko.observableArray([]);	
	self.tickets2(tickets);	
	if(self.tickets2().length > 0){
		db.transaction(dptks, errorCB);
	}
	db.transaction(updateTickets, errorCB);	
	function updateTickets(tx){				
		for (var x = 0; x < self.tickets2().length; x++){						
			// alert(self.tickets2()[x].num_Fact)
			var query = "INSERT INTO commercial_invoice(clientID, nameClient, num_Fact, amount, paid, expiration, timestamp) VALUES ("+ self.tickets2()[x].clientID +", '"+ self.tickets2()[x].nameClient +"', " + self.tickets2()[x].num_Fact +", '"+ self.tickets2()[x].amount +"', '"+ self.tickets2()[x].paid +"', '"+ self.tickets2()[x].expiration +"', '"+ self.tickets2()[x].timestamp +"')";				
			tx.executeSql(query);			
		}
	}
	function dptks(tx){		
		tx.executeSql("DELETE FROM commercial_invoice");
	}
}
//tx.executeSql('CREATE TABLE IF NOT EXISTS commercial_invoice (id INTEGER PRIMARY KEY, clientID TEXT, nameClient TEXT, num_Fact NUMERIC, amount REAL, paid REAL, expiration TEXT, timestamp NUMERIC)');	
/*
[{
	"clientID": 1003,
	"nameClient": "Azael Sánchez Ortiz",
	"num_Fact": "03321",
	"amount": "6000",
	"paid": "2000",
	"expiration": "4",	
	"timestamp": "12/03/2003"
},
{
	"clientID": 1003,
	"nameClient": "Azael Sánchez Ortiz",
	"num_Fact": "03321",
	"amount": "1000",
	"paid": "900",
	"expiration": "4",	
	"timestamp": "12/03/2003"
},
{
	"clientID": 1003,
	"nameClient": "Azael Sánchez Ortiz",
	"num_Fact": "03321",
	"amount": "2000",
	"paid": "1000",
	"expiration": "4",	
	"timestamp": "12/03/2003"
},
{
	"clientID": 1003,
	"nameClient": "Azael Sánchez Ortiz",
	"num_Fact": "03321",
	"amount": "800",
	"paid": "600",
	"expiration": "4",	
	"timestamp": "12/03/2003"
},
{
	"clientID": 1003,
	"nameClient": "Azael Sánchez Ortiz",
	"num_Fact": "03321",
	"amount": "800",
	"paid": "400",
	"expiration": "4",	
	"timestamp": "12/03/2003"
}]
*/