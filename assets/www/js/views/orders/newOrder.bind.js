$("#backHomePhone").click(function(){	
	getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
});
$("#backHomeTablet").click(function(){	
	getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
});
$('#searchTablet').click(function() {	
	sqlLike = $('#filterProductTablet').val();		
	navigator.notification.alert("Buscando: " + sqlLike, alertMiss, "Buscandor", "Aceptar");	            
	db.transaction(likeProducts, errorCB);	
});
$('#searchPhone').click(function() {	
	sqlLike = $('#filterProductPhone').val();		
	navigator.notification.alert("Buscando: " + sqlLike, alertMiss, "Buscador", "Aceptar");	            
	db.transaction(likeProducts, errorCB);		
});
$("#idProductT").click(function(){	
	filter = "idProduct";
});
$("#nameProductT").click(function(){	
	filter = "nameProduct";
});
$("#categoryT").click(function(){	
	filter = "category";	
});
$("#idProductP").click(function(){	
	filter = "idProduct";
});
$("#nameProductP").click(function(){	
	filter = "nameProduct";
});
$("#categoryP").click(function(){	
	filter = "category";	
});
$("#filteredTable").on("click","button[id='addProduct']", function(){
	var minPrice = $(this).attr("data-minPrice");
	idToAdd = $(this).attr("data-idProduct");		
	var nameProduct = $(this).attr("data-nameProduct");		
	nameProduct = nameProduct.replace(" ", "");
	var price1 = parseFloat($(this).attr("data-price1")).toFixed(2);		
	var price2 = parseFloat($(this).attr("data-price2")).toFixed(2);		
	var price3 = parseFloat($(this).attr("data-price3")).toFixed(2);		
	var price4 = parseFloat($(this).attr("data-price4")).toFixed(2);		
	var unit = $(this).attr("data-unit");		
	idToAdd = idToAdd.replace(" ", "");		
	$("input:radio:checked").each(function(index){				
		price = $(this).val();		
		price = parseFloat(price).toFixed(2)
		switch(price){
		case price1:			
			self.lines.push(new CartLine(self.lines().length + 1, idToAdd, nameProduct, price, parseFloat(price1).toFixed(2), 1, unit));
			$(this).attr("checked", false);
			navigator.notification.alert("Se agrego producto: " + idToAdd, alertMiss, "Producto agregado", "Aceptar");	            
		break;
		case price2:			
			self.lines.push(new CartLine(self.lines().length + 1, idToAdd, nameProduct, price, parseFloat(price1).toFixed(2), 1, unit));
			$(this).attr("checked", false);
			navigator.notification.alert("Se agrego producto: " + idToAdd, alertMiss, "Producto agregado", "Aceptar");	            
		break;
		case price3:
			self.lines.push(new CartLine(self.lines().length + 1, idToAdd, nameProduct, price, parseFloat(price1).toFixed(2), 1, unit));
			$(this).attr("checked", false);
			navigator.notification.alert("Se agrego producto: " + idToAdd, alertMiss, "Producto agregado", "Aceptar");	            
		break;
		case price4:
			self.lines.push(new CartLine(self.lines().length + 1, idToAdd, nameProduct, price, parseFloat(price1).toFixed(2), 1, unit));
			$(this).attr("checked", false);
			navigator.notification.alert("Se agrego producto: " + idToAdd, alertMiss, "Producto agregado", "Aceptar");	            
		break;
		default:
			$(this).attr("checked", false);
			navigator.notification.alert("Escogio el precio de otro producto", alertMiss, "Precio no valido", "Aceptar");	            			
		break;
		}				
	});
		
});
//tx.executeSql('CREATE TABLE IF NOT EXISTS sells (id INTEGER PRIMARY KEY, idClient TEXT, idSeller TEXT, timestamp NUMERIC)');
//tx.executeSql('CREATE TABLE IF NOT EXISTS sellsdetail (id INTEGER PRIMARY KEY, idSell TEXT, idProduct TEXT, cuantity TEXT, price TEXT, total TEXT)');
function likeProducts(tx){	
	var sql = "";
	switch(filter){
		case "idProduct":
			sql = "SELECT * FROM products WHERE idProduct LIKE '%"+ sqlLike + "%'";
		break;
		case "nameProduct":
			sql = "SELECT * FROM products WHERE nameProduct LIKE '%"+ sqlLike + "%'";
		break;
		case "category":
			sql = "SELECT * FROM products WHERE category LIKE '%"+ sqlLike + "%'";
		break;
	}	
	tx.executeSql(sql, [], foundedProducts, errorCB);
}
function foundedProducts(tx, results){
	var len = results.rows.length;	
	var table = "<h3>Productos</h3>";
	table += "<table class='table table-condensed' data-bind='visible: products().length > 0'>";
	var fields = [];
	table += "<thead><tr><th>Clave</th><th>Unidad</th><th>Nombre del Producto<th>Precio 1</th><th>Precio 2 </th><th>Precio 3</th><th>Precio 4</th><th>Existencia</th><th>Agregar</th>";
	table += "</tr></thead><tbody>";				
	for(var i = 0; i < len; i++){		
		table += "<tr><td><b>"+ results.rows.item(i).idProduct +"</b></td><td>"+ results.rows.item(i).unit  +"</td><td><p>"+ results.rows.item(i).nameProduct +"</p></td><td>"+ parseFloat(results.rows.item(i).price1).toFixed(2) +"&nbsp;<input type='radio' id='"+ results.rows.item(i).idProduct +"-1' name='prices' value='"+ parseFloat(results.rows.item(i).price1).toFixed(2) +"'></td><td>"+ parseFloat(results.rows.item(i).price2).toFixed(2) +"&nbsp;<input type='radio' id='"+ results.rows.item(i).idProduct +"-2' value='"+ parseFloat(results.rows.item(i).price2).toFixed(2) +"' name='prices'></td><td>"+ parseFloat(results.rows.item(i).price3).toFixed(2) +"&nbsp; <input id='"+ results.rows.item(i).idProduct +"-3' value='"+ parseFloat(results.rows.item(i).price3).toFixed(2) +"' type='radio' name='prices'></td><td>"+ parseFloat(results.rows.item(i).price4).toFixed(2) +"&nbsp; <input id='"+ results.rows.item(i).idProduct +"-4' value='"+ parseFloat(results.rows.item(i).price4).toFixed(2) +"' type='radio' name='prices'></td>";
		table += "<td>"+ results.rows.item(i).existence +"</td><td><button id='addProduct' class='btn btn-primary' data-idProduct='"+ results.rows.item(i).idProduct +"' data-minPrice='"+ results.rows.item(i).price1 +"' data-price1='"+ results.rows.item(i).price1 +"' data-price2='"+ results.rows.item(i).price2 +"' data-price3='"+ results.rows.item(i).price3 +"' data-price4='"+ results.rows.item(i).price4 +"' data-nameProduct='"+ results.rows.item(i).nameProduct +"' data-unit='"+ results.rows.item(i).unit + "'><span class='glyphicon glyphicon-plus-sign'></span></button></td></tr>";
		fields.push(results.rows.item(i));
	}			
	table += "</tbody></table>";
	$("#noRecordsFound").hide("fast");
	if(len > 0){
		$("#filteredTable").html(table);
		$("#bottomLink").html('<a href="#bottom">Hasta abajo</a>');
		$("#topLink").html('<a href="#top" id="bottom">Volver hasta arriba</a>');
	}
	else{
		$("#filteredTable").html("");
		$("#bottomLink").html('');
		$("#topLink").html('');
		navigator.notification.alert("No hay productos", alertMiss, "Busqueda sin resultados", "Aceptar");	            	
	}
}
$("#saveOrder").click(function(){	
	if(self.lines().length > 0){
		//navigator.notification.alert("Se guardo correctamente el pedido.", alertMiss, "Pedido guardado", "Aceptar");	            	
		db.transaction(saveOrder, errorCB);
		db.transaction(getLastOrder, errorCB);
		db.transaction(saveDetail, errorCB);
	}
	else
		navigator.notification.alert("Por favor agrege productos....", alertMiss, "No hay pedido", "Aceptar");	            	
});
function saveOrder(tx){
	var sqlOrder = 'INSERT INTO sells(idClient, nameClient, total, idSeller, synchronized, timestamp) VALUES ';
	sqlOrder += "('"+ clientID +"', '"+ clientName +"', '"+ grandTotal +"', '"+ licenseUser +"', 0, '"+ getCurrentDateTime() +"')";
	tx.executeSql(sqlOrder);	
}
function getLastOrder(tx) {
	tx.executeSql('SELECT MAX(id) AS "id" FROM sells', [],	lastorder, errorCB);
}
function lastorder(tx, results) {
	var len = results.rows.length;		
	if (len > 0){				
		for(var i = 0; i < len; i++){			
			lastID = results.rows.item(i).id;
		}					
	}		 
}
//tx.executeSql('CREATE TABLE IF NOT EXISTS sells (id INTEGER PRIMARY KEY, idClient TEXT, nameClient TEXT, total TEXT, idSeller TEXT, timestamp NUMERIC)');
//tx.executeSql('CREATE TABLE IF NOT EXISTS sellsdetail (id INTEGER PRIMARY KEY, idSell TEXT, idProduct TEXT, nameProduct TEXT, quantity TEXT, price TEXT, subtotal TEXT)');
function saveDetail(tx){
	var error = false;
	var line = 0;
	var minPrice;
	var actualPrice;
	var allGood = checkPrices();
	//HACER UN DELETE LAST ID SI ALGO SALE MAL
	if(allGood == true){
		for(var i=0; i < self.lines().length; i++){				
			var sqlDetail = 'INSERT INTO sellsdetail (idSell, idProduct, unit, nameProduct, quantity, price, minPrice, subtotal) VALUES';
			sqlDetail += "('"+ lastID +"', '" + self.lines()[i].idProd() + "', '"+ self.lines()[i].unit() +"',  '"+ self.lines()[i].product() +"', '"+ self.lines()[i].quantity() +"', '"+ self.lines()[i].price() +"', '"+ self.lines()[i].minPrice() +"', '"+ parseFloat(self.lines()[i].subtotal()).toFixed(2) +"')";				
			tx.executeSql(sqlDetail);							
		}
		navigator.notification.alert("Se guardo pedido con éxito...", alertMiss, "Pedido guardado", "Aceptar");	            
		getPage("file:///android_asset/www/views/orders/checkOrders.title.html", "file:///android_asset/www/views/orders/checkOrders.html");		
	}
}
function checkPrices(){
	var allGood = true;	
	for(var i=0; i < self.lines().length; i++){				
		if(self.lines()[i].price() < self.lines()[i].minPrice())
		{
			alert("Wrong");
			allGood = false;
			alert("Error en el precio mínimo de '"+ self.lines()[i].nameProduct() +"' : " + (i + 1) +", precio: "+ self.lines()[i].price() + ", precio mínimo :" + self.lines()[i].minPrice());
		}
	}	
	return allGood;
}
function messageSuccess(){
	navigator.notification.alert("Se guardo pedido con éxito...", alertMiss, "Pedido guardado", "Aceptar");	            
	getPage("file:///android_asset/www/views/orders/checkOrders.title.html", "file:///android_asset/www/views/orders/checkOrders.html");		
}
function messageError(line, minprice, actualPrice){
	alert("precio minimo: " + minprice);
	alert("precio máximo: "+  actualPrice)
	navigator.notification.alert("El precio es muy bajo en el pedido: #" + (line + 1), alertMiss, "Precio menor al mínimo", "Aceptar");	            
}