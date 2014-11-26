backTitleUrl = "file:///android_asset/www/views/orders/index.title.html";
backBodyUrl = "file:///android_asset/www/views/orders/index.html";
var self;
var unsynchronized = [];
var unsynchronizedDetail = [];
var idunsynchronized = [];
var jsonSells = [];
var sellCount = 0;
db.transaction(getOrders, errorCB);