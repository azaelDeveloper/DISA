function SynchronizedSuppliers(syncModel) {
	var self = this;
	bodyXML = "";
	bodyXML = "<?xml version='1.0' encoding='utf-8' ?>";
	bodyXML = "<AnsweredSurveys>";
	self.syncMaster = ko.observableArray(syncModel);
	for (var i = 0; i < self.syncMaster().length; i++)
	{
		if(self.syncMaster()[i] != undefined)
		{
			var title = "<answeredSurvey id='3160' name='BIT-21 IDENTIFICACIÓN Y EVALUACIÓN DE PROVEEDORES DE INSUMOS Y/O SERVICIOS' timestamp='"+ self.syncMaster()[i].timestamp +"'>";
			var table1, table2, table3, footer;
			table1 = checkSuppliersInformation(eval(self.syncMaster()[i].suppliersInformation));
			table2 = checkRating(eval(self.syncMaster()[i].rating));
			table3 = checkFeatureProduct(eval(self.syncMaster()[i].featureProduct));
			footer = "</answeredSurvey>";
			bodyXML += title + table1 + table2 + table3 + footer;
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
				db.transaction(masterSynchronizedSuppliers, errorCB);
			}
		}
	}
	http.send(params);
	navigator.notification.alert("Espere la respuesta del servidor", alertMiss, "Sincronización en Proceso", "Aceptar");
}

function checkSuppliersInformation(Model){
	var self = this;
	var bodyXML = "";
	self.suppliersInformation = ko.observableArray(Model);
	for (var a = 0; a < self.suppliersInformation().length; a++){
		bodyXML += "<AnsweredQuestions name='INFORMACIÓN DE PROVEEDORES'>";
		bodyXML += "<answeredQuestion textQuestion='Empresa' value='"+ self.suppliersInformation()[a].company +"' />";
		bodyXML += "<answeredQuestion textQuestion='Representante Legal' value='"+ self.suppliersInformation()[a].representative +"' />";
		bodyXML += "<answeredQuestion textQuestion='Cultivo y Variedad' value='"+ self.suppliersInformation()[a].crop +"' />";
		bodyXML += "<answeredQuestion textQuestion='Unidad de Producción' value='"+ self.suppliersInformation()[a].production +"' />";
		bodyXML += "<answeredQuestion textQuestion='Superficie' value='"+ self.suppliersInformation()[a].surface +"' />";
		bodyXML += "<answeredQuestion textQuestion='Localización' value='"+ self.suppliersInformation()[a].location +"' />";
		bodyXML += "<answeredQuestion textQuestion='Periodo de Vigencia' value='"+ self.suppliersInformation()[a].validity +"' />";
		bodyXML += "<answeredQuestion textQuestion='Responsable de la Evaluación' value='"+ self.suppliersInformation()[a].responsible +"' />";
		bodyXML += "</AnsweredQuestions>";
	}
	return bodyXML;
}
function checkRating(Model){
	var self = this;
	var bodyXML = "";
	self.rating = ko.observableArray(Model);
	for (var a = 0; a < self.rating().length; a++){
		bodyXML += "<AnsweredQuestions name='EVALUACIÓN'>";
		bodyXML += "<answeredQuestion textQuestion='Frecuencia de Evaluación' value='"+ self.rating()[a].frequency +"' />";
		bodyXML += "<answeredQuestion textQuestion='Inspección visual de material y/o servicio' value='true'>";
		bodyXML += "<answeredPosibleAnswers><answeredPosibleAnswer textQuestion='Inspección visual de material y/o servicio' answerText='" + self.rating()[a].inspection.answerText + "' /></answeredPosibleAnswers>";
		bodyXML += "</answeredQuestion>";
		bodyXML += "<answeredQuestion textQuestion='Etiqueta e información de seguridad' value='"+ self.rating()[a].security +"' />";
		bodyXML += "<answeredQuestion textQuestion='Análisis de laboratorio acreditado' value='"+ self.rating()[a].analysis +"' />";
		bodyXML += "<answeredQuestion textQuestion='Registro o autorización SENASICA, SSA, otro' value='"+ self.rating()[a].register +"' />";
		bodyXML += "</AnsweredQuestions>";
	}
	return bodyXML;
}
function checkFeatureProduct(Model){
	var self = this;
	var bodyXML = "";
	self.featureProduct = ko.observableArray(Model);
	for (var a = 0; a < self.featureProduct().length; a++){
		bodyXML += "<AnsweredQuestions name='CARACTERISTICAS  DEL PRODUCTO  Y/O SERVICIO EVALUADO'>";
		bodyXML += "<answeredQuestion textQuestion='Tiempos de entrega y especificaciones de compra' value='true'>";
		bodyXML += "<answeredPosibleAnswers><answeredPosibleAnswer textQuestion='Tiempos de entrega y especificaciones de compra' answerText='" + self.featureProduct()[a].purchase.answerText + "' /></answeredPosibleAnswers>";
		bodyXML += "</answeredQuestion>";
		bodyXML += "<answeredQuestion textQuestion='Atención a recomendaciones de mejora' value='true'>";
		bodyXML += "<answeredPosibleAnswers><answeredPosibleAnswer textQuestion='Atención a recomendaciones de mejora' answerText='" + self.featureProduct()[a].recommendations.answerText + "' /></answeredPosibleAnswers>";
		bodyXML += "</answeredQuestion>";
		bodyXML += "<answeredQuestion textQuestion='Sumatoria total' value='"+ self.featureProduct()[a].result +"' />";
		bodyXML += "<answeredQuestion textQuestion='Aprobado' value='"+ self.featureProduct()[a].approved +"' />";
		bodyXML += "<answeredQuestion textQuestion='¿Se mantiene en lista de proveedores?' value='"+ self.featureProduct()[a].list +"' />";
		bodyXML += "<answeredQuestion textQuestion='Fecha de la próxima evaluación' value='"+ self.featureProduct()[a].nextDate +"' />";
		bodyXML += "</AnsweredQuestions>";
	}
	return bodyXML;
}

function getBackUpPhotos(Model){
	for (var x = 0; x < Model().length; x++){
		backUpSuppliersMasters(eval(Model()[x].rating), eval(Model()[x].featureProduct));
	}
}
function backUpSuppliersMasters(rating, featureProduct){
	var self = this;
	var masterName = "BIT-12 IDENTIFICACIÓN Y EVALUACIÓN DE PROVEEDORES DE INSUMOS Y/O SERVICIOS";
	self.rating = ko.observableArray(rating);
	for(var i = 0; i < self.rating().length; i++)
		if(self.rating()[i].photoRating != null && self.rating()[i].photoRating != "")
			sendPicture(self.rating()[i].photoRating, masterName, "EVALUACIÓN");

	self.featureProduct = ko.observableArray(featureProduct);
	for(var i = 0; i < self.featureProduct().length; i++)
		if(self.featureProduct()[i].photoFeatureProduct != null && self.featureProduct()[i].photoFeatureProduct != "")
			sendPicture(self.featureProduct()[i].photoFeatureProduct, masterName, "CARACTERISTICAS DEL PRODUCTO Y/O SERVICIO EVALUADO");
}