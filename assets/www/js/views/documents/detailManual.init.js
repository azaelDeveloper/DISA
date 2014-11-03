backTitleUrl = "file:///android_asset/www/views/documents/index.title.html";
backBodyUrl = "file:///android_asset/www/views/documents/index.html";

$("#manualNumber").html(manualNumber);
$("#manualTitle").html(manualTitle);
$("#manualHTML").html(manualHTML);

$(function() {
	db.transaction(queryDB, errorCB, successCB);
});

window.scrollTo(0,0);