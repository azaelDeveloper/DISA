function Save() {
	adminId = $("#AdminId").val();
	adminName = $("#AdminName").val();
	adminLastName = $("#AdminLastName").val();
	adminPassword = $("#AdminPassword").val();
	adminEmail = $("#AdminEmail").val();
	encriptedPass = generateit(adminPassword);
	db.transaction(saveAdmin, errorCB);
}

function saveAdmin(tx) {
	getGPS();
	if (adminId == ""){
		var query = "INSERT INTO users (name,  lastName, password, system_data, email, application_role, remember_me, timestampp, gps)";
		query += "VALUES('" + adminName + "', '" + adminLastName + "', '"
				+ encriptedPass + "', " + p4 + ", '" + adminEmail + "', '" + role
				+ "', 0, '" + getCurrentDateTime() + "', '" + gps + "')";
		tx.executeSql(query);
	}
	
	if(adminId != ""){
		
		var query = "UPDATE users SET name='" + adminName + "', lastName = '" + adminLastName + "', password = '" + encriptedPass + "', system_data = '" + p4 
		+ "', email = '" + adminEmail  + "', application_role = '" + role + "', remember_me = 0, timestampp = '" + getCurrentDateTime() + "', gps ='" + gps + "' WHERE id = " + adminId;
		alert(query);
		/*var query = "UPDATE INTO users (name,  lastName, password, system_data, email, application_role, remember_me, timestampp, gps)";
		query += "VALUES('" + adminName + "', '" + adminLastName + "', '"
				+ encriptedPass + "', " + p4 + ", '" + adminEmail + "', '" + role
				+ "', 0, '" + getCurrentDateTime() + "', '" + gps + "')";*/
		//tx.executeSql(query);
	}

	if (accountType == 0) {
		getPage("file:///android_asset/www/views/initial_configuration/ready.title.html", "file:///android_asset/www/views/initial_configuration/ready.html");
	}
	if (accountType == 1) {
		getPage("file:///android_asset/www/views/initial_configuration/checker.title.html",	"file:///android_asset/www/views/initial_configuration/checker.html");
	}
}

function validateName() {
	if ($("#AdminName").val() == "") {
		userFormErrors++;
		$("#errorLabelAdminName").addClass("error");
		$("#AdminName").addClass("error");
		$("#errorMsgAdminName").show("fast");
		$("#errorMsgAdminName").html("Escribe tu nombre(s)");
	} else {
		$("#errorLabelAdminName").removeClass("error");
		$("#AdminName").removeClass("error");
		$("#errorMsgAdminName").hide("fast");
		$("#errorMsgAdminName").html("");
	}
}

function validateLastName() {
	if ($("#AdminLastName").val() == "") {
		userFormErrors++;
		$("#errorLabelAdminLastName").addClass("error");
		$("#AdminLastName").addClass("error");
		$("#errorMsgAdminLastName").show("fast");
		$("#errorMsgAdminLastName").html("Escribe tus apellidos");
	} else {
		$("#errorLabelAdminLastName").removeClass("error");
		$("#AdminLastName").removeClass("error");
		$("#errorMsgAdminLastName").hide("fast");
		$("#errorMsgAdminLastName").html("");
	}
}

function validateEmail() {
	if (!isEmailValid($("#AdminEmail").val())) {
		userFormErrors++;
		$("#errorLabelAdminEmail").addClass("error");
		$("#AdminEmail").addClass("error");
		$("#errorMsgAdminEmail").show("fast");
		if ($("#AdminEmail").val() == "") {
			$("#errorMsgAdminEmail").html("Escribe tu correo eletrónico");
		} else {
			$("#errorMsgAdminEmail").html("El email no es valido");
		}
	} else {
		emailExist();
		if (registeredEmail) {
			userFormErrors++;
			$("#errorLabelAdminEmail").addClass("error");
			$("#AdminEmail").addClass("error");
			$("#errorMsgAdminEmail").show("fast");
			$("#errorMsgAdminEmail").html(
					"Este correo ya fue registrado, elige otro");
		} else {
			$("#errorLabelAdminEmail").removeClass("error");
			$("#AdminEmail").removeClass("error");
			$("#errorMsgAdminEmail").hide("fast");
			$("#errorMsgAdminEmail").html("");
		}
	}
}

function validatePassword() {
	if ($("#AdminPassword").val() == "") {
		userFormErrors++;
		$("#errorLabelAdminPassword").addClass("error");
		$("#AdminPassword").addClass("error");
		$("#errorMsgAdminPassword").show("fast");
		$("#errorMsgAdminPassword").html("Escribe tu contraseña");
	} else {
		$("#errorLabelAdminPassword").removeClass("error");
		$("#AdminPassword").removeClass("error");
		$("#errorMsgAdminPassword").hide("fast");
		$("#errorMsgAdminPassword").html("");
	}
}

function validateRepeatPassword() {
	if ($("#AdminPassword").val() != $("#AdminRepeatPassword").val()) {
		userFormErrors++;
		$("#errorLabelAdminRepeatPassword").addClass("error");
		$("#AdminRepeatPassword").addClass("error");
		$("#errorMsgAdminRepeatPassword").show("fast");
		$("#errorMsgAdminRepeatPassword").html(
				"Esta contraseña debe ser igual a la anterior");
	} else {
		if (($("#AdminPassword").val() != "" && $("#AdminRepeatPassword").val() != "")
				&& ($("#AdminPassword").val() != $("#AdminRepeatPassword")
						.val())) {
			userFormErrors--;
		}
		$("#errorLabelAdminRepeatPassword").removeClass("error");
		$("#AdminRepeatPassword").removeClass("error");
		$("#errorMsgAdminRepeatPassword").hide("fast");
		$("#errorMsgAdminRepeatPassword").html("");
	}
}

function emailExist() {
	db.transaction(findUser, errorCB);
}

function findUser(tx) {
	var query = "SELECT * FROM users where email='" + adminEmail + "'";
	tx.executeSql(query, [], foundUser, errorCB);
}

function foundUser(tx, results) {
	var len = results.rows.length;
	
	if (len > 0) {
		registeredEmail = true;
	} else {
		registeredEmail = false;
	}
}

function findRegisteredUser(tx) {
	var query = "SELECT * FROM users where application_role='admin'";
	tx.executeSql(query, [], foundRegisteredUser, errorCB);
}

function foundRegisteredUser(tx, results) {
	var len = results.rows.length;
	
	if (len > 0) {
		$("#AdminId").val(results.rows.item(0).id);
		$("#AdminName").val(results.rows.item(0).name);
		$("#AdminLastName").val(results.rows.item(0).lastName);
		$("#AdminEmail").val(results.rows.item(0).email);
	}
}
