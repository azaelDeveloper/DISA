var watchID = null;
var self;
var idComment;
var index;
var datesArray = [];

$("#pesticidesMasterTitle").html(getCurrentDate());

backTitleUrl = "file:///android_asset/www/views/pesticides/index.title.html";
backBodyUrl = "file:///android_asset/www/views/pesticides/index.html";

ko.applyBindings(new pesticideMasterViewModel());
