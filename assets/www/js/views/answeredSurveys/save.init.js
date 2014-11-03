var watchID = null;
var self;
var idComment;
var index;
var datesArray = [];

$("#suppliersMasterTitle").html(getCurrentDate());
backTitleUrl = "file:///android_asset/www/views/suppliers/index.title.html";
backBodyUrl = "file:///android_asset/www/views/suppliers/index.html";

ko.applyBindings(new supplierMasterViewModel());
