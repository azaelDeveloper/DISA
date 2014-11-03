backTitleUrl = "file:///android_asset/www/views/reports/index.title.html";
backBodyUrl = "file:///android_asset/www/views/reports/index.html";

var viewModel;
var bodyGraphics;
var AgenciesArray = [];
var chart1;

$(function() {
	db.transaction(queryDB, errorCB);
});