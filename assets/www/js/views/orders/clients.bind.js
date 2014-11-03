$("#backHomePhone").click(function(){	
	getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
});
$("#backHomeTablet").click(function(){	
	getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
});
$("#buttonNext").click(function(){	
	$("input:radio:checked").each(function(index){					
	clientID = $(this).val();
	clientName = $(this).attr("data-clientName");	
	route = $(this).attr("data-route");	
	direction = $(this).attr("data-direction");	
	poblation = $(this).attr("data-poblation");	
	entity = $(this).attr("data-entity");	
	colony = $(this).attr("data-colony");	
	cp = $(this).attr("data-cp");	
	});
	if(clientID != undefined && clientID != ""){
		getPage("file:///android_asset/www/views/orders/newOrder.title.html", "file:///android_asset/www/views/orders/newOrder.html");	
	}
	else
		navigator.notification.alert("No se selecciono cliente", alertMiss, "Seleccione un cliente", "Aceptar");
});

