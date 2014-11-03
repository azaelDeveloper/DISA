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
		var title = '<br /><h3>Registro de identificación y evaluación de proveedores de insumos y/o servicios #<b>' + self.emailMaster()[i].id + '</b></h3>';
		var table1 = "", table2 = "", table3 = "";
		title += '<h3>' + self.emailMaster()[i].timestamp + '</h3>';
		table1 = checkSuppliersInformation(eval(self.emailMaster()[i].suppliersInformation));
		table2 = checkRating(eval(self.emailMaster()[i].rating));
		table3 = checkFeatureProduct(eval(self.emailMaster()[i].featureProduct));
		bodyEmail += title + table1 + table2 + table3;
		arrayPhotos += [getPhotos(eval(self.emailMaster()[i].rating), eval(self.emailMaster()[i].featureProduct))];
	}
	headEmail = "<head><title>Registro de identificación y evaluación de proveedores de insumos y/o servicios</title><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'></head>";
	bodyEmail = "<body>" + bodyEmail + "</body>";
	htmlEmail = "<html>" + headEmail + bodyEmail + "</html>";
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	var photoAttachment = cleanPhotos(arrayPhotos + fileMaster);
	window.plugins.emailComposer.showEmailComposer("Bitácora #21 de Proveedores", "Los documentos están adjuntos.",[],[],[], true, photoAttachment);
	function gotFS(fileSystem) {
    	fileSystem.root.getFile("Masters-Suppliers.html", {create: true}, gotFileEntry, fail);
    	fileMaster = fileSystem.root.fullPath.substring(7, fileSystem.root.fullPath.length);
	    fileMaster = fileMaster + "/Masters-Suppliers.html";
	}
}
function gotFS(fileSystem) {
    fileSystem.root.getFile("Masters-Suppliers.html", {create: true}, gotFileEntry, fail);
}
function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}
 function gotFileWriter(writer) { 	
    writer.write(htmlEmail);
    writer.abort();
    // contents of file now 'Suppliers'
}
function checkSuppliersInformation(Model){
	var self = this;
	var bodyEmail;
	self.suppliersInformation = ko.observableArray(Model);
	bodyEmail = '<h2>1 Información de proveedores.</h2>';
	bodyEmail += '<table width="100%">';
	bodyEmail += '<thead><tr><td><b>Datos</b></td></tr></thead>';
	bodyEmail += '<tbody>';
	for (var a = 0; a < self.suppliersInformation().length; a++){
		bodyEmail += '<tr><td>';
		bodyEmail += '<label>1.1 Empresa</label>';
		bodyEmail += '<p><b>' + self.suppliersInformation()[a].company + '</b></p>';
		bodyEmail += '<label>1.2 Representante legal</label>';
		bodyEmail += '<p><b>' + self.suppliersInformation()[a].representative + '</b></p>';
		bodyEmail += '<label>1.3 Cultivo y variedad</label>';
		bodyEmail += '<p><b>' + self.suppliersInformation()[a].crop + '</b></p>';
		bodyEmail += '<label>1.4 Unidad de producción</label>';
		bodyEmail += '<p><b>' + self.suppliersInformation()[a].production + '</b></p>';
		bodyEmail += '<label>1.5 Superficie</label>';
		bodyEmail += '<p><b>' + self.suppliersInformation()[a].surface + '</b></p>';
		bodyEmail += '<label>1.6 Localización</label>';
		bodyEmail += '<p><b>' + self.suppliersInformation()[a].location + '</b></p>';
		bodyEmail += '<label>1.7 Periodo de vigencia</label>';
		bodyEmail += '<p><b>' + self.suppliersInformation()[a].validity + '</b></p>';
		bodyEmail += '<label>1.8 Responsable de la evaluación</label>';
		bodyEmail += '<p><b>' + self.suppliersInformation()[a].responsible + '</b></p>';
		bodyEmail += '</td></tr>';
	}
	bodyEmail += '</tbody></table>';
	return bodyEmail;
}

function checkRating(Model){
	var self = this;
	var bodyEmail;
	var boolText = "";
	self.rating = ko.observableArray(Model);
	bodyEmail = '<h2>2 Evaluación.</h2>';
	bodyEmail += '<table width="100%">';
	bodyEmail += '<tbody>';
	bodyEmail += '<tr>';
	bodyEmail += '<td><b>2.1 Frecuencia de evaluación</b></td><td>';
	for (var a = 0; a < self.rating().length; a++){
		bodyEmail += '<label>Evaluación #<b>' + self.rating()[a].idRating + '</b>: ';
		bodyEmail += '<b>' + self.rating()[a].frequency + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>2.2 Inspección visual de material y/o servicio</b></td><td>';
	for (var a = 0; a < self.rating().length; a++){
		bodyEmail += '<label>Evaluación #<b>' + self.rating()[a].idRating + '</b>: ';
		bodyEmail += '<b>' + self.rating()[a].inspection.answerText + '</b></label>';
		bodyEmail += 'Comentario: <b>' + self.rating()[a].comment2 + '</b></td>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>2.3 Etiqueta e información de seguridad</b></td><td>';
	for (var a = 0; a < self.rating().length; a++){
		bodyEmail += '<label>Evaluación #<b>' + self.rating()[a].idRating + '</b>: ';
		if(self.rating()[a].security)
			boolText = "Si";
		else
			boolText = "No";
		bodyEmail += '<b>' + boolText + '</b><br />';
		bodyEmail += 'Comentario: <b>' + self.rating()[a].comment3 + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>2.4 Análisis de laboratorio acreditado</b></td><td>';
	for (var a = 0; a < self.rating().length; a++){
		bodyEmail += '<label>Evaluación #<b>' + self.rating()[a].idRating + '</b>: ';
		if(self.rating()[a].analysis)
			boolText = "Si";
		else
			boolText = "No";
		bodyEmail += '<b>' + boolText + '</b><br />';
		bodyEmail += 'Comentario: <b>' + self.rating()[a].comment4 + '</b></label>';
	}			
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>2.5 Registro o autorización SENASICA, SSA, otro</b></td><td>';
	for (var a = 0; a < self.rating().length; a++){
		bodyEmail += '<label>Evaluación #<b>' + self.rating()[a].idRating + '</b>: ';
		if(self.rating()[a].register)
			boolText = "Si";
		else
			boolText = "No";
		bodyEmail += '<b>' + boolText + '</b><br />';
		bodyEmail += 'Comentario: <b>' + self.rating()[a].comment5 + '</b></label>';
	}
	bodyEmail += '</td></tr>';
	bodyEmail += '</tbody></table>';
	return bodyEmail;
}

function checkFeatureProduct(Model){
	var self = this;
	var bodyEmail;
	var boolText = "";
	self.featureProduct = ko.observableArray(Model);
	bodyEmail = '<h2>3 Características del producto y/o servicio evaluado.</h2>';
	bodyEmail += '<table width="100%">';
	bodyEmail += '<tbody>';
	bodyEmail += '<tr>';
	bodyEmail += '<td><b>3.1 Tiempos de entrega y especificaciones de compra</b></td><td>';
	for (var a = 0; a < self.featureProduct().length; a++){
		bodyEmail += '<label>Característica #<b>' + self.featureProduct()[a].idFeatureProduct + '</b>: ';
		bodyEmail += '<b>' + self.featureProduct()[a].purchase.answerText + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>3.2 Atención a recomendaciones de mejora</b></td><td>';
	for (var a = 0; a < self.featureProduct().length; a++){
		bodyEmail += '<label>Característica #<b>' + self.featureProduct()[a].idFeatureProduct + '</b>: ';
		bodyEmail += '<b>' + self.featureProduct()[a].recommendations.answerText + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>3.3 Sumatoria total</b></td><td>';
	for (var a = 0; a < self.featureProduct().length; a++){
		bodyEmail += '<label>Característica #<b>' + self.featureProduct()[a].idFeatureProduct + '</b>: ';
		bodyEmail += '<b>' + self.featureProduct()[a].result + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>3.4 Aprobado</b></td><td>';
	for (var a = 0; a < self.featureProduct().length; a++){
		bodyEmail += '<label>Característica #<b>' + self.featureProduct()[a].idFeatureProduct + '</b>: ';
		bodyEmail += '<b>' + self.featureProduct()[a].approved + '</b></label>';
	}			
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>3.5 ¿Se mantiene en lista de proveedores?</b></td><td>';
	for (var a = 0; a < self.featureProduct().length; a++){
		bodyEmail += '<label>Característica #<b>' + self.featureProduct()[a].idFeatureProduct + '</b>: ';
		if(self.featureProduct()[a].list)
			boolText = "Si";
		else
			boolText = "No";
		bodyEmail += '<b>' + boolText + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>3.6 Fecha de la próxima evaluación</b></td><td>';
	for (var a = 0; a < self.featureProduct().length; a++){
		bodyEmail += '<label>Característica #<b>' + self.featureProduct()[a].idFeatureProduct + '</b>: ';
		bodyEmail += '<b>' + self.featureProduct()[a].nextDate + '</b></label>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><b>3.7 Comentarios</b></td><td>';
	for (var a = 0; a < self.featureProduct().length; a++){
		bodyEmail += '<label>Característica #<b>' + self.featureProduct()[a].idFeatureProduct + '</b>: ';
		bodyEmail += '<b>' + self.featureProduct()[a].comment11 + '</b></label>';
	}	
	bodyEmail += '</td></tr>';
	bodyEmail += '</tbody></table>';
	return bodyEmail;
}


function getPhotos(modelRating, modelFeatureProduct){
	var self = this;
	var ratingPhotos = [];
	var featureProductPhotos = [];	
	self.ratings = ko.observableArray(modelRating);		
	for (var x = 0; x < self.ratings().length; x++){		
		ratingPhotos[x]  = [self.ratings()[x].photoRating];
	}	
	self.featureProduct = ko.observableArray(modelFeatureProduct);			
	for (var x = 0; x < self.featureProduct().length; x++){
		featureProductPhotos[x] = [self.featureProduct()[x].photoFeatureProduct];
	}
	var allPhotos = ratingPhotos + "," + featureProductPhotos + ",";
	return [allPhotos];
}