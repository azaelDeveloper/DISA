backTitleUrl = "file:///android_asset/www/views/suppliers/index.title.html";
backBodyUrl = "file:///android_asset/www/views/suppliers/index.html";

$("#suppliersMasterTitle").html(supplierMasterDate);

var viewModel;
var self;
var datesArray = [];

$(function() {
	db.transaction(queryDB, errorCB);
});
