function setAsAgreed() {
	db.transaction(saveAgreement, errorCB);
}

function saveAgreement(tx) {
	getGPS();
	// Query the success callback
	var query = "UPDATE contract SET accepted = 1, timestampp = '" + getCurrentDateTime() + "' WHERE id = 1";
	tx.executeSql(query);
	
}
