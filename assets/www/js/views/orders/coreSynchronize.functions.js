function syncronizedOrders(ids, unsynchronized){
	sellCount = 0;
	db.transaction(getDetails, errorCB);
}
function getDetails(tx){
	for(var i = 0; i < idunsynchronized.length; i++){
		var QUERY = "SELECT * FROM sellsdetail WHERE idSell = " + idunsynchronized[i];
		tx.executeSql(QUERY, [], detailsOrder, errorCB);
	}
}
function detailsOrder(tx, results){
	var jsonDetail = [];
	jsonDetail.push(unsynchronized[sellCount]);
	jsonDetail.push("DETALLES");
	var sellID = idunsynchronized[sellCount];
	var len = results.rows.length;
	for (var i = 0; i < len; i++) {
		jsonDetail.push(results.rows.item(i));
	}
	$.ajax({
	    type: "POST",
	    url: urlService + "Ventas%20Cabecera%20Detalle",
	    //url: urlService + "SaveSell",
	    data: { Archivo: "" + ko.mapping.toJSON(jsonDetail) },
	    dataType: "text",
	    cache: false,
	    success: function(data) {
	    	if($.trim(data) === "True"){
	    		db.transaction(updateOrder, errorCB);
			}
	    }
	});
	function updateOrder (tx){
		tx.executeSql("UPDATE sells SET synchronized = 1 WHERE id = " + sellID);
		sellCount--;
		if(sellCount == 0){
			getPage("file:///android_asset/www/views/orders/checkOrders.title.html", "file:///android_asset/www/views/orders/checkOrders.html");
		}
	}
	//alert(ko.mapping.toJSON(jsonDetail));
	sellCount ++;
}