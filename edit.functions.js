/////////////////////DISINFECTANTS////////////////////////////////////
function dailyMasterModel(disinfectants, restrooms, canteens) {
	var self = this;
	//LOADING THE VIEWMODEL FOR DISINFECTANTS
	self.disinfectantArray = ko.observableArray([]);	
	self.disinfectantArray(disinfectants);
	//LOADING THE VIEWMODEL FOR RESTROOM	
	self.restroomArray = ko.observableArray([]);	
	self.restroomArray(restrooms);	
	//LOADING THE VIEWMODEL FOR CANTEENS
	self.canteenArray = ko.observableArray([]);		
	self.canteenArray(canteens);	

	function Disinfectant(id, Name, Ph, Concentration, Unid) {
		var self1 = this;
		self1.id = id;
		self1.name = ko.observable(Name);
		self1.ph = ko.observable(Ph);
		self1.concentration = ko.observable(Concentration);
		self1.unid = ko.observable(Unid);		
	}

	function restroom(row, answer1, answer2, answer3, answer4, answer5) {
	self2 = this;
	self2.restroomRow = row;
	self2.answerVal1 = ko.observable(answer1);	
	self2.answerVal2 = ko.observable(answer2);	
	self2.answerVal3 = ko.observable(answer3);	
	self2.answerVal4 = ko.observable(answer4);	
	self2.answerVal5 = ko.observable(answer5);	
	}

	function canteen(row, answer6, answer7, answer8, answer9, answer10, answer11) {
	self3 = this;
	self3.canteenRow = row;
	self3.answerVal6 = ko.observable(answer6);	
	self3.answerVal7 = ko.observable(answer7);	
	self3.answerVal8 = ko.observable(answer8);	
	self3.answerVal9 = ko.observable(answer9);	
	self3.answerVal10 = ko.observable(answer10);	
	self3.answerVal11 = ko.observable(answer11);
	}

	self.decinfectantsMeasures = [ {
		answerVal : 1,
		Measure : ".ml"
	}, {
		answerVal : 2,
		Measure : ".g"
	} ];

	self.availableAnswers = [ {
		answerVal : 1,
		answerText : "No"
	}, {
		answerVal : 2,
		answerText : "Sí"
	} ];

	self.addDisinfectant = function() {		
		self.disinfectantArray.push(new Disinfectant(self.disinfectantArray().length + 1, "", 0, 0, self.decinfectantsMeasures[0]));
	}

	self.removeDisinfectant = function(disinfectant) {
		self.disinfectantArray.remove(disinfectant)
	}

	self.addRestroom = function() {		
		self.restroomArray.push(new restroom(self.restroomArray().length + 1,
				self.availableAnswers[0], self.availableAnswers[0],
				self.availableAnswers[0], self.availableAnswers[0],
				self.availableAnswers[0]));		
	}

	self.removeRestroom = function(restroom) {
		self.restroomArray.remove(restroom)
	}
	self.addCanteen = function() {		
		self.canteenArray.push(new canteen(self.canteenArray().length + 1,
				self.availableAnswers[0], self.availableAnswers[0],
				self.availableAnswers[0], self.availableAnswers[0],
				self.availableAnswers[0], self.availableAnswers[0]));
	}

	self.removeCanteen = function(canteen) {
		self.canteenArray.remove(canteen)
	}

	self.updateAll = function(){
		var disinfectantsToJSON = ko.mapping.toJSON(self.disinfectantArray);			
		var restroomsToJSON = ko.mapping.toJSON(self.restroomArray);		
		var canteensToJSON = ko.mapping.toJSON(self.canteenArray);	
		db.transaction(updateDB, errorCB);
		function updateDB(tx) {			
			getGPS();
			var query = 'UPDATE daily_master SET receptionDate = 0, disinfectants =';
			query += "'"+ disinfectantsToJSON + "', restrooms = '" + restroomsToJSON + "', canteens = '" + canteensToJSON + "', checkedBy = 0, receivedBy = 0, timestamp = '" + getCurrentDateTime() + "', gps = '" + gps + "' WHERE id =" + dailyMasterId;			
			tx.executeSql(query);
			getPage("file:///android_asset/www/views/daily_master/index.title.html",
				"file:///android_asset/www/views/daily_master/index.html");
		}
		function errorCB(err) {
			console.log("Error processing SQL: " + err.code);
		}
	}
}

// Query the database
//
function queryDB(tx) {
	var QUERY = 'SELECT * FROM daily_master where id=' + dailyMasterId;
	tx.executeSql(QUERY, [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
	var len = results.rows.length;

	if (len > 0) {		
		disinfectants = results.rows.item(0).disinfectants;		
		restrooms = results.rows.item(0).restrooms;
		canteens = results.rows.item(0).canteens;
		currentDate = results.rows.item(0).timestamp;		
	}	
	viewModel = new dailyMasterModel(eval(disinfectants), eval(restrooms), eval(canteens));
	ko.applyBindings(viewModel);	
}