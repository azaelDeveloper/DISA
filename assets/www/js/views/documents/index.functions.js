function queryDB(tx) {
	tx.executeSql('SELECT * FROM documents where documentType = 1', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
	var len = results.rows.length;	
	var manualArray = [];
	if (len > 0) {
		for ( var i = 0; i < len; i++) {
			manualArray[i] = results.rows.item(i);
			manualArray[i]["number"] = (i+1);
		}
		$("#noRecordsFound").hide("fast");
	} else {
		$("#noRecordsFound").show("fast");
	}

		var manualModel = function(manualArray){
			var self = this;
			self.manualArray = ko.observable(manualArray);
			self.detailDocumentManual = function(manualArray) {
				manualId = $(this).attr("id");
				manualNumber = $(this).attr("number");
				manualTitle = $(this).attr("title");
				manualHTML = $(this).attr("html");
				getPage("file:///android_asset/www/views/documents/detailManual.title.html", "file:///android_asset/www/views/documents/detailManual.html#top");			
			};
		};

	vm = new manualModel(eval(manualArray));
	ko.applyBindings(vm);		
}

function errorCB(err) {
	console.log("Error processing SQL: " + err.code);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getUpdate() {
	type = 1;
	var http = new XMLHttpRequest();
	var url = "http://192.168.1.102/Tsandu.TSERP.Web/Service/SendAllDocument/";
	var params = "?xml = Manual";
	http.open("POST", url, true);

	//Send the proper header information along with the request
	//xhtml+xml
	//application/x-www-form-urlencoded
	http.setRequestHeader("Guid-User", "dc5e6a67-23db-436e-b8b9-4176e51b5198");
 	http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");
	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			if(http.responseText != "false"){
				//DO ALL THE ACTIONS
				rText = http.responseText;
				db.transaction(save, errorCB, successCB);
				navigator.notification.alert("Actualización completa...", alertMiss, "Manual de Usuario", "Aceptar");
			}
			else
			{
				navigator.notification.alert("Error en la conexion", alertMiss, "Respuesta del Servidor", "Aceptar");
				//It's time to end all the transition
			}
		}
	}
	http.send(params);
	//navigator.notification.alert("Espere la respuesta del servidor", alertMiss, "Sincronización en Proceso", "Aceptar");
}
function save(tx){
	var query = "";
	query = "DELETE FROM documents";
	tx.executeSql(query);
	doc = rText.split("@|");
	for(var i = 0; i < doc.length - 1 ; i++){
		token = doc[i].split("@!");
		id = token[0];
		title = token[1];
		code = token[2];
		version = token[3];
		expiration = token[4];
		description = token[5];
		type = token[6];
		parentDoc = token[7];
		documentHTML = token[8];
		query = "INSERT INTO documents ";
		query += "VALUES ('" + id +"','" + title +"','" + code + "','" + version +"','" + expiration + "','" + description + "','" + type + "','" + parentDoc + "','" + documentHTML + "')";
		tx.executeSql(query);
	}
	rText = null;
	delete rText;
	getPage("file:///android_asset/www/views/documents/index.title.html", "file:///android_asset/www/views/documents/index.html");		
}