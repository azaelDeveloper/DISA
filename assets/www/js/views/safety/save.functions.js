function firstAidMasterViewModel() {
	self = this;
	informationViewModel(self);
	kitViewModel(self);
}

// INFORMATION
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

function informationViewModel(self){
	self.information = ko.observableArray([new Information("", "", "", "", "", "", "")]);		
}

// FIRST AID KIT
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
	
	self.takePhotoKit = function() {
	var self = this;	
	var message;		
    var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    navigator.camera.getPicture(onSuccess, onFail, options); 
    	

  		function onSuccess(imageURI) {  				
      		self.photoFirstAid = getRootName(imageURI);
      		var img = document.getElementById(self.idImageFirstAid().toString());
      		img.src = getRootName(imageURI);
      		message = "Foto del Botiquín # "+ self.idKit +" guardada con éxito...";
			getMessage(message, "#lampMessage");						
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto del Botiquín #" + self.idKit, alertMiss, "Foto cancelada", "Aceptar");
  		}  		
	}
}

function kitViewModel(self){
	self.kits = ko.observableArray([new Kit(1, "", false, false, false, false, false, false, false, false, false, false, false, false, false, "", "", "", "", "", "kit1")]);

	self.addKit = function() {
		self.kits.push(new Kit(self.kits().length + 1, "", false, false, false, false, false, false, false, false, false, false, false, false, false, "", "", "", "", "", "kit" + (self.kits().length + 1)));
		$("div[class*='input-append date']").datetimepicker({
      		pickTime: false,
    		autoclose: true
    	});
	}

	self.removeKit = function(kit) {
		self.kits.remove(kit);
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
		self.kits()[index].comment = text.toString();				
		$("#CommentsKit").html("");		
	}
}

// /////SAVE ALL XML'S/////////
function saveAll() {
	db.transaction(save, errorCB);
}

function save(tx) {
	
	// BUILDING JSON FIRST AID KIT
	var firstAidInfoToJSON = ko.mapping.toJSON(self.information);
	
	// BUILDING JSON FIRST AID KIT
	var firstAidKitToJSON = ko.mapping.toJSON(self.kits);

	$("input[name='datePicker']").each(function(index, value){								
			datesArray.push($(this).val());			
	});
	
	getGPS();

	var query = 'INSERT INTO first_aid (firstAidInformation, checkList, datePickers, timestamp, gps, idOrchard, finished, synchronized)';
	query += "VALUES ('"+ firstAidInfoToJSON +"', '" + firstAidKitToJSON + "', '" + datesArray + "', '" + getCurrentDateTime() + "','" + gps + "', "+ orchardMasterId +", "+ 1 + ", 0)";		
	tx.executeSql(query);
	
	Message = "Lista del Botiquín Guardado";	
	getPage("file:///android_asset/www/views/first_aid/index.title.html",
			"file:///android_asset/www/views/first_aid/index.html");
}

$("#getHomeTablet").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
$("#getHomePhone").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
