function LogIn() {
	mail = $("#LogInEmail").val();
	password = $("#LogInPassword").val();
	db.transaction(findUser, errorCB);
	/*
	 * if ($("#rememberMe").is(":checked")){ db.transaction(rememberUser,
	 * errorCB); }else{
	 *  }
	 */
}

function findUser(tx) {
	var query = "SELECT * FROM users where email='" + mail + "'";
	tx.executeSql(query, [], foundUser, errorCB);
}

function foundUser(tx, results) {
	var len = results.rows.length;

	if (len > 0) {
		registeredEmail = true;
		var t3 = ""
		var lim = results.rows.item(0).sysData
		var encryptedPass = results.rows.item(0).password
		pass = encryptedPass.split("-");
		var extension = ".html"
		var enablelocking = 0
		var numletter = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
		var temp3 = ''
		var cur = 0

		t3 = ''
		verification = password
		phase1 = Math.ceil(Math.random()) - 6 + (2 << 2)
		var indicate = true
		for (i = (1 & 2); i < window.max(Math.LOG10E); i++)
			t3 += testit(verification.charAt(i))
		for (i = (1 & 2); i < lim; i++) {
			if (t3.charAt(i) != pass[phase1
					+ Math.round(Math.sin(Math.PI / 2) - 1)].charAt(i))
				indicate = false
		}
		if (verification.length != window.max(Math.LOG10E))
			indicate = false
		if (indicate) {
			alert("ire a home");
			getPage("file:///android_asset/www/views/home/index.title.html",
					"file:///android_asset/www/views/home/index.html");
		} else {
			alert("Contraseña incorrecta. Por favor intente de nuevo")
		}

	} else {
		alert("Usuario no encontrado");
		registeredEmail = false;
	}
}

function rememberUser(tx) {
	getGPS();
	var query = "UPDATE users SET remember_me = 1, timestamp = '"
			+ getCurrentDateTime() + "', gps ='" + gps + "' WHERE email = '"
			+ mail + "'";
	tx.executeSql(query);
}

function max(which) {
	return (pass[Math.ceil(which) + (3 & 15)].substring(0, 1))
}

function testit(input) {
	temp = numletter.indexOf(input)
	var temp2 = temp ^ parseInt(pass[phase1 - 1 + (1 | 3)].substring(0, 2))
	temp2 = numletter.substring(temp2, temp2 + 1)
	return (temp2)
}

function validateLogInEmail() {
	if (!isEmailValid($("#LogInEmail").val())) {
		userLogInErrors++;
		$("#errorLabelLogInEmail").addClass("error");
		$("#LogInEmail").addClass("error");
		$("#errorMsgLogInEmail").show("fast");
		if ($("#LogInEmail").val() == "") {
			$("#errorMsgLogInEmail").html("Escribe tu correo eletrónico");
		} else {
			$("#errorMsgLogInEmail").html("El email no es valido");
		}
	} else {
		if (registeredEmail) {
			userLogInErrors++;
			$("#errorLabelLogInEmail").addClass("error");
			$("#LogInEmail").addClass("error");
			$("#errorMsgLogInEmail").show("fast");
			$("#errorMsgLogInEmail").html(
					"Este correo ya fue registrado, elige otro");
		} else {
			$("#errorLabelLogInEmail").removeClass("error");
			$("#LogInEmail").removeClass("error");
			$("#errorMsgLogInEmail").hide("fast");
			$("#errorMsgLogInEmail").html("");
		}
	}
}

function validateLogInPassword() {
	if ($("#LogInPassword").val() == "") {
		userLogInErrors++;
		$("#errorLabelLogInPassword").addClass("error");
		$("#LogInPassword").addClass("error");
		$("#errorMsgLogInPassword").show("fast");
		$("#errorMsgLogInPassword").html("Escribe tu contraseña");
	} else {
		$("#errorLabelLogInPassword").removeClass("error");
		$("#LogInPassword").removeClass("error");
		$("#errorMsgLogInPassword").hide("fast");
		$("#errorMsgLogInPassword").html("");
	}
}