$("#backHomePhone").click(function(){	
	getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
});
$("#backHomeTablet").click(function(){	
	getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
});
$("#delete").click(function() {
		navigator.notification.confirm(
            '¿Desea borrar este pedido?',  // message
            onConfirm,              // callback to invoke with index of button pressed
            'Borrar Pedido',            // title
            'Sí,No'          // buttonLabels
        );
        function onConfirm(buttonIndex) {
        	if(buttonIndex == 1)
        		db.transaction(deleteView, errorCB);
    	}
    	function deleteView(tx) {
			var query = 'DELETE FROM sells WHERE id=' + detailId;
			var querydetail = 'DELETE FROM sellsdetail WHERE idSell=' + detailId;
			tx.executeSql(querydetail);
			tx.executeSql(query);			
			getPage("file:///android_asset/www/views/orders/checkOrders.title.html", "file:///android_asset/www/views/orders/checkOrders.html");
		}
});