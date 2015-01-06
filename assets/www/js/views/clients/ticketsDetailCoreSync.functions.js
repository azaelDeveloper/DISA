function getAllDetails(){	
	var url = urlService + "Clientes";
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
			result = [{"num_Fact":"3 ","paid":200.00,"timestampp":"02/09/2014"},{"num_Fact":"3 ","paid":50.00,"timestampp":"02/09/2014"},{"num_Fact":"1 ","paid":1000.00,"timestampp":"02/09/2014"},{"num_Fact":"2 ","paid":500.00,"timestampp":"02/09/2014"},{"num_Fact":"4 ","paid":25.00,"timestampp":"02/09/2014"}];
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
			var query = "INSERT INTO commercial_detail (num_Fact, paid, timestampp) VALUES ("+ self.detail2()[x].num_Fact +", '"+ self.detail2()[x].paid +"', '" + self.detail2()[x].timestampp +"')";				
			tx.executeSql(query);
		}
	}
	function dropDeta(tx){		
		tx.executeSql("DELETE FROM commercial_detail");
	}
}
/*
[{
	"num_Fact": 3399,
	"paid": 1000,	
	"timestampp": "10/11/2014"	
	},
	{
	"num_Fact": 3399,
	"paid": 1000,	
	"timestampp": "10/11/2014"	
	},
{
	"num_Fact": 100000000,
	"paid": 900,
	"timestampp": "12/03/2003"
},
{
	"num_Fact": 23423,
	"paid": 800,
	"timestampp": "12/03/2003"
},
{
	"num_Fact": 23423,
	"paid": 200,
	"timestampp": "12/03/2003"
},
{
	"num_Fact": 3321,
	"paid": 400,
	"timestampp": "12/03/2003"
},
{
	"num_Fact": 3321,
	"paid": 200,
	"timestampp": "12/03/2003"
},
{
	"num_Fact": 76867,
	"paid": 400,
	"timestampp": "12/03/2003"
},
{
	"num_Fact": 16879,
	"paid": 100,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 16880,
	"paid": 500,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 16907,
	"paid": 400,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 16907,
	"paid": 300,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 17932,
	"paid": 600,
	"timestampp": "10/11/2014"
}
,
{
	"num_Fact": 17932,
	"paid": 500,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 17964,
	"paid": 200,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 17964,
	"paid": 200,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 15721,
	"paid": 500,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 15838,
	"paid": 200,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 15838,
	"paid": 500,
	"timestampp": "10/11/2014"
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
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 15856,
	"paid": 600,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 15624,
	"paid": 150,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 15744,
	"paid": 70,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 15765,
	"paid": 780,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 15804,
	"paid": 400,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 15721,
	"paid": 600,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 15731,
	"paid": 700,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 15812,
	"paid": 400,
	"timestampp": "10/11/2014"
},
{
	"num_Fact": 15812,
	"paid": 400,
	"timestampp": "10/11/2014"
}]
<td><b data-bind="text: id"></b></td>
      <td><p data-bind="text: num_Fact"></p></td>
      <td><p data-bind="text: paid"></p></td>
      <td><p data-bind="text: totalPaid"></p></td>
      <td><p data-bind="text: timestamp"></p></td>      
*/