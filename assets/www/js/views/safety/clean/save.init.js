var watchID = null;
var self;
var idComment;
var index;
var datesArray = [];

$("#pesticidesMasterTitle").html(getCurrentDate());

backTitleUrl = "file:///android_asset/www/views/safety/clean/index.title.html";
backBodyUrl = "file:///android_asset/www/views/safety/clean/index.html";

ko.applyBindings(new hygieneMasterViewModel());
