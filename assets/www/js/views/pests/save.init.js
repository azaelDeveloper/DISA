var watchID = null;
var self;
var idComment;
var index;
var datesArray = [];
$("#cleanMasterTitle").html(getCurrentDate());

//////////////////////////DATE FORMAT starDate ///////////////////////////////
backTitleUrl = "file:///android_asset/www/views/pests/index.title.html";
backBodyUrl = "file:///android_asset/www/views/pests/index.html";
ko.applyBindings(new pestsMasterViewModel());