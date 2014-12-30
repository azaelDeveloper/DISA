function checkedUser(tx) {	
	tx.executeSql('SELECT * FROM registered_user', [], CreateIcon, errorCB);
}
function CreateIcon(tx, results) {
	var len = results.rows.length;	
	if (len > 0) {					
		for ( var i = 0; i < len; i++)
			guidUserKey = results.rows.item(i).guidUser;		
		document.getElementById('guidUser').value = guidUserKey;
		$("#icon").addClass("icon-ok icon-white");
		$("#backRound").addClass("btn btn-success");
		
	} else {		
		$("#icon").addClass("icon-remove icon-white");
		$("#backRound").addClass("btn btn-danger");		
	}		
}
function sendGuid (guid){
	var http = new XMLHttpRequest();	
	navigator.notification.alert("La clave fue enviada al servidor por favor espere...", alertMiss, "Verificando Clave", "Aceptar");							
	guidUserKey = guid;	
	var url = UrlService + "ValidateUser/";
	var params = "guid=" + guid;
	http.open("POST", url, true);

	//Send the proper header information along with the request
	//xhtml+xml
	//application/x-www-form-urlencoded		
 	http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 		
 	http.setRequestHeader("Content-length", params.length);			
	http.setRequestHeader("Connection", "close");	
	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			if(http.responseText == "false"){
				db.transaction(dropKeys, errorCB);				
				$("#icon").removeClass("icon-ok icon-white").addClass("icon-remove icon-white");
				$("#backRound").removeClass("btn btn-success").addClass("btn btn-danger");	
				navigator.notification.alert("Verifique su clave por favor.", alertMiss, "Clave no válida", "Aceptar");							

			}				
			if (http.responseText != "false")
			{
				surveysID = http.responseText;
				surveysIDArray = surveysID.split(',');
				db.transaction(checkKey, errorCB, successCB);
				db.transaction(insertIDs, errorCB);
			}
		}				
	}
	http.send(params);		
}
function checkKey(tx){
	tx.executeSql('SELECT * FROM registered_user', [], Check, errorCB);
}
function Check(tx, results){
	var len = results.rows.length;
	if (len > 0) {						
		db.transaction(updateKey, errorCB);
	} else {		
		db.transaction(insertKey, errorCB);
	}	
}
function insertKey(tx){
	tx.executeSql("INSERT INTO registered_user (guidUser, timestampp, gps) VALUES ('"+ guidUserKey +"', '" +getCurrentDateTime() +"', '"+ getGPS() +"')");
	$("#icon").removeClass("icon-remove icon-white").addClass("icon-ok icon-white");
	$("#backRound").removeClass("btn btn-danger").addClass("btn btn-success");	
	navigator.notification.alert("Licencia registrada.", alertMiss, "Clave válida", "Aceptar");							
}
function updateKey(tx){
	tx.executeSql("UPDATE registered_user SET guidUser = '"+ guidUserKey +"', timestampp = '" +getCurrentDateTime() +"', gps = '"+ getGPS() +"'");
	$("#icon").removeClass("icon-remove icon-white").addClass("icon-ok icon-white");
	$("#backRound").removeClass("btn btn-danger").addClass("btn btn-success");	
	navigator.notification.alert("Licencia actualizada.", alertMiss, "Clave actualizada", "Aceptar");							
}
function insertIDs(tx){
	var sql ="INSERT INTO idWebSurveys(first_aidID, pesticidesID, pestsID, suppliersID, timestampp) ";		
	if(surveysIDArray.length > 0){
		sql += "VALUES ('"+ surveysIDArray[0] +"','"+ surveysIDArray[1] +"','"+ surveysIDArray[2] +"','"+ surveysIDArray[3] +"','"+ getCurrentDateTime() +"')";
		tx.executeSql("DELETE FROM idWebSurveys");
		tx.executeSql(sql);
	}	
}