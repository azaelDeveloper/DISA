function emailAll (completeModel) {
	var self = this;
	var bodyEmail = "";
	var fileMaster = "";
	var arrayPhotos = [];
	self.emailMaster = ko.observableArray(completeModel);
	var headEmail = '<head><meta charset="utf-8" /><title>Bitácora de Primeros Auxilios</title></head>';
	for (var i = 0; i < self.emailMaster().length; i++) {
		var title = '<br /><h3>Registro del Botiquín #<b>' + self.emailMaster()[i].id + '</b></h3>';
		var table1, table2;
		table1 = checkFirstAidInformation(eval(self.emailMaster()[i].firstAidInformation), self.emailMaster()[i].timestamp);
		table2 = checkFirstAidKits(eval(self.emailMaster()[i].checkList));
		bodyEmail += title + table1 + table2;
		arrayPhotos += [getPhotos(eval(self.emailMaster()[i].checkList))];
	};
	htmlEmail = '<html>' + headEmail + '<body>' + bodyEmail + '</body></html>';
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	var photoAttachment = cleanPhotos(arrayPhotos + fileMaster);
	window.plugins.emailComposer.showEmailComposer("Bitácora de Primeros Auxilios", "Los documentos están adjuntos.",[],[],[], true, photoAttachment);
	function gotFS(fileSystem) {
	    fileSystem.root.getFile("Masters-FirstAids.html", {create: true}, gotFileEntry, fail);
	    fileMaster = fileSystem.root.fullPath.substring(7, fileSystem.root.fullPath.length);
	    fileMaster = fileMaster + "/Masters-FirstAids.html";
	}
}

function gotFS(fileSystem) {
    fileSystem.root.getFile("Masters-Pests.html", {create: true}, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {	
    fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) { 	
    writer.write(htmlEmail);
    writer.abort();
    // contents of file now 'Survey Daily'
}

function checkFirstAidInformation(Model, kitMasterDate){
	var self = this;
	var bodyEmail;
	self.firstAidInformation = ko.observableArray(Model);
	bodyEmail = '<h3>' + kitMasterDate + '</h3><br /><br />';
	bodyEmail = '<h3>1.1 Informacion del Monitoreo</h3>';
	bodyEmail += '<table width="100%">';
	bodyEmail += '<thead><tr>';
	bodyEmail += '<th>Datos</th>';
	bodyEmail += '</thead><tbody>';
	for (var i = 0; i < self.firstAidInformation().length; i++){
		bodyEmail += '<tr>';
		bodyEmail += '<td width="100%">';
		bodyEmail += '<label>1.1 Empresa: </label></br>';
		bodyEmail += '<b>' + self.firstAidInformation()[i].company + '</b><br />';
		bodyEmail += '<br /><label>1.2 Representante Legal: </label></br>';
		bodyEmail += '<b>' + self.firstAidInformation()[i].representatitve + '</b><br />';
		bodyEmail += '<br /><label>1.3 Culvitvo y Variedad: </label></br>';
		bodyEmail += '<b>' + self.firstAidInformation()[i].crop + '</b><br />';
		bodyEmail += '<br /><label>1.4 Unidad de Producción: </label></br>';
		bodyEmail += '<b>' + self.firstAidInformation()[i].production + '</b><br />';
		bodyEmail += '<br /><label>1.5 Superficie: </label></br>';
		bodyEmail += '<b>' + self.firstAidInformation()[i].surface + '</b><br />';
		bodyEmail += '<br /><label>1.6 Localización: </label></br>';
		bodyEmail += '<b>' + self.firstAidInformation()[i].location + '</b><br />';
		bodyEmail += '<br /><label>1.7 Vigencia: </label></br>';
		bodyEmail += '<b>' + self.firstAidInformation()[i].validity + '</b><br />';
		bodyEmail += '</td></tr>';
	}
	bodyEmail += '</tbody></table>';
	return bodyEmail;
}

function checkFirstAidKits(Model){
	var self = this;
	var bodyEmail;
	self.firstAidKits = ko.observableArray(Model);
	bodyEmail = '<h3>2. Materiales de Primeros Auxilios</h3>';	
	bodyEmail += '<table width="100%">';		
	bodyEmail += '<tbody>';
	bodyEmail += '<tr>';	
	bodyEmail += '<td>Fecha de revisión</td><td>';
	for (var i = 0; i < self.firstAidKits().length; i++) {
		bodyEmail += '<br /> Resgistro #<b>' + self.firstAidKits()[i].idKit + ': </br>';
		bodyEmail += self.firstAidKits()[i].checkDate + '</b>';
	};
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />Desinfectante</td><td>';
	for (var i = 0; i < self.firstAidKits().length; i++) {
		bodyEmail += '<br /> Resgistro #<b>' + self.firstAidKits()[i].idKit + ': </br>';
		if(self.firstAidKits()[i].desinfectant)
			bodyEmail += 'Sí';
		else
			bodyEmail += 'No';
		bodyEmail += '</b>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />Alcohol</td><td>';
	for (var i = 0; i < self.firstAidKits().length; i++) {
		bodyEmail += '<br /> Resgistro #<b>' + self.firstAidKits()[i].idKit + ': </br>';
		if(self.firstAidKits()[i].cotton)
			bodyEmail += 'Sí';
		else
			bodyEmail += 'No';
		bodyEmail += '</b>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />Algodón</td><td>';
	for (var i = 0; i < self.firstAidKits().length; i++) {
		bodyEmail += '<br /> Resgistro #<b>' + self.firstAidKits()[i].idKit + ': </br>';
		if(self.firstAidKits()[i].cotton)
			bodyEmail += 'Sí';
		else
			bodyEmail += 'No';
		bodyEmail += '</b>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />Gasas</td><td>';
	for (var i = 0; i < self.firstAidKits().length; i++) {
		bodyEmail += '<br /> Resgistro #<b>' + self.firstAidKits()[i].idKit + ': </br>';
		if(self.firstAidKits()[i].gauze)
			bodyEmail += 'Sí';
		else
			bodyEmail += 'No';
		bodyEmail += '</b>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />Curitas</td><td>';
	for (var i = 0; i < self.firstAidKits().length; i++) {
		bodyEmail += '<br /> Resgistro #<b>' + self.firstAidKits()[i].idKit + ': </br>';
		if(self.firstAidKits()[i].bandaid)
			bodyEmail += 'Sí';
		else
			bodyEmail += 'No';
		bodyEmail += '</b>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />Cinta Micropor</td><td>';
	for (var i = 0; i < self.firstAidKits().length; i++) {
		bodyEmail += '<br /> Resgistro #<b>' + self.firstAidKits()[i].idKit + ': </br>';
		if(self.firstAidKits()[i].tape)
			bodyEmail += 'Sí';
		else
			bodyEmail += 'No';
		bodyEmail += '</b>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />Tabletas Paracetamol</td><td>';
	for (var i = 0; i < self.firstAidKits().length; i++) {
		bodyEmail += '<br /> Resgistro #<b>' + self.firstAidKits()[i].idKit + ': </br>';
		if(self.firstAidKits()[i].tablets)
			bodyEmail += 'Sí';
		else
			bodyEmail += 'No';
		bodyEmail += '</b>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />Depto Bismol</td><td>';
	for (var i = 0; i < self.firstAidKits().length; i++) {
		bodyEmail += '<br /> Resgistro #<b>' + self.firstAidKits()[i].idKit + ': </br>';
		if(self.firstAidKits()[i].bismuth)
			bodyEmail += 'Sí';
		else
			bodyEmail += 'No';
		bodyEmail += '</b>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />Otros</td><td>';
	for (var i = 0; i < self.firstAidKits().length; i++) {
		bodyEmail += '<br /> Resgistro #<b>' + self.firstAidKits()[i].idKit + ': </br>';
		bodyEmail += self.firstAidKits()[i].others + '</b>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />Verificó</td><td>';
	for (var i = 0; i < self.firstAidKits().length; i++) {
		bodyEmail += '<br /> Resgistro #<b>' + self.firstAidKits()[i].idKit + ': </br>';
		bodyEmail += self.firstAidKits()[i].checker + '</b>';
	}
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />Responsable</td><td>';
	for (var i = 0; i < self.firstAidKits().length; i++) {
		bodyEmail += '<br /> Resgistro #<b>' + self.firstAidKits()[i].idKit + ': </br>';
		bodyEmail += self.firstAidKits()[i].responsible + '</b>';
	}
	bodyEmail += '</td></tr>';
	bodyEmail += '</tbody></table>';
	return bodyEmail;
}

function getPhotos(modelKit){
	var self = this;
	var photoKit = [];
	self.kitsArray = ko.observableArray(modelKit);
	for (var i = 0; i < self.kitsArray().length; i++) {
		photoKit[i] = [self.kitsArray()[i].photoFirstAid];
	}
	var allPhotos = photoKit + ',';
	return [allPhotos];
}