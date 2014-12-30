//[{"sellerIDERP": "1045", "nameSeller": "Rafael Larios", "license": license.toString(), "active": "0", "routes": "Carapan" }]
function setLicense(){
	license = $("#license").val();	
	license = trim(license);
	var urlS = urlService + "SIAA?ID=" + license;	
	if (license != null){
		navigator.notification.alert("Validando liciencia espere respuesta del servidor", alertMiss, "Validando", "Aceptar");					
		  $.ajax({
	      type: "GET",
	      url: urlS,
	      data: { license: license},
	      contentType: "text/json",
	      cache: false,
	      success: function(result) {	      		

	      		if (result != null){											      			
					getValuesSellers(result);
	      		}
	      		else{
	      			$("#license").val("");	      			
	      			navigator.notification.alert("Usuario no valido...", alertMiss, "Respuesta del servidor", "Aceptar");	            
	      		}

				//if(result == "false")
				//db.transaction(insertLicense, errorCB);
	        },
	      error:function (xhr, ajaxOptions, thrownError){
	            navigator.notification.alert("No se puede contactar al servidor", alertMiss, "Respuesta del servidor", "Aceptar");	            
	            getPage("file:///android_asset/www/views/initial_configuration/clients.title.html", "file:///android_asset/www/views/initial_configuration/clients.html");	
	            //getPage("file:///android_asset/www/views/initial_configuration/license.title.html", "file:///android_asset/www/views/initial_configuration/license.html");	
	        },
	            async: true
	    });

	}
}
function getValuesSellers(json){				
	var viewModel = new sellersViewModel(eval(json));
	ko.applyBindings(viewModel);
}
function sellersViewModel(sellers){	
	var self = this;
	self.sellers = ko.observableArray([]);
	self.sellers(sellers);	
	db.transaction(saveLicense, errorCB);
	function saveLicense(tx) {		
	var query = "INSERT INTO sellers (sellerIDERP, nameSeller, license, active, routes, timestampp) VALUES (" + self.sellers()[0].sellerIDERP + ", '"+ self.sellers()[0].nameSeller +"', '"+ self.sellers()[0].license + "', '"+ self.sellers()[0].active +"', '"+ self.sellers()[0].routes +"',  '" + getCurrentDateTime() + "')";
	tx.executeSql(query);
	nameSeller = self.sellers()[0].nameSeller;			
	getPage("file:///android_asset/www/views/initial_configuration/clients.title.html", "file:///android_asset/www/views/initial_configuration/clients.html");	
	}
}