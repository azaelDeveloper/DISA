//payments (id INTEGER PRIMARY KEY, IdClient INTEGER, nameClient TEXT, num_Fact REAL, amount TEXT,  timestamp NUMERIC);
function PaymentsViewModel(payments){
	var self = this;
	self.payments = ko.observableArray([]);	
	self.payments(payments);	
	self.totalPayed = ko.computed(function() {
       var total = 0;
       for (var i = 0; i < self.payments().length; i++){       	
        total += parseFloat(self.payments()[i].amount);                		
       }
       grandTotal = total;
       return total;
    }); 
}
function fillPayments(tx) {	
	tx.executeSql('SELECT * FROM payments', [], allPayments, errorCB);
}
function allPayments(tx, results) {
	var len = results.rows.length;
	var payments = [];		
	for (var i = 0; i < len; i++){				
		payments.push(results.rows.item(i));
		$("#noRecordsFound").hide("fast");
	}
	var viewModel = PaymentsViewModel(eval(payments));
	ko.applyBindings(viewModel);			
}
