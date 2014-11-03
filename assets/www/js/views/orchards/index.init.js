backTitleUrl = "file:///android_asset/www/views/home/index.title.html";
backBodyUrl = "file:///android_asset/www/views/home/index.html";

var viewModel;

$(function() {
	db.transaction(queryDB, errorCB);
	db.transaction(queryCount, errorCB);
});