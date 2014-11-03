function SynchronizedFirstAid (completeModel) {
	var self = this;
	bodyXml = "<AnsweredSurveys>";
	var fileMaster = "";
	var arrayPhotos = [];
	self.emailMaster = ko.observableArray(eval(completeModel));
	for (var i = 0; i < self.emailMaster().length; i++)
	{
		var title = "<answeredSurvey id='3161' name='BIT 12 - LISTADO DE VERIFICACION DE MATERIALES DE PRIMEROS AUXILIOS' timestamp='"+ self.emailMaster()[i].timestamp +"'><Sections>";
		var table1, table2;
		table1 = xmlInformation(eval(self.emailMaster()[i].firstAidInformation), self.emailMaster()[i].timestamp);
		table2 = xmlKits(eval(self.emailMaster()[i].checkList));
		bodyXml += title + table1 + table2 + "</Sections></answeredSurvey>";
	}
	bodyXml += "</AnsweredSurveys>";
	var http = new XMLHttpRequest();
	var params = "guid =" + guidUserKey;
	var url = "http://192.168.1.102/Tsandu.TSERP.Web/Service/BackUpPests/";
	http.open("POST", url, true);
	http.setRequestHeader("File-Xml", bodyXml);
	http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");
	http.onreadystatechange = function() {//Call a function when the state changes.
	if(http.readyState == 4 && http.status == 200) {
			if(http.responseText == "ERROR02")
				navigator.notification.alert("Problemas contactando el servidor...", alertMiss, "Respuesta del Servidor", "Aceptar");
			else
			{
				navigator.notification.alert("Sincronizado...", alertMiss, "Respuesta del Servidor", "Aceptar");
				//getPhotosFA(self.emailMaster);
				//db.transaction(masterSynchronizedW, errorCB);
			}
		}
	}
	http.send(params);
	navigator.notification.alert("Espere la respuesta del servidor", alertMiss, "Sincronización en Proceso", "Aceptar");
	//alert('sincronización en proceso\n' + bodyXml);
}

function xmlInformation(Model, kitMasterDate){
	var self = this;
	var bodyXml;
	self.firstAidInformation = ko.observableArray(Model);	
	bodyXml = '<section id="5634" name="1.1 Informacion de Monitoreo de Plagas" datetime="'+ kitMasterDate +'">';	
	for (var i = 0; i < self.firstAidInformation().length; i++){		
		bodyXml += '<AnsweredQuestions>';
		bodyXml += '<answeredQuestion questionId="12358" value="'+ self.firstAidInformation()[i].company +'" />';		
		bodyXml += '<answeredQuestion questionId="12359" value="'+ self.firstAidInformation()[i].representatitve + '"/>';								
		bodyXml += '<answeredQuestion questionId="12360" value="' + self.firstAidInformation()[i].crop + '" />';				
		bodyXml += '<answeredQuestion questionId="12361" value="' + self.firstAidInformation()[i].production + '" />';		
		bodyXml += '<answeredQuestion questionId="12362" value="' + self.firstAidInformation()[i].surface + '" />';				
		bodyXml += '<answeredQuestion questionId="12363" value="' + self.firstAidInformation()[i].location + '" />';				
		bodyXml += '<answeredQuestion questionId="12364" value="' + self.firstAidInformation()[i].validity + '" />';		
		bodyXml += '</AnsweredQuestions>';
	}
	bodyXml += '</section>';		
	return bodyXml;
}

function xmlKits(Model){
	var self = this;
	var bodyXml;
	self.kits = ko.observableArray(Model);
	bodyXml = '<section id="4553" name="Información para Listado de Primeros Auxilios">';
	for (var i = 0; i < self.kits().length; i++){
		bodyXml += '<AnsweredQuestions>';
		bodyXml += '<answeredQuestion questionId="10479" value="'+ self.kits()[i].checkDate +'" />';
		bodyXml += '<answeredQuestion questionId="10480" value="true"><answeredPosibleAnswers>';
		if(self.kits()[i].desinfectant == true){
			bodyXml += '<answeredPosibleAnswer posibleAnswerID="5916" questionId="10480" />';
		}
		if(self.kits()[i].alcohol == true){
			bodyXml += '<answeredPosibleAnswer posibleAnswerID="5917" questionId="10480" />';
		}
		if(self.kits()[i].cotton == true){
			bodyXml += '<answeredPosibleAnswer posibleAnswerID="5918" questionId="10480" />';
		}
		if(self.kits()[i].gauze == true){
			bodyXml += '<answeredPosibleAnswer posibleAnswerID="5919" questionId="10480" />';
		}
		if(self.kits()[i].bandaid == true){
			bodyXml += '<answeredPosibleAnswer posibleAnswerID="5920" questionId="10480" />';
		}
		if(self.kits()[i].tape == true){
			bodyXml += '<answeredPosibleAnswer posibleAnswerID="5921" questionId="10480" />';
		}
		if(self.kits()[i].tablets == true){
			bodyXml += '<answeredPosibleAnswer posibleAnswerID="5922" questionId="10480" />';
		}
		if(self.kits()[i].bismuth == true){
			bodyXml += '<answeredPosibleAnswer posibleAnswerID="5923" questionId="10480" />';
		}
		if(self.kits()[i].gloves == true){
			bodyXml += '<answeredPosibleAnswer posibleAnswerID="5924" questionId="10480" />';
		}
		if(self.kits()[i].scissors == true){
			bodyXml += '<answeredPosibleAnswer posibleAnswerID="5925" questionId="10480" />';
		}
		if(self.kits()[i].headbands == true){
			bodyXml += '<answeredPosibleAnswer posibleAnswerID="5926" questionId="10480" />';
		}
		if(self.kits()[i].isodine == true){
			bodyXml += '<answeredPosibleAnswer posibleAnswerID="5927" questionId="10480" />';
		}
		if(self.kits()[i].antibactereal == true){
			bodyXml += '<answeredPosibleAnswer posibleAnswerID="5928" questionId="10480" />';
		}
		bodyXml += '</answeredPosibleAnswers></answeredQuestion>';
		bodyXml += '<answeredQuestion questionId="12503" value="' + self.kits()[i].others + '" />';
		bodyXml += '<answeredQuestion questionId="10481" value="' + self.kits()[i].checker + '" />';
		bodyXml += '<answeredQuestion questionId="10482" value="' + self.kits()[i].responsible + '" />';
		bodyXml += '<answeredQuestion questionId="12504" value="' + self.kits()[i].comment + '" />';
		bodyXml += '</AnsweredQuestions>';
	}
	bodyXml += '</section>';
	return bodyXml;
}

function getPhotosFA(Model){
	for (var i = 0; i < Model().length; i++)
	{		
		backUpFirstAidMasters(eval(Model()[i].checkList));
	}
}

function backUpFirstAidMasters(Model){
	var self = this;
	var masterName = "BIT 12 - Primeros Auxilios";
	self.kits = ko.observableArray(Model);
	for(var i = 0; i < self.kits().length; i++){
		if(self.kits()[i].photoFirstAid != null && self.kits()[i].photoFirstAid != "")
			sendPicture(self.kits()[i].photoFirstAid, "Primeros Auxilios", "Botiquin");
	}
}

/*
function SynchronizeD(syncModel){
	var self = this;	
	var arrayPhotos = [];
	self.photos = ko.observableArray();	
	bodyEmail = "";	
	bodyEmail = "<?xml version='1.0' encoding='utf-8' ?>";		
	bodyEmail += '<Masters>';					
	self.emailMaster = ko.observableArray(eval(syncModel));				
	for (var i = 0; i < self.emailMaster().length; i++)
	{	
		if(self.emailMaster()[i] != undefined)			
		{
			var title = "<master id='" + self.emailMaster()[i].id + "' timestamp='" + self.emailMaster()[i].timestamp +"' type='Master Diario' guid='"+ guidUserKey +"'>";
			var table1, table2, table3;											
			table1 = xmlDisinfectants(eval(self.emailMaster()[i].disinfectants));											
			table2 = xmlRestroom(eval(self.emailMaster()[i].restrooms));										
			table3 = xmlCanteen(eval(self.emailMaster()[i].canteens));
			table3 += '</master>';
			bodyEmail += title + table1 + table2 + table3;								
		}		
	}			
	bodyEmail += '</Masters>';		
	var http = new XMLHttpRequest();	
	var url = "http://192.168.1.107/Tsandu.TSERP.Web/Service/ImportSurveys/";
	var params = "?guid=master";
	http.open("POST", url, true);

	//Send the proper header information along with the request
	//xhtml+xml
	//application/x-www-form-urlencoded	
	http.setRequestHeader("File-Xml", bodyEmail);	
 	http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 	
	http.setRequestHeader("Content-length", params.length);			
	http.setRequestHeader("Connection", "close");	
	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			if(http.responseText == "false")
				navigator.notification.alert("Error en la sincronización intente de nuevo...", alertMiss, "Respuesta del Servidor", "Aceptar");							
			if (http.responseText == "true")
			{
				getPhotosSD(self.emailMaster);
				db.transaction(masterSynchronizedD, errorCB);										
				//It's time to end all the transition				
			}
		}				
	}
	http.send(params);		
	navigator.notification.alert("Espere la respuesta del servidor", alertMiss, "Sincronización en Proceso", "Aceptar");		
}
function xmlDisinfectants(Model){
	var self = this;
	var bodyEmail;
	self.disinfectants = ko.observableArray(Model);		
	for (var i = 0; i < self.disinfectants().length; i++){
		if (i == 0)
			bodyEmail = "<section id='"+ self.disinfectants()[i].id +"' name='Desinfectantes' type='1'>";		
		else
			bodyEmail += "<section id='"+ self.disinfectants()[i].id +"' name='Desinfectantes' type='1'>";		
		bodyEmail += "<question question='Nombre'>";
		bodyEmail += '<answerVal>' + self.disinfectants()[i].name + '</answerVal></question>';
		bodyEmail += "<question question='Ph'><answerVal>"+ self.disinfectants()[i].ph + '</answerVal></question>';	
		bodyEmail += "<question question='Concentración'><answerVal>" + self.disinfectants()[i].concentration + '</answerVal></question>';	
		bodyEmail += "<question question='Unidad'>";		
		if(self.disinfectants()[i].unid.answerVal == 1)
			bodyEmail += '<answerText>Mililitros</answerText>';
		if(self.disinfectants()[i].unid.answerVal == 2)
			bodyEmail += '<answerText>Galones</answerText>';		
		bodyEmail += '</question>';	
		bodyEmail += '</section>';		
	}	
	return bodyEmail;
}

function xmlRestroom(Model){
	var self = this;
	var bodyEmail;
	self.restrooms = ko.observableArray(Model);		
	for (var a = 0; a < self.restrooms().length; a++){
		if (a == 0)
			bodyEmail = "<section id='" + self.restrooms()[a].restroomRow + "' name='Baños' type='2'>";
		else
			bodyEmail += "<section id='" + self.restrooms()[a].restroomRow + "' name='Baños' type='2'>";

	bodyEmail += createXmlNode(1, self.restrooms()[a].answerVal1.answerVal, "¿Están limpios y desinfectados el piso, paredes y techos?");
	bodyEmail += createXmlNode(2, self.restrooms()[a].answerVal2.answerVal, "¿Los depósitos de basura están limpios y vacíos?");
	bodyEmail += createXmlNode(3, self.restrooms()[a].answerVal3.answerVal, "¿Hay toallas para manos y papel sanitario?");
	bodyEmail += createXmlNode(4, self.restrooms()[a].answerVal4.answerVal, "¿El depósito de Jabón está lleno?");
	bodyEmail += createXmlNode(5, self.restrooms()[a].answerVal5.answerVal, "¿Hay agua potable?");
	
	bodyEmail += '</section>';	
	}		
	return bodyEmail;
}
function xmlCanteen(Model){
	var self = this;
	var bodyEmail;
	self.canteens = ko.observableArray(Model);		
	for (var a = 0; a < self.canteens().length; a++){
		if (a == 0)
			bodyEmail = "<section id='" + self.canteens()[a].canteenRow + "' name='Comedores' type='2'>";				
		else
			bodyEmail += "<section id='" + self.canteens()[a].canteenRow + "' name='Comedores' type='2'>";				
		bodyEmail += createXmlNode(1, self.canteens()[a].answerVal6.answerVal, "¿Están limpios y desinfectados el piso, paredes y techos?");
		bodyEmail += createXmlNode(2, self.canteens()[a].answerVal7.answerVal, "¿Los depósitos de basura están limpios y vacíos?");
		bodyEmail += createXmlNode(3, self.canteens()[a].answerVal8.answerVal, "¿Hay toallas/servilletas para manos?");
		bodyEmail += createXmlNode(4, self.canteens()[a].answerVal9.answerVal, "¿El mobiliario y lockers están limpios y ordenados?");
		bodyEmail += createXmlNode(5, self.canteens()[a].answerVal10.answerVal, "¿Hay agua para beber y vasos desechables?");
		bodyEmail += createXmlNode(6, self.canteens()[a].answerVal11.answerVal, "¿La tarja para lavar trastes está limpia y ordenada?")		
		bodyEmail += "</section>";
	}				
	return bodyEmail;

}
function getPhotosSD(Masters){	
	for(var x = 0; x < Masters().length; x++){		
		backUpDailyMasters(eval(Masters()[x].restrooms), eval(Masters()[x].canteens));
	}
}
function backUpDailyMasters(restrooms, canteens){
	var self=this;
	var masterName = "Master Diario";
	self.rest = ko.observableArray(restrooms);
	for(var x = 0; x < self.rest().length; x++)
		if(self.rest()[x].photoBath != null && self.rest()[x].photoBath != "")
			sendPicture(self.rest()[x].photoBath, masterName, "Baños");
	self.cant = ko.observableArray(canteens);
	for(var x = 0; x < self.rest().length; x++)
		if(self.cant()[x].photoCanteen != null && self.cant()[x].photoCanteen != "")
			sendPicture(self.cant()[x].photoCanteen, masterName, "Comedores");	
}*/