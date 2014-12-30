//Gets and sets body to layout from specified url
function getPage(titleUrl, bodyUrl) {
	// gets loading modal
	if (titleUrl != "") {
		$.get(titleUrl, function(title) {
			// sets title
			$("#titleBar").html(title);
		});
	}

	if (bodyUrl != "") {
		$.get(bodyUrl, function(body) {
			// sets body
			$("#renderedBody").html(body);
		});
	}
}
//Gets and sets help content to help container modal from specified url
function getHelp(titleUrl, bodyUrl) {
	// gets loading modal
	if (titleUrl != "") {
		$.get(titleUrl, function(title) {
			// sets title
			$("#titleHelpBar").html(title);
		});
	}
	if (bodyUrl != "") {
		$.get(bodyUrl, function(body) {
			// sets body
			$("#helpBody").html(body);
		});
	}
	$('#helpModal').modal('show');
}
function getAbout(titleUrl, bodyUrl) {
	// gets loading modal
	if (titleUrl != "") {
		$.get(titleUrl, function(title) {
			// sets title
			$("#titleAboutBar").html(title);
		});
	}
	if (bodyUrl != "") {
		$.get(bodyUrl, function(body) {
			// sets body
			$("#aboutBody").html(body);
		});
	}
	$('#aboutModal').modal('show');
}
function getMessage(message, div){
	if (message != "" && div != "")
	{
		$(div).html(message);
		$(div).fadeIn(3000, function() {			
			$(div).fadeOut(3000, function(){				
				});        	
			});				
		photoMessage = "";
		message= "";
	}
	else
	{
		photoMessage = "";
	}			
}

function writeMessage(message){
	$('#Advice').html(message);
		$('#Advice').fadeIn(3000, function() {			
			$("#Advice").fadeOut(3000);        	
			
			});		
		Message = "";
		message= "";
}
function orchardMessage(message){
	$('#orchardMessage').html(message);
		$('#orchardMessage').fadeIn(3000, function() {						
			});		
		Message = "";
		message= "";
}

// Return to specific urls when android´s back is pressed
function getBackTo() {
	if (backTitleUrl.length > 0 || backBodyUrl.length > 0) {
		getPage(backTitleUrl, backBodyUrl);		
	}
	if (backTitleUrl.length == 0 && backBodyUrl.length == 0) {
		navigator.app.exitApp();		
	}
}

function getCurrentDateTime() {
	var Day, Month, Year;
	var d = new Date();
	var dateTime;
	Year = (d.getFullYear());
	Month = (d.getUTCMonth() + 1);
	Day = d.getDate();
	dateTime = Year + '/' + Month + '/' + Day + ' ' + d.toLocaleTimeString();
	return dateTime;
}

function getCurrentDate() {
	var Day, Month, Year;
	var d = new Date();
	var dateTime;
	Year = d.getFullYear();
	Month = d.getUTCMonth() + 1;
	Day = d.getDate();
	dateTime = Year + '/' + Month + '/' + Day;
	return dateTime;
}

function getGPS() {
	navigator.geolocation.getCurrentPosition(onSuccessGPS, onErrorGPS);
}

// onSuccess Geolocation
//
function onSuccessGPS(position) {
	gps = position.coords.latitude + "," + position.coords.longitude + ","
			+ position.coords.accuracy + "," + position.timestampp;
}

// onError Callback receives a PositionError object
function onErrorGPS(error) {
	//alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

// Error for DB transaction
function errorCB(err) {	
	console.log(err);
	console.log(err.code);
	alert(err.message);
	alert("Error processing SQL: " + err.code);	
}

function generate(input) {
	temp = numletter.indexOf(input)
	var temp2 = temp ^ key
	temp2 = numletter.substring(temp2, temp2 + 1)
	return (temp2)
}

function generateit(inputs) {
	lengthe = ''
	length2 = ''
	key = 0
	temp = temp2 = t3 = ''
	userinput = inputs
	key = Math.round(Math.random() * 63)
	if (key < 11)
		key = key + 11 + Math.round(Math.random() * 40)
	length2 = inputs.length
	for (i = 0; i < length2; i++)
		t3 += generate(userinput.charAt(i))
	lengthe = t3.length;
	p4 = lengthe;
	thepassword = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	tempvar = new Array("", "", "", "", "", "")
	cur = 0
	keypiece = thepassword.charAt(Math.round(Math.random() * 62))
	p1 = t3;
	p2 = length2;
	p3 = key;

	for (i = 0; i < 3; i++) {
		for (i2 = 0; i2 < 15; i2++)
			tempvar[cur] += createpass()
		cur++
	}
	for (i2 = 0; i2 < 15 - p2; i2++)
		tempvar[cur] += createpass()
	cur++
	for (i2 = 0; i2 < 14; i2++)
		tempvar[cur] += createpass()
	cur++

	return tempvar[0] + "-" + tempvar[1] + "-" + tempvar[2] + "-" + p1
			+ tempvar[3] + "-" + p2 + tempvar[4] + keypiece + "-" + p3
			+ tempvar[4]

	// //////////////////////////////////////////

}

function createpass() {
	return (thepassword.charAt(Math.round(Math.random() * 62)))
}

//Validates Email
function isEmailValid(email) {
	var atpos = email.indexOf("@");
	var dotpos = email.lastIndexOf(".");
	if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
		return false;
	}else{
		return true;
	}
}

//Validates form for user register
function validateUserForm() {
	userFormErrors = 0; 
	validateName();
	validateLastName();
	validateEmail();
	validatePassword();
	validateRepeatPassword();
	if (userFormErrors > 0) {
		return false;
	}
	
	if (userFormErrors == 0) {
		return true;
	}
}

//Validates form for user register
function validateUserLogIn() {
	userLogInErrors = 0;
	validateLogInEmail();
	validateLogInPassword();
	if (userLogInErrors > 0) {
		return false;
	}
	
	if (userLogInErrors == 0) {
		return true;
	}
}
function alertMiss(){
		//DO SOMETHING
}
function trim (myString)
{
	return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
}
function onFail(message) {
	navigator.notification.alert("Se canceló foto del Baño", alertMiss, "Se cancelo foto del Baño", "Aceptar");
}
function getOneOrchard(tx) {
	var QUERY = 'SELECT * FROM orchard';
	tx.executeSql(QUERY, [], OrchardExists, errorCB);
}
function OrchardExists(tx, results){
	var len = results.rows.length;
	if (len == 1) {
		orchardMasterId = results.rows.item(0).id;
		ochardMasterName = results.rows.item(0).name;			
		$("#orchardMessage").html('Huerta: "' + ochardMasterName + '"');
	}
}
function oneYearBefore(){
	var Day, Month, Year;
	var d = new Date();
	var dateTime;
	Year = (d.getFullYear() - 1);
	Month = d.getUTCMonth() + 1;
	Day = d.getDate();
	dateTime = Year + '/' + Month + '/' + Day + ' 00:00:00';
	return dateTime;
}
function getRootName(imageURI){
	var fileName;
	window.resolveLocalFileSystemURI(imageURI, function(root){
		fileName = root.fullPath.substring(7, root.fullPath.length);				
	}, fail);			
	return fileName;
}
function fail(evt) {
   	alert("No es posible elegir archivo");
}
function cleanPhotos(photosArray){
	var photoAttachment = [];
	photoAttachment = photosArray.split(",");		
	return photoAttachment;
}
function createXmlNode(id, answerVal, question){	
	var body;	
	body = "<question id='" + id + "' question='" + question +"'>";	
	if (answerVal == 1)
		body += "<answerText>true</answerText>";
	if(answerVal == 2)
		body += "<answerText>false</answerText>";
	if(answerVal == 3)
		body += "<answerText>No aplica</answerText>";
	body += "</question>";
	return body;	
}
function masterSynchronizedPests(tx){		
	var self = this;
	self.idModelsSync = ko.observableArray(eval(synchronizeModel));
	for(var x=0; x < self.idModelsSync().length; x++){
		if(self.idModelsSync()[x] != undefined){
			query = "UPDATE pests SET synchronized = 1 WHERE id = " + self.idModelsSync()[x].id;			
			tx.executeSql(query);
		}		
	}
	navigator.notification.alert("La sincronización terminó éxitosamente.", alertMiss, "Sincronización Terminada", "Aceptar");			
	getPage("file:///android_asset/www/views/daily_master/index.title.html", "file:///android_asset/www/views/daily_master/index.html");
}
function masterSynchronizedPestidices(tx){		
	var self = this;
	self.idModelsSync = ko.observableArray(eval(synchronizeModel));
	for(var x=0; x < self.idModelsSync().length; x++){
		if(self.idModelsSync()[x] != undefined){
			query = "UPDATE pesticides SET synchronized = 1 WHERE id = " + self.idModelsSync()[x].id;
			tx.executeSql(query);
		}		
	}
	navigator.notification.alert("La sincronización terminó éxitosamente.", alertMiss, "Sincronización Terminada", "Aceptar");			
	getPage("file:///android_asset/www/views/pesticides/index.title.html", "file:///android_asset/www/views/pesticides/index.html");
}
function masterSynchronizedM(tx){		
	var self = this;
	self.idModelsSync = ko.observableArray(eval(synchronizeModel));
	for(var x=0; x < self.idModelsSync().length; x++){
		if(self.idModelsSync()[x] != undefined){
			query = "UPDATE monthly_master SET synchronized = 1 WHERE id = " + self.idModelsSync()[x].id;
			tx.executeSql(query);
		}		
	}
	navigator.notification.alert("La sincronización terminó éxitosamente.", alertMiss, "Sincronización Terminada", "Aceptar");			
	getPage("file:///android_asset/www/views/monthly_master/index.title.html", "file:///android_asset/www/views/monthly_master/index.html");
}
function masterSynchronizedSuppliers(tx){		
	var self = this;
	self.idModelsSync = ko.observableArray(eval(synchronizeModel));
	for(var x=0; x < self.idModelsSync().length; x++){
		if(self.idModelsSync()[x] != undefined){
			query = "UPDATE suppliers SET synchronized = 1 WHERE id = " + self.idModelsSync()[x].id;
			tx.executeSql(query);
		}		
	}
	navigator.notification.alert("La sincronización terminó éxitosamente.", alertMiss, "Sincronización Terminada", "Aceptar");			
	getPage("file:///android_asset/www/views/suppliers/index.title.html", "file:///android_asset/www/views/suppliers/index.html");
}
function sendPicture(pathPicture, master, section){
		var imageURI = pathPicture;						       	    	
    	var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";
        options.chunkedMode = false;
        options.headers = {
          Connection: "close"
        };
        var params = {};
        //params.guid = guidUserKey;
        params.value = master;        
        params.section = section;
        params.name = options.fileName;
        options.params = params;  
        var ft = new FileTransfer();
        ft.upload(imageURI, encodeURI(UrlService +"PhotosBackUp/"), win, fail, options, true);                
}
 function win(r) {      	
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    }
    function fatal(evt) {
        console.log(evt.source);
        //alert(evt.code);
    }

    function fail(error) {    	
        //alert("An error has occurred: Code = " + error.code);
        //alert("upload error source " + error.source);
        //alert("upload error target " + error.target);
    }
    function getGuidUser(){
    	db.transaction(check, errorCB);    	
    }
    function check(tx){
    	tx.executeSql('SELECT * FROM license', [], registed, errorCB);
    }
    function registed(tx, results) {
		var len = results.rows.length;
		if (len > 0) {
			guidUserKey = results.rows.item(0).license;			
		}
	}
function dropKeys(tx){
	tx.executeSql('DELETE license');		
}
