backTitleUrl = "file:///android_asset/www/views/orders/index.title.html";
backBodyUrl = "file:///android_asset/www/views/orders/index.html";
var self;
var unsynchronized = [];
var unsynchronizedDetail = [];
var idunsynchronized = [];
var jsonDetail = "";
db.transaction(getOrders, errorCB);