backTitleUrl = "file:///android_asset/www/views/reports/index.title.html";
backBodyUrl = "file:///android_asset/www/views/reports/index.html";

$('#deletePrompt').hide("fast");		

$("#reportTitle").html(reportDate);

var viewModel;

$(function() {
	db.transaction(queryDB, errorCB);
});
