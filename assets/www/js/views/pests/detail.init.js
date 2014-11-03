backTitleUrl = "file:///android_asset/www/views/pests/index.title.html";
backBodyUrl = "file:///android_asset/www/views/pests/index.html";
$("#pestsMasterTitle").html(pestsMasterDate);
var viewModel;
var self;
$(function() {
	db.transaction(queryDB, errorCB);
});
