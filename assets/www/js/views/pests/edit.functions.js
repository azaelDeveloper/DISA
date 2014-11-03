//contaminants TEXT, pestsMonthly TEXT, fences TEXT, lamps TEXT, weatherStation TEXT, pipes TEXT, pumps TEXT, checkedBy NUMERIC, receivedBy NUMERIC, timestamp NUMERIC, gps TEXT, averagePoblation NUMERIC, averageAgencies NUMERIC
function pestsViewModel(information, record, pests, diseases, bushes) {
	var self = this;		
	self.informationArray = ko.observableArray([]);	
	self.informationArray(information);	
	self.recordsArray = ko.observableArray([]);
	self.recordsArray(record);	
	self.pestsArray = ko.observableArray([]);
	self.pestsArray(pests);
	self.diseasesArray = ko.observableArray([]);
	self.diseasesArray(diseases);
	self.bushesArray = ko.observableArray([]);
	self.bushesArray(bushes);		

	
	//INFORMATION 	
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
	//LOADING THE SELECT ANSWERS	
	
	//PESTS RECORDS
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
	var IndexOfRecord= $(this).attr("idRecord");		
	IndexOfRecord = (IndexOfRecord - 1);			
	var message;		
    var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    navigator.camera.getPicture(onSuccess, onFail, options);    	    
    	
  		function onSuccess(imageURI){  				
  			if(document.getElementById(self.recordsArray()[IndexOfRating].idImageRecord) != null){
  				self.recordsArray()[IndexOfRecord].photoRecord = getRootName(imageURI);
      			var image = document.getElementById(self.recordsArray()[IndexOfRecord].photoRecord);
				image.src = getRootName(imageURI);				
				}	
  			else{
  				self.recordsArray()[IndexOfRecord].photoFirstAid(getRootName(imageURI));
      			var image = document.getElementById(self.recordsArray()[IndexOfRecord].idImageRecord().toString());
				image.src = getRootName(imageURI);
  				}						
  				message = "Foto de registro de plaga # "+ (IndexOfRecord + 1) +" guardada con éxito...";
				getMessage(message, "#recordMessage");	
      		}	
  			function onFail(message) {
    			navigator.notification.alert("Se canceló foto de registro de plaga #" + self.idRecord, alertMiss, "Foto cancelada", "Aceptar");
  			}
		}	
	}
	
	self.addRecords = function(){
		self.recordsArray.push(new pestsRecord(self.recordsArray().length + 1, "", "", "", self.available[0], "", "", "", "", "record" + (self.recordsArray().length + 1)));
		$("div[class*='input-append date']").datetimepicker({
      		pickTime: false,
      		autoclose: true
    	});
	}
	self.removeRecords = function(record){ self.recordsArray.remove(record)}

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
		//QUITE UN SWITCH CASE
		var text = $("#CommentsRecord").val();				
		self.recordsArray()[index].comment = text.toString();				
		$("#CommentsRecord").html("");		
	}
	//PESTS
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
		var IndexOfPests= $(this).attr("idPest");		
		IndexOfPests = (IndexOfPests - 1);	
		var message;		
	    var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
	    navigator.camera.getPicture(onSuccess, onFail, options); 
	    	

	  		function onSuccess(imageURI) {  				
	  			if(document.getElementById(self.kitsArray()[IndexOfRating].idImagePests) != null){
	  				self.pestsArray()[IndexOfPests].photoPests = getRootName(imageURI);
	      			var image = document.getElementById(self.pestsArray()[IndexOfPests].photoPests);
					image.src = getRootName(imageURI);
				}	
  				else{
	  				self.pestsArray()[IndexOfPests].photoPests(getRootName(imageURI));
	      			var image = document.getElementById(self.pestsArray()[IndexOfPests].idImagePests().toString());
					image.src = getRootName(imageURI);
  				}						      		
  				message = "Foto de peste # "+ (IndexOfPests + 1) +" guardada con éxito...";
				getMessage(message, "#pestsMessage");						
	      	}	
	  		function onFail(message) {
	    		navigator.notification.alert("Se canceló foto de Plaga #" + self.idPest, alertMiss, "Foto cancelada", "Aceptar");
	  		}  		
		}
	}
	
	self.addPests = function(){
		self.pestsArray.push(new Pests(self.pestsArray().length + 1, "", "", self.availableAnswersPests[0], false, false, "", "", "pest" + (self.pestsArray().length + 1)));
	}
	self.removePest = function(pest){ self.pestsArray.remove(pest)}
	
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
		self.pestsArray()[index].comment = text.toString();				
		$("#CommentPest").html("");		
	}
	//DISEASES
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
	var IndexOfDisease = $(this).attr("idDisease");		
	IndexOfDisease = (IndexOfDisease - 1);	
	var message;		
    var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    navigator.camera.getPicture(onSuccess, onFail, options); 
    	

  		function onSuccess(imageURI) {
  			if(document.getElementById(self.diseasesArray()[IndexOfDisease].idImageDisease) != null){
	  				self.diseasesArray()[IndexOfDisease].photoDisease = getRootName(imageURI);
	      			var image = document.getElementById(self.diseasesArray()[IndexOfDisease].photoDisease);
					image.src = getRootName(imageURI);										
				}	
  				else{
	  				self.diseasesArray()[IndexOfDisease].photoDisease(getRootName(imageURI));
	      			var image = document.getElementById(self.diseasesArray()[IndexOfDisease].idImageDisease().toString());
					image.src = getRootName(imageURI);					
  				}	  				
  				message = "Foto de enfermedad # "+ (IndexOfDisease + 1) +" guardada con éxito...";	  										
  				getMessage(message, "#diseaseMessage");	
      		}	
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto de Plaga #" + self.idDisease, alertMiss, "Foto cancelada", "Aceptar");
  			}  		
		}
	}
	
	self.addDisease = function(){
		self.diseasesArray.push(new Diseases(self.diseasesArray().length + 1, "", "", self.availableAnswersDisease[0], false, false, "", "", "disease" + (self.diseasesArray().length + 1)));
	}
	self.removeDisease = function(disease){ self.diseasesArray.remove(disease)}
	
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
		self.diseasesArray()[index].comment = text.toString();				
		$("#CommentDisease").html("");		
	}
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
	var IndexOfBush = $(this).attr("idBush");		
	IndexOfBush = (IndexOfBush - 1);		
	var message;		
    var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    navigator.camera.getPicture(onSuccess, onFail, options); 
    	

  		function onSuccess(imageURI) {  				
      		if(document.getElementById(self.bushesArray()[IndexOfBush].idImageBush) != null){
	  				self.bushesArray()[IndexOfBush].photoBush = getRootName(imageURI);
	      			var image = document.getElementById(self.bushesArray()[IndexOfBush].photoBush);
					image.src = getRootName(imageURI);
				}	
  				else{
	  				self.bushesArray()[IndexOfBush].photoBush(getRootName(imageURI));
	      			var image = document.getElementById(self.bushesArray()[IndexOfBush].idImageBush().toString());
					image.src = getRootName(imageURI);
  				}	
  				message = "Foto de maleza # "+ (IndexOfBush + 1) +" guardada con éxito...";			
  				getMessage(message, "#bushesMessage");	
      		}	
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto de Plaga #" + self.idDisease, alertMiss, "Foto cancelada", "Aceptar");
  			}  		
		}
	}
	self.addBush = function(){
		self.bushesArray.push(new Bush(self.bushesArray().length + 1, "", "", self.availableAnswersBushes[0], false, false, "", "", "bush" + (self.bushesArray().length + 1)));
	}
	self.removeBush = function(bush){ self.bushesArray.remove(bush)}
	
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
		self.bushesArray()[index].comment = text.toString();				
		$("#CommentBush").html("");		
	}
	//UPDATE
	self.updateAll = function(){
		$("input[name='datePicker']").each(function(index, value){											
			if(index == 0){
				self.informationArray()[index].validity = $(this).val();
			}
			else{
				self.recordsArray()[index - 1].recordDate = $(this).val();				
			}
			datesArray.push($(this).val());			
		});		
		var informationToJSON = ko.mapping.toJSON(self.informationArray);						
		var recordPestToJSON = ko.mapping.toJSON(self.recordsArray);		
		var pestsToJSON = ko.mapping.toJSON(self.pestsArray);
		var diseasesToJSON = ko.mapping.toJSON(self.diseasesArray);
		var bushesToJSON = ko.mapping.toJSON(self.bushesArray);		
		db.transaction(updateDB, errorCB);

		function updateDB(tx) {			
			getGPS();					
			//tx.executeSql('CREATE TABLE IF NOT EXISTS pests (id INTEGER PRIMARY KEY, informationPests TEXT, pestRecord TEXT, pestTable TEXT, diseases TEXT, bushesTable TEXT, datePickers TEXT, timestamp NUMERIC, gps TEXT, idOrchard NUMERIC, finished NUMERIC, synchronized NUMERIC)');
			var query = 'UPDATE pests SET informationPests=';					
			query += "'" + informationToJSON + "', pestRecord='" + recordPestToJSON + "', pestTable='" + pestsToJSON + "', diseases='" + diseasesToJSON + "', bushesTable='" + bushesToJSON + "', datePickers = '"+ datesArray +"', timestamp='" +  getCurrentDateTime() 	+ "', gps='" + gps + "', finished = 1, synchronized = 0 WHERE id = " + pestsMasterId;
			tx.executeSql(query);			
			Message = "Se actualizó registro de Bitácora # " + pestsMasterId;
			getPage("file:///android_asset/www/views/pests/index.title.html",
				"file:///android_asset/www/views/pests/index.html");
			
		}
	}
}


function queryDB(tx) {
	tx.executeSql('SELECT * FROM pests where id=' + pestsMasterId, [],
			querySuccess, errorCB);
}
function querySuccess(tx, results) {
	var len = results.rows.length;

	if (len > 0) {
		information = results.rows.item(0).informationPests;		
		records = results.rows.item(0).pestRecord;		
		pests = results.rows.item(0).pestTable;		
		diseases = results.rows.item(0).diseases;		
		bushes = results.rows.item(0).bushesTable;		
		currentDate = results.rows.item(0).timestamp;
		dates =  results.rows.item(0).datePickers;

	}			
	viewModel = new pestsViewModel(eval(information), eval(records), eval(pests), eval(diseases), eval(bushes));
	ko.applyBindings(viewModel);
	 $("div[class*='input-append date']").datetimepicker({
  		pickTime: false,
        autoclose: true
	});	
	fillPhotos(eval(records), eval(pests), eval(diseases), eval(bushes));
	getAllDates(dates);
}
function fillPhotos(records, pests, diseases, bushes)
{
	var self=this;
	self.recordsPhotos = ko.observableArray([]);
	self.recordsPhotos(records);
	var i = 0;	
	while (i < self.recordsPhotos().length)
	{		
		var imgF = document.getElementById(self.recordsPhotos()[i].idImageRecord);
		imgF.src = self.recordsPhotos()[i].photoRecord;
		i++;
	}	

	self.pestsPhotos = ko.observableArray([]);
	self.pestsPhotos(pests);	
	i=0;
	while(i < self.pestsPhotos().length)
	{
		var imgL = document.getElementById(self.pestsPhotos()[i].idImagePests);
		imgL.src = self.pestsPhotos()[i].photoPests;
		i++;
	}
	i=0;
	self.diseasesPhotos = ko.observableArray([]);
	self.diseasesPhotos(diseases);
	while (i < self.diseasesPhotos().length)
	{
		var imgW = document.getElementById(self.diseasesPhotos()[i].idImageDisease);
		imgW.src = self.diseasesPhotos()[i].photoDisease;
		i++;
	}
	i=0;
	self.bushesPhotos = ko.observableArray([]);
	self.bushesPhotos(bushes);
	while(i < self.bushesPhotos().length)
	{
		var imgP = document.getElementById(self.bushesPhotos()[i].idImageBush);
		imgP.src = self.bushesPhotos()[i].photoBush;		
		i++;
	}
}
function getAllDates(dateArray){
	var dates = [];
	dates = dateArray.split(',');	
	$("input[name='datePicker']").each(function(index, value){									
			$(this).val(dates[index]);
	});	
	
}
function fillArrayDates(){
	$("input[name='datePicker']").each(function(index, value){									
			datesArray.push($(this).val());
	});	
	return datesArray;
}