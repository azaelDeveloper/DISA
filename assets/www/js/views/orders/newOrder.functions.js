function CartLine (id, idProd, product, price, minPrice, quantity, unit, category, iva, ieps, priceSelected){
	    var self1 = this;
	    self1.idSell = ko.observable(id);	    
	    self1.idProd = ko.observable(idProd);	    
	    self1.nameProduct = ko.observable(product);	    
	    self1.price = ko.observable(price);
	    self1.minPrice = ko.observable(minPrice);
	    self1.quantity = ko.observable(quantity);
	    self1.unit = ko.observable(unit);
	    self1.category = ko.observable(category);
	    self1.iva = ko.observable(iva);
	    self1.ieps = ko.observable(ieps);
	    self1.priceSelected = ko.observable(priceSelected);
	    self1.priceType = ko.observable(priceSelected);
	    self1.subtotal = ko.observable(0);
	    self1.formattedPrice = ko.computed(function() {
        var subtotal = self1.price();    
        self1.subtotal(subtotal * self1.quantity());
        return subtotal ? "$" + (subtotal * self1.quantity()) : "0.0";        
    	});     	
	    // Whenever the category changes, reset the product selection	    
}	
function ordersViewModel() {
	self = this;			
	self.lines = ko.observableArray([]); // Put one line in by default
	self.totalSurcharge = ko.computed(function() {
       var total = 0;       
       for (var i = 0; i < self.lines().length; i++){       	
        total += self.lines()[i].subtotal();                        
       }       
       grandTotal = total;
       return total;
    });       
	
    self.addLine = function(product) {     	
    	if(price != undefined){    		
    		if(price === product.price1 || price === product.price2 || price === product.price3){
    			self.lines.push(new CartLine((self.lines().length + 1), product.idProduct, product.nameProduct, parseFloat(price), parseFloat(price1), 1, product.category, product.iva, product.ieps, "1"));    			
    			$("input:radio").each(function(index){
    				$(this).attr("checked", false);
    			});
    			//navigator.notification.alert("Se agrego producto:" + product.idProduct, alertMiss, "Producto agregado", "Aceptar");	            
    		}
    		else
    		{
    			navigator.notification.alert("Escogio el precio de otro producto", alertMiss, "Precio no valido", "Aceptar");	            
    			$("input:radio").each(function(index){
    				$(this).attr("checked", false);
    			});
    		}
    		price = undefined;
    	}
    	else{
    		price = undefined;
    		navigator.notification.alert("Eliga un precio del producto que desea agregar", alertMiss, "No selecciono precio", "Aceptar");	            
    	}
    }
    self.removeLine = function(line) { self.lines.remove(line) }
	self.checkedProduct = function(product){		
		idToAdd = product.idProduct;
		return true;
	}
	self.getThisPrice1 = function(product){		
		price = product.price1;
		return true;
	}
	self.getThisPrice2 = function(product){		
		price = product.price2;
		return true;
	}
	self.getThisPrice3 = function(product){		
		price = product.price3;
		return true;
	}
    // Operations
}
function getProducts(tx) {
	tx.executeSql('SELECT * FROM products', [],	selectProducts, errorCB);
}
function selectProducts(tx, results) {
	var len = results.rows.length;	
	if (len > 0){		
		var products = [];
		for(var i = 0; i < len; i++){
			products.push(results.rows.item(i));
		}			
		viewModel = new ordersViewModel(eval(products));
		ko.applyBindings(viewModel);
		$("#noRecordsFound").hide("fast");
	}		 
}
//Filters: ["Aceite", "", "", ""], Products: [{"idProduct": 1, "product": { "idProduct": 1, "nameProduct": "Aceite" }, "price1": 40, "price2": 44, "price3": 45, "price4": 46, "priceFree": null, "unit": 43, "category": "aceites", "existence": 3203445, "timestamp": "12/06/2014"}];
//tx.executeSql('CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY, idProduct TEXT, nameProduct NUMERIC, price1 TEXT, price2 TEXT, price3 TEXT, price4 TEXT, priceFree TEXT, account_type TEXT, unit TEXT, category TEXT, existence TEXT, timestamp NUMERIC)');