function supplierMasterViewModel(suppliersInformation, ratings, featureProducts){
	var self = this;
	self.suppliersInformationArray = ko.observableArray([]);
	self.suppliersInformationArray(suppliersInformation);
	self.ratingsArray = ko.observableArray([]);
	self.ratingsArray(ratings);
	self.featureProductsArray = ko.observableArray([]);
	self.featureProductsArray(featureProducts);
	
// 	//LOADING THE SELECT ANSWERS
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

	self.addSuppliersInformation = function() {
		self.suppliersInformationArray.push(new SupplierInformation(self.suppliersInformationArray().length + 1, "", "", "", "",
			"", "", "", ""));
	}

	self.removeSuppliersInformation = function(supplierInformation) {self.suppliersInformationArray.remove(supplierInformation);}

	//END SuppliersInformation

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
	}

	self.addRating = function() {
		self.ratingsArray.push(new Rating(self.ratingsArray().length + 1, "","", self.availableAnswers1[0], "", false, "", false, "", false, "", "", "rating" + (self.ratingsArray().length + 1)));
	}

	self.removeRating = function(rating) {self.ratingsArray.remove(rating);}

	self.takePhotoRating = function() {
		var IndexOfRating = $(this).attr("idRating");
		IndexOfRating = (IndexOfRating - 1);			
    	var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    	navigator.camera.getPicture(onSuccess, onFail, options);    	

  		function onSuccess(imageURI) {  
  			if(document.getElementById(self.ratingsArray()[IndexOfRating].idImageRating) != null)
  			{
  				self.ratingsArray()[IndexOfRating].photoRating = getRootName(imageURI);
      			var image = document.getElementById(self.ratingsArray()[IndexOfRating].idImageRating);
				image.src = getRootName(imageURI);
				message = "Foto de evaluación # "+ (IndexOfRating + 1) +" guardada con éxito...";
				getMessage(message, "#ratingMessage");	
  			}	
  			else
  			{
  				self.ratingsArray()[IndexOfRating].photoRating(getRootName(imageURI));
      			var image = document.getElementById(self.ratingsArray()[IndexOfRating].idImageRating().toString());
				image.src = getRootName(imageURI);
				message = "Foto de evaluación # "+ (IndexOfRating + 1) +" guardada con éxito...";
				getMessage(message, "#ratingMessage");	
  			}	
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto de evaluación", alertMiss, 'Foto de evaluación #' + (IndexOfRating + 1), 'Aceptar');
  		}  	
	}

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
				self.ratingsArray()[index].comment1 = text.toString();				
				$("#CommentsRating").html("");
			break;
			case 2:
				self.ratingsArray()[index].comment2 = text.toString();				
				$("#CommentsRating").html("");
			break;
			case 3:
				self.ratingsArray()[index].comment3 = text.toString();				
				$("#CommentsRating").html("");
			break;
			case 4:
				self.ratingsArray()[index].comment4 = text.toString();				
				$("#CommentsRating").html("");
			break;
			case 5:
				self.ratingsArray()[index].comment5 = text.toString();				
				$("#CommentsRating").html("");
			break;
		}
	}

	//END Ratings

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
	}

	self.addFeatureProduct = function() {
		self.featureProductsArray.push(new FeatureProduct(self.featureProductsArray().length + 1,
				self.availableAnswers2[0], "", self.availableAnswers2[0], "", 
				200, "", "Si", "", false, "", "", "", "", "featureProduct" + (self.featureProductsArray().length + 1)));
		$("div[class*='input-append date']").datetimepicker({
      		pickTime: false,
        	autoclose: true
    	});
	}

	self.removeFeatureProduct = function(featureProduct) {self.featureProductsArray.remove(featureProduct);}
	
	self.takePhotoFeatureProduct = function() {
		var IndexOfFeatureProduct = $(this).attr("idFeatureProduct");		
		IndexOfFeatureProduct = (IndexOfFeatureProduct - 1);			
    	var options = { quality: 100, destinationType: Camera.DestinationType.FILE_URI, saveToPhotoAlbum: true, allowEdit: true }
    	navigator.camera.getPicture(onSuccess, onFail, options);    	

  		function onSuccess(imageURI) {  
  			if(document.getElementById(self.featureProductsArray()[IndexOfFeatureProduct].idImageFeatureProduct) != null)
  			{
  				self.featureProductsArray()[IndexOfFeatureProduct].photoFeatureProduct = getRootName(imageURI);
      			var image = document.getElementById(self.featureProductsArray()[IndexOfFeatureProduct].idImageFeatureProduct);
				image.src = getRootName(imageURI);
				message = "Foto de característica del producto # "+ (IndexOfFeatureProduct + 1) +" guardada con éxito...";
				getMessage(message, "#featureProductMessage");	
  			}	
  			else
  			{
  				self.featureProductsArray()[IndexOfFeatureProduct].photoFeatureProduct(getRootName(imageURI));
      			var image = document.getElementById(self.featureProductsArray()[IndexOfFeatureProduct].idImageFeatureProduct().toString());
				image.src = getRootName(imageURI);
				message = "Foto de característica del producto # "+ (IndexOfFeatureProduct + 1) +" guardada con éxito...";
				getMessage(message, "#featureProductMessage");	
  			}	
      	}	
  		function onFail(message) {
    		navigator.notification.alert("Se canceló foto de característica del producto", alertMiss, 'Foto de característica del producto #' + (IndexOfRating + 1), 'Aceptar');
  		}  	
	}

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
				self.featureProductsArray()[index].comment6= text.toString();				
				$("#CommentsFeatureProduct").html("");
			break;
			case 2:
				self.featureProductsArray()[index].comment6 = text.toString();				
				$("#CommentsFeatureProduct").html("");
			break;
			case 3:
				self.featureProductsArray()[index].comment8 = text.toString();				
				$("#CommentsFeatureProduct").html("");
			break;
			case 4:
				self.featureProductsArray()[index].comment9 = text.toString();				
				$("#CommentsFeatureProduct").html("");
			break;
			case 5:
				self.featureProductsArray()[index].comment10 = text.toString();				
				$("#CommentsFeatureProduct").html("");
			break;
			case 6:
				self.featureProductsArray()[index].comment11 = text.toString();				
				$("#CommentsFeatureProduct").html("");
			break;
		}
	}

	self.getResultApproved = function(featureProduct){
		index = (featureProduct.idFeatureProduct - 1);

		self.featureProductsArray()[index].result = ko.computed(function() {
	        return getResult(featureProduct.purchase["answerVal"],featureProduct.recommendations["answerVal"]); 
	    });
		self.featureProductsArray()[index].approved = ko.computed(function() {
	        return getAproved(getResult(featureProduct.purchase["answerVal"],featureProduct.recommendations["answerVal"]));
	    });

		// self.featureProductsArray.valueHasMutated();

		var data = self.featureProductsArray().slice(0);
        self.featureProductsArray([]);
        self.featureProductsArray(data);
		
	}
	//END FeatureProduct

	self.updateAll = function(){	
		//Creates the JSON SuppliersInformation
		var suppliersInformationToJSON = ko.mapping.toJSON(self.suppliersInformationArray);
		//Creates the JSON Ratings	
		var ratingsToJSON = ko.mapping.toJSON(self.ratingsArray);						
		//Creates the JSON  FeatureProduct
		var featureProductsToJSON = ko.mapping.toJSON(self.featureProductsArray);

		db.transaction(updateDB, errorCB);

		function updateDB(tx) {
			getGPS();
			var dates = fillArrayDates();
			var query = 'UPDATE suppliers SET suppliersInformation=';
			query += "'" + suppliersInformationToJSON + "', rating='" + ratingsToJSON + "', featureProduct='" + featureProductsToJSON + "', datePickers = '"+ dates +"', timestamp='" +  getCurrentDateTime() 	+ "', gps='" + gps + "' WHERE id=" + supplierMasterId;
			tx.executeSql(query);
			getAllDates(dates);
			Message = "Se actualizó Master # " + supplierMasterId;
			getPage("file:///android_asset/www/views/suppliers/index.title.html",
				"file:///android_asset/www/views/suppliers/index.html");

		}
	}
}

function queryDB(tx) {
	tx.executeSql('SELECT * FROM suppliers where id=' + supplierMasterId, [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
	var len = results.rows.length;
	if (len > 0) {
		suppliersInformation = results.rows.item(0).suppliersInformation;
		rating = results.rows.item(0).rating;		
		featureProduct = results.rows.item(0).featureProduct;			
		currentDate = results.rows.item(0).timestamp;
	}			
	viewModel = new supplierMasterViewModel(eval(suppliersInformation), eval(rating), eval(featureProduct));
	ko.applyBindings(viewModel);
	$("div[class*='input-append date']").datetimepicker({
  		pickTime: false
	});
	fillImages(eval(rating), eval(featureProduct));
}

function fillImages(rating, featureProduct){
	var self = this;
	i=0;
	self.ratingPhotos = ko.observableArray([]);
	self.ratingPhotos(rating);
	while(i < self.ratingPhotos().length){
		var imgB = document.getElementById(self.ratingPhotos()[i].idImageRating);
		imgB.src = self.ratingPhotos()[i].photoRating;
		i++;
	}
	i=0;
	self.featureProductPhotos = ko.observableArray([]);
	self.featureProductPhotos(featureProduct);
	while (i < self.featureProductPhotos().length){
		var imgT = document.getElementById(self.featureProductPhotos()[i].idImageFeatureProduct);
		imgT.src = self.featureProductPhotos()[i].photoFeatureProduct;
		i++;
	}	
}

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

function getAproved(result){
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

function fillArrayDates(){
	$("input[name='datePicker']").each(function(index, value){									
			datesArray.push($(this).val());
	});	
	return datesArray;
}