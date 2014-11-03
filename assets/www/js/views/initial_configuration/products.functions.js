function syncronizeProducts() {
	var url = "http://www.siaa.mx/app/AppDataService.asmx/Productos";			
	navigator.notification.alert("Espere la respuesta del servidor...", alertMiss, "Contactando servidor", "Aceptar");	            
	$.ajax({
	    type: "POST",
	    url: url,
	    data: { guid: guidUserKey},
	    dataType: "json",
	    cache: false,
	    success: function(result) {       
	      	if (result != null){	      		
				cargeProducts(result);
	      	}				
	    },
	    error:function (xhr, ajaxOptions, thrownError){
	        navigator.notification.alert("No se puede contactar al servidor", alertMiss, "Respuesta del servidor", "Aceptar");	            
	        getPage("file:///android_asset/www/views/initial_configuration/products.title.html", "file:///android_asset/www/views/initial_configuration/products.html");
	    },
	    async: true
	});
}
function cargeProducts(json) {		
	var viewModel = new productsViewModel(eval(json));
	ko.applyBindings(viewModel);
}
function productsViewModel(products){
	var self = this;
	self.products = ko.observableArray([]);
	self.products(products);	
	db.transaction(saveProducts, errorCB);
	//self.products.length
	function saveProducts(tx) {				
	for(var i = 0; i < 900; i++){
		var query = "INSERT INTO products (idProduct, nameProduct, price1, price2, price3, price4, priceFree, unit, category, existence, timestampp) VALUES ('" + self.products()[i].idProduct + "', '" + self.products()[i].nameProduct + "', '"+ self.products()[i].price1 +"', '"+ self.products()[i].price2 + "', '"+ self.products()[i].price3 +"', '"+ self.products()[i].price4  +"', '"+ self.products()[i].priceFree +"',  '" + self.products()[i].unit + "', '"+ self.products()[i].category +"', '"+ self.products()[i].existence +"', '"+ self.products()[i].timestampp +"')";
		tx.executeSql(query);	
	}
	pass = true;
	//self.products().length
	}

}
function checkProducts(tx){
	tx.executeSql('SELECT * FROM products', [], products, errorCB);
}
function products(tx, results){
	var len = results.rows.length;
	if(len > 0){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
	}
}
