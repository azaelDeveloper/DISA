function syncronizedOrders(unsynchronized){
	var json = ko.mapping.toJSON(unsynchronized);	
	db.transaction(getDetails, errorCB)
}
function getDetails(tx){
	for(var i = 0; i < idunsynchronized.length; i++){
		var QUERY = "SELECT * FROM sellsdetail WHERE idSell=" + idunsynchronized[i];
		alert(QUERY);
	}	
}
function details(tx, results){
	jsonDetail += results.rows.item(i);		
}

