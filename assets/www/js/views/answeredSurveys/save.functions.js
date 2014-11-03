function supplierMasterViewModel() {	
	self = this;
	suppliersInformationViewModel(self);	
	ratingViewModel(self);
	featureProductViewModel(self);
}
// ///////////////////suppliersInformation////////////////////////////////////
function SupplierInformation(id, company, representative, crop, production, surface, location, validity, responsible) {
	var self1 = this;
	self1.idSuppliersInformation = id;
	self1.company = ko.observable(company);
	self1.representative = ko.observable(representative);
	self1.crop = ko.observable(crop);
	self1.production = ko.observable(production);
	self1.surface = ko.observable(surface);
	self1.location = ko.observable(location);
	self1.validity = ko.observable(validity);
	self1.responsible = ko.observable(responsible);
}
// Overall viewmodel for this screen, along with initial state
function suppliersInformationViewModel(self) {
	// Editable data
	self.suppliersInformation = ko.observableArray([ new SupplierInformation(1, "", "", "", "", "", "", "", "")]);	

	self.addSuppliersInformation = function() {
		self.suppliersInformation.push(new SupplierInformation(self.suppliersInformation().length + 1, "", "", "", "", "", "", "", ""));
	}

	self.removeSuppliersInformation = function(supplierInformation) {self.suppliersInformation.remove(supplierInformation);}
}
// ////////////////////////////////////END
// suppliersInformation////////////////////////////////////////////

// ///////////////////rating////////////////////////////////////
function Rating(row, frequency, Comment1, inspection, Comment2, security, Comment3, analysis, Comment4, register, Comment5, photo, idImg){
	var self2 = this;
	self2.idRating = row;
	self2.frequency = ko.observable(frequency);
	self2.comment1 = ko.observable(Comment1);
	self2.inspection = ko.observable(inspection);
	self2.comment2 = ko.observable(Comment2);
	self2.security = ko.observable(security);
	self2.comment3 = ko.observable(Comment3);
	self2.analysis = ko.observable(analysis);
	self2.comment4 = ko.observable(Comment4);
	self2.register = ko.observable(register);
	self2.comment5 = ko.observable(Comment5);
	self2.photoRating = ko.observable(photo);
	self2.idImageRating = ko.observable(idImg);

	self.takePhotoRating = function() {
		var self = this;	
		var message;		
	    var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
	    navigator.camera.getPicture(onSuccess, onFail, options);    	    
    	
  		function onSuccess(imageURI) {  				
      		self.photoRating = getRootName(imageURI);
      		var img = document.getElementById(self.idImageRating().toString());
      		img.src = getRootName(imageURI);
      		message = "Foto de evaluación # "+ self.idRating +" guardada con éxito...";
			getMessage(message, "#featureProductMessage");						
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto de evaluación #" + self.idRating, alertMiss, "Foto cancelada", "Aceptar");
  		}
	}
}
function ratingViewModel(self) {
	// Array's of Select's
	self.availableAnswers1 = [ {
		answerVal : 0,
		answerText : "Excelente"
	}, {
		answerVal : 1,
		answerText : "Buena"
	}, {
		answerVal : 2,
		answerText : "Regular"
	}, {
		answerVal : 3,
		answerText : "Mala"
	} ];

	self.ratings = ko.observableArray([ new Rating(1, "","", self.availableAnswers1[0], "", false, "", false, "", false, "", "", "rating1")]);	

	self.addRating = function() {
		self.ratings.push(new Rating(self.ratings().length + 1, "","", self.availableAnswers1[0], "", false, "", false, "", false, "", "", "rating" + (self.ratings().length + 1)));
	}

	self.removeRating = function(rating) {self.ratings.remove(rating);}

	self.getCommentRating1 = function(rating){										
		idComment = 1;
		index = (rating.idRating - 1);
		$("#idRating").html(rating.idRating);		
		$("#idQuestion1").html("1");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment1"));
		var comment = JSON.parse(jsonVar);				
		$("#CommentsRating").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentRating2 = function(rating){						
		idComment = 2;
		index = (rating.idRating - 1);
		$("#idRating").html(rating.idRating);		
		$("#idQuestion1").html("2");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment2"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsRating").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentRating3 = function(rating){						
		idComment = 3;
		index = (rating.idRating - 1);
		$("#idRating").html(rating.idRating);		
		$("#idQuestion1").html("3");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment3"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsRating").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentRating4 = function(rating){						
		idComment = 4;
		index = (rating.idRating - 1);
		$("#idRating").html(rating.idRating);		
		$("#idQuestion1").html("4");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment4"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsRating").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentRating5 = function(rating){						
		idComment = 5;
		index = (rating.idRating - 1);
		$("#idRating").html(rating.idRating);		
		$("#idQuestion1").html("5");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment5"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsRating").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.saveCommentRating = function(rating){		
		var text = $("#CommentsRating").val();		
		switch(idComment){
			case 1:				
				self.ratings()[index].comment1 = text.toString();				
				$("#CommentsRating").html("");
			break;
			case 2:
				self.ratings()[index].comment2 = text.toString();				
				$("#CommentsRating").html("");
			break;
			case 3:
				self.ratings()[index].comment3 = text.toString();				
				$("#CommentsRating").html("");
			break;
			case 4:
				self.ratings()[index].comment4 = text.toString();				
				$("#CommentsRating").html("");
			break;
			case 5:
				self.ratings()[index].comment5 = text.toString();				
				$("#CommentsRating").html("");
			break;
		}
	}
}
// ////////////////////////////////////END
// rating////////////////////////////////////////////

// ///////////////////featureProduct////////////////////////////////////
function FeatureProduct(row, purchase, Comment6, recommendations, Comment7, result, Comment8, approved, Comment9, list, Comment10, nextDate, Comment11, photo, idImg){
	self3 = this;
	self3.idFeatureProduct = row;
	self3.purchase = ko.observable(purchase);	
	self3.comment6 = ko.observable(Comment6);
	self3.recommendations = ko.observable(recommendations);	
	self3.comment7 = ko.observable(Comment7);
	self3.result = ko.observable(result);	
	self3.comment8 = ko.observable(Comment8);
	self3.approved = ko.observable(approved);
	self3.comment9 = ko.observable(Comment9);
	self3.list = ko.observable(list);
	self3.comment10 = ko.observable(Comment10);
	self3.nextDate = ko.observable(nextDate);
	self3.comment11 = ko.observable(Comment11);
	self3.photoFeatureProduct = ko.observable(photo);
	self3.idImageFeatureProduct = ko.observable(idImg);

	self3.result = ko.computed(function() {
        var purchase = self3.purchase().answerVal;
        var recommendation = self3.recommendations().answerVal;
        return getResult(purchase, recommendation);        
    });

    self3.approved = ko.computed(function() {
    	var purchase = self3.purchase().answerVal;
        var recommendation = self3.recommendations().answerVal;
        var result = getResult(purchase, recommendation);
        return getApproved(result);        
    });

	self.takePhotoFeatureProduct = function() {
		var self = this;	
		var message;		
	    var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
	    navigator.camera.getPicture(onSuccess, onFail, options);    	    
    	
  		function onSuccess(imageURI) {  				
      		self.photoFeatureProduct = getRootName(imageURI);
      		var img = document.getElementById(self.idImageFeatureProduct().toString());
      		img.src = getRootName(imageURI);
      		message = "Foto de característica del producto # "+ self.idFeatureProduct +" guardada con éxito...";
			getMessage(message, "#featureProductMessage");						
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto de característica del producto #" + self.idFeatureProduct, alertMiss, "Foto cancelada", "Aceptar");
  		}
	}	
}

// Overall viewmodel for this screen, along with initial state
function featureProductViewModel(self) {
	// self = this;
	// Array's of Select's
	self.availableAnswers2 = [ {
		answerVal : 0,
		answerText : "Ideal"
	}, {
		answerVal : 1,
		answerText : "Suficiente"
	}, {
		answerVal : 2,
		answerText : "Regular"
	}, {
		answerVal : 3,
		answerText : "Irregular"
	}, {
		answerVal : 4,
		answerText : "Deficiente"
	} ];

	// Editable data
	self.featureProducts = ko.observableArray([ new FeatureProduct(1,
			self.availableAnswers2[0], "", self.availableAnswers2[0], "", 
			200, "", "Si", "", false, "", "", "", "", "featureProduct1")]);

	self.addFeatureProduct = function() {
		self.featureProducts.push(new FeatureProduct(self.featureProducts().length + 1,
				self.availableAnswers2[0], "", self.availableAnswers2[0], "", 
				200, "", "Si", "", false, "", "", "", "", "featureProduct" + (self.featureProducts().length + 1)));
		$("div[class*='input-append date']").datetimepicker({
      		pickTime: false,
        	autoclose: true
    	});
	}

	self.removeFeatureProduct = function(featureProduct) {self.featureProducts.remove(featureProduct);}

	self.getCommentFeatureProduct6 = function(featureProduct){										
		idComment = 1;
		index = (featureProduct.idFeatureProduct - 1);
		$("#idFeatureProduct").html(featureProduct.idFeatureProduct);		
		$("#idQuestion2").html("1");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment6"));
		var comment = JSON.parse(jsonVar);				
		$("#CommentsFeatureProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentFeatureProduct7 = function(featureProduct){						
		idComment = 2;
		index = (featureProduct.idFeatureProduct - 1);
		$("#idFeatureProduct").html(featureProduct.idFeatureProduct);		
		$("#idQuestion2").html("2");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment7"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsFeatureProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentFeatureProduct8 = function(featureProduct){						
		idComment = 3;
		index = (featureProduct.idFeatureProduct - 1);
		$("#idFeatureProduct").html(featureProduct.idFeatureProduct);		
		$("#idQuestion2").html("3");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment8"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsFeatureProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentFeatureProduct9 = function(featureProduct){						
		idComment = 4;
		index = (featureProduct.idFeatureProduct - 1);
		$("#idFeatureProduct").html(featureProduct.idFeatureProduct);		
		$("#idQuestion2").html("4");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment9"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsFeatureProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentFeatureProduct10 = function(featureProduct){						
		idComment = 5;
		index = (featureProduct.idFeatureProduct - 1);
		$("#idFeatureProduct").html(featureProduct.idFeatureProduct);		
		$("#idQuestion2").html("5");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment10"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsFeatureProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentFeatureProduct11 = function(featureProduct){						
		idComment = 6;
		index = (featureProduct.idFeatureProduct - 1);
		$("#idFeatureProduct").html(featureProduct.idFeatureProduct);		
		$("#idQuestion2").html("6");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment11"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsFeatureProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.saveCommentFeatureProduct = function(featureProduct){		
		var text = $("#CommentsFeatureProduct").val();		
		switch(idComment){
			case 1:				
				self.featureProducts()[index].comment6= text.toString();				
				$("#CommentsFeatureProduct").html("");
			break;
			case 2:
				self.featureProducts()[index].comment7 = text.toString();				
				$("#CommentsFeatureProduct").html("");
			break;
			case 3:
				self.featureProducts()[index].comment8 = text.toString();				
				$("#CommentsFeatureProduct").html("");
			break;
			case 4:
				self.featureProducts()[index].comment9 = text.toString();				
				$("#CommentsFeatureProduct").html("");
			break;
			case 5:
				self.featureProducts()[index].comment10 = text.toString();				
				$("#CommentsFeatureProduct").html("");
			break;
			case 6:
				self.featureProducts()[index].comment11 = text.toString();				
				$("#CommentsFeatureProduct").html("");
			break;
		}
	}
}

// ////////////////////////////////////END
// featureProduct////////////////////////////////////////////

function saveAllSuppliers() {
	db.transaction(save, errorCB);
}


function save(tx) {
	//DatePickers
	$("input[name='datePicker']").each(function(index, value){								
			datesArray.push($(this).val());			
	});	
	getAllDates(datesArray);
	//Creates the JSON suppliersInformation
	var suppliersInformationToJSON = ko.mapping.toJSON(self.suppliersInformation);
	//Creates the JSON rating	
	var ratingToJSON = ko.mapping.toJSON(self.ratings);						
	//Creates the JSON  featureProduct
	var featureProductToJSON = ko.mapping.toJSON(self.featureProducts);

	getGPS();
	var query = 'INSERT INTO suppliers (suppliersInformation, rating, featureProduct, datePickers, timestamp, gps, idOrchard, finished, synchronized)';
	query += "VALUES ('" + suppliersInformationToJSON + "', '" + ratingToJSON + "', '"+ featureProductToJSON +"', '" + datesArray + "', '" + getCurrentDateTime() + "','" + gps +"', '"+ orchardMasterId +"', 1, 0)";				
	Message = "Se guardó Proveedores";
	tx.executeSql(query);		
	getPage(
			"file:///android_asset/www/views/suppliers/index.title.html",
			"file:///android_asset/www/views/suppliers/index.html");
}

$("#getHomeTablet").click(function(){
	getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
});
$("#getHomePhone").click(function(){
	getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
});

function getResult(purchase, recommendation){
	var result = 0;
	
	switch(purchase){
		case 0:
			result = 100;
		break;
		case 1:
			result = 75;
		break;
		case 2:
			result = 50;
		break;
		case 3:
			result = 25;
		break;
		case 4:
			result = 0;
		break;
		default:
			result = 0;
		break;
	}

	switch(recommendation){
		case 0:
			result += 100;
		break;
		case 1:
			result += 75;
		break;
		case 2:
			result += 50;
		break;
		case 3:
			result += 25;
		break;
		case 4:
			result += 0;
		break;
		default:
			result += 0;
		break;
	}

	return result;
}

function getApproved(result){
	if(result >= 50){
		return "Si";
	}
	else{
		return "No";
	}
}

function getAllDates(dateArray){
	var dates = [];
	dates = dateArray;	
	$("input[name='datePicker']").each(function(index, value){									
			$(this).val(dates[index]);
	});	
}