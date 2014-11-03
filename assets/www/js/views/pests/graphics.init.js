backTitleUrl = "file:///android_asset/www/views/monthly_master/index.title.html";
backBodyUrl = "file:///android_asset/www/views/monthly_master/index.html";

var viewModel;
var bodyGraphics;
var PoblationsArray = [];
var AgenciesArray = [];
var chart1;

$(function() {
	db.transaction(queryDB, errorCB);
});