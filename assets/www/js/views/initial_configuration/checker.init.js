var checkerId = "";
var checkerName = "";
var checkerLastName = "";
var checkerPassword = ""; 
var checkerEmail = ""; 
var checkerPage = ""; 
var encriptedPass = "";

backTitleUrl = "file:///android_asset/www/views/initial_configuration/checker.title.html";
backBodyUrl = "file:///android_asset/www/views/initial_configuration/checker.html";
role="checker";

var registeredEmail = false;

$(function (){
	$("#topBar").show("fast");
	db.transaction(findRegisteredUser, errorCB);
});