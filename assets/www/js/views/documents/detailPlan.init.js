backTitleUrl = "file:///android_asset/www/views/home/index.title.html";
backBodyUrl = "file:///android_asset/www/views/home/index.html";

$("#manualTitle").html(manualTitle);
$("#planTitle").html(planTitle);
$("#planHTML").html(planHTML);

$(function() {
	db.transaction(queryDB, errorCB, successCB);
});

window.scrollTo(0,0);