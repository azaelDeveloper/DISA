backTitleUrl = "file:///android_asset/www/views/reports/index.title.html";
backBodyUrl = "file:///android_asset/www/views/reports/index.html";

$("#reportTitle").html(reportDate);

var viewModel;
var self;

$(function() {
	db.transaction(queryDB, errorCB);
});
