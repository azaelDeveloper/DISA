$("#backHomePhone").click(function(){	
	getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
});
$("#backHomeTablet").click(function(){	
	getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
});
$("#syncOrders").click(function(){
	if(idunsynchronized.length > 0){
		$(this).button('loading');
		syncronizedOrders(idunsynchronized, unsynchronized);
	}
	else{
		alert("No has seleccionado ningun Pedido para Sincronizar");
	}
});