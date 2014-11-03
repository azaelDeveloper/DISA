function firstAidMasterModel(firstAidInformation, checkList){
	var self = this;
	self.informationArray = ko.observableArray([]);
	self.informationArray(firstAidInformation);
	self.kitsArray = ko.observableArray([]);
	self.kitsArray(checkList);

	function Information(Company, Representative, Crop, Production, Surface, Location, Validity){
		var self1 = this;	
		self1.company = ko.observable(Company);
		self1.representatitve = ko.observable(Representative);
		self1.crop = ko.observable(Crop);
		self1.production = ko.observable(Production);
		self1.surface = ko.observable(Surface);
		self1.location = ko.observable(Location);
		self1.validity = ko.observable(Validity);
	}

	function Kit(row, CheckDate, Desinfectant, Alcohol, Cotton, Gauze, Bandaid, Tape, Tablets, Bismuth, Gloves, Scissors, Headbands, Isodine, Antibactereal, Others, Checker, Responsible, Comment, Photo, idImg){
		var self2 = this;
		self2.idKit = row;
		self2.checkDate = ko.observable(CheckDate);
		self2.desinfectant = ko.observable(Desinfectant);
		self2.alcohol = ko.observable(Alcohol);
		self2.cotton = ko.observable(Cotton);
		self2.gauze = ko.observable(Gauze);
		self2.bandaid = ko.observable(Bandaid);
		self2.tape = ko.observable(Tape);
		self2.tablets = ko.observable(Tablets);
		self2.bismuth = ko.observable(Bismuth);
		self2.gloves = ko.observable(Gloves);
		self2.scissors = ko.observable(Scissors);
		self2.headbands = ko.observable(Headbands);
		self2.isodine = ko.observable(Isodine);
		self2.antibactereal = ko.observable(Antibactereal);
		self2.others = ko.observable(Others);
		self2.checker = ko.observable(Checker);
		self2.responsible = ko.observable(Responsible);
		self2.comment = ko.observable(Comment);
		self2.photoFirstAid = ko.observable(Photo);
		self2.idImageFirstAid = ko.observable(idImg);
	}

	self.addKit = function() {
		self.kitsArray.push(new Kit(self.kitsArray().length + 1, "", false, false, false, false, false, false, false, false, false, false, false, false, false, "", "", "", "", "", "kit" + (self.kitsArray().length + 1)));
		$("div[class*='input-append date']").datetimepicker({
	      	pickTime: false,
    		autoclose: true
	    });
	}

	self.removeKit = function(kit) {
		self.kitsArray.remove(kit);
	}

	self.takePhotoKit = function() {
		var IndexOfRating = $(this).attr("idKit");
		IndexOfRating = (IndexOfRating - 1);			
    	var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    	navigator.camera.getPicture(onSuccess, onFail, options);    	

  		function onSuccess(imageURI) {  
  			if(document.getElementById(self.kitsArray()[IndexOfRating].idImageFirstAid) != null)
  			{
  				self.kitsArray()[IndexOfRating].photoFirstAid = getRootName(imageURI);
      			var image = document.getElementById(self.kitsArray()[IndexOfRating].idImageFirstAid);
				image.src = getRootName(imageURI);
				message = "Foto del Botiquín # "+ (IndexOfRating + 1) +" guardada con éxito...";
				getMessage(message, "#kitMessage");	
  			}	
  			else
  			{
  				self.kitsArray()[IndexOfRating].photoFirstAid(getRootName(imageURI));
      			var image = document.getElementById(self.kitsArray()[IndexOfRating].idImageFirstAid().toString());
				image.src = getRootName(imageURI);
				message = "Foto del Botiquín # "+ (IndexOfRating + 1) +" guardada con éxito...";
				getMessage(message, "#kitMessage");	
  			}	
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto de botiquín", alertMiss, 'Foto cancelada', 'Aceptar');
  		}  	
	}

	self.getComment = function(kit){
		index = (kit.idKit - 1);
		$("#idComment").html(kit.idKit);
		var jsonVar = ko.mapping.toJSON($(this).attr("comment"));
		var comment = JSON.parse(jsonVar);
		$("#CommentsKit").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}

	self.saveComment = function(kit){		
		var text = $("#CommentsKit").val();				
		self.kitsArray()[index].comment = text.toString();				
		$("#CommentsKit").html("");		
	}

	self.updateAll = function(){
		// BUILDING JSON FIRST AID KIT
		var firstAidInfoToJSON = ko.mapping.toJSON(self.informationArray);

		// BUILDING JSON FIRST AID KIT
		var firstAidKitToJSON = ko.mapping.toJSON(self.kitsArray);
		
		db.transaction(updateDB, errorCB);

		function updateDB(tx) {			
			getGPS();
			var query = 'UPDATE first_aid SET firstAidInformation =';
			query += "'" + firstAidInfoToJSON + "', checkList = '" + firstAidKitToJSON + "', datePickers = '" + fillArrayDates() + "', timestamp = '" + 
				getCurrentDateTime() + "', gps = '" + gps + "' WHERE id =" + firstAidMasterId;
			tx.executeSql(query);
			Message = "Se actualizó Botiquín #" + firstAidMasterId;
			getPage("file:///android_asset/www/views/first_aid/index.title.html",
				"file:///android_asset/www/views/first_aid/index.html");
		}
		
		function errorCB(err) {
			console.log("Error processing SQL: " + err.code);
		}
	}

}

// Query the database
//
function queryDB(tx) {
	tx.executeSql('SELECT * FROM first_aid WHERE id=' + firstAidMasterId, [],
			querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
	var len = results.rows.length;
	if (len > 0) {
		firstAidInformation = results.rows.item(0).firstAidInformation;
		checkList = results.rows.item(0).checkList;
		currentDate = results.rows.item(0).timestamp;
		dates =  results.rows.item(0).datePickers;
	}	
	viewModel = new firstAidMasterModel(eval(firstAidInformation), eval(checkList));
	ko.applyBindings(viewModel);
	fillImages(checkList);
	getAllDates(dates);

	$("div[class*='input-append date']").datetimepicker({
      	pickTime: false,
		autoclose: true
    });
}

function fillImages(checkList){
	var self = this;
	self.kitsArray = ko.observableArray([]);
	self.kitsArray(eval(checkList));
	var i = 0;
	while(i < self.kitsArray().length){
		var img = document.getElementById(self.kitsArray()[i].idImageFirstAid);
		img.src = self.kitsArray()[i].photoFirstAid;
		i ++;
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

$("#getHomeTablet").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
$("#getHomePhone").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});