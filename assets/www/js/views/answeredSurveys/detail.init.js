backTitleUrl = "file:///android_asset/www/views/suppliers/index.title.html";
backBodyUrl = "file:///android_asset/www/views/suppliers/index.html";

$('#deletePrompt').hide("fast");		

$("#suppliersMasterTitle").html(supplierMasterDate);

var viewModel;
var self;

$(function() {
	db.transaction(queryDB, errorCB);
});
