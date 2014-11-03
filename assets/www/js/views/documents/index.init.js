backTitleUrl = "file:///android_asset/www/views/home/index.title.html";
backBodyUrl = "file:///android_asset/www/views/home/index.html";
var rText = "";
var token = "";
var doc = "";
var id = "";
var type = "";
var title = "";
var code = "";
var version = "";
var expiration = "";
var description = "";
var parentDoc = "";
var documentHTML = "";
var vm;

$(function() {
	db.transaction(queryDB, errorCB, successCB);
});