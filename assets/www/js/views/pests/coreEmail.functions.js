function emailAll (completeModel) {	
	var self = this;	
	bodyEmail = "";
	var fileMaster = "";
	var arrayPhotos = [];
	self.emailMaster = ko.observableArray(eval(completeModel));			
	for (var i = 0; i < self.emailMaster().length; i++)
	{		
		var title = '<br /><h3>Registro de la bitácora 22 #<b>' + self.emailMaster()[i].id + '</b></h3>';				
		var table1, table2, tableP, table3, table4, table5, table6, table7;						
		table1 = checkInformation(eval(self.emailMaster()[i].informationPests), self.emailMaster()[i].timestamp);							
		table2 = checkRecordPests(eval(self.emailMaster()[i].pestRecord));						
		table3 = checkPests(eval(self.emailMaster()[i].pestTable));
		table4 = checkDiseases(eval(self.emailMaster()[i].diseases));
		table5 = checkBushes(eval(self.emailMaster()[i].bushesTable));		
		bodyEmail += title + table1 + table2 + tableP + table3 + table4 + table5;	
		arrayPhotos += [getPhotos(eval(self.emailMaster()[i].pestRecord), eval(self.emailMaster()[i].pestTable), eval(self.emailMaster()[i].diseases), eval(self.emailMaster()[i].bushesTable))];
	}
	var photoAttachment = cleanPhotos(arrayPhotos);	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
	var photoAttachment = cleanPhotos(arrayPhotos + fileMaster);			
	window.plugins.emailComposer.showEmailComposer("Bitácora #22 de Plagas", "Los documentos están adjuntos.",[],[],[], true, photoAttachment);			
	function gotFS(fileSystem) {
	    fileSystem.root.getFile("Masters-Pests.html", {create: true}, gotFileEntry, fail);
	    fileMaster = fileSystem.root.fullPath.substring(7, fileSystem.root.fullPath.length);
	    fileMaster = fileMaster + "/Masters-Pests.html";       
	}
}
function gotFS(fileSystem) {
    fileSystem.root.getFile("Masters-Pests.html", {create: true}, gotFileEntry, fail);
}
function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}
 function gotFileWriter(writer) { 	
    writer.write(bodyEmail);
    writer.abort();
    // contents of file now 'some different text'
}
function checkInformation(Model, pestsMasterDate){
	var self = this;
	var bodyEmail;
	self.informationPests = ko.observableArray(Model);	
	bodyEmail = '<h3>' + pestsMasterDate + '</h3><br /><br />';	
	bodyEmail = '<h3>1.1 Informacion de Revisión de Plagas</h3>';	
	bodyEmail += '<table width="100%">';
	bodyEmail += '<thead><tr>';	
	bodyEmail += '<th>Datos</th></tr>';
	bodyEmail += '</thead><tbody>';		
	for (var i = 0; i < self.informationPests().length; i++){
		bodyEmail += '<tr>';			
		bodyEmail += '<td width="100%">';
		bodyEmail += '<label>1.1 Empresa: </label></br>';
		bodyEmail += '<b>' + self.informationPests()[i].company + '</b><br />';		
		bodyEmail += '<label>1.2 Representante Legal: </label></br>';
		bodyEmail += '<b>' + self.informationPests()[i].representatitve + '</b><br />';						
		bodyEmail += '<br /><label>1.3 Culvitvo y Variedad: </label></br>';
		bodyEmail += '<b>' + self.informationPests()[i].crop + '</b><br />';		
		bodyEmail += '<br /><label>1.4 Unidad de Producción: </label></br>';
		bodyEmail += '<b>' + self.informationPests()[i].production + '</b><br />';		
		bodyEmail += '<br /><label>1.5 Superficie: </label></br>';
		bodyEmail += '<b>' + self.informationPests()[i].surface + '</b><br />';		
		bodyEmail += '<br /><label>1.6 Localización: </label></br>';
		bodyEmail += '<b>' + self.informationPests()[i].location + '</b><br />';		
		bodyEmail += '<br /><label>1.7 Vigencia: </label></br>';
		bodyEmail += '<b>' + self.informationPests()[i].validity + '</b><br />';		
		bodyEmail += '</td></tr>';
	}
	bodyEmail += '</tbody></table>';		
	return bodyEmail;

}
function checkRecordPests(Model){
	var self = this;
	var bodyEmail;
	self.records = ko.observableArray(Model);	
	bodyEmail = '<h2>2 Registro de Plagas</h2>';	
	bodyEmail += '<table width="100%">';		
	bodyEmail += '<tbody>';
	bodyEmail += '<tr>';	
	bodyEmail += '<td>2.1 Fecha de monitoreo</td><td>';
	for (var a = 0; a < self.records().length; a++){
		bodyEmail += '<br /> Resgistro de Plaga # <b>' + self.records()[a].idRecord + ': </br>';				
		bodyEmail += self.records()[a].recordDate + '</b>';		
	}		
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />2.2 Sector</td><td>';
	for (var a = 0; a < self.records().length; a++){
		bodyEmail += '<br /> Resgistro de Plaga # <b>' + self.records()[a].idRecord + ': </br>';				
		bodyEmail += self.records()[a].sector;
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />2.3 ¿Edad del cultivo?</td><td>';
	for (var a = 0; a < self.records().length; a++){
		bodyEmail += '<br /> Resgistro de Plaga # <b>' + self.records()[a].idRecord + ': </br>';		
		bodyEmail += self.records()[a].age;	
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />2.4 Etapa fenológica del cultivo</td><td>';
	for (var a = 0; a < self.records().length; a++){
		bodyEmail += '<br /> Resgistro de Plaga # <b>' + self.records()[a].idRecord + ': </br>';				
		switch(self.records()[a].stage.posibleAnswerID){
			case 1:
				bodyEmail += "Floración";				
			break;
			case 2:
				bodyEmail += "Fructificación";				
			break;
			case 3:
				bodyEmail += "Flujo Vegetativo";				
			break;
			case 4:
				bodyEmail += "Cosecha";				
			break;
			case 5:
				bodyEmail += "Desarrollo Vegetativo";				
			break;
		}
		
		bodyEmail += '</b>';
	}					
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />2.5 Responsable del registro</td><td>';
	for (var a = 0; a < self.records().length; a++){
		bodyEmail += '<br /> Resgistro de Plaga # <b>' + self.records()[a].idRecord + ': </br>';		
		bodyEmail += self.records()[a].responsible;	
		bodyEmail += '</b>';
	}				
	bodyEmail += '</td></tr>';
	bodyEmail += '</tbody></table>';
	return bodyEmail;
}
function checkPests(Model){
	var self = this;
	var bodyEmail;
	self.pests = ko.observableArray(Model);	
	bodyEmail = '<h2>3 Tabla de Pestes</h2>';	
	bodyEmail += '<table width="100%">';		
	bodyEmail += '<tbody>';
	bodyEmail += '<tr>';	
	bodyEmail += '<td>3.1 Sector</td><td>';	
	for (var a = 0; a < self.pests().length; a++){
		bodyEmail += '<br /> Plaga # <b>' + self.pests()[a].idPest + ': </br>';		
		bodyEmail += self.pests()[a].sector;
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />3.2 Plaga identificada</td>';
	for (var a = 0; a < self.pests().length; a++){
		bodyEmail += '<td><br /> Plaga # <b>' + self.pests()[a].idPest + ': </br>';		
		bodyEmail += self.pests()[a].pest;
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />3.3 Nivel de daño (Incidencias-Plagas)</td><td>';
	for (var a = 0; a < self.pests().length; a++){
		bodyEmail += '<br /> Plaga # <b>' + self.pests()[a].idPest + ': </br>';		
		switch(self.pests()[a].damage.posibleAnswerID){
			case 11:
			bodyEmail += "Bajo";
			break;
			case 22:
			bodyEmail += "Medio";
			break;
			case 33:
			bodyEmail += "Alto";
			break;
		}		
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr><tr>';	
	bodyEmail += '<td><br />3.4 ¿Presencia de enemigos naturales?(Plagas)</td><td>';
	for (var a = 0; a < self.pests().length; a++){
		bodyEmail += '<br /> Plaga # <b>' + self.pests()[a].idPest + ': </br>';		
		if(self.pests()[a].enemies == 0)
			bodyEmail += 'No';
		if(self.pests()[a].enemies == 1)
			bodyEmail += 'Sí';	
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />3.5 ¿Se justifica control?(Plagas)</td>';
	for (var a = 0; a < self.pests().length; a++){
		bodyEmail += '<td><br /> Plaga # <b>' + self.pests()[a].idPest + ': </br>';		
		if(self.pests()[a].justification == 0)
			bodyEmail += 'No';
		if(self.pests()[a].justification == 1)
			bodyEmail += 'Sí';	
		bodyEmail += '</b></td>';
	}		
	bodyEmail += '</tr><tr>';	
	bodyEmail += '<td><br />3.6 Comentarios</td><td>';
	for (var a = 0; a < self.pests().length; a++){
		bodyEmail += '<br /> Plaga # <b>' + self.pests()[a].idPest + ': </br>';		
		bodyEmail += self.pests()[a].comment;			
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr>';
	bodyEmail += '</tbody></table>';
	return bodyEmail;
}
function checkDiseases(Model){
	var self = this;
	var bodyEmail;
	self.diseases = ko.observableArray(Model);	
	bodyEmail = '<h2>4 Tabla de Enfermedades</h2>';	
	bodyEmail += '<table width="100%">';		
	bodyEmail += '<tbody>';
	bodyEmail += '<tr>';	
	bodyEmail += '<td>4.1 Sector</td><td>';	
	for (var a = 0; a < self.diseases().length; a++){
		bodyEmail += '<br /> Plaga # <b>' + self.diseases()[a].idDisease + ': </br>';		
		bodyEmail += self.diseases()[a].sector;
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />4.2 Enfermedad identificada</td><td>';
	for (var a = 0; a < self.diseases().length; a++){
		bodyEmail += '<br /> Plaga # <b>' + self.diseases()[a].idDisease + ': </br>';		
		bodyEmail += self.diseases()[a].name;
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />4.3 Nivel de daño (Severidad-Enfermedades)</td><td>';
	for (var a = 0; a < self.diseases().length; a++){
		bodyEmail += '<br /> Plaga # <b>' + self.diseases()[a].idDisease + ': </br>';		
		switch(self.diseases()[a].damage.posibleAnswerID){
			case 111:
			bodyEmail += "Bajo";
			break;
			case 222:
			bodyEmail += "Medio";
			break;
			case 333:
			bodyEmail += "Alto";
			break;
		}		
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr><tr>';	
	bodyEmail += '<td><br />3.4 ¿Presencia de enemigos naturales?(Plagas)</td><td>';
	for (var a = 0; a < self.diseases().length; a++){
		bodyEmail += '<br /> Plaga # <b>' + self.diseases()[a].idDisease + ': </br>';		
		if(self.diseases()[a].enemies == 0)
			bodyEmail += 'No';
		if(self.diseases()[a].enemies == 1)
			bodyEmail += 'Sí';	
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />4.5 ¿Se justifica control?(Enfermedades)</td><td>';
	for (var a = 0; a < self.diseases().length; a++){
		bodyEmail += '<br /> Plaga # <b>' + self.diseases()[a].idDisease + ': </br>';		
		if(self.diseases()[a].justification == 0)
			bodyEmail += 'No';
		if(self.diseases()[a].justification == 1)
			bodyEmail += 'Sí';	
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr><tr>';	
	bodyEmail += '<td><br />4.6 Comentarios</td><td>';
	for (var a = 0; a < self.diseases().length; a++){
		bodyEmail += '<br /> Plaga # <b>' + self.diseases()[a].idDisease + ': </br>';		
		bodyEmail += self.diseases()[a].comment;			
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr>';
	bodyEmail += '</tbody></table>';
	return bodyEmail;
}

function checkBushes(Model){
	var self = this;
	var bodyEmail;
	self.bushes = ko.observableArray(Model);	
	bodyEmail = '<h2>5 Tabla de Malezas</h2>';	
	bodyEmail += '<table width="100%">';		
	bodyEmail += '<tbody>';
	bodyEmail += '<tr>';	
	bodyEmail += '<td>5.1 Sector</td><td>';	
	for (var a = 0; a < self.bushes().length; a++){
		bodyEmail += '<br /> Plaga # <b>' + self.bushes()[a].idBush + ': </br>';		
		bodyEmail += self.bushes()[a].sector;
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />5.2 Maleza identificada</td><td>';
	for (var a = 0; a < self.bushes().length; a++){
		bodyEmail += '<br /> Plaga # <b>' + self.bushes()[a].idBush + ': </br>';		
		bodyEmail += self.bushes()[a].name;
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />5.3 Nivel de daño (Severidad-Maleza)</td><td>';
	for (var a = 0; a < self.bushes().length; a++){
		bodyEmail += '<br /> Plaga # <b>' + self.bushes()[a].idBush + ': </br>';		
		switch(self.bushes()[a].damage.posibleAnswerID){
			case 1111:
			bodyEmail += "Bajo";
			break;
			case 2222:
			bodyEmail += "Medio";
			break;
			case 3333:
			bodyEmail += "Alto";
			break;
		}		
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr><tr>';	
	bodyEmail += '<td><br />5.4 ¿Presencia de enemigos naturales?(Maleza)</td><td>';
	for (var a = 0; a < self.bushes().length; a++){
		bodyEmail += '<br /> Plaga # <b>' + self.bushes()[a].idBush + ': </br>';		
		if(self.bushes()[a].enemies == 0)
			bodyEmail += 'No';
		if(self.bushes()[a].enemies == 1)
			bodyEmail += 'Sí';	
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr><tr>';
	bodyEmail += '<td><br />5.5 ¿Se justifica control?(Maleza)</td><td>';
	for (var a = 0; a < self.bushes().length; a++){
		bodyEmail += '<br /> Plaga # <b>' + self.bushes()[a].idBush + ': </br>';		
		if(self.bushes()[a].justification == 0)
			bodyEmail += 'No';
		if(self.bushes()[a].justification == 1)
			bodyEmail += 'Sí';	
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr><tr>';	
	bodyEmail += '<td><br />5.6 Comentarios</td><td>';
	for (var a = 0; a < self.bushes().length; a++){
		bodyEmail += '<br /> Plaga # <b>' + self.bushes()[a].idBush + ': </br>';		
		bodyEmail += self.bushes()[a].comment;			
		bodyEmail += '</b>';
	}		
	bodyEmail += '</td></tr>';
	bodyEmail += '</tbody></table>';
	return bodyEmail;
}

function getPhotos(pestRecord, pestTable, diseases, bushesTable){
	var self = this;
	var recordPhoto = [];
	var pestsPhoto = [];
	var diseasesPhoto = [];
	var bushesPhoto = [];	
	self.fences = ko.observableArray(pestRecord);		
	for (var x = 0; x < self.fences().length; x++){		
		recordPhoto[x]  = [self.fences()[x].photoRecord];
	}	
	self.lamps = ko.observableArray(pestTable);	
	for (var x = 0; x < self.lamps().length; x++){		
		pestsPhoto[x]  = [self.lamps()[x].photoPests];
	}	
	self.weather = ko.observableArray(diseases);		
	for (var x = 0; x < self.weather().length; x++){
		diseasesPhoto[x] = [self.weather()[x].photoDisease];
	}
	self.pipes = ko.observableArray(bushesTable);
	for (var x = 0; x < self.pipes().length; x++){
		bushesPhoto[x] = [self.pipes()[x].photoBush];
	}	
	var allPhotos = recordPhoto + "," + pestsPhoto + "," + diseasesPhoto + "," + bushesPhoto + ",";
	return [allPhotos];
}