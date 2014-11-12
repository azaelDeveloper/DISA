function TicketsClientsViewModel(tickets){
	self = this;
	self.tickets = ko.observableArray([]);	
	self.tickets(tickets);	
	self.totalSurcharge = ko.computed(function() {
       var total = 0;
       for (var i = 0; i < self.tickets().length; i++){       	
        total += parseFloat(self.tickets()[i].amount - self.tickets()[i].paid);                		
       }
       grandTotal = total;
       return total;
    }); 
    self.detailReports = function(fac) {
		num_Fact = fac.num_Fact;		
		getPage("file:///android_asset/www/views/clients/ticketsDetail.title.html", "file:///android_asset/www/views/clients/ticketsDetail.html");
	};
}
function fillTickets(tx) {	
	tx.executeSql('SELECT * FROM commercial_invoice WHERE clientID = ' +  clientID, [], allTickets, errorCB);
}
function allTickets(tx, results) {
	var len = results.rows.length;
	var tickets = [];		
	for (var i = 0; i < len; i++){				
		tickets.push(results.rows.item(i));
		$("#noRecordsFound").hide("fast");
	}
	var viewModel = TicketsClientsViewModel(eval(tickets));
	ko.applyBindings(viewModel);			
}