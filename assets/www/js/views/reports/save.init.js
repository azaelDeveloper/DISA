var watchID = null;
var self;
var xml1;
var xml2;
var xml3;

$("#reportTitle").html(getCurrentDate());

backTitleUrl = "file:///android_asset/www/views/reports/index.title.html";
backBodyUrl = "file:///android_asset/www/views/reports/index.html";

ko.applyBindings(new reportViewModel());

//
