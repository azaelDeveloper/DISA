function SynchronizedPests (completeModel) {	
	var self = this;	
	bodyEmail = "<AnsweredSurveys>";
	var fileMaster = "";
	var arrayPhotos = [];
	self.emailMaster = ko.observableArray(eval(completeModel));			
	for (var i = 0; i < self.emailMaster().length; i++)
	{		
		var title = '<answeredSurvey id="3162" name="BIT 22 - REGISTRO DE MONITOREO DE PLAGAS, ENFERMEDADES Y MALEZAS" timestamp="'+ self.emailMaster()[i].timestamp +'">';				
		var table1, table2, table3, table4, table5;						
		table1 = checkInformation(eval(self.emailMaster()[i].informationPests));							
		table2 = checkRecordPests(eval(self.emailMaster()[i].pestRecord));						
		table3 = checkPests(eval(self.emailMaster()[i].pestTable));
		table4 = checkDiseases(eval(self.emailMaster()[i].diseases));
		table5 = checkBushes(eval(self.emailMaster()[i].bushesTable));				
		bodyEmail += title + table1 + table2 + table3 + table4 + table5 + "</answeredSurvey>";			
	}
	bodyEmail += "</AnsweredSurveys>";
	var http = new XMLHttpRequest();
	var params = "guid =" + guidUserKey + "&survID=" + SurveyIDWEB;
	var url = UrlService +"BackUpBit/";	
	http.open("POST", url, true);
	http.setRequestHeader("File-Xml", bodyEmail);	
	http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 	
	http.setRequestHeader("Content-length", params.length);		
	http.setRequestHeader("Connection", "close");

	http.onreadystatechange = function() {//Call a function when the state changes.
	if(http.readyState == 4 && http.status == 200) {
			if(http.responseText == "ERROR02")
				navigator.notification.alert("Problemas contactando el servidor...", alertMiss, "Respuesta del Servidor", "Aceptar");							
			else
			{				
				getPhotosP(self.emailMaster);	
				db.transaction(masterSynchronizedPests, errorCB);										
			}
					
		}		
	}	
	http.send(params);	
	navigator.notification.alert("Espere la respuesta del servidor", alertMiss, "Sincronización en Proceso", "Aceptar");		
	

}

function checkInformation(Model){
	var self = this;
	var bodyEmail = "";
	self.informationPests = ko.observableArray(Model);		
	for (var i = 0; i < self.informationPests().length; i++){		
		bodyEmail += '<AnsweredQuestions name="Información del Monitoreo">';
		bodyEmail += '<answeredQuestion textQuestion="Empresa" value="'+ self.informationPests()[i].company +'" />';		
		bodyEmail += '<answeredQuestion textQuestion="Representante Legal" value="'+ self.informationPests()[i].representatitve + '"/>';								
		bodyEmail += '<answeredQuestion textQuestion="Cultivo y Variedad" value="' + self.informationPests()[i].crop + '" />';						
		bodyEmail += '<answeredQuestion textQuestion="Unidad de Producción" value="' + self.informationPests()[i].production + '" />';					
		bodyEmail += '<answeredQuestion textQuestion="Superficie" value="' + self.informationPests()[i].surface + '" />';			
		bodyEmail += '<answeredQuestion textQuestion="Localización" value="' + self.informationPests()[i].location + '" />';						
		bodyEmail += '<answeredQuestion textQuestion="Periodo de Vigencia" value="' + self.informationPests()[i].validity + '" />';		
		bodyEmail += '</AnsweredQuestions>';
	}	
	return bodyEmail;
}
	
function checkRecordPests(Model){
	var self = this;
	var bodyEmail = "";
	self.records = ko.observableArray(Model);		
	for (var a = 0; a < self.records().length; a++){
		bodyEmail += '<AnsweredQuestions name="Registro de Plaga">';
		bodyEmail += '<answeredQuestion textQuestion="Fecha de monitoreo"  value="' + self.records()[a].recordDate + '" />';		
		bodyEmail += '<answeredQuestion textQuestion="Sector" value="' + self.records()[a].sector + '" />';		
		bodyEmail += '<answeredQuestion textQuestion="Edad del cultivo" value="' + self.records()[a].age + '" />';		
		bodyEmail += '<answeredQuestion textQuestion="Etapa fenológica del cultivo" value="true">';		
		bodyEmail += '<answeredPosibleAnswers><answeredPosibleAnswer textQuestion="Etapa fenológica del cultivo" answerText="' + self.records()[a].stage.answerText + '" /></answeredPosibleAnswers></answeredQuestion>';		
		bodyEmail += '<answeredQuestion textQuestion="Responsable de Monitoreo" value="' + self.records()[a].responsible + '" />';		
		bodyEmail += '<answeredQuestion textQuestion="Comentarios" value="' + self.records()[a].comment + '" />';		
		bodyEmail += '</AnsweredQuestions>';
	}						
	return bodyEmail;
}
function checkPests(Model){
	var self = this;
	var bodyEmail = "";
	self.pests = ko.observableArray(Model);			
	for (var a = 0; a < self.pests().length; a++){
		bodyEmail += '<AnsweredQuestions name="Tabla de Plagas">';		
		bodyEmail += '<answeredQuestion textQuestion="Sector" value="' + self.pests()[a].sector + '" />';
		bodyEmail += '<answeredQuestion textQuestion="Plaga Identificada" value="' +self.pests()[a].pest + '" />';
		switch(self.pests()[a].damage.posibleAnswerID){
			case 11:
			bodyEmail += '<answeredQuestion textQuestion="Nivel de Daño" value="Bajo" />';
			break;
			case 22:
			bodyEmail += '<answeredQuestion textQuestion="Nivel de Daño" value="Medio" />';
			break;
			case 33:
			bodyEmail += '<answeredQuestion textQuestion="Nivel de Daño" value="Alto" />';
			break;
		}
		if(self.pests()[a].enemies == 0)
			bodyEmail += '<answeredQuestion textQuestion="¿Presencia de enemigos naturales?" value="No" />';
		if(self.pests()[a].enemies == 1)
			bodyEmail += '<answeredQuestion textQuestion="¿Presencia de enemigos naturales?" value="Sí" />';
		if(self.pests()[a].justification == 0)
			bodyEmail += '<answeredQuestion textQuestion="¿Se justifica control?" value="No" />';
		if(self.pests()[a].justification == 1)
			bodyEmail += '<answeredQuestion textQuestion="¿Se justifica control?" value="Sí" />';
		bodyEmail += '<answeredQuestion textQuestion="Comentarios" value="' + self.pests()[a].comment + '" />';

		bodyEmail += '</AnsweredQuestions>';
	}			
	return bodyEmail;
}
function checkDiseases(Model){
	var self = this;
	var bodyEmail = "";
	self.diseases = ko.observableArray(Model);			
	for (var a = 0; a < self.diseases().length; a++){
		bodyEmail += '<AnsweredQuestions name="Tabla de Enfermedades">';		
		bodyEmail += '<answeredQuestion textQuestion="Sector" value="' + self.diseases()[a].sector + '"/>';
		bodyEmail += '<answeredQuestion textQuestion="Enfermedad Identificada" value="' + self.diseases()[a].name + '"/>';
		switch(self.diseases()[a].damage.posibleAnswerID){
			case 111:
			bodyEmail += '<answeredQuestion textQuestion="Nivel de Daño" value="Bajo" />';
			break;
			case 222:
			bodyEmail += '<answeredQuestion textQuestion="Nivel de Daño" value="Medio" />';
			break;
			case 333:
			bodyEmail += '<answeredQuestion textQuestion="Nivel de Daño" value="Alto" />';
			break;
		}
		if(self.diseases()[a].enemies == 0)
			bodyEmail += '<answeredQuestion textQuestion="¿Presencia de enemigos naturales?" value="No" />';
		if(self.diseases()[a].enemies == 1)
			bodyEmail += '<answeredQuestion textQuestion="¿Presencia de enemigos naturales?" value="Sí" />';	
		if(self.diseases()[a].justification == 0)
			bodyEmail += '<answeredQuestion textQuestion="¿Se justifica control?" value="No" />';
		if(self.diseases()[a].justification == 1)
			bodyEmail += '<answeredQuestion textQuestion="¿Se justifica control?" value="Sí" />';
		bodyEmail += '<answeredQuestion textQuestion="Comentarios" value="'+ self.diseases()[a].comment +'" />';
		bodyEmail += '</AnsweredQuestions>';		

	}							
	return bodyEmail;
}

function checkBushes(Model){
	var self = this;
	var bodyEmail = "";
	self.bushes = ko.observableArray(Model);			
	for (var a = 0; a < self.bushes().length; a++){
		bodyEmail += '<AnsweredQuestions name="Tabla de Malezas">';
		bodyEmail += '<answeredQuestion textQuestion="Sector" value="' + self.bushes()[a].sector + '" />';		
		bodyEmail += '<answeredQuestion textQuestion="Maleza Identificada" value="' + self.bushes()[a].name + '" />';		
		switch(self.bushes()[a].damage.posibleAnswerID){
			case 1111:
			bodyEmail += '<answeredQuestion textQuestion="Nivel de Daño" value="Bajo" />';
			break;
			case 2222:
			bodyEmail += '<answeredQuestion textQuestion="Nivel de Daño" value="Medio" />';
			break;
			case 3333:
			bodyEmail += '<answeredQuestion textQuestion="Nivel de Daño" value="Alto" />';
			break;
		}
		if(self.bushes()[a].enemies == 0)
			bodyEmail += '<answeredQuestion textQuestion="¿Presencia de enemigos naturales?" value="No" />';
		if(self.bushes()[a].enemies == 1)
			bodyEmail += '<answeredQuestion textQuestion="¿Presencia de enemigos naturales?" value="Sí" />';	
		if(self.bushes()[a].justification == 0)
			bodyEmail += '<answeredQuestion textQuestion="¿Se justifica control?" value="No" />';
		if(self.bushes()[a].justification == 1)
			bodyEmail += '<answeredQuestion textQuestion="¿Se justifica control?" value="Sí" />';
		bodyEmail += '<answeredQuestion textQuestion="Comentarios" value="'+ self.bushes()[a].comment +'" />';
		bodyEmail += '</AnsweredQuestions>'

	}		
	return bodyEmail;
}
function getPhotosP(Model){		
	for (var i = 0; i < Masters().length; i++)
	{		
		backUpPestsMasters(eval(Masters()[i].pestRecord), eval(Masters()[i].pestTable), eval(Masters()[i].diseases), eval(Masters()[i].bushesTable));
	}

}
function backUpPestsMasters(pestRecord, pestTable, diseases, bushesTable){
	var self = this;
	var masterName = "BIT 22 - Pestes";
	self.fenc = ko.observableArray(pestRecord);
	for(var i = 0; i < self.fenc().length; i++){
		if(self.fenc()[i].photoRecord != null && self.fenc()[i].photoRecord != "")
			sendPicture(self.fenc()[i].photoRecord, "Registro de Plaga", "Registro de Plaga");
	}
	self.lamp = ko.observableArray(pestTable);
	for(var i = 0; i < self.lamp().length; i++){
		if(self.lamp()[i].photoPests != null && self.lamp()[i].photoPests != "")
			sendPicture(self.lamp()[i].photoPests, "Tabla de Plagas", "Plagas");
	}
	self.weather = ko.observableArray(diseases);
	for(var i = 0; i < self.weather().length; i++){
		if(self.weather()[i].photoWeather != null && self.weather()[i].photoWeather != "")
			sendPicture(self.weather()[i].photoDisease, "Tabla de Enfermedades", "Enfermedades");
	}
	self.pipe = ko.observableArray(bushesTable);
	for(var i = 0; i < self.pipe().length; i++){
		if(self.pipe()[i].photoPipe != null && self.pipe()[i].photoPipe != "")
			sendPicture(self.pipe()[i].photoBush, "Tabla de Malezas", "Malezas");
	}
}
function SelectIDs(tx){
	tx.executeSql('SELECT pestsID  FROM idWebSurveys', [], selectID, errorCB);
}
function selectID(tx, results) {
	var len = results.rows.length;	
	var pestsMasters = [];		
	if (len > 0) {		
		SurveyIDWEB = results.rows.item(0).pestsID;
	}
}