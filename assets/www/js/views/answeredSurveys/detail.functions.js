function supplierMasterViewModel(suppliersInformation, ratings, featureProducts){
	var self = this;
	self.suppliersInformationArray = ko.observableArray([]);
	self.suppliersInformationArray(suppliersInformation);
	self.ratingsArray = ko.observableArray([]);
	self.ratingsArray(ratings);
	self.featureProductsArray = ko.observableArray([]);
	self.featureProductsArray(featureProducts);

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

	self.getCommentFeatureProduct6 = function(featureProduct){										
		idComment = 1;
		index = (featureProduct.idFeatureProduct - 1);
		$("#idFeatureProduct").html(featureProduct.idFeatureProduct);		
		$("#idQuestion1").html("1");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment6"));
		var comment = JSON.parse(jsonVar);				
		$("#CommentsFeatureProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentFeatureProduct7 = function(featureProduct){						
		idComment = 2;
		index = (featureProduct.idFeatureProduct - 1);
		$("#idFeatureProduct").html(featureProduct.idFeatureProduct);		
		$("#idQuestion1").html("2");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment7"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsFeatureProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentFeatureProduct8 = function(featureProduct){						
		idComment = 3;
		index = (featureProduct.idFeatureProduct - 1);
		$("#idFeatureProduct").html(featureProduct.idFeatureProduct);		
		$("#idQuestion1").html("3");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment8"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsFeatureProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentFeatureProduct9 = function(featureProduct){						
		idComment = 4;
		index = (featureProduct.idFeatureProduct - 1);
		$("#idFeatureProduct").html(featureProduct.idFeatureProduct);		
		$("#idQuestion1").html("4");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment9"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsFeatureProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentFeatureProduct10 = function(featureProduct){						
		idComment = 5;
		index = (featureProduct.idFeatureProduct - 1);
		$("#idFeatureProduct").html(featureProduct.idFeatureProduct);		
		$("#idQuestion1").html("5");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment10"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsFeatureProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}
	self.getCommentFeatureProduct11 = function(featureProduct){						
		idComment = 6;
		index = (featureProduct.idFeatureProduct - 1);
		$("#idFeatureProduct").html(featureProduct.idFeatureProduct);		
		$("#idQuestion1").html("6");		
		var jsonVar = ko.mapping.toJSON($(this).attr("comment11"));
		var comment = JSON.parse(jsonVar);		
		$("#CommentsFeatureProduct").val(comment);
		$("html, body").animate({scrollTop: 0}, 1000);
	}

	// 	//LOADING THE SELECT ANSWERS
	self.availableAnswers1 = [ {
		answerVal : 0,
		answerText : "Exelente"
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

	self.deleteThisView = function() {		
		$(function() {			
			$('#deleteModal').modal('hide');
			db.transaction(deleteView, errorCB);
		});
		function deleteView(tx) {
			query = 'DELETE FROM suppliers WHERE id=' + supplierMasterId;
			tx.executeSql(query);
			Message = "Se borró Master # " + supplierMasterId;
			getPage("file:///android_asset/www/views/suppliers/index.title.html", "file:///android_asset/www/views/suppliers/index.html");
		}
		function errorCB(err) {
			console.log("Error processing SQL: " + err.code);
		}
	}	

	self.finishMaster = function (){
		db.transaction(updateFinish, errorCB);
	}

	function updateFinish(tx){
		var query = 'UPDATE suppliers SET finished =' + 0 + " WHERE id=" + supplierMasterId;
		tx.executeSql(query);
		Message = "Se finalizó Master #" + supplierMasterId;
		getPage("file:///android_asset/www/views/suppliers/index.title.html", "file:///android_asset/www/views/suppliers/index.html");
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
	fillImages(eval(rating), eval(featureProduct));
}
// Transaction error callback
//
function errorCB(err) {
	console.log("Error processing SQL: " + err.code);
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