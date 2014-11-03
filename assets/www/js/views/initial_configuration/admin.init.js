var adminId = "";
var adminName = ""; 
var adminLastName = ""; 
var adminPassword = ""; 
var adminEmail = ""; 
var adminPage = ""; 
var encriptedPass = "";

backTitleUrl = "file:///android_asset/www/views/home/account_types.title.html";
backBodyUrl = "file:///android_asset/www/views/home/account_types.html";
role="admin";

var registeredEmail = false;



$(function (){
	$("#topBar").show("fast");
	db.transaction(findRegisteredUser, errorCB);
});