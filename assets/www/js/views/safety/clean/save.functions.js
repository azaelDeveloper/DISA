function hygieneMasterViewModel() {
	self = this;	
	PersonalOutfitViewModel(self);
	/*
	productRegistrationViewModel(self);
	qualityProductViewModel(self);
	concentratedProductViewModel(self);
	responsabilityApplicationViewModel(self);
	*/
}
// ///////////////////InformationArea////////////////////////////////////
function Grooming(id, Watch, Bracelet, Ring, Earrings, LongPants, CloseShoe, Shirt, CleanClothes, ShortHair, Bath, Comments, idImage, Path) {
	var self1 = this;
	self1.idGrooming = id;
	self1.watch = ko.observable(Watch);
	self1.bracelet = ko.observable(Bracelet);		
	self1.ring = ko.observable(Ring);
	self1.earrings = ko.observable(Earrings);
	self1.longPants = ko.observable(LongPants);
	self1.closeShoe = ko.observable(CloseShoe);
	self1.shirt = ko.observable(Shirt);
	self1.cleanClothes = ko.observable(CleanClothes);
	self1.shortHair = ko.observable(ShortHair);
	self1.bath = ko.observable(Bath);
	self1.comments = ko.observable(Comments);
	self1.idImageGrooming = ko.observable(idImage);
	self1.groomingPhoto = ko.observable(Path);
	self.takePhotoGrooming = function() {
	var self = this;	
	var message;		
    var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    navigator.camera.getPicture(onSuccess, onFail, options);    	    
    	
  		function onSuccess(imageURI) {  				
      		self.groomingPhoto = getRootName(imageURI);
      		alert(self.idImageGrooming().toString());
      		var img = document.getElementById(self.idImageGrooming().toString());
      		img.src = getRootName(imageURI);
      		message = "Foto de registro de Plaga # "+ self.idGrooming +" guardada con éxito...";
			getMessage(message, "#cleanMessage");						
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto de registro de plaga #" + self.idGrooming, alertMiss, "Foto cancelada", "Aceptar");
  		}
	}
}

// Overall viewmodel for this screen, along with initial state
function PersonalOutfitViewModel(self) {
	self.groomingAnswers = [{
		posibleAnswerID : 1,
		answerText : "Sí"
	}, {
		posibleAnswerID : 2,
		answerText : "No"
	}, {
		posibleAnswerID : 3,
		answerText : "No aplica"
	}];	
	self.grooming = ko.observableArray([new Grooming(1, self.groomingAnswers[0], self.groomingAnswers[0], self.groomingAnswers[0], self.groomingAnswers[0], self.groomingAnswers[0], self.groomingAnswers[0], self.groomingAnswers[0], self.groomingAnswers[0], self.groomingAnswers[0], self.groomingAnswers[0], "", "image1", "")]);		
	

	self.addGrooming = function() {
		self.grooming.push(new Grooming(self.grooming().length + 1, self.groomingAnswers[0], self.groomingAnswers[0], self.groomingAnswers[0], self.groomingAnswers[0], self.groomingAnswers[0], self.groomingAnswers[0], self.groomingAnswers[0], self.groomingAnswers[0], self.groomingAnswers[0], self.groomingAnswers[0], "", "image" + (self.grooming().length + 1), ""));
	}

	self.removeGrooming = function(groom) {self.grooming.remove(groom)}
}

// End Grooming

// ///////////////////ProductRegistration////////////////////////////////////
function Safety(id, Nausea, Diarrhea, OpenWound, Alcohol, Drugs, Kit, BM, PC, PD, Prevention, Comments, idImage, path) {
	var self2 = this;
	self2.idSafety = id;
	self2.nausea = ko.observable(Nausea);
	self2.diarrhea = ko.observable(Diarrhea);
	self2.openWound = ko.observable(OpenWound);
	self2.alcohol = ko.observable(Alcohol);
	self2.drugs = ko.observable(Drugs);
	self2.kit = ko.observable(Kit);
	self2.basicMaterials = ko.observable(BM);
	self2.protectionChemicals = ko.observable(PC);
	self2.protectionDesinfection = ko.observable(PD);
	self2.prevention = ko.observable(Prevention);
	self2.comments = ko.observable(Comments);	
	self2.photoSafety = ko.observable(Photo);
	self2.idImageSafety = ko.observable(idImage);


	self.takePhotoSafety = function() {
		var self = this;			
		var message;	
    	var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    	navigator.camera.getPicture(onSuccess, onFail, options);
  		function onSuccess(imageURI) {
  			var image = document.getElementById(self.idImageSafety().toString());
			image.src = getRootName(imageURI);
      		self.photoSafety = getRootName(imageURI);
      		message = "Foto de Registro del producto # " + self.idSafety + " guardada con éxito...";
      		getMessage(message, "#productRegistrationMessage");						
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Foto de Registro del producto #"+ self.idSafety +" se canceló", alertMiss, "Foto de Registro del producto", "Aceptar");
  		}   			
	}
}
function safetyViewModel(self) {
	self.safetyAnswers = [{
		posibleAnswerID : 1,
		answerText : "Sí"
	}, {
		posibleAnswerID : 2,
		answerText : "No"
	}, {
		posibleAnswerID : 3,
		answerText : "No aplica"
	}];	
	self.safety = ko.observableArray([]);	
	self.safety.push(new Safety(1, self.safetyAnswers[0], self.safetyAnswers[0], self.safetyAnswers[0], self.safetyAnswers[0], self.safetyAnswers[0], self.safetyAnswers[0], self.safetyAnswers[0], self.safetyAnswers[0], self.safetyAnswers[0], self.safetyAnswers[0], "", "imageSafety1", "")));

	self.addSafety = function() {
		self.safety.push(new Safety(self.safety().length + 1, self.safetyAnswers[0], self.safetyAnswers[0], self.safetyAnswers[0], self.safetyAnswers[0], self.safetyAnswers[0], self.safetyAnswers[0], self.safetyAnswers[0], self.safetyAnswers[0], self.safetyAnswers[0], self.safetyAnswers[0], "", "imageSafety" + (self.safety().length + 1), ""));
	}

	self.removeSafety = function(productRegistration) {self.safety.remove(productRegistration)}

	
}
// ////////////////////////////////////END 
// ProductRegistration////////////////////////////////////////////

// ///////////////////QualityProduct////////////////////////////////////
function QualityProduct(id, LMR, Comment6, ISD, Comment7, BottleWashing, Comment8, CollectionCenter, Comment9, ProtectionEquipment, Comment10, SprayEquipment, Comment11, ConditioningWater, Comment12, Photo, idImage){
	var self3 = this;	
	self3.idQualityProduct = id;
	self3.lmr = ko.observable(LMR);	
	self3.comment6 = ko.observable(Comment6);
	self3.isd = ko.observable(ISD);
	self3.comment7 = ko.observable(Comment7);	
	self3.bottleWashing = ko.observable(BottleWashing);	
	self3.comment8 = ko.observable(Comment8);
	self3.collectionCenter = ko.observable(CollectionCenter);	
	self3.comment9 = ko.observable(Comment9);
	self3.protectionEquipment = ko.observable(ProtectionEquipment);
	self3.comment10 = ko.observable(Comment10);
	self3.sprayEquipment = ko.observable(SprayEquipment);
	self3.comment11 = ko.observable(Comment11);
	self3.conditioningWater = ko.observable(ConditioningWater);
	self3.comment12 = ko.observable(Comment12);
	self3.photoQualityProduct = ko.observable(Photo);
	self3.idImageQualityProduct = ko.observable(idImage);

	self.takePhotoQualityProduct = function() {
		var self = this;			
		var message;	
    	var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    	navigator.camera.getPicture(onSuccess, onFail, options);
  		function onSuccess(imageURI) {
  			var image = document.getElementById(self.idImageQualityProduct().toString());
			image.src = getRootName(imageURI);
      		self.photoQualityProduct = getRootName(imageURI);
      		message = "Foto de Calidad del producto # " + self.idQualityProduct + " guardada con éxito...";
      		getMessage(message, "#qualityProductMessage");						
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Foto de Calidad del producto #"+ self.idQualityProduct +" se cancelo", alertMiss, "Foto de Calidad del producto", "Aceptar");
  		}   			
	}
}

// Overall viewmodel for this screen, along with initial state
function qualityProductViewModel (self) {
	// self = this;

	// Editable data
	self.productsQuality = ko.observableArray([]);
	self.productsQuality.push(new QualityProduct(self.productsQuality().length + 1, false, "", false, "", false, "", false, "", false, "", false, "", false, "", "", "qualityProduct" + (self.productsQuality().length + 1)));

	self.addQualityProduct = function() {
		self.productsQuality.push(new QualityProduct(self.productsQuality().length + 1, false, "", false, "", false, "", false, "", false, "", false, "", false, "", "", "qualityProduct" + (self.productsQuality().length + 1)));
	}

	self.removeQualityProduct = function(qualityProduct) {self.productsQuality.remove(qualityProduct)}

	self.getCommentQualityProduct6 = function(qualityProduct){										
		idComment = 6;
		index = (qualityProduct.idQualityProduct - 1);
		$("#idQualityProduct").html(qualityProduct.idQualityProduct);		
		$("#idQuestion2").html("1");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment6"));
		var comment = JSON.parse(jsonVar);				
		$("#CommentsQualityProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentQualityProduct7 = function(qualityProduct){						
		idComment = 7;
		index = (qualityProduct.idQualityProduct - 1);
		$("#idQualityProduct").html(qualityProduct.idQualityProduct);		
		$("#idQuestion2").html("2");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment7"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsQualityProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentQualityProduct8 = function(qualityProduct){						
		idComment = 8;
		index = (qualityProduct.idQualityProduct - 1);
		$("#idQualityProduct").html(qualityProduct.idQualityProduct);		
		$("#idQuestion2").html("3");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment8"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsQualityProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentQualityProduct9 = function(qualityProduct){						
		idComment = 9;
		index = (qualityProduct.idQualityProduct - 1);
		$("#idQualityProduct").html(qualityProduct.idQualityProduct);		
		$("#idQuestion2").html("4");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment9"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsQualityProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentQualityProduct10 = function(qualityProduct){						
		idComment = 10;
		index = (qualityProduct.idQualityProduct - 1);
		$("#idQualityProduct").html(qualityProduct.idQualityProduct);		
		$("#idQuestion2").html("5");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment10"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsQualityProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentQualityProduct11 = function(qualityProduct){						
		idComment = 11;
		index = (qualityProduct.idQualityProduct - 1);
		$("#idQualityProduct").html(qualityProduct.idQualityProduct);		
		$("#idQuestion2").html("6");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment11"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsQualityProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentQualityProduct12 = function(qualityProduct){						
		idComment = 12;
		index = (qualityProduct.idQualityProduct - 1);
		$("#idQualityProduct").html(qualityProduct.idQualityProduct);		
		$("#idQuestion2").html("7");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment12"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsQualityProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.saveCommentQualityProduct = function(qualityProduct){		
		var text = $("#CommentsQualityProduct").val();		
		switch(idComment){
			case 6:				
				self.productsQuality()[index].comment6 = text.toString();				
				$("#CommentsQualityProduct").html("");
			break;
			case 7:
				self.productsQuality()[index].comment7 = text.toString();				
				$("#CommentsQualityProduct").html("");
			break;
			case 8:
				self.productsQuality()[index].comment8 = text.toString();				
				$("#CommentsQualityProduct").html("");
			break;
			case 9:
				self.productsQuality()[index].comment9 = text.toString();				
				$("#CommentsQualityProduct").html("");
			break;
			case 10:
				self.productsQuality()[index].comment10 = text.toString();				
				$("#CommentsQualityProduct").html("");
			break;
			case 11:
				self.productsQuality()[index].comment11 = text.toString();				
				$("#CommentsQualityProduct").html("");
			break;
			case 12:
				self.productsQuality()[index].comment12 = text.toString();				
				$("#CommentsQualityProduct").html("");
			break;
		}
	}
}

// ////////////////////////////////////END
// QualityProduct////////////////////////////////////////////

// /////////////////////////ConcentratedProduct////////////////////////////////////////
function ConcentratedProduct(id, Product, Comment13, Concentration, Comment14, FillingDate, Comment15, Photo, idImage) {
	var self4 = this;
	self4.idConcentratedProduct = id;
	self4.product = ko.observable(Product);
	self4.comment13 = ko.observable(Comment13);
	self4.concentration = ko.observable(Concentration);	
	self4.comment14 = ko.observable(Comment14);
	self4.fillingDate = ko.observable(FillingDate);	
	self4.comment15 = ko.observable(Comment15);
	self4.photoConcentratedProduct = ko.observable(Photo);
	self4.idImageConcentratedProduct = ko.observable(idImage);

	self.takePhotoConcentratedProduct = function() {
		var self = this;		
		var message;
    	var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    	navigator.camera.getPicture(onSuccess, onFail, options); 

  		function onSuccess(imageURI) {

  			var image = document.getElementById(self.idImageConcentratedProduct().toString());
			image.src = getRootName(imageURI);
      		self.photoConcentratedProduct = getRootName(imageURI);
      		message = "Foto del Concentración del producto # " + self.idConcentratedProduct + " guardada con éxito...";
      		getMessage(message, "#concentratedProductMessage");						
  		}
  		function onFail(message) {
    		navigator.notification.alert("Foto del Concentración del producto #"+ self.idConcentratedProduct +" se canceló", alertMiss, "Foto del Concentración del producto", "Aceptar");
  		}
	}
}
// Overall viewmodel for this screen, along with initial state
function concentratedProductViewModel(self) {
	// self = this;

	// Editable data
	self.concetrationProducts = ko.observableArray([]);
	self.concetrationProducts.push(new ConcentratedProduct(self.concetrationProducts().length + 1, "", "", "", "", "", "", "", "concentratedProduct" + (self.concetrationProducts().length + 1)));
	//window.localStorage.setItem("concetrationProducts", self.concetrationProducts);

	self.addConcentratedProduct = function() {		
		self.concetrationProducts.push(new ConcentratedProduct(self.concetrationProducts().length + 1, "", "", "", "", "", "", "", "concentratedProduct" + (self.concetrationProducts().length + 1)));
		$("div[class*='input-append date']").datetimepicker({
      		pickTime: false,
        	autoclose: true
    	});
	}

	self.removeConcentratedProduct = function(concentratedProduct) {self.concetrationProducts.remove(concentratedProduct)}

	self.getCommentConcentratedProduct13 = function(concentratedProduct){										
		idComment = 13;
		index = (concentratedProduct.idConcentratedProduct - 1);		
		$("#idConcentratedProduct").html(concentratedProduct.idConcentratedProduct);		
		$("#idQuestion3").html("1");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment13"));
		var comment = JSON.parse(jsonVar);				
		$("#CommentsConcentratedProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentConcentratedProduct14 = function(concentratedProduct){										
		idComment = 14;
		index = (concentratedProduct.idConcentratedProduct - 1);
		$("#idConcentratedProduct").html(concentratedProduct.idConcentratedProduct);		
		$("#idQuestion3").html("2");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment14"));
		var comment = JSON.parse(jsonVar);				
		$("#CommentsConcentratedProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentConcentratedProduct15 = function(concentratedProduct){										
		idComment = 15;
		index = (concentratedProduct.idConcentratedProduct - 1);
		$("#idConcentratedProduct").html(concentratedProduct.idConcentratedProduct);		
		$("#idQuestion3").html("3");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment15"));
		var comment = JSON.parse(jsonVar);				
		$("#CommentsConcentratedProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.saveCommentConcentratedProduct = function(concentratedProduct){
		var text = $("#CommentsConcentratedProduct").val();				
		switch(idComment){
			case 13:
				self.concetrationProducts()[index].comment13 = text.toString();												
				$("#CommentsConcentratedProduct").html("");
			break;
			case 14:
				self.concetrationProducts()[index].comment14 = text.toString();				
				$("#CommentsConcentratedProduct").html("");
			break;
			case 15:
				self.concetrationProducts()[index].comment15 = text.toString();				
				$("#CommentsConcentratedProduct").html("");
			break;
		}
	}
}

//End ConcentratedProduct

// ResponsibleApplication

function ResponsibleApplication(id, Approved, Responsible){
	var self5 = this;
	self5.idResponsibleApplication = id;			
	self5.approved = ko.observable(Approved);
	self5.responsible = ko.observable(Responsible);

	self.takePhotoResponsibleApplication = function() {
		var self= this;		
		var message;
    	var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    	navigator.camera.getPicture(onSuccess, onFail, options); 

  		function onSuccess(imageURI) {  			
      		var image = document.getElementById(self.idImageResponsibleApplication().toString());
			image.src = getRootName(imageURI);
      		self.photoResponsibleApplication = getRootName(imageURI);
      		message = "Foto de Responsabilidad de aplicación # " + self.idResponsibleApplication + " guardado con éxito... ";
      		getMessage(message, "#responsabilityImplementationMessage");						
  		}
  		function onFail(message) {
    		navigator.notification.alert("Foto del Responsabilidad de aplicación #"+ self.idResponsibleApplication +" se canceló", alertMiss, "Foto de Responsabilidad de aplicación", "Aceptar");
  		}
	}

}
function responsabilityApplicationViewModel(self){

	// Editable data
	self.responsiblesApplication = ko.observableArray([]);
	self.responsiblesApplication.push(new ResponsibleApplication(self.responsiblesApplication().length + 1, "", ""));

	self.addResponsibleApplication = function() {		
		self.responsiblesApplication.push(new ResponsibleApplication(self.responsiblesApplication().length + 1, "", ""));
	}

	self.removeResponsibleApplication = function(responsibleApplication) {
		self.responsiblesApplication.remove(responsibleApplication)
	}
}

function saveAllClean() {
	db.transaction(save, errorCB);
}

function save(tx) {	
	//DatePickers
	$("input[name='datePicker']").each(function(index, value){								
			datesArray.push($(this).val());			
	});
	getAllDates(datesArray);

	// BUILDING JSON informationAreas	
	var informationAreasToJSON = ko.mapping.toJSON(self.informationAreas);			
	// BUILDING JASON productsRegistration
	var productsRegistrationToJSON = ko.mapping.toJSON(self.productsRegistration);
	// /BUILDING JSON productsQuality
	var productsQualityToJSON = ko.mapping.toJSON(self.productsQuality);		
	// BULDING JSON concetrationProducts
	var concetrationProductsToJSON = ko.mapping.toJSON(self.concetrationProducts);		
	// BULDING JSON responsiblesApplication
	var responsiblesApplicationToJSON = ko.mapping.toJSON(self.responsiblesApplication);

	//DatePickers
	$("input[name='datePicker']").each(function(index, value){								
			datesArray.push($(this).val());			
	});	
	
	getGPS();
	var query = 'INSERT INTO pesticides (informationArea, productRegistration, productQuality, concetrationProduct, responsibleApplication, datePickers, timestamp, gps, idOrchard, finished, synchronized)';
	query += "VALUES ('" + informationAreasToJSON + "', '" + productsRegistrationToJSON + "', '" + productsQualityToJSON + "', '"+ concetrationProductsToJSON +"', '"+ responsiblesApplicationToJSON +"', '" + datesArray + "', '" + getCurrentDateTime() + "','" + gps + "', '"+ orchardMasterId + "', "+ 1 +", 0)";				
	tx.executeSql(query);		
	Message = "Se guardó Aplicación de plaguicidas";
	getPage(
			"file:///android_asset/www/views/pesticides/index.title.html",
			"file:///android_asset/www/views/pesticides/index.html");
}
$("#getHomeTablet").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
$("#getHomePhone").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});

function getAllDates(dateArray){
	var dates = [];
	dates = dateArray;	
	$("input[name='datePicker']").each(function(index, value){									
			$(this).val(dates[index]);
	});	
}