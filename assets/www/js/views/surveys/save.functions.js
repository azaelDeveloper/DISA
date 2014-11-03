function pesticideMasterViewModel() {
	self = this;
	informationAreaViewModel(self);
	productRegistrationViewModel(self);
	qualityProductViewModel(self);
	concentratedProductViewModel(self);
	responsabilityApplicationViewModel(self);
}
// ///////////////////InformationArea////////////////////////////////////
function InformationArea(id, Crop, DateApplication, Surface, Location, Producer, ProductUnit) {
	var self1 = this;
	self1.idAreaInfo = id;
	self1.crop = ko.observable(Crop);
	self1.dateApplication = ko.observable(DateApplication);		
	self1.surface = ko.observable(Surface);
	self1.location = ko.observable(Location);
	self1.producer = ko.observable(Producer);
	self1.productoUnit = ko.observable(ProductUnit);
}

// Overall viewmodel for this screen, along with initial state
function informationAreaViewModel(self) {
	// var self = this;

	// Editable data
	self.informationAreas = ko.observableArray([]);	
	self.informationAreas.push(new InformationArea(1, "", "", "", "", "", ""));

	self.addInformationArea = function() {
		self.informationAreas.push(new InformationArea(self.informationAreas().length + 1, "", "", "", "", "", ""));
	}

	self.removeInformationArea = function(informationArea) {self.informationAreas.remove(informationArea)}
}

// End InformationArea

// ///////////////////ProductRegistration////////////////////////////////////
function ProductRegistration(id, Product, Comment1, ActiveIngredient, Comment2, DoseWater, Comment3, CropDay, Comment4, PeriodReEntry, Comment5, Photo, idImage){
	var self2 = this;
	self2.idProductRegistration = id;
	self2.product = ko.observable(Product);
	self2.comment1 = ko.observable(Comment1);
	self2.activeIngredient = ko.observable(ActiveIngredient);
	self2.comment2 = ko.observable(Comment2);
	self2.doseWater = ko.observable(DoseWater);
	self2.comment3 = ko.observable(Comment3);
	self2.cropDay = ko.observable(CropDay);
	self2.comment4 = ko.observable(Comment4);
	self2.periodReEntry = ko.observable(PeriodReEntry);
	self2.comment5 = ko.observable(Comment5);
	self2.photoProductRegistration = ko.observable(Photo);
	self2.idImageProductRegistration = ko.observable(idImage);

	self.takePhotoProductRegistration = function() {
		var self = this;			
		var message;	
    	var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    	navigator.camera.getPicture(onSuccess, onFail, options);
  		function onSuccess(imageURI) {
  			var image = document.getElementById(self.idImageProductRegistration().toString());
			image.src = getRootName(imageURI);
      		self.photoProductRegistration = getRootName(imageURI);
      		message = "Foto de Registro del producto # " + self.idProductRegistration + " guardada con éxito...";
      		getMessage(message, "#productRegistrationMessage");						
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Foto de Registro del producto #"+ self.idProductRegistration +" se canceló", alertMiss, "Foto de Registro del producto", "Aceptar");
  		}   			
	}
}
function productRegistrationViewModel(self) {

	self.productsRegistration = ko.observableArray([]);	
	self.productsRegistration.push(new ProductRegistration(self.productsRegistration().length + 1, "", "", "", "", "", "", "", "", "", "", "", "productRegistration" + (self.productsRegistration().length + 1)));

	self.addProductRegistration = function() {
		self.productsRegistration.push(new ProductRegistration(self.productsRegistration().length + 1, "", "", "", "", "", "", "", "", "", "", "", "productRegistration" + (self.productsRegistration().length + 1)));
	}

	self.removeProductRegistration = function(productRegistration) {self.productsRegistration.remove(productRegistration)}

	self.getCommentProductRegistration1 = function(productRegistration){										
		idComment = 1;
		index = (productRegistration.idProductRegistration - 1);
		$("#idProductRegistration").html(productRegistration.idProductRegistration);		
		$("#idQuestion1").html("1");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment1"));
		var comment = JSON.parse(jsonVar);				
		$("#CommentsProductRegistration").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentProductRegistration2 = function(productRegistration){						
		idComment = 2;
		index = (productRegistration.idProductRegistration - 1);
		$("#idProductRegistration").html(productRegistration.idProductRegistration);		
		$("#idQuestion1").html("2");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment2"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsProductRegistration").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentProductRegistration3 = function(productRegistration){						
		idComment = 3;
		index = (productRegistration.idProductRegistration - 1);
		$("#idProductRegistration").html(productRegistration.idProductRegistration);		
		$("#idQuestion1").html("3");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment3"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsProductRegistration").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentProductRegistration4 = function(productRegistration){						
		idComment = 4;
		index = (productRegistration.idProductRegistration - 1);
		$("#idProductRegistration").html(productRegistration.idProductRegistration);		
		$("#idQuestion1").html("4");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment4"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsProductRegistration").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentProductRegistration5 = function(productRegistration){						
		idComment = 5;
		index = (productRegistration.idProductRegistration - 1);
		$("#idProductRegistration").html(productRegistration.idProductRegistration);		
		$("#idQuestion1").html("5");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment5"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsProductRegistration").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.saveCommentProductRegistration = function(productRegistration){		
		var text = $("#CommentsProductRegistration").val();		
		switch(idComment){
			case 1:				
				self.productsRegistration()[index].comment1 = text.toString();				
				$("#CommentsProductRegistration").html("");
			break;
			case 2:
				self.productsRegistration()[index].comment2 = text.toString();				
				$("#CommentsProductRegistration").html("");
			break;
			case 3:
				self.productsRegistration()[index].comment3 = text.toString();				
				$("#CommentsProductRegistration").html("");
			break;
			case 4:
				self.productsRegistration()[index].comment4 = text.toString();				
				$("#CommentsProductRegistration").html("");
			break;
			case 5:
				self.productsRegistration()[index].comment5 = text.toString();				
				$("#CommentsProductRegistration").html("");
			break;
		}
	}
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

function saveAllPesticide() {
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