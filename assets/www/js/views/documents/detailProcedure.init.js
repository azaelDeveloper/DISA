backTitleUrl = "file:///android_asset/www/views/home/index.title.html";
backBodyUrl = "file:///android_asset/www/views/home/index.html";

$("#planTitle").html(planTitle);
$("#procedureTitle").html(procedureTitle);
$("#procedureHTML").html(procedureHTML);

$(function() {
	db.transaction(queryDB, errorCB, successCB);
});

window.scrollTo(0,0);