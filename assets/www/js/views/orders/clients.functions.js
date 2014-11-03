function getClients(tx) {
	tx.executeSql('SELECT * FROM clients', [], clients, errorCB);
}
function clients(tx, results) {
	var len = results.rows.length;
	var clients = [];	
	var table = "";
	for (var i = 0; i < len; i++){
		if(results.rows.item(i).active == "true"){									
			table += '<tr>';
			table += '<td><input type="radio" name="clients" value="'+ results.rows.item(i).idClient +'" data-route="'+ results.rows.item(i).route +'" data-clientName="'+ results.rows.item(i).nameClient +'" data-direction="Prolongación Benito Juárez #139" data-poblation="Carapan" data-entity="Michoacan" data-colony="Los ángeles" data-cp="60055"></td><td>'+ results.rows.item(i).nameClient +'</td><td>'+ results.rows.item(i).creditLimit +'</td><td>'+ results.rows.item(i).route +'</td>';
			table += '</tr>';
			$("#noRecordsFound").hide("fast");
		}		
	}
	$("#bodyTable").html(table);
}
