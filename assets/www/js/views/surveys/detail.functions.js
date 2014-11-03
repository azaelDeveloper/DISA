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

	self.deleteThisView = function() {		
		$(function() {			
			$('#deleteModal').modal('hide');
			db.transaction(deleteView, errorCB);
		});
		function deleteView(tx) {
			query = 'DELETE FROM pesticides WHERE id=' + pesticidesMasterId;
			tx.executeSql(query);
			Message = "Se borró Master # " + pesticidesMasterId;
			getPage("file:///android_asset/www/views/pesticides/index.title.html", "file:///android_asset/www/views/pesticides/index.html");
		}
		function errorCB(err) {
			console.log("Error processing SQL: " + err.code);
		}
	}	

	self.finishMaster = function (){
		db.transaction(updateFinish, errorCB);
	}

	function updateFinish(tx){
		var query = 'UPDATE pesticides SET finished =' + 0 + " WHERE id=" + pesticidesMasterId;
		tx.executeSql(query);
		Message = "Se finalizó Master #" + pesticidesMasterId;
		getPage("file:///android_asset/www/views/pesticides/index.title.html", "file:///android_asset/www/views/pesticides/index.html");
	}
}

function queryDB(tx) {
	tx.executeSql('SELECT * FROM pesticides where id=' + pesticidesMasterId, [], querySuccess, errorCB);
}

// Query the success callback
//
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
	fillImages(eval(productRegistration), eval(productQuality), eval(concetrationProduct));
}
// Transaction error callback
//
function errorCB(err) {
	console.log("Error processing SQL: " + err.code);
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