$("#backHomePhone").click(function(){	
	getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
});
$("#backHomeTablet").click(function(){	
	getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
});
$("#syncDetails").click(function(){	
		$(this).attr("disabled", "disabled");		
		getAllDetails();
});
$("#paymentToTicket").click(function(){	
	//$(this).attr("disabled", "disabled");
	sendPayment();
});
