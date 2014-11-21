function getAllDetails(){	
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
	"num_Fact": 3399,
	"paid": 1000,	
	"timestamp": "10/11/2014"	
	},
	{
	"num_Fact": 3399,
	"paid": 1000,	
	"timestamp": "10/11/2014"	
	},
{
	"num_Fact": 100000000,
	"paid": 900,
	"timestamp": "12/03/2003"
},
{
	"num_Fact": 23423,
	"paid": 800,
	"timestamp": "12/03/2003"
},
{
	"num_Fact": 23423,
	"paid": 200,
	"timestamp": "12/03/2003"
},
{
	"num_Fact": 3321,
	"paid": 400,
	"timestamp": "12/03/2003"
},
{
	"num_Fact": 3321,
	"paid": 200,
	"timestamp": "12/03/2003"
},
{
	"num_Fact": 76867,
	"paid": 400,
	"timestamp": "12/03/2003"
},
{
	"num_Fact": 16879,
	"paid": 100,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 16880,
	"paid": 500,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 16907,
	"paid": 400,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 16907,
	"paid": 300,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 17932,
	"paid": 600,
	"timestamp": "10/11/2014"
}
,
{
	"num_Fact": 17932,
	"paid": 500,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 17964,
	"paid": 200,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 17964,
	"paid": 200,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 15721,
	"paid": 500,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 15838,
	"paid": 200,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 15838,
	"paid": 500,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 15840,
	"paid": 200,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 15768,
	"paid": 200,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 15794,
	"paid": 350,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 15856,
	"paid": 600,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 15624,
	"paid": 150,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 15744,
	"paid": 70,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 15765,
	"paid": 780,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 15804,
	"paid": 400,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 15721,
	"paid": 600,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 15731,
	"paid": 700,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 15812,
	"paid": 400,
	"timestamp": "10/11/2014"
},
{
	"num_Fact": 15812,
	"paid": 400,
	"timestamp": "10/11/2014"
}];
			detailFac(result);
				pass = true;
				navigator.notification.alert("Se actualizaron pagos de factura...", alertMiss, "Respuesta del servidor", "Aceptar");	            
				getPage("file:///android_asset/www/views/clients/ticketsDetail.title.html", "file:///android_asset/www/views/clients/ticketsDetail.html");
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
function detailFac(json) {		
	var viewModel = facDetailViewModel(eval(json));	
}
function facDetailViewModel(clients){
	self.detail2 = ko.observableArray([]);	
	self.detail2(clients);
	if(self.detail2().length > 0){
		db.transaction(dropDeta, errorCB);
	}
	db.transaction(updateDetaFact, errorCB);	
	function updateDetaFact(tx){		
		for (var x = 0; x < self.detail2().length; x++){		
			var query = "INSERT INTO commercial_detail (num_Fact, paid, timestamp) VALUES ("+ self.detail2()[x].num_Fact +", '"+ self.detail2()[x].paid +"', '" + self.detail2()[x].timestamp +"')";				
			tx.executeSql(query);
		}
	}
	function dropDeta(tx){		
		tx.executeSql("DELETE FROM commercial_detail");
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
	"Active": 0,
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
	"Active": 1,
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
	"Active": 0,
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
	"Active": 1,
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
	"Active": 0,
	"route": "Uruapan",
	"timestamp": "12/03/2003"
},
[{
	"num_Fact": 1006,
	"paid": "Roberto Pérez Melgoza",
	"totalPaid": "San jóse de la mina #123",
	"timestamp": "Uruapan"
	
}];
<td><b data-bind="text: id"></b></td>
      <td><p data-bind="text: num_Fact"></p></td>
      <td><p data-bind="text: paid"></p></td>
      <td><p data-bind="text: totalPaid"></p></td>
      <td><p data-bind="text: timestamp"></p></td>      
*/