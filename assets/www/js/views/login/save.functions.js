function Save() {	
	if (document.getElementById('passwordUser').value == document
			.getElementById('repitPasswordUser').value
			&& document.getElementById('passwordUser').value != ""
			&& document.getElementById('repitPasswordUser').value != "") {

		// VAR NAMES
		var nameUser, lastNameUser, passwordUser, emailUser, pageUser;
		nameUser = document.getElementById('nameUser').value;
		lastNameUser = document.getElementById('lastNameUser').value;
		passwordUser = document.getElementById('passwordUser').value;
		emailUser = document.getElementById('emailUser').value;

		var Day;
		var Month;
		var Year;
		var d = new Date();
		var dateTime;
		Year = d.getFullYear();
		Month = d.getUTCMonth() + 1;
		Day = d.getDate();
		dateTime = Year + '/' + Month + '/' + Day + ' '	+ d.toLocaleTimeString();

		// OPEN THE DATABASE		
		db.transaction(populateDB, errorCB);

		function populateDB(tx) {
			// using "context" in de global.variables.js at
			// js/views/shared/
			// complete sql command with data above.
			var query = 'INSERT INTO users (name,  lastName, password, email, role, timestampp)';
			query += "VALUES ('" + nameUser + "', '" + lastNameUser + "', '"
					+ passwordUser + "', '" + emailUser + "', 'admin',  '"
					+ dateTime + "')";
			//var query += 'INSERT INTO users (name,  lastName, password, email, role, timestampp)';
			//query += 'VALUES ("capturista", "capturista", "user", user@email.com, "user", "' + dateTime "');';	
			alert(query);
			tx.executeSql(query);

			alert('Usuario dado de alta!');		
			
			getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/login/index.html");

			// CAMBIAR EL SELECT * A ESTA LÍNEA

		}
	}
}