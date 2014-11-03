function sellsMasterModel(orders) {
	self = this;
	self.sells = ko.observableArray(orders);
	self.totalSurcharge = ko.computed(function() {
       var total = 0;
       for (var i = 0; i < self.sells().length; i++){       	
        total += parseFloat(self.sells()[i].total);                		
       }
       grandTotal = total;
       return total;
    }); 
	
	self.detailReports = function(dailyMaster) {
		detailId = $(this).attr("id");		
		detailDate = $(this).attr("timestamp");
		getPage("file:///android_asset/www/views/orders/detailOrder.title.html", "file:///android_asset/www/views/orders/detailOrder.html");
	};
};
function getOrders(tx) {
	var QUERY = 'SELECT * FROM sells';
	tx.executeSql(QUERY, [], sells, errorCB);
}
function sells(tx, results) {
	var len = results.rows.length;
	var sells = [];
	for (var i = 0; i < len; i++) {				
		if(results.rows.item(i).synchronized == 0){
			unsynchronized.push(results.rows.item(i));		
			idunsynchronized.push(results.rows.item(i).idSell);
		}
		sells.push(results.rows.item(i));		
	}		
	viewModel = new sellsMasterModel(eval(sells));
	ko.applyBindings(viewModel);
}