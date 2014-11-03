$("#synclients").click(function(){		
		$(this).attr("disabled", "disabled");
		synclients();
});
$("#next").click(function(){	
	if(pass == true)
		getPage("file:///android_asset/www/views/initial_configuration/products.title.html", "file:///android_asset/www/views/initial_configuration/products.html");
});