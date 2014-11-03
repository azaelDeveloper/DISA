function pesticideMasterViewModel(informationAreas, productsRegistration, qualityProducts, concentratedProducts, responsabilityApplication) {
	var self = this;
	self.informationAreasArray = ko.observableArray([]);
	self.informationAreasArray(informationAreas);
	self.productsRegistrationArray = ko.observableArray([]);
	self.productsRegistrationArray(productsRegistration);
	self.productsQualityArray = ko.observableArray([]);
	self.productsQualityArray(qualityProducts);
	self.concetrationProductsArray = ko.observableArray([]);
	self.concetrationProductsArray(concentratedProducts);
	self.responsiblesApplicationArray = ko.observableArray([]);
	self.responsiblesApplicationArray(responsabilityApplication);

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

	self.addInformationArea = function() {
		self.informationAreasArray.push(new InformationArea(self.informationAreasArray().length + 1, "", "", "", "", "", ""));
	}

	self.removeInformationArea = function(informationArea) {
		self.informationAreasArray.remove(informationArea)
	}

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
	}

	self.addProductRegistration = function() {
		self.productsRegistrationArray.push(new ProductRegistration(self.productsRegistrationArray().length + 1, "", "", "", "", "", "", "", "", "", "", "", "productRegistration" + (self.productsRegistrationArray().length + 1)));
	}

	self.removeProductRegistration = function(productRegistration) {
		self.productsRegistrationArray.remove(productRegistration)
	}

	self.takePhotoProductRegistration = function() {
		var IndexOfProductRegistration = $(this).attr("idProductRegistration");
		IndexOfProductRegistration = (IndexOfProductRegistration - 1);			
    	var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    	navigator.camera.getPicture(onSuccess, onFail, options);    	

  		function onSuccess(imageURI) {  
  			if(document.getElementById(self.productsRegistrationArray()[IndexOfProductRegistration].idImageProductRegistration) != null)
  			{
  				self.productsRegistrationArray()[IndexOfProductRegistration].photoProductRegistration = getRootName(imageURI);
      			var image = document.getElementById(self.productsRegistrationArray()[IndexOfProductRegistration].idImageProductRegistration);
				image.src = getRootName(imageURI);
				message = "Foto de Registro del producto # "+ (IndexOfProductRegistration + 1) +" guardada con éxito...";
				getMessage(message, "#productRegistrationMessage");	
  			}	
  			else
  			{
  				self.productsRegistrationArray()[IndexOfProductRegistration].photoProductRegistration(getRootName(imageURI));
      			var image = document.getElementById(self.productsRegistrationArray()[IndexOfProductRegistration].idImageProductRegistration().toString());
				image.src = getRootName(imageURI);
				message = "Foto de Registro del producto # "+ (IndexOfProductRegistration + 1) +" guardada con éxito...";
				getMessage(message, "#productRegistrationMessage");	
  			}	
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto de Registro del producto", alertMiss, 'Foto de Registro del producto #' + (IndexOfProductRegistration + 1), 'Aceptar');
  		}  	
	}

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
				self.productsRegistrationArray()[index].comment1 = text.toString();				
				$("#CommentsProductRegistration").html("");
			break;
			case 2:
				self.productsRegistrationArray()[index].comment2 = text.toString();				
				$("#CommentsProductRegistration").html("");
			break;
			case 3:
				self.productsRegistrationArray()[index].comment3 = text.toString();				
				$("#CommentsProductRegistration").html("");
			break;
			case 4:
				self.productsRegistrationArray()[index].comment4 = text.toString();				
				$("#CommentsProductRegistration").html("");
			break;
			case 5:
				self.productsRegistrationArray()[index].comment5 = text.toString();				
				$("#CommentsProductRegistration").html("");
			break;
		}
	}

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
	}

	self.addQualityProduct = function() {
		self.productsQualityArray.push(new QualityProduct(self.productsQualityArray().length + 1, false, "", false, "", false, "", false, "", false, "", false, "", false, "", "", "qualityProduct" + (self.productsQualityArray().length + 1)));
	}

	self.removeQualityProduct = function(qualityProduct) {
		self.productsQualityArray.remove(qualityProduct)
	}

	self.takePhotoQualityProduct = function() {
		var IndexOfQualityProduct = $(this).attr("idQualityProduct");
		IndexOfQualityProduct = (IndexOfQualityProduct - 1);			
    	var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    	navigator.camera.getPicture(onSuccess, onFail, options);    	

  		function onSuccess(imageURI) {  
  			if(document.getElementById(self.productsQualityArray()[IndexOfQualityProduct].idImageQualityProduct) != null)
  			{
  				self.productsQualityArray()[IndexOfQualityProduct].photoQualityProduct = getRootName(imageURI);
      			var image = document.getElementById(self.productsQualityArray()[IndexOfQualityProduct].idImageQualityProduct);
				image.src = getRootName(imageURI);
				message = "Foto de Calidad del producto  # "+ (IndexOfQualityProduct + 1) +" guardada con éxito...";
				getMessage(message, "#qualityProductMessage");	
  			}	
  			else
  			{
  				self.productsQualityArray()[IndexOfQualityProduct].photoQualityProduct(getRootName(imageURI));
      			var image = document.getElementById(self.productsQualityArray()[IndexOfQualityProduct].idImageQualityProduct().toString());
				image.src = getRootName(imageURI);
				message = "Foto de Calidad del producto  # "+ (IndexOfQualityProduct + 1) +" guardada con éxito...";
				getMessage(message, "#qualityProductMessage");	
  			}	
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto de Calidad del producto ", alertMiss, 'Foto de Calidad del producto  #' + (IndexOfQualityProduct + 1), 'Aceptar');
  		}
	}

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
				self.productsQualityArray()[index].comment6 = text.toString();				
				$("#CommentsQualityProduct").html("");
			break;
			case 7:
				self.productsQualityArray()[index].comment7 = text.toString();				
				$("#CommentsQualityProduct").html("");
			break;
			case 8:
				self.productsQualityArray()[index].comment8 = text.toString();				
				$("#CommentsQualityProduct").html("");
			break;
			case 9:
				self.productsQualityArray()[index].comment9 = text.toString();				
				$("#CommentsQualityProduct").html("");
			break;
			case 10:
				self.productsQualityArray()[index].comment10 = text.toString();				
				$("#CommentsQualityProduct").html("");
			break;
			case 11:
				self.productsQualityArray()[index].comment11 = text.toString();				
				$("#CommentsQualityProduct").html("");
			break;
			case 12:
				self.productsQualityArray()[index].comment12 = text.toString();				
				$("#CommentsQualityProduct").html("");
			break;
		}
	}

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
	}

	self.addConcentratedProduct = function() {		
		self.concetrationProductsArray.push(new ConcentratedProduct(self.concetrationProductsArray().length + 1, "", "", "", "", "", "", "", "concentratedProduct" + (self.concetrationProductsArray().length + 1)));
		$("div[class*='input-append date']").datetimepicker({
      		pickTime: false
    	});
	}

	self.removeConcentratedProduct = function(concentratedProduct) {
		self.concetrationProductsArray.remove(concentratedProduct)
	}

	self.takePhotoConcentratedProduct = function() {
		var IndexOfConcentratedProduct = $(this).attr("idConcentratedProduct");
		IndexOfConcentratedProduct = (IndexOfConcentratedProduct - 1);			
    	var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    	navigator.camera.getPicture(onSuccess, onFail, options);    	

  		function onSuccess(imageURI) {  
  			if(document.getElementById(self.concetrationProductsArray()[IndexOfConcentratedProduct].idImageConcentratedProduct) != null)
  			{
  				self.concetrationProductsArray()[IndexOfConcentratedProduct].photoConcentratedProduct = getRootName(imageURI);
      			var image = document.getElementById(self.concetrationProductsArray()[IndexOfConcentratedProduct].idImageConcentratedProduct);
				image.src = getRootName(imageURI);
				message = "Foto del Concentración del producto  # "+ (IndexOfConcentratedProduct + 1) +" guardada con éxito...";
				getMessage(message, "#concentratedProductMessage");	
  			}	
  			else
  			{
  				self.concetrationProductsArray()[IndexOfConcentratedProduct].photoConcentratedProduct(getRootName(imageURI));
      			var image = document.getElementById(self.concetrationProductsArray()[IndexOfConcentratedProduct].idImageConcentratedProduct().toString());
				image.src = getRootName(imageURI);
				message = "Foto del Concentración del producto  # "+ (IndexOfConcentratedProduct + 1) +" guardada con éxito...";
				getMessage(message, "#concentratedProductMessage");	
  			}	
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto del Concentración del producto ", alertMiss, 'Foto de del Concentración del producto  #' + (IndexOfConcentratedProduct + 1), 'Aceptar');
  		}  	
	}

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
				self.concetrationProductsArray()[index].comment13 = text.toString();												
				$("#CommentsConcentratedProduct").html("");
			break;
			case 14:
				self.concetrationProductsArray()[index].comment14 = text.toString();				
				$("#CommentsConcentratedProduct").html("");
			break;
			case 15:
				self.concetrationProductsArray()[index].comment15 = text.toString();				
				$("#CommentsConcentratedProduct").html("");
			break;
		}
	}

	function ResponsibleApplication(id, Approved, Responsible){
		var self5 = this;
		self5.idResponsibleApplication = id;			
		self5.approved = ko.observable(Approved);
		self5.responsible = ko.observable(Responsible);
	}

	self.addResponsibleApplication = function() {		
		self.responsiblesApplicationArray.push(new ResponsibleApplication(self.responsiblesApplicationArray().length + 1, "", ""));
	}

	self.removeResponsibleApplication = function(responsibleApplication) {
		self.responsiblesApplicationArray.remove(responsibleApplication)
	}

	self.updateAll = function(){	
		//Creates the JSON SuppliersInformation
		var informationAreasToJSON = ko.mapping.toJSON(self.informationAreasArray);
		//Creates the JSON Ratings	
		var productsRegistrationToJSON = ko.mapping.toJSON(self.productsRegistrationArray);						
		//Creates the JSON  FeatureProduct
		var productsQualityToJSON = ko.mapping.toJSON(self.productsQualityArray);
		//Creates the JSON  FeatureProduct
		var concetrationProductsToJSON = ko.mapping.toJSON(self.concetrationProductsArray);
		//Creates the JSON  FeatureProduct
		var responsiblesApplicationToJSON = ko.mapping.toJSON(self.responsiblesApplicationArray);

		db.transaction(updateDB, errorCB);

		function updateDB(tx) {
			getGPS();
			var dates = fillArrayDates();
			var query = 'UPDATE pesticides SET ';
			query += "informationArea='" + informationAreasToJSON + "', productRegistration='" + productsRegistrationToJSON + "', productQuality='" + productsQualityToJSON + "', concetrationProduct='" + concetrationProductsToJSON + "', responsibleApplication='" + responsiblesApplicationToJSON + "', datePickers = '"+ dates +"', timestamp='" +  getCurrentDateTime() 	+ "', gps='" + gps + "' WHERE id=" + pesticidesMasterId;
			tx.executeSql(query);
			getAllDates(dates);
			Message = "Se actualizó Master # " + pesticidesMasterId;
			getPage("file:///android_asset/www/views/pesticides/index.title.html",
				"file:///android_asset/www/views/pesticides/index.html");

		}
	}
}

function queryDB(tx) {
	tx.executeSql('SELECT * FROM pesticides where id=' + pesticidesMasterId, [],
			querySuccess, errorCB);
}

function querySuccess(tx, results) {
	var len = results.rows.length;
	if (len > 0) {
		informationArea = results.rows.item(0).informationArea;
		productRegistration = results.rows.item(0).productRegistration;
		productQuality = results.rows.item(0).productQuality;
		concetrationProduct = results.rows.item(0).concetrationProduct;
		responsibleApplication = results.rows.item(0).responsibleApplication;
		currentDate = results.rows.item(0).timestamp;
	}			
	viewModel = new pesticideMasterViewModel(eval(informationArea), eval(productRegistration), eval(productQuality), eval(concetrationProduct), eval(responsibleApplication));
	ko.applyBindings(viewModel);
	$("div[class*='input-append date']").datetimepicker({
  		pickTime: false,
        autoclose: true
	});
	fillImages(eval(productRegistration), eval(productQuality), eval(concetrationProduct));
}

function fillImages(productRegistration, productQuality, concetrationProduct){
	var self = this;
	i=0;
	self.productRegistrationPhotos = ko.observableArray([]);
	self.productRegistrationPhotos(productRegistration);
	while(i < self.productRegistrationPhotos().length){
		var imgB = document.getElementById(self.productRegistrationPhotos()[i].idImageProductRegistration);
		imgB.src = self.productRegistrationPhotos()[i].photoProductRegistration;
		i++;
	}
	i=0;
	self.productQualityPhotos = ko.observableArray([]);
	self.productQualityPhotos(productQuality);
	while (i < self.productQualityPhotos().length){
		var imgT = document.getElementById(self.productQualityPhotos()[i].idImageQualityProduct);
		imgT.src = self.productQualityPhotos()[i].photoQualityProduct;
		i++;
	}
	i=0;
	self.concetrationProductPhotos = ko.observableArray([]);
	self.concetrationProductPhotos(concetrationProduct);
	while (i < self.concetrationProductPhotos().length){
		var imgC = document.getElementById(self.concetrationProductPhotos()[i].idImageConcentratedProduct);
		imgC.src = self.concetrationProductPhotos()[i].photoConcentratedProduct;
		i++;
	}
}

function getAllDates(dateArray){
	var dates = [];
	dates = dateArray;	
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