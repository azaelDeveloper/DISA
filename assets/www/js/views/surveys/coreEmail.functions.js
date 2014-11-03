function emailAll (completeModel) {
	var self = this;
	headEmail = "";
	bodyEmail = "";
	htmlEmail = "";
	var fileMaster = "";
	var arrayPhotos = [];
	self.emailMaster = ko.observableArray(completeModel);
	for (var i = 0; i < self.emailMaster().length; i++)
	{
		var title = '<br /><h3>Aplicación de plaguicidas #<b>' + self.emailMaster()[i].id + '</b></h3>';
		var table1 = "", table2 = "", table3 = "", table4 = "", table5 = "";
		title += '<h3>' + self.emailMaster()[i].timestamp + '</h3>';
		table1 = checkInformationArea(eval(self.emailMaster()[i].informationArea));
		table2 = checkProductRegistration(eval(self.emailMaster()[i].productRegistration));
		table3 = checkProductQuality(eval(self.emailMaster()[i].productQuality));
		table4 = checkConcetrationProduct(eval(self.emailMaster()[i].concetrationProduct));
		table5 = checkResponsibleApplication(eval(self.emailMaster()[i].responsibleApplication));
		bodyEmail += title + table1 + table2 + table3 + table4 + table5;
		arrayPhotos += [getPhotos(eval(self.emailMaster()[i].productRegistration), eval(self.emailMaster()[i].productQuality), eval(self.emailMaster()[i].concetrationProduct))];
	}
	headEmail = "<head><title>Aplicación de plaguicidas</title><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'></head>";
	bodyEmail = "<body>" + bodyEmail + "</body>";
	htmlEmail = "<html>" + headEmail + bodyEmail + "</html>";
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	var photoAttachment = cleanPhotos(arrayPhotos + fileMaster);
	window.plugins.emailComposer.showEmailComposer("Bitácora de Plaguicidas", "Los documentos están adjuntos.",[],[],[], true, photoAttachment);
	function gotFS(fileSystem) {
    	fileSystem.root.getFile("Masters-Pesticides.html", {create: true}, gotFileEntry, fail);
    	fileMaster = fileSystem.root.fullPath.substring(7, fileSystem.root.fullPath.length);
	    fileMaster = fileMaster + "/Masters-Pesticides.html";
	}
}
function gotFS(fileSystem) {
    fileSystem.root.getFile("Masters-Pesticides.html", {create: true}, gotFileEntry, fail);
}
function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}
 function gotFileWriter(writer) { 	
    writer.write(htmlEmail);
    writer.abort();
    // contents of file now 'Suppliers'
}
function checkInformationArea(Model){
	var self = this;
	var bodyEmail;
	self.informationArea = ko.observableArray(Model);
	bodyEmail = '<h2>1 Información del área.</h2>';
	bodyEmail += '<table width="100%">';
	bodyEmail += '<thead><tr><td><b>Datos</b></td></tr></thead>';
	bodyEmail += '<tbody>';
	for (var a = 0; a < self.informationArea().length; a++){
		bodyEmail += '<tr><td>';
		bodyEmail += '<label>1.1 Cultivo</label>';
		bodyEmail += '<p><b>' + self.informationArea()[a].crop + '</b></p>';
		bodyEmail += '<label>1.2 Fecha de aplicación</label>';
		bodyEmail += '<p><b>' + self.informationArea()[a].dateApplication + '</b></p>';
		bodyEmail += '<label>1.3 Superficie</label>';
		bodyEmail += '<p><b>' + self.informationArea()[a].surface + '</b></p>';
		bodyEmail += '<label>1.4 Localización</label>';
		bodyEmail += '<p><b>' + self.informationArea()[a].location + '</b></p>';
		bodyEmail += '<label>1.5 Productor</label>';
		bodyEmail += '<p><b>' + self.informationArea()[a].producer + '</b></p>';
		bodyEmail += '<label>1.6 Unidad de producción/Zona de aplicación</label>';
		bodyEmail += '<p><b>' + self.informationArea()[a].productoUnit + '</b></p>';
		bodyEmail += '</td></tr>';
	}
	bodyEmail += '</tbody></table>';
	return bodyEmail;
}

function checkProductRegistration(Model){
	var self = this;
	var bodyEmail;
	self.productRegistration = ko.observableArray(Model);
	bodyEmail = '<h2>2 Registro del producto.</h2>';
	bodyEmail += '<table width="100%">';
	bodyEmail += '<tbody>';
	bodyEmail += '<tr>';
	bodyEmail += '<td><b>2.1 Producto</b></td><td>';
	for (var a = 0; a < self.productRegistration().length; a++){
		bodyEmail += '<label>Registro #<b>' + self.productRegistration()[a].idProductRegistration + '</b>: ';
		bodyEmail += '<b>' + self.productRegistration()[a].product + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>2.2 Ingrediente activo</b></td><td>';
	for (var a = 0; a < self.productRegistration().length; a++){
		bodyEmail += '<label>Registro #<b>' + self.productRegistration()[a].idProductRegistration + '</b>: ';
		bodyEmail += '<b>' + self.productRegistration()[a].activeIngredient + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>2.3 Dósis en 2000 lt de agua</b></td><td>';
	for (var a = 0; a < self.productRegistration().length; a++){
		bodyEmail += '<label>Registro #<b>' + self.productRegistration()[a].idProductRegistration + '</b>: ';
		bodyEmail += '<b>' + self.productRegistration()[a].doseWater + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>2.4 Días de cosecha</b></td><td>';
	for (var a = 0; a < self.productRegistration().length; a++){
		bodyEmail += '<label>Registro #<b>' + self.productRegistration()[a].idProductRegistration + '</b>: ';
		bodyEmail += '<b>' + self.productRegistration()[a].cropDay + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>2.5 Periodo de re-entrada</b></td><td>';
	for (var a = 0; a < self.productRegistration().length; a++){
		bodyEmail += '<label>Registro #<b>' + self.productRegistration()[a].idProductRegistration + '</b>: ';
		bodyEmail += '<b>' + self.productRegistration()[a].periodReEntry + '</b></label>';
	}
	bodyEmail += '</tr><tr>';
	bodyEmail += '</td><td><b>2.6 Comentarios</b></td><td>';
	for (var a = 0; a < self.productRegistration().length; a++){
		bodyEmail += '<label>Registro #<b>' + self.productRegistration()[a].idProductRegistration + '</b>: ';
		bodyEmail += '<b>' + self.productRegistration()[a].comment5 + '</b></label>';
	}
	bodyEmail += '</td></tr>';
	bodyEmail += '</tbody></table>';
	return bodyEmail;
}

function checkProductQuality(Model){
	var self = this;
	var bodyEmail;
	var boolText = "";
	self.productQuality = ko.observableArray(Model);
	bodyEmail = '<h2>3 Evaluación de calidad del producto.</h2>';
	bodyEmail += '<table width="100%">';
	bodyEmail += '<tbody>';
	bodyEmail += '<tr>';
	bodyEmail += '<td><b>3.1 ¿Cuenta con el análisis LMR?</b></td><td>';
	for (var a = 0; a < self.productQuality().length; a++){
		bodyEmail += '<label>Calidad #<b>' + self.productQuality()[a].idQualityProduct + '</b>: ';
		if(self.productQuality()[a].lmr)
			boolText = "Si";
		else
			boolText = "No";
		bodyEmail += '<b>' + boolText + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>3.2 ¿Cumple con ISD?</b></td><td>';
	for (var a = 0; a < self.productQuality().length; a++){
		bodyEmail += '<label>Calidad #<b>' + self.productQuality()[a].idQualityProduct + '</b>: ';
		if(self.productQuality()[a].isd)
			boolText = "Si";
		else
			boolText = "No";
		bodyEmail += '<b>' + boolText + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>3.3 ¿Realiza el triple lavado de envases?</b></td><td>';
	for (var a = 0; a < self.productQuality().length; a++){
		bodyEmail += '<label>Calidad #<b>' + self.productQuality()[a].idQualityProduct + '</b>: ';
		if(self.productQuality()[a].bottleWashing)
			boolText = "Si";
		else
			boolText = "No";
		bodyEmail += '<b>' + boolText + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>3.4 ¿Entrega envases al centro de acopio?</b></td><td>';
	for (var a = 0; a < self.productQuality().length; a++){
		bodyEmail += '<label>Calidad #<b>' + self.productQuality()[a].idQualityProduct + '</b>: ';
		if(self.productQuality()[a].collectionCenter)
			boolText = "Si";
		else
			boolText = "No";
		bodyEmail += '<b>' + boolText + '</b></label>';
	}			
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>3.5 ¿Usan equipo de protección?</b></td><td>';
	for (var a = 0; a < self.productQuality().length; a++){
		bodyEmail += '<label>Calidad #<b>' + self.productQuality()[a].idQualityProduct + '</b>: ';
		if(self.productQuality()[a].protectionEquipment)
			boolText = "Si";
		else
			boolText = "No";
		bodyEmail += '<b>' + boolText + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>3.6 ¿Calibra el equipo de aspersión?</b></td><td>';
	for (var a = 0; a < self.productQuality().length; a++){
		bodyEmail += '<label>Calidad #<b>' + self.productQuality()[a].idQualityProduct + '</b>: ';
		if(self.productQuality()[a].sprayEquipment)
			boolText = "Si";
		else
			boolText = "No";
		bodyEmail += '<b>' + boolText + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>3.7 ¿Acondicionan el agua?</b></td><td>';
	for (var a = 0; a < self.productQuality().length; a++){
		bodyEmail += '<label>Calidad #<b>' + self.productQuality()[a].idQualityProduct + '</b>: ';
		if(self.productQuality()[a].conditioningWater)
			boolText = "Si";
		else
			boolText = "No";
		bodyEmail += '<b>' + boolText + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>3.8 Comentarios</b></td><td>';
	for (var a = 0; a < self.productQuality().length; a++){
		bodyEmail += '<label>Calidad #<b>' + self.productQuality()[a].idQualityProduct + '</b>: ';
		bodyEmail += '<b>' + self.productQuality()[a].comment12 + '</b></label>';
	}	
	bodyEmail += '</td></tr>';
	bodyEmail += '</tbody></table>';
	return bodyEmail;
}

function checkConcetrationProduct(Model){
	var self = this;
	var bodyEmail;
	var boolText = "";
	self.concetrationProduct = ko.observableArray(Model);
	bodyEmail = '<h2>4 Concentración del producto.</h2>';
	bodyEmail += '<table width="100%">';
	bodyEmail += '<tbody>';
	bodyEmail += '<tr>';
	bodyEmail += '<td><b>4.1 Producto</b></td><td>';
	for (var a = 0; a < self.concetrationProduct().length; a++){
		bodyEmail += '<label>Concentrado #<b>' + self.concetrationProduct()[a].idConcentratedProduct + '</b>: ';
		bodyEmail += '<b>' + self.concetrationProduct()[a].product + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>4.2 Concentración</b></td><td>';
	for (var a = 0; a < self.concetrationProduct().length; a++){
		bodyEmail += '<label>Concentrado #<b>' + self.concetrationProduct()[a].idConcentratedProduct + '</b>: ';
		bodyEmail += '<b>' + self.concetrationProduct()[a].concentration + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>4.3 Fecha de llenado</b></td><td>';
	for (var a = 0; a < self.concetrationProduct().length; a++){
		bodyEmail += '<label>Concentrado #<b>' + self.concetrationProduct()[a].idConcentratedProduct + '</b>: ';
		bodyEmail += '<b>' + self.concetrationProduct()[a].fillingDate + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>4.4 Comentarios</b></td><td>';
	for (var a = 0; a < self.concetrationProduct().length; a++){
		bodyEmail += '<label>Concentrado #<b>' + self.concetrationProduct()[a].idConcentratedProduct + '</b>: ';
		bodyEmail += '<b>' + self.concetrationProduct()[a].comment15 + '</b></label>';
	}	
	bodyEmail += '</td></tr>';
	bodyEmail += '</tbody></table>';
	return bodyEmail;
}

function checkResponsibleApplication(Model){
	var self = this;
	var bodyEmail;
	var boolText = "";
	self.responsibleApplication = ko.observableArray(Model);
	bodyEmail = '<h2>5 Responsabilidad de aplicación.</h2>';
	bodyEmail += '<table width="100%">';
	bodyEmail += '<thead><tr><td><b>Datos</b></td></tr></thead>';
	bodyEmail += '<tbody>';
	for (var a = 0; a < self.responsibleApplication().length; a++){
		bodyEmail += '<tr><td>';
		bodyEmail += '<label>5.1 Aprobada por</label>';
		bodyEmail += '<p><b>' + self.responsibleApplication()[a].approved + '</b></p>';
		bodyEmail += '<label>5.2 Responsable de aplicación</label>';
		bodyEmail += '<p><b>' + self.responsibleApplication()[a].responsible + '</b></p>';
		bodyEmail += '</td></tr>';
	}
	bodyEmail += '</tbody></table>';
	return bodyEmail;
}


function getPhotos(modelProductRegistration, modelProductQuality, modelConcetrationProduct){
	var self = this;
	var productRegistrationPhotos = [];
	var productQualityPhotos = [];	
	var concetrationProductPhotos = [];	
	self.productRegistration = ko.observableArray(modelProductRegistration);		
	for (var x = 0; x < self.productRegistration().length; x++){		
		productRegistrationPhotos[x]  = [self.productRegistration()[x].photoProductRegistration];
	}	
	self.productQuality = ko.observableArray(modelProductQuality);			
	for (var x = 0; x < self.productQuality().length; x++){
		productQualityPhotos[x] = [self.productQuality()[x].photoQualityProduct];
	}
	self.concetrationProduct = ko.observableArray(modelConcetrationProduct);			
	for (var x = 0; x < self.concetrationProduct().length; x++){
		concetrationProductPhotos[x] = [self.concetrationProduct()[x].photoConcentratedProduct];
	}
	var allPhotos = productRegistrationPhotos + "," + productQualityPhotos + "," + concetrationProductPhotos + ",";
	return [allPhotos];
}