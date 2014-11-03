backTitleUrl = "file:///android_asset/www/views/pesticides/index.title.html";
backBodyUrl = "file:///android_asset/www/views/pesticides/index.html";

$("#pesticidesMasterTitle").html(pesticidesMasterDate);

var viewModel;
var self;
var idComment;
var index;
var datesArray = [];

$(function() {
	db.transaction(queryDB, errorCB);
});
