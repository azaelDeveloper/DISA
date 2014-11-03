backTitleUrl = "file:///android_asset/www/views/orchards/index.title.html";
backBodyUrl = "file:///android_asset/www/views/orchards/index.html";

$("#deleteOrchard").click(function(){			
	deleteAllOrchard();
});
$("#getHomeTablet").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
});
$("#getHomePhone").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
});
