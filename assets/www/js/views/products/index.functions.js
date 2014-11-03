function productsViewModel(products) {
	self = this;			
	self.products = ko.observableArray([]); // Put one line in by default
	self.products(products);
}
function allProducts(tx) {
	tx.executeSql('SELECT * FROM products', [], products, errorCB);
}
function products(tx, results) {
	var len = results.rows.length;
	var products = [];	
	var table = "";
	for (var i = 0; i < len; i++){
		products.push(results.rows.item(i));
	}
	viewModel = new productsViewModel(eval(products));
	ko.applyBindings(viewModel);
}
function deleteProducts(tx){
	tx.executeSql("DELETE FROM products");
}
function SP() {
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
				carge(result);
	      	}				
	    },
	    error:function (xhr, ajaxOptions, thrownError){
	        navigator.notification.alert("No se puede contactar al servidor", alertMiss, "Respuesta del servidor", "Aceptar");	            
	        getPage("file:///android_asset/www/views/initial_configuration/products.title.html", "file:///android_asset/www/views/initial_configuration/products.html");
	    },
	    async: true
	});
}
function carge(json) {		
	var viewModel = new productsNewViewModel(eval(json));	
	db.transaction(saveProducts, errorCB);	
	function saveProducts(tx) {					
	for(var i = 0; i < 1000; i++){
		var query = "INSERT INTO products (idProduct, nameProduct, price1, price2, price3, price4, priceFree, unit, category, existence, timestampp) VALUES ('" + self.newProducts()[i].idProduct + "', '" + self.newProducts()[i].nameProduct + "', '"+ self.newProducts()[i].price1 +"', '"+ self.newProducts()[i].price2 + "', '"+ self.newProducts()[i].price3 +"', '"+ self.newProducts()[i].price4  +"', '"+ self.newProducts()[i].priceFree +"',  '" + self.newProducts()[i].unit + "', '"+ self.newProducts()[i].category +"', '"+ self.newProducts()[i].existence +"', '"+ self.newProducts()[i].timestampp +"')";
		tx.executeSql(query);	
		}
	}
	getPage("file:///android_asset/www/views/products/index.title.html", "file:///android_asset/www/views/products/index.html");
}
function productsNewViewModel(products) {
	self = this;			
	self.newProducts = ko.observableArray([]); // Put one line in by default
	self.newProducts(products);	
}