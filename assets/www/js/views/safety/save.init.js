var watchID = null;
var self;
var idComment;
var index;
var datesArray = [];

$("#firstAidMasterTitle").html(getCurrentDate());

backTitleUrl = "file:///android_asset/www/views/first_aid/index.title.html";
backBodyUrl = "file:///android_asset/www/views/first_aid/index.html";

ko.applyBindings(new firstAidMasterViewModel());
	
