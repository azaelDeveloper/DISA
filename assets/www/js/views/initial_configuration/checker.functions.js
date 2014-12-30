function Save() {
	checkerId = $("#CheckerId").val();
	checkerName = $("#CheckerName").val();
	checkerLastName = $("#CheckerLastName").val();
	checkerPassword = $("#CheckerPassword").val();
	checkerEmail = $("#CheckerEmail").val();
	encriptedPass = generateit(checkerPassword);
	db.transaction(saveChecker, errorCB);
}

function saveChecker(tx) {
	getGPS();
	if (checkerId == ""){
		var query = "INSERT INTO users (name,  lastName, password, system_data, email, application_role, remember_me, timestampp, gps)";
		query += "VALUES('" + checkerName + "', '" + checkerLastName + "', '"
				+ encriptedPass + "', " + p4 + ", '" + checkerEmail + "', '" + role
				+ "', 0, '" + getCurrentDateTime() + "', '" + gps + "')";
		tx.executeSql(query);
	}
	
	if(checkerId != ""){
		
		var query = "UPDATE users SET name='" + checkerName + "', lastName = '" + checkerLastName + "', password = '" + encriptedPass + "', system_data = '" + p4 
		+ "', email = '" + checkerEmail  + "', application_role = '" + role + "', remember_me = 0, timestampp = '" + getCurrentDateTime() + "', gps ='" + gps + "' WHERE id = " + checkerId;
		alert(query);
		/*var query = "UPDATE INTO users (name,  lastName, password, system_data, email, application_role, remember_me, timestampp, gps)";
		query += "VALUES('" + adminName + "', '" + adminLastName + "', '"
				+ encriptedPass + "', " + p4 + ", '" + adminEmail + "', '" + role
				+ "', 0, '" + getCurrentDateTime() + "', '" + gps + "')";*/
		//tx.executeSql(query);
	}
	
	if (accountType==1){
		getPage("file:///android_asset/www/views/initial_configuration/ready.title.html", "file:///android_asset/www/views/initial_configuration/ready.html");
	}
}

function validateName() {
	if ($("#CheckerName").val() == "") {
		userFormErrors++;
		$("#errorLabelCheckerName").addClass("error");
		$("#CheckerName").addClass("error");
		$("#errorMsgCheckerName").show("fast");
		$("#errorMsgCheckerName").html("Escribe tu nombre(s)");
	} else {
		$("#errorLabelCheckerName").removeClass("error");
		$("#CheckerName").removeClass("error");
		$("#errorMsgCheckerName").hide("fast");
		$("#errorMsgCheckerName").html("");
	}
}

function validateLastName() {
	if ($("#CheckerLastName").val() == "") {
		userFormErrors++;
		$("#errorLabelCheckerLastName").addClass("error");
		$("#CheckerLastName").addClass("error");
		$("#errorMsgCheckerLastName").show("fast");
		$("#errorMsgCheckerLastName").html("Escribe tus apellidos");
	} else {
		$("#errorLabelCheckerLastName").removeClass("error");
		$("#CheckerLastName").removeClass("error");
		$("#errorMsgCheckerLastName").hide("fast");
		$("#errorMsgCheckerLastName").html("");
	}
}

function validateEmail() {
	if (!isEmailValid($("#CheckerEmail").val())) {
		userFormErrors++;
		$("#errorLabelCheckerEmail").addClass("error");
		$("#CheckerEmail").addClass("error");
		$("#errorMsgCheckerEmail").show("fast");
		if ($("#CheckerEmail").val() == "") {
			$("#errorMsgCheckerEmail").html("Escribe tu correo eletrónico");
		} else {
			$("#errorMsgCheckerEmail").html("El email no es valido");
		}
	} else {
		emailExist();
		if (registeredEmail) {
			userFormErrors++;
			$("#errorLabelCheckerEmail").addClass("error");
			$("#CheckerEmail").addClass("error");
			$("#errorMsgCheckerEmail").show("fast");
			$("#errorMsgCheckerEmail").html("Este correo ya fue registrado, elige otro");
		} else {
			$("#errorLabelCheckerEmail").removeClass("error");
			$("#CheckerEmail").removeClass("error");
			$("#errorMsgCheckerEmail").hide("fast");
			$("#errorMsgCheckerEmail").html("");
		}
	}
}

function validatePassword() {
	if ($("#CheckerPassword").val() == "") {
		userFormErrors++;
		$("#errorLabelCheckerPassword").addClass("error");
		$("#CheckerPassword").addClass("error");
		$("#errorMsgCheckerPassword").show("fast");
		$("#errorMsgCheckerPassword").html("Escribe tu contraseña");
	} else {
		$("#errorLabelCheckerPassword").removeClass("error");
		$("#CheckerPassword").removeClass("error");
		$("#errorMsgCheckerPassword").hide("fast");
		$("#errorMsgCheckerPassword").html("");
	}
}

function validateRepeatPassword(){
	if ($("#CheckerPassword").val() != $("#CheckerRepeatPassword").val()) {
		userFormErrors++;
		$("#errorLabelCheckerRepeatPassword").addClass("error");
		$("#CheckerRepeatPassword").addClass("error");
		$("#errorMsgCheckerRepeatPassword").show("fast");
		$("#errorMsgCheckerRepeatPassword").html("Esta contraseña debe ser igual a la anterior");
	} else {
		if (($("#CheckerPassword").val() != "" && $("#CheckerRepeatPassword").val() != "")
				&& ($("#CheckerPassword").val() != $("#CheckerRepeatPassword")
						.val())) {
			userFormErrors--;
		}
		$("#errorLabelCheckerRepeatPassword").removeClass("error");
		$("#CheckerRepeatPassword").removeClass("error");
		$("#errorMsgCheckerRepeatPassword").hide("fast");
		$("#errorMsgCheckerRepeatPassword").html("");
	}
}

function emailExist() {
	db.transaction(findUser, errorCB);
}

function findUser(tx) {
	var query = "SELECT * FROM users where email='" + checkerEmail + "'";
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
	var query = "SELECT * FROM users where application_role='checker'";
	tx.executeSql(query, [], foundRegisteredUser, errorCB);
}

function foundRegisteredUser(tx, results) {
	var len = results.rows.length;
	
	if (len > 0) {
		$("#CheckerId").val(results.rows.item(0).id);
		$("#CheckerName").val(results.rows.item(0).name);
		$("#CheckerLastName").val(results.rows.item(0).lastName);
		$("#CheckerEmail").val(results.rows.item(0).email);
	}
}