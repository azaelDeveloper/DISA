$("#backHomePhone").click(function(){	
	getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
});
$("#backHomeTablet").click(function(){	
	getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
});
$("#syncClients").click(function(){	
		$(this).attr("disabled", "disabled");
		getAllClients();
});
$("#checkCollect").click(function(){	
	getPage("file:///android_asset/www/views/clients/collect.title.html", "file:///android_asset/www/views/clients/collect.html");	
});
