function pestsViewModel(information, record, pests, diseases, bushes){
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
	 $("div[class*='input-append date']").datetimepicker({
      		pickTime: false
    });
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
	}
	self.getComment = function(record){										
		idComment = 1;
		index = (record.idRecord - 1);
		$("#idComment").html(record.idRecord);				
		var jsonVar = ko.mapping.toJSON($(this).attr("comment"));
		var comment = JSON.parse(jsonVar);				
		$("#CommentsRecord").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
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
	}	
	
	self.getCommentPest = function(pest){								
		index = (pest.idPest - 1);
		$("#idPest").html(pest.idPest);				
		var jsonVar = ko.mapping.toJSON($(this).attr("comment"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentPest").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
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
	}	
	self.getCommentDisease = function(disease){								
		index = (disease.idDisease - 1);
		$("#idDisease").html(disease.idDisease);				
		var jsonVar = ko.mapping.toJSON($(this).attr("comment"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentDisease").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
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
	}
	self.getCommentBush = function(bush){								
		index = (bush.idBush - 1);
		$("#idBush").html(bush.idBush);				
		var jsonVar = ko.mapping.toJSON($(this).attr("comment"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentBush").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.deleteThisView = function() {		
		$(function() {			
			$('#deleteModal').modal('hide');
			db.transaction(deleteView, errorCB);
		})	
	function deleteView(tx) {
		query = 'DELETE FROM pests WHERE id=' + pestsMasterId;
		tx.executeSql(query);
		Message= "Se borró registro de Bitácora # " + pestsMasterId;
		getPage("file:///android_asset/www/views/pests/index.title.html", "file:///android_asset/www/views/pests/index.html");
	}	

	}
	self.finishMaster = function (){
		db.transaction(updateFinish, errorCB);
	}
	function updateFinish(tx){
	var query = 'UPDATE pests SET finished=' + 0 + " WHERE id=" + pestsMasterId;
	tx.executeSql(query);
	Message = "Se finalizó registro de Bitácora #" + pestsMasterId;
	getPage("file:///android_asset/www/views/pests/index.title.html", "file:///android_asset/www/views/pests/index.html");
	}
}


function queryDB(tx) {
	tx.executeSql('SELECT * FROM pests where id=' + pestsMasterId, [],
			querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
	var len = results.rows.length;

	if (len > 0) {
		information = results.rows.item(0).informationPests;
		records = results.rows.item(0).pestRecord;		
		pests = results.rows.item(0).pestTable;		
		diseases = results.rows.item(0).diseases;		
		bushes = results.rows.item(0).bushesTable;		
		dates =  results.rows.item(0).datePickers;
		currentDate = results.rows.item(0).timestamp;

	}			
	viewModel = new pestsViewModel(eval(information), eval(records), eval(pests), eval(diseases), eval(bushes));
	ko.applyBindings(viewModel);		
	getAllDates(dates);
}
function getAllDates(dateArray){
	var dates = [];
	dates = dateArray.split(',');	
	$("input[name='datePicker']").each(function(index, value){									
			$(this).val(dates[index]);
	});	
	
}