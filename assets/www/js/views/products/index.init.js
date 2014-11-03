backTitleUrl = "file:///android_asset/www/views/home/index.title.html";
backBodyUrl = "file:///android_asset/www/views/home/index.html";
var self;
var syncronized = [];
db.transaction(allProducts, errorCB);
navigator.notification.alert("Se están cargando los productos por favor espere...", alertMiss, "Cargando Productos", "Aceptar");	            