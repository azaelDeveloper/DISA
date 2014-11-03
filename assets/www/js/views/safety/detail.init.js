backTitleUrl = "file:///android_asset/www/views/first_aid/index.title.html";
backBodyUrl = "file:///android_asset/www/views/first_aid/index.html";

$('#deletePrompt').hide("fast");		

$("#firstAidMasterTitle").html(firstAidMasterDate);

var viewModel;
var self;

$(function() {
	db.transaction(queryDB, errorCB);
});
		