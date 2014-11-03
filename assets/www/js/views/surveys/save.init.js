var watchID = null;
var self;
var idComment;
var index;
var datesArray = [];

$("#pesticidesMasterTitle").html(getCurrentDate());

backTitleUrl = "file:///android_asset/www/views/surveys/index.title.html";
backBodyUrl = "file:///android_asset/www/views/surveys/index.html";

ko.applyBindings(new pesticideMasterViewModel());
