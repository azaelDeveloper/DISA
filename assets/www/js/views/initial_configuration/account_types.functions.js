function setAccountType() {
	db.transaction(saveAccountType, errorCB);
}

function saveAccountType(tx) {

	var admin = $("#admin").is(":checked");
	var adminchecker = $("#adminchecker").is(":checked");
	
	if (admin)
	{
		accountType = 0;
	}
	
	if (adminchecker)
	{
		accountType = 1;
	}
	
	if (!admin && !adminchecker)
	{
		$("#selectAccountType").show("fast");
	}
	
	usersRegister(accountType, tx);
	getPage("file:///android_asset/www/views/initial_configuration/admin.title.html", "file:///android_asset/www/views/initial_configuration/admin.html");
}

function usersRegister(accountType, tx){
	// Query the success callback
	getGPS();
	var query = "UPDATE contract SET account_type=" + accountType + ", timestamp = '" + getCurrentDateTime() + "', gps ='" + gps + "' WHERE id = 1";
	tx.executeSql(query);
}