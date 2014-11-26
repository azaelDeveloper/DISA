function syncronizedOrders(ids, unsynchronized){
	jsonSells = [];
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
	var len = results.rows.length;
	/*for (var i = 0; i < len; i++) {
		jsonDetail.push(results.rows.item(i));
	}*/
	for (var i = 0; i < len; i++) {
		jsonDetail.push(results.rows.item(i));
	}
	jsonSells.push(ko.mapping.toJSON(jsonDetail));
	alert(ko.mapping.toJSON(jsonDetail));
	sellCount ++;
}

