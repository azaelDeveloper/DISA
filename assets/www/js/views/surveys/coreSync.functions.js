function SynchronizedPesticides(syncModel) {	
	var self = this;
	bodyXML = "";
	bodyXML = "<?xml version='1.0' encoding='utf-8' ?>";
	bodyXML = "<AnsweredSurveys>";
	self.syncMaster = ko.observableArray(syncModel);
	for (var i = 0; i < self.syncMaster().length; i++)
	{
		if(self.syncMaster()[i] != undefined)
		{
			var title = "<answeredSurvey id='3159' name='BIT- APLICACIÓN DE PLAGUISIDAS' timestamp='"+ self.syncMaster()[i].timestamp +"'>";
			var table1, table2, table3, table4, table5, footer;
			table1 = checkInformationArea(eval(self.syncMaster()[i].informationArea));
			table2 = checkProductRegistration(eval(self.syncMaster()[i].productRegistration));
			table3 = checkProductQuality(eval(self.syncMaster()[i].productQuality));
			table4 = checkConcetrationProduct(eval(self.syncMaster()[i].concetrationProduct));
			table5 = checkResponsibleApplication(eval(self.syncMaster()[i].responsibleApplication));
			footer = "</answeredSurvey>";
			bodyXML += title + table1 + table2 + table3 + table4 + table5 + footer;
		}
	}
	bodyXML += "</AnsweredSurveys>";
	var http = new XMLHttpRequest();
	var url = UrlService + "BackUpBit/";
	var params = "guid =" + guidUserKey;	
	http.open("POST", url, true);
	http.setRequestHeader("File-Xml", bodyXML);	
 	http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 	
	http.setRequestHeader("Content-length", params.length);		
	http.setRequestHeader("Connection", "close");

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			if(http.responseText == "ERROR02")
				navigator.notification.alert("Error en la sincronización intente de nuevo...", alertMiss, "Respuesta del Servidor", "Aceptar");							
			else
			{
				navigator.notification.alert("Sincronizado...", alertMiss, "Respuesta del Servidor", "Aceptar");
				getBackUpPhotos(self.syncMaster);	
				db.transaction(masterSynchronizedPesticides, errorCB);										
			}
				
		}		
	}	
	http.send(params);	
	navigator.notification.alert("Espere la respuesta del servidor", alertMiss, "Sincronización en Proceso", "Aceptar");	
}
	
function checkInformationArea(Model){
	var self = this;
	var bodyXML = "";
	self.informationArea = ko.observableArray(Model);
	for (var a = 0; a < self.informationArea().length; a++){
		bodyXML += "<AnsweredQuestions name='INFORMACIÓN DEL ÁREA'>";
		bodyXML += "<answeredQuestion textQuestion='Cultivo' value='"+ self.informationArea()[a].crop +"' />";
		bodyXML += "<answeredQuestion textQuestion='Fecha de aplicación' value='"+ self.informationArea()[a].dateApplication +"' />";
		bodyXML += "<answeredQuestion textQuestion='Superficie' value='"+ self.informationArea()[a].surface +"' />";
		bodyXML += "<answeredQuestion textQuestion='Localización' value='"+ self.informationArea()[a].location +"' />";
		bodyXML += "<answeredQuestion textQuestion='Productor' value='"+ self.informationArea()[a].producer +"' />";
		bodyXML += "<answeredQuestion textQuestion='Unidad de producción/zona de aplicación' value='"+ self.informationArea()[a].productoUnit +"' />";
		bodyXML += "</AnsweredQuestions>";
	}
	return bodyXML;
}
function checkProductRegistration(Model){	
	var self = this;
	var bodyXML = "";
	self.productRegistration = ko.observableArray(Model);		
	for (var a = 0; a < self.productRegistration().length; a++){
		bodyXML += "<AnsweredQuestions name='REGISTRO DE PRODUCTO'>";
		bodyXML += "<answeredQuestion textQuestion='Producto' value='"+ self.productRegistration()[a].product +"' />";
		bodyXML += "<answeredQuestion textQuestion='Ingrediente Activo' value='"+ self.productRegistration()[a].activeIngredient +"' />";
		bodyXML += "<answeredQuestion textQuestion='Dósis en 2000 LT de agua' value='"+ self.productRegistration()[a].doseWater +"' />";
		bodyXML += "<answeredQuestion textQuestion='Días de cocecha' value='"+ self.productRegistration()[a].cropDay +"' />";
		bodyXML += "<answeredQuestion textQuestion='Periodo de re-entrada' value='"+ self.productRegistration()[a].periodReEntry +"' />";
		bodyXML += "</AnsweredQuestions>";
	}	
	return bodyXML;	
}
function checkProductQuality(Model){	
	var self = this;
	var bodyXML = "";
	self.productQuality = ko.observableArray(Model);
	for (var a = 0; a < self.productQuality().length; a++){
		bodyXML += "<AnsweredQuestions name='EVALUACIÓN DE CALIDAD DEL PRODUCTO'>";
		bodyXML += "<answeredQuestion textQuestion='Lista de Calidad de Producto' value='true'>";
		bodyXML += "<answeredPosibleAnswers>";
		if(self.productQuality()[a].lmr)
			bodyXML += '<answeredPosibleAnswer textQuestion="Lista de Calidad de Producto" answerText="¿Cuenta con el análisis de LMR?" />';
		if(self.productQuality()[a].isd)
			bodyXML += '<answeredPosibleAnswer textQuestion="Lista de Calidad de Producto" answerText="¿Cumple con ISD?" />';
		if(self.productQuality()[a].bottleWashing)
			bodyXML += '<answeredPosibleAnswer textQuestion="Lista de Calidad de Producto" answerText="¿Realiza el triple lavado de envases?" />';
		if(self.productQuality()[a].collectionCenter)
			bodyXML += '<answeredPosibleAnswer textQuestion="Lista de Calidad de Producto" answerText="¿Entrega envases al centro de acopio?" />';
		if(self.productQuality()[a].protectionEquipment)
			bodyXML += '<answeredPosibleAnswer textQuestion="Lista de Calidad de Producto" answerText="¿Usan equipo de protección?" />';
		if(self.productQuality()[a].sprayEquipment)
			bodyXML += '<answeredPosibleAnswer textQuestion="Lista de Calidad de Producto" answerText="¿Calibra el equipo de aspersión?" />';
		if(self.productQuality()[a].conditioningWater)
			bodyXML += '<answeredPosibleAnswer textQuestion="Lista de Calidad de Producto" answerText="¿Acondicionan el agua?" />';
		bodyXML += "</answeredPosibleAnswers>";
		bodyXML += "</answeredQuestion>";
		bodyXML += "</AnsweredQuestions>";
	}		
	return bodyXML;	
}
function checkConcetrationProduct(Model){	
	var self = this;
	var bodyXML = "";
	self.concetrationProduct = ko.observableArray(Model);
	for (var a = 0; a < self.concetrationProduct().length; a++){
		bodyXML += "<AnsweredQuestions name='CONCENTRACIÓN DEL PRODUCTO'>";
		bodyXML += "<answeredQuestion textQuestion='Producto' value='"+ self.concetrationProduct()[a].product +"' />";
		bodyXML += "<answeredQuestion textQuestion='Concentración' value='"+ self.concetrationProduct()[a].concentration +"' />";
		bodyXML += "<answeredQuestion textQuestion='Fecha de llenado' value='"+ self.concetrationProduct()[a].fillingDate +"' />";
		bodyXML += "</AnsweredQuestions>";
	}	
	return bodyXML;
}
function checkResponsibleApplication(Model){
	var self = this;
	var bodyXML = "";
	self.responsibleApplication = ko.observableArray(Model);
	for (var a = 0; a < self.responsibleApplication().length; a++){
		bodyXML += "<AnsweredQuestions name='RESPONSABILIDAD DE APLICACIÓN'>";
		bodyXML += "<answeredQuestion textQuestion='Aprobada por' value='"+ self.responsibleApplication()[a].approved +"' />";
		bodyXML += "<answeredQuestion textQuestion='Responsable de Aplicación' value='"+ self.responsibleApplication()[a].responsible +"' />";
		bodyXML += "</AnsweredQuestions>";
	}
	return bodyXML;	
}

function getBackUpPhotos(Model){			
	self.Masters = ko.observableArray(Model);		
	for (var i = 0; i < Model().length; i++)
	{
		backUpPesticidesMaster(eval(Model()[i].productRegistration), eval(Model()[i].productQuality), eval(Model()[i].concetrationProduct));
	}	
}

function backUpPesticidesMaster(productRegistration, productQuality, concetrationProduct){
	var self = this;
	var masterName = "BIT- APLICACIÓN DE PLAGUISIDAS";
	self.productRegistration = ko.observableArray(productRegistration);
	for(var x = 0; x < self.productRegistration().length; x++)
		if(self.productRegistration()[x].photoProductRegistration != null && self.productRegistration()[x].photoProductRegistration != "")
			sendPicture(self.productRegistration()[x].photoProductRegistration, masterName, "REGISTRO DE PRODUCTO");

	self.productQuality = ko.observableArray(productQuality);
	for(var x = 0; x < self.productQuality().length; x++)
		if(self.productQuality()[x].photoQualityProduct != null && self.productQuality()[x].photoQualityProduct != "")
			sendPicture(self.productQuality()[x].photoQualityProduct, masterName, "EVALUACIÓN DE CALIDAD DEL PRODUCTO");

	self.concetrationProduct = ko.observableArray(concetrationProduct);
	for(var x = 0; x < self.concetrationProduct().length; x++)
		if(self.concetrationProduct()[x].photoConcentratedProduct != null && self.concetrationProduct()[x].photoConcentratedProduct != "")
			sendPicture(self.concetrationProduct()[x].photoConcentratedProduct, masterName, "CONCENTRACIÓN DEL PRODUCTO");

}