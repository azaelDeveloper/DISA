$("#syncProducts").click(function(){	
	$(this).attr("disabled", "disabled");
	syncronizeProducts();
});
$("#next").click(function(){
	if(pass == true)
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
});