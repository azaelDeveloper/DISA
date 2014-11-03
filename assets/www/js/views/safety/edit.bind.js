$(function() {
    $(document).on("changeDate",".date", function(e) {
    	setTimeout(function(){$(e.target).find('input').trigger('change');}, 1);
	});
});