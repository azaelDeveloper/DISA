function syncronizedOrders(ids, unsynchronized){
	var json = ko.mapping.toJSON(unsynchronized);		
	db.transaction(getDetails, errorCB);
}
function getDetails(tx){
	for(var i = 0; i < idunsynchronized.length; i++){
		var QUERY = "SELECT * FROM sellsdetail WHERE idSell = " + idunsynchronized[i];
		tx.executeSql(QUERY, [], detailsOrder, errorCB);
	}	
}
function detailsOrder(tx, results){
	var len = results.rows.length;
	for (var i = 0; i < len; i++) {				
		jsonDetail.push(results.rows.item(i));		
	}
	alert(ko.mapping.toJSON(jsonDetail));
}

