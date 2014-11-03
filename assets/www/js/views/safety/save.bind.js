$(function() {
	$("div[class*='input-append date']").datetimepicker({
      	pickTime: false,
    	autoclose: true
    });
    $(document).on("changeDate",".date", function(e) {
    	setTimeout(function(){$(e.target).find('input').trigger('change');}, 1);
	});
});