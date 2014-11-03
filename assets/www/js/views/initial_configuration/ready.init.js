$(function (){
	$("#adminName").html(window.localStorage.getItem("adminName") + " " + window.localStorage.getItem("adminLastName"));
	$("#adminEmail").html(window.localStorage.getItem("adminEmail"));
	$("#adminPassword").html(window.localStorage.getItem("adminPassword"));
	$("#adminRole").html(window.localStorage.getItem("adminRole"));
	
	if (accountType == 0){
		$("#checkerDataPanel").hide("fast");
	}
	
	if (accountType == 1){
		$("#checkerDataPanel").show("fast");
	}
	
	$("#checkerName").html(window.localStorage.getItem("checkerName") + " " + window.localStorage.getItem("checkerLastName"));
	$("#checkerEmail").html(window.localStorage.getItem("checkerEmail"));
	$("#checkerPassword").html(window.localStorage.getItem("checkerPassword"));
	$("#checkerRole").html(window.localStorage.getItem("checkerRole"));
	
	window.localStorage.removeItem("adminName");
	window.localStorage.removeItem("adminEmail");
	window.localStorage.removeItem("adminPassword");
	window.localStorage.removeItem("adminRole");
	
	window.localStorage.removeItem("checkerName");
	window.localStorage.removeItem("checkerEmail");
	window.localStorage.removeItem("checkerPassword");
	window.localStorage.removeItem("checkerRole");
});
