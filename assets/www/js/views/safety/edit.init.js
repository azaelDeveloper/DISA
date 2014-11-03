backTitleUrl = "file:///android_asset/www/views/first_aid/index.title.html";
backBodyUrl = "file:///android_asset/www/views/first_aid/index.html";

$("#firstAidMasterTitle").html(firstAidMasterDate);

var viewModel;
var self;
var datesArray = [];

$(function() {
	db.transaction(queryDB, errorCB);
});
