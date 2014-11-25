function DetailViewModel(detail){
	self = this;
	self.details = ko.observableArray([]);	
	self.details(detail);	
    self.totalSurcharge = ko.computed(function() {
       var total = 0;
       for (var i = 0; i < self.details().length; i++){       	
        total += parseFloat(self.details()[i].paid);                		
       }
       grandTotal = total;
       return total;
    }); 
    self.totalDebt = ko.computed(function() {
       var total = parseFloat(debt);       
       return total;
    }); 
    self.remainingDebt = ko.computed(function() {
       var total = 0;
       debt = parseFloat(debt);
       for (var i = 0; i < self.details().length; i++){       	
        total += parseFloat(self.details()[i].paid);                		
       }
       total = (debt - total);
       return total;
    }); 
}
function fillDetailT(tx) {		
	tx.executeSql('SELECT * FROM commercial_detail WHERE num_Fact = ' +  num_Fact, [], allDetailTick, errorCB);
}
function allDetailTick(tx, results) {
	var len = results.rows.length;
	var detail = [];		
	if (len > 0){
		for (var i = 0; i < len; i++){				
			detail.push(results.rows.item(i));
			$("#noRecordsFound").hide("fast");
		}	
	}
	else
		$("#noRecordsFound").show("fast");
	
	var viewModel = DetailViewModel(eval(detail));
	ko.applyBindings(viewModel);			
}
function sendPayment(){
  var payment = $("#payment")val();
  $.ajax({
      type: "POST",
      url: url,
      data: { "payment": payment, "idTicket" : num_Fact, "timestampp": getCurrentDate()},
      contentType: "text/json",
      dataType: "text",
      cache: false,
      success: function(result) {               
        if(result == "true"){
            navigator.notification.alert("Pago registrado por:" + payment + " actualize por favor.", alertMiss, "Pago registrado", "Aceptar");        
        }
      },
      error:function (xhr, ajaxOptions, thrownError){
        navigator.notification.alert("No se puede contactar al servidor", alertMiss, "Respuesta del servidor", "Aceptar");        
        //getPage("file:///android_asset/www/views/initial_configuration/clients.title.html", "file:///android_asset/www/views/initial_configuration/clients.html");
      },
      async: true
  });

}