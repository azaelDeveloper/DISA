function dailyMasterViewModel() {
	self = this;
	DisinfectantViewModel(self);
	restroomViewModel(self);
	canteenViewModel(self);
}
// ///////////////////DISINFECTANTS////////////////////////////////////
function Disinfectant(id, Name, Ph, Concentration, Unid) {
	var self1 = this;
	self1.id = id;
	self1.name = ko.observable(Name);
	self1.ph = ko.observable(Ph);
	self1.concentration = ko.observable(Concentration);
	self1.unid = ko.observable(Unid);
}

// Overall viewmodel for this screen, along with initial state
function DisinfectantViewModel(self) {
	// Array's of Select's
	self.decinfectantsMeasures = [ {
		answerVal : 1,
		Measure : ".ml"
	}, {
		answerVal : 2,
		Measure : ".gr"
	} ];
	
	// Editable data
	self.disinfectants = ko.observableArray([ new Disinfectant(1, "", 0, 0,	self.decinfectantsMeasures[0])]);
	window.localStorage.setItem("disinfectants", self.disinfectants);

	self.addDisinfectant = function() {
		var value = window.localStorage.getItem("disinfectants");

		self.disinfectants.push(new Disinfectant(self.disinfectants().length + 1, "", 0, 0, self.decinfectantsMeasures[0]));
		value = self.disinfectants;
		window.localStorage.setItem("disinfectants", value);

	}

	self.removeDisinfectant = function(disinfectant) {
		self.disinfectants.remove(disinfectant)
	}
}

// ///////////////////RESTROOMS////////////////////////////////////
function restroom(row, answer1, answer2, answer3, answer4, answer5, photo, idImg) {
	self2 = this;
	self2.restroomRow = row;
	self2.answerVal1 = ko.observable(answer1);	
	self2.answerVal2 = ko.observable(answer2);	
	self2.answerVal3 = ko.observable(answer3);	
	self2.answerVal4 = ko.observable(answer4);	
	self2.answerVal5 = ko.observable(answer5);
	self2.photoBath = ko.observable(photo);
	self2.idImageRestroom = ko.observable(idImg);
	
	self.takePhotoRestroom = function() {
		var self = this;		
		var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: false, allowEdit: true};
		navigator.camera.getPicture(onSuccess, onFail,options); 

		function onSuccess(imageURI){			
			self.photoBath = imageURI;
			var image = document.getElementById(self.idImageRestroom().toString());
			image.src = imageURI;
			navigator.notification.alert("Foto de Baño #"+ self.restroomRow +" se guardó con éxito", alertMiss, "Foto de Baño guardada", "Aceptar");
		}

		function onFail(message) {
    		navigator.notification.alert("Se canceló foto del Baño #"+ self.restroomRow, alertMiss, "Se cancelo foto del Baño", "Aceptar");
		}
	}
}

// Overall viewmodel for this screen, along with initial state
function restroomViewModel(self) {
	// Non-editable catalog data - would come from the server
	self.availableAnswers = [ {
		answerVal : 1,
		answerText : "No"
	}, {
		answerVal : 2,
		answerText : "Sí"
	} ];

	// Editable data
	self.restrooms = ko.observableArray([ new restroom(1,
			self.availableAnswers[0], self.availableAnswers[0],
			self.availableAnswers[1], self.availableAnswers[1],
			self.availableAnswers[1], "", "restroom1")]);

	self.addRestroom = function() {
		self.restrooms.push(new restroom(self.restrooms().length + 1,
				self.availableAnswers[0], self.availableAnswers[0],
				self.availableAnswers[1], self.availableAnswers[1],
				self.availableAnswers[1], "", "restroom" + (self.restrooms().length + 1)));
	}

	self.removeRestroom = function(restroom) {
		self.restrooms.remove(restroom)
	}
}

// /////////////////////////CANTEENS////////////////////////////////////////
function canteen(row, answer6, answer7, answer8, answer9, answer10, answer11, photo, idImg) {
	self3 = this;
	self3.canteenRow = row;
	self3.answerVal6 = ko.observable(answer6);	
	self3.answerVal7 = ko.observable(answer7);	
	self3.answerVal8 = ko.observable(answer8);	
	self3.answerVal9 = ko.observable(answer9);	
	self3.answerVal10 = ko.observable(answer10);	
	self3.answerVal11 = ko.observable(answer11);
	self3.photoCanteen = ko.observable(photo);
	self3.idImageCanteen = ko.observable(idImg);

	self.takePhotoCan = function() {
		var self = this;		
		//alert(self.idImage().toString());
    	var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: false, allowEdit: true };
    	navigator.camera.getPicture(onSuccess, onFail, options); 

  		function onSuccess(imageURI) {      		  			
  			self.photoCanteen = imageURI;
  			var image = document.getElementById(self.idImageCanteen().toString());     		
  			image.src = imageURI;
  			navigator.notification.alert("Foto de Comedor #"+ self.canteenRow +" se guardó con éxito", alertMiss, "Foto de Comedor guardada", "Aceptar");	
  		}
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto del Comedor #"+ self.canteenRow, alertMiss, "Se cancelo foto del Comedor", "Aceptar");
  		}
	}
}
// Overall viewmodel for this screen, along with initial state
function canteenViewModel(self) {
	// Non-editable catalog data - would come from the server
	self.availableAnswers = [ {
		answerVal : 1,
		answerText : "No"
	}, {
		answerVal : 2,
		answerText : "Sí"
	} ];

	// Editable data
	self.canteens = ko.observableArray([ new canteen(1,
			self.availableAnswers[0], self.availableAnswers[0],
			self.availableAnswers[0], self.availableAnswers[1],
			self.availableAnswers[1], self.availableAnswers[1], "", "canteen1")]);
	//window.localStorage.setItem("canteens", self.canteens);

	self.addCanteen = function() {		
		self.canteens.push(new canteen(self.canteens().length + 1,
				self.availableAnswers[0], self.availableAnswers[0],
				self.availableAnswers[0], self.availableAnswers[1],
				self.availableAnswers[1], self.availableAnswers[1], "", "canteen" + (self.canteens().length + 1)));		
	}

	self.removeCanteen = function(canteen) {
		self.canteens.remove(canteen)
	}
}
// /////SAVE ALL XML'S/////////
function saveAll() {
	db.transaction(save, errorCB);
}

function save(tx) {
	
	// BUILDING JSON DISINFECTANTS	
	var disinfectantsToJSON = ko.mapping.toJSON(self.disinfectants);			
	// /BUILDING JSON RESTROOMS
	var restroomsToJSON = ko.mapping.toJSON(self.restrooms);		
	// BULDING JSON CANTEENS
	var canteensToJSON = ko.mapping.toJSON(self.canteens);	
	getGPS();
	var query = 'INSERT INTO daily_master (receptionDate, disinfectants, restrooms, canteens, checkedBy, receivedBy, timestamp, gps)';
	query += "VALUES (0, '" + disinfectantsToJSON + "', '" + restroomsToJSON + "', '" + canteensToJSON + "', 0, 0, '" + getCurrentDateTime() + "','" + gps + "')";		
	tx.executeSql(query);
	getPage(
			"file:///android_asset/www/views/daily_master/index.title.html",
			"file:///android_asset/www/views/daily_master/index.html");
}