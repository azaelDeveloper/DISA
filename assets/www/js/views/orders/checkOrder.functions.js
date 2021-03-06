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
		detailDate = $(this).attr("timestampp");
		getPage("file:///android_asset/www/views/orders/detailOrder.title.html", "file:///android_asset/www/views/orders/detailOrder.html");
	};

	self.listSyncSells = function(sell){
		//val isMarked = $(this).is(":checked");
		if($.inArray(sell.id, idunsynchronized) == -1){
			unsynchronized.push(sell);
			idunsynchronized.push(sell.id);
		}
		else{
			unsynchronized = $.grep(unsynchronized, function(value){
				return value != sell;
			});
			idunsynchronized = $.grep(idunsynchronized, function(value){
				return value != sell.id;
			});
		}
		return true;
	}

	self.checkAll = function(){
		if($("#checkAll").is(":checked")){
			$("input[type=checkbox]").prop("checked","checked");
			var len = orders.length;
			for (var i = 0; i < len; i++) {
				if($.inArray(orders[i].id, idunsynchronized) == -1 && orders[i].synchronized == 0){
					unsynchronized.push(orders[i]);
					idunsynchronized.push(orders[i].id);
				}
			}
		}
		else{
			$("input[type=checkbox]").filter(function() {
				return !this.disabled && this.checked;
			}).prop("checked","");
			unsynchronized.length = 0;
			idunsynchronized.length = 0;
		}
		return true;
	}
};
function getOrders(tx) {
	var QUERY = 'SELECT * FROM sells';
	tx.executeSql(QUERY, [], sells, errorCB);
}
function sells(tx, results) {
	var len = results.rows.length;
	var sells = [];
	for (var i = 0; i < len; i++) {				
		/*if(results.rows.item(i).synchronized == 0){
			unsynchronized.push(results.rows.item(i));
			idunsynchronized.push(results.rows.item(i).id);
		}*/
		sells.push(results.rows.item(i));		
	}		
	viewModel = new sellsMasterModel(eval(sells));
	ko.applyBindings(viewModel);
}