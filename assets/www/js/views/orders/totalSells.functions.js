function totalDetail(tx) {
	tx.executeSql('SELECT * FROM sellsdetail', [],	totals, errorCB);
}
function totals(tx, results) {
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