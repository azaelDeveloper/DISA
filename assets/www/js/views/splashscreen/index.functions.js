//Initialization

// Initialization
function onDeviceReady() {
	document.addEventListener("backbutton", getBackTo, false);
	db.transaction(populateDB, errorCB, successCB);
	db.transaction(contractAgreement, errorCB, successCB);
	$("#topBar").hide();
}

// Populate the database
function populateDB(tx) {		
	// CONTRACT
	//tx.executeSql('DROP TABLE IF EXISTS contract');
	tx.executeSql('CREATE TABLE IF NOT EXISTS contract(id INTEGER PRIMARY KEY, accepted NUMERIC, account_type INTEGER , timestamp NUMERIC)');	
	// SELLERS
	//tx.executeSql('DROP TABLE IF EXISTS sellers');
	tx.executeSql('CREATE TABLE IF NOT EXISTS sellers(id INTEGER PRIMARY KEY, sellerIDERP TEXT, nameSeller TEXT, license TEXT, active NUMERIC, routes TEXT, timestamp NUMERIC)');		
	//CLIENTS
	//tx.executeSql('DROP TABLE IF EXISTS clients');
	tx.executeSql('CREATE TABLE IF NOT EXISTS clients(id INTEGER PRIMARY KEY, idClient TEXT, nameClient TEXT, direction TEXT, poblation TEXT, entity TEXT, colony TEXT, cp TEXT, creditLimit TEXT, active INTEGER, route TEXT, timestamp NUMERIC)');
	// PRODUCTS
	//tx.executeSql('DROP TABLE IF EXISTS products');	
	tx.executeSql('CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY,selected NUMERIC, idProduct TEXT, nameProduct TEXT, price1 REAL, price2 REAL, price3 REAL, price4 REAL, priceFree REAL, account_type TEXT, unit INTEGER, category TEXT, existence TEXT, timestampp NUMERIC)');
	//COMMERCIAL_INVOICE
	tx.executeSql('DROP TABLE IF EXISTS commercial_invoice');	
	tx.executeSql('CREATE TABLE IF NOT EXISTS commercial_invoice (id INTEGER PRIMARY KEY, clientID TEXT, nameClient TEXT, num_Fact REAL, amount REAL, paid REAL, expiration TEXT, timestamp NUMERIC)');	
	//COMERCIAL_DETAIL
	tx.executeSql('DROP TABLE IF EXISTS commercial_detail');	
	tx.executeSql('CREATE TABLE IF NOT EXISTS commercial_detail (id INTEGER PRIMARY KEY, num_Fact TEXT, paid REAL, totalPaid REAL, timestamp NUMERIC)');	
	//PAYMENTS
	tx.executeSql('DROP TABLE IF EXISTS payments');
	tx.executeSql('CREATE TABLE IF NOT EXISTS payments (id INTEGER PRIMARY KEY, IdClient INTEGER, num_Fact REAL, amount TEXT,  timestamp NUMERIC)');
	// DEBTS
	tx.executeSql('DROP TABLE IF EXISTS debts');
	tx.executeSql('CREATE TABLE IF NOT EXISTS debts (id INTEGER PRIMARY KEY, title TEXT, code TEXT, version TEXT, expiration TEXT, description TEXT, documentType INTEGER, parentDoc INTEGER, html TEXT)');
	//POSIBLEANSWERS
	tx.executeSql('DROP TABLE IF EXISTS categorys');
	tx.executeSql('CREATE TABLE IF NOT EXISTS categorys (id INTEGER PRIMARY KEY, category TEXT, timestamp NUMERIC)');
	//SELLS
	tx.executeSql('DROP TABLE IF EXISTS sells');
	tx.executeSql('CREATE TABLE IF NOT EXISTS sells (id INTEGER PRIMARY KEY, idClient TEXT, nameClient TEXT, total REAL, idSeller TEXT, synchronized NUMERIC, timestamp NUMERIC)');
	//SELLSDETAIL
	tx.executeSql('DROP TABLE IF EXISTS sellsdetail');
	tx.executeSql('CREATE TABLE IF NOT EXISTS sellsdetail (id INTEGER PRIMARY KEY, idSell TEXT, idProduct TEXT, unit TEXT, nameProduct TEXT, quantity INTEGER, price REAL, minPrice REAL, subtotal REAL)');
}

// Transaction success callback
function successCB() {
	//alert("Database open/created successfully");
}

// /Select to check if user is agreed with contract
function contractAgreement(tx) {
	tx.executeSql('SELECT * FROM contract', [], foundAgreement, errorCB);
}


// Find agreement
function foundAgreement(tx, results) {
	var len = results.rows.length;
	
	if (len > 0) {
		var accepted = results.rows.item(0).accepted;
		if (accepted == 0) {
			getPage("file:///android_asset/www/views/initial_configuration/contract.title.html", "file:///android_asset/www/views/initial_configuration/contract.html");
		}

		if (accepted == 1) {
			db.transaction(licenseInDB, errorCB, successCB);
		}
	}
	if (len == 0) {
		getGPS();
		var query = "INSERT INTO contract(accepted, timestamp) VALUES (0, '" + getCurrentDateTime() + "')";
		tx.executeSql(query);
		getPage("file:///android_asset/www/views/initial_configuration/contract.title.html", "file:///android_asset/www/views/initial_configuration/contract.html");
	}
}
// /Select to check if user is agreed with contract
function licenseInDB(tx) {
	tx.executeSql('SELECT * FROM sellers', [], foundLicense, errorCB);
}
// Find orchand
function foundLicense(tx, results) {
	var len = results.rows.length;	
	if(len < 0){
		getPage("file:///android_asset/www/views/initial_configuration/license.title.html", "file:///android_asset/www/views/initial_configuration/license.html");
	}
	else
	{
		licenseUser = results.rows.item(0).sellerIDERP;		
		nameSeller = results.rows.item(0).nameSeller;				
		db.transaction(clientsInDb, errorCB, successCB);				
	}	
}
function clientsInDb(tx)	{
	tx.executeSql("SELECT * FROM clients", [], foundClients, errorCB);
}
function foundClients(tx, results) {
	var len = results.rows.length;		
	if(len == 0){		
		getPage("file:///android_asset/www/views/initial_configuration/clients.title.html", "file:///android_asset/www/views/initial_configuration/clients.html");
	}
	else
	{		
		db.transaction(productsInDb, errorCB, successCB);				
	}	
}
function productsInDb(tx)	{
	tx.executeSql("SELECT * FROM products", [], foundProducts, errorCB);
}
function foundProducts(tx, results) {
	var len = results.rows.length;		
	if(len == 0){				
		getPage("file:///android_asset/www/views/initial_configuration/products.title.html", "file:///android_asset/www/views/initial_configuration/products.html");
	}
	else
	{			
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
	}	
}
