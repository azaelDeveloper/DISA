function pestsMasterViewModel() {
	self = this;
	informationViewModel(self);
	pestRecordViewModel(self);
	PestsViewModel(self);
	DiseaseViewModel(self);
	BushViewModel(self);
	/*	
	
	lampsViewModel(self);
	weatherViewModel(self);
	pipeViewModel(self);
	pumpViewModel(self);
	*/
}

/////////////////////INFORMATION////////////////////////////////////
function Information(Company, Representative, Crop, Production,  Surface, Location, Validity){
	var self1 = this;	
	self1.company = ko.observable(Company);
	self1.representatitve = ko.observable(Representative);
	self1.crop = ko.observable(Crop);
	self1.production = ko.observable(Production);
	self1.surface = ko.observable(Surface);
	self1.location = ko.observable(Location);
	self1.validity = ko.observable(Validity);
}

function informationViewModel(self){
	self.information = ko.observableArray([new Information("", "", "", "", "", "", "")]);		
}
function pestsRecord(row, dateRecord, Sector,  Age, Stage, Responsible, Comment, photo, idImg){
	var self3 = this;
	self3.idRecord = row;
	self3.recordDate = ko.observable(dateRecord);
	self3.sector = ko.observable(Sector);
	self3.age = ko.observable(Age);
	self3.stage = ko.observable(Stage);
	self3.responsible = ko.observable(Responsible);
	self3.comment = ko.observable(Comment);	
	self3.photoRecord = ko.observable(photo);
	self3.idImageRecord = ko.observable(idImg);

	self.takePhotoRecord = function() {
	var self = this;	
	var message;		
    var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    navigator.camera.getPicture(onSuccess, onFail, options);    	    
    	
  		function onSuccess(imageURI) {  				
      		self.photoRecord = getRootName(imageURI);
      		var img = document.getElementById(self.idImageRecord().toString());
      		img.src = getRootName(imageURI);
      		message = "Foto de registro de Plaga # "+ self.idRecord +" guardada con éxito...";
			getMessage(message, "#recordMessage");						
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto de registro de plaga #" + self.idRecord, alertMiss, "Foto cancelada", "Aceptar");
  		}
	}	
}
function pestRecordViewModel(self){
	self.available = [ {
		posibleAnswerID : 5929,
		answerText : "Floración"
	}, {
		posibleAnswerID : 5930,
		answerText : "Fructificación"
	}, {
		posibleAnswerID : 5931,
		answerText : "Flujo Vegetativo"
	}, {
		posibleAnswerID : 5932,
		answerText : "Cosecha"
	}
	, {
		posibleAnswerID : 5933,
		answerText : "Desarrollo Vegetativo"
	}
	 ];

	self.records = ko.observableArray([new pestsRecord(1, "", "", "", self.available[0], "", "", "", "record1")]);


	self.addRecords = function(){
		self.records.push(new pestsRecord(self.records().length + 1, "", "", "", self.available[0], "", "", "", "record" + (self.records().length + 1)));
		$("div[class*='input-append date']").datetimepicker({
      		pickTime: false
    	});
	}
	self.removeRecords = function(record){ self.records.remove(record)}

	self.getComment = function(record){										
		idComment = 1;
		index = (record.idRecord - 1);
		$("#idComment").html(record.idRecord);				
		var jsonVar = ko.mapping.toJSON($(this).attr("comment"));
		var comment = JSON.parse(jsonVar);				
		$("#CommentsRecord").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	
	self.saveCommentRecord = function(fence){				
		var text = $("#CommentsRecord").val();				
		self.records()[index].comment = text.toString();				
		$("#CommentsRecord").html("");		
	}
}
/////////////////////Pests////////////////////////////////////
function Pests(row, Sector, Pest, Damage, Enemies, Justification, Comment, photo, idImg){
	self4 = this;
	self4.idPest = row;
	self4.sector = ko.observable(Sector);
	self4.pest = ko.observable(Pest);
	self4.damage = ko.observable(Damage);
	self4.enemies = ko.observable(Enemies);
	self4.justification = ko.observable(Justification);
	self4.comment = ko.observable(Comment);	
	self4.photoPests = ko.observable(photo);
	self4.idImagePests = ko.observable(idImg);

	self.takePhotoPests = function() {
	var self = this;	
	var message;		
    var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    navigator.camera.getPicture(onSuccess, onFail, options); 
    	

  		function onSuccess(imageURI) {  				
      		self.photoPests = getRootName(imageURI);
      		var img = document.getElementById(self.idImagePests().toString());
      		img.src = getRootName(imageURI);
      		message = "Foto de plaga # "+ self.idPest +" guardada con éxito...";
			getMessage(message, "#lampMessage");						
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto de Plaga #" + self.idPest, alertMiss, "Foto cancelada", "Aceptar");
  		}  		
	}
}
function PestsViewModel(self){
	self.availableAnswersPests = [ {
		posibleAnswerID : 11,
		answerText : "Bajo"
	}, {
		posibleAnswerID : 22,
		answerText : "Medio"
	}, {
		posibleAnswerID : 33,
		answerText : "Alto"
	} ];

	self.pests = ko.observableArray([new Pests(1, "", "", self.availableAnswersPests[0], false, false, "", "", "pest1")]);
	self.addPests = function(){
		self.pests.push(new Pests(self.pests().length + 1, "", "", self.availableAnswersPests[0], false, false, "", "", "pest" + (self.pests().length + 1)));
	}
	self.removePest = function(pest){ self.pests.remove(pest)}
	
	self.getCommentPest = function(pest){								
		index = (pest.idPest - 1);
		$("#idPest").html(pest.idPest);				
		var jsonVar = ko.mapping.toJSON($(this).attr("comment"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentPest").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.saveCommentPest = function(pest){		
		var text = $("#CommentPest").val();				
		self.pests()[index].comment = text.toString();				
		$("#CommentPest").html("");		
	}
}
/////////////////////Diseases////////////////////////////////////
function Diseases(row, Sector, Pest, Damage, Enemies, Justification, Comment, photo, idImg){
	self4 = this;
	self4.idDisease = row;
	self4.sector = ko.observable(Sector);
	self4.name = ko.observable(Pest);
	self4.damage = ko.observable(Damage);
	self4.enemies = ko.observable(Enemies);
	self4.justification = ko.observable(Justification);
	self4.comment = ko.observable(Comment);	
	self4.photoDisease = ko.observable(photo);
	self4.idImageDisease = ko.observable(idImg);

	self.takePhotoDisease = function() {
	var self = this;	
	var message;		
    var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    navigator.camera.getPicture(onSuccess, onFail, options); 
    	

  		function onSuccess(imageURI) {  				
      		self.photoDisease = getRootName(imageURI);
      		var img = document.getElementById(self.idImageDisease().toString());
      		img.src = getRootName(imageURI);
      		message = "Foto de lampara # "+ self.idPest +" guardada con éxito...";
			getMessage(message, "#lampMessage");						
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto de Plaga #" + self.idDisease, alertMiss, "Foto cancelada", "Aceptar");
  		}  		
	}
}
function DiseaseViewModel(self){
	self.availableAnswersDisease = [ {
		posibleAnswerID : 111,
		answerText : "Bajo"
	}, {
		posibleAnswerID : 222,
		answerText : "Medio"
	}, {
		posibleAnswerID : 333,
		answerText : "Alto"
	} ];

	self.diseases = ko.observableArray([new Diseases(1, "", "", self.availableAnswersDisease[0], false, false, "", "", "disease1")]);
	self.addDisease = function(){
		self.diseases.push(new Diseases(self.diseases().length + 1, "", "", self.availableAnswersDisease[0], false, false, "", "", "disease" + (self.diseases().length + 1)));
	}
	self.removeDisease = function(disease){ self.diseases.remove(disease)}
	
	self.getCommentDisease = function(disease){								
		index = (disease.idDisease - 1);
		$("#idDisease").html(disease.idDisease);				
		var jsonVar = ko.mapping.toJSON($(this).attr("comment"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentDisease").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.saveCommentDisease = function(lamp){		
		var text = $("#CommentDisease").val();				
		self.diseases()[index].comment = text.toString();				
		$("#CommentDisease").html("");		
	}
}
/////////////////////Bush////////////////////////////////////
function Bush(row, Sector, Pest, Damage, Enemies, Justification, Comment, photo, idImg){
	self4 = this;
	self4.idBush = row;
	self4.sector = ko.observable(Sector);
	self4.name = ko.observable(Pest);
	self4.damage = ko.observable(Damage);
	self4.enemies = ko.observable(Enemies);
	self4.justification = ko.observable(Justification);
	self4.comment = ko.observable(Comment);	
	self4.photoBush = ko.observable(photo);
	self4.idImageBush = ko.observable(idImg);

	self.takePhotoBush = function() {
	var self = this;	
	var message;		
    var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    navigator.camera.getPicture(onSuccess, onFail, options); 
    	

  		function onSuccess(imageURI) {  				
      		self.photoBush = getRootName(imageURI);
      		var img = document.getElementById(self.idImageBush().toString());
      		img.src = getRootName(imageURI);
      		message = "Foto de lampara # "+ self.idPest +" guardada con éxito...";
			getMessage(message, "#lampMessage");						
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto de Plaga #" + self.idDisease, alertMiss, "Foto cancelada", "Aceptar");
  		}  		
	}
}
function BushViewModel(self){
	self.availableAnswersBushes = [ {
		posibleAnswerID : 1111,
		answerText : "Bajo"
	}, {
		posibleAnswerID : 2222,
		answerText : "Medio"
	}, {
		posibleAnswerID : 3333,
		answerText : "Alto"
	} ];

	self.bushes = ko.observableArray([new Bush(1, "", "", self.availableAnswersBushes[0], false, false, "", "", "bush1")]);
	self.addBush = function(){
		self.bushes.push(new Bush(self.bushes().length + 1, "", "", self.availableAnswersBushes[0], false, false, "", "", "bush" + (self.bushes().length + 1)));
	}
	self.removeBush = function(bush){ self.bushes.remove(bush)}
	
	self.getCommentBush = function(bush){								
		index = (bush.idBush - 1);
		$("#idBush").html(bush.idBush);				
		var jsonVar = ko.mapping.toJSON($(this).attr("comment"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentBush").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.saveCommentBush = function(lamp){		
		var text = $("#CommentBush").val();				
		self.bushes()[index].comment = text.toString();				
		$("#CommentBush").html("");		
	}
}

function saveAllMonth (){	
	db.transaction(save, errorCB);
}
function save(tx) {		
	//Creates the JSON contaminants	
	var informationToJSON = ko.mapping.toJSON(self.information);
	$("input[name='datePicker']").each(function(index, value){											
			if(index == 0){
				self.information()[index].validity($(this).val());
			}
			else{
				self.records()[index - 1].recordDate($(this).val());
			}
			datesArray.push($(this).val());			
	});		
	var recordPestToJSON = ko.mapping.toJSON(self.records);	
	alert(informationToJSON);
	alert(recordPestToJSON);
	var pestsToJSON = ko.mapping.toJSON(self.pests);
	var diseasesToJSON = ko.mapping.toJSON(self.diseases);
	var bushesToJSON = ko.mapping.toJSON(self.bushes);
	getGPS();	
	var query = 'INSERT INTO pests (informationPests, pestRecord, pestTable, diseases, bushesTable, datePickers, timestamp, gps, idOrchard, finished, synchronized)';
	query += "VALUES ('" + informationToJSON + "', '" + recordPestToJSON + "', '"+ pestsToJSON + "', '" + diseasesToJSON + "', '"+ bushesToJSON + "', '" + datesArray + "', '" + getCurrentDateTime() + "','" + gps + "', '"+ orchardMasterId + "', 1, 0)";				
	tx.executeSql(query);		
	Message = "Se guardó Master Mensual";
	getPage("file:///android_asset/www/views/pests/index.title.html", "file:///android_asset/www/views/pests/index.html");
}