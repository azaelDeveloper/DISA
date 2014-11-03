$(function (){
	$("#Validate").click(function(){
		$(this).attr("disabled", "disabled");
		setLicense();
	});
});