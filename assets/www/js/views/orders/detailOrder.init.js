backTitleUrl = "file:///android_asset/www/views/orders/checkOrders.title.html";
backBodyUrl = "file:///android_asset/www/views/orders/checkOrders.html";
var self;
var unsynchronized = [];
$("#date").html(detailDate);
db.transaction(getDetails, errorCB);