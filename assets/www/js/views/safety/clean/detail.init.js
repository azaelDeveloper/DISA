backTitleUrl = "file:///android_asset/www/views/pesticides/index.title.html";
backBodyUrl = "file:///android_asset/www/views/pesticides/index.html";

$('#deletePrompt').hide("fast");		

$("#pesticidesMasterTitle").html(pesticidesMasterDate);

var viewModel;
var self;
var idComment;
var index;

$(function() {
	db.transaction(queryDB, errorCB);
});
