function CartLine (id, idProd, product, price, quantity){
	    var self1 = this;
	    self1.idSell = ko.observable(id);	    
	    self1.idProd = ko.observable(idProd);	    
	    self1.product = ko.observable(product);	    
	    self1.price = ko.observable(price);
	    self1.quantity = ko.observable(quantity);
	    self1.subtotal = ko.observable();
	    
	    // Whenever the category changes, reset the product selection	    
}
function ordersViewModel(products) {
	self = this;		
	self.sells = ko.observableArray([]);	
	self.sells(products);	    	    
	self.totalSurcharge = ko.computed(function() {
       var total = 0;
       for (var i = 0; i < self.sells().length; i++){       	
        total += parseFloat(self.sells()[i].subtotal);                		
       }
       total = total;
       grandTotal = total;
       return total;
    }); 
    
}	
function getDetails(tx) {
	tx.executeSql('SELECT * FROM sellsdetail WHERE idSell=' + detailId, [],	Details, errorCB);
}
function Details(tx, results) {
	var len = results.rows.length;		
	if (len > 0){
		$("#noRecordsFound").hide("fast");
		var products = [];
		for(var i = 0; i < len; i++){
			products.push(results.rows.item(i));
		}			
		viewModel = new ordersViewModel(eval(products));
		ko.applyBindings(viewModel);		
	}		 
}