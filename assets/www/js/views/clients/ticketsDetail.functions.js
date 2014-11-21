function DetailViewModel(detail){
	self = this;
	self.details = ko.observableArray([]);	
	self.details(detail);	
    self.totalSurcharge = ko.computed(function() {
       var total = 0;
       for (var i = 0; i < self.details().length; i++){       	
        total += parseFloat(self.details()[i].paid);                		
       }
       grandTotal = total;
       return total;
    }); 
    self.totalDebt = ko.computed(function() {
       var total = parseFloat(debt);       
       return total;
    }); 
    self.remainingDebt = ko.computed(function() {
       var total = 0;
       debt = parseFloat(debt);
       for (var i = 0; i < self.details().length; i++){       	
        total += parseFloat(self.details()[i].paid);                		
       }
       total = (debt - total);
       return total;
    }); 
}
function fillDetailT(tx) {		
	tx.executeSql('SELECT * FROM commercial_detail WHERE num_Fact = ' +  num_Fact, [], allDetailTick, errorCB);
}
function allDetailTick(tx, results) {
	var len = results.rows.length;
	var detail = [];		
	if (len > 0){
		for (var i = 0; i < len; i++){				
			detail.push(results.rows.item(i));
			$("#noRecordsFound").hide("fast");
		}	
	}
	else
		$("#noRecordsFound").show("fast");
	
	var viewModel = DetailViewModel(eval(detail));
	ko.applyBindings(viewModel);			
}