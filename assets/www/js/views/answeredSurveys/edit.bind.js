$(function() {
	$("#close").click(function() {
		getPage("file:///android_asset/www/views/suppliers/index.title.html", "file:///android_asset/www/views/suppliers/index.html");
	});
	$("#getHomeTablet").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});
	$("#getHomePhone").click(function(){
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");		
	});

	$(".date").datetimepicker({
      	pickTime: false,
        autoclose: true
    });
    
    $(document).on("changeDate",".date", function(e) {
    	//$(e.target).find('input').trigger('change');
    	setTimeout(function(){$(e.target).find('input').trigger('change');}, 1);
	});
});