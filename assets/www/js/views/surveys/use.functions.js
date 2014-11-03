
/*
function checkIncompletes(tx){		
	tx.executeSql('SELECT * FROM answeredSurvey WHERE idSurveyAndroid =' + surveyMasterId + " AND finished = 0 AND orchardID = " + orchardMasterId, [], specificSurvey, errorCB);
}
function specificSurvey(tx, results){
	var len = results.rows.length;
	self = this;
	var thisModel = {
    	details: ko.observable() // Initially blank
    };    
	var textareas;
	var dateText;
	var answerschecks;
	var answerRadios;	
	var answerTextArea = [];
	var answerCheck = [];
	var answerRadio = [];
	var answerDate = [];		
	if (len > 0) {				
		answeredSurveyMasterId  = results.rows.item(0).id;		
		thisModel.details(results.rows.item(0).bodySurvey);				
		ko.applyBindings(thisModel, document.getElementById("SurveyBody"));					
		textareas = results.rows.item(0).answerTextArea;
		answerschecks = results.rows.item(0).answersCheckBox;				
		answerRadios = results.rows.item(0).answersRadio;		
		dateText = results.rows.item(0).answersDate;		
		idSurveyWeb = results.rows.item(0).surveyIDWeb;				
		answerTextArea = textareas.split("-$");
		answerDate = dateText.split(",");
		answerCheck = answerschecks.split(",");
		answerRadio = answerRadios.split(",");
		$("textarea").each(function(index){						
			if (index > 0){				
				var stringShort = answerTextArea[index].substring(1, answerTextArea[index].length);				
				$(this).attr("value", stringShort);						
			}
			else
				$(this).attr("value", answerTextArea[index]);										
		});
		$("input:checkbox").each(function(index){								
			if (answerCheck[index] == "true")
				$(this).attr("checked", true);													
			else
				$(this).attr("checked", false);			
		});	
		$("input:radio").each(function(index){			
			if(answerRadio[index] == "true")
				$(this).attr("checked", true);														
			else
				$(this).attr("checked", false);														

		});			
		$("input:text").each(function(index){			
			$(this).attr("value", answerDate[index]);			
		});		
		$("div[class*='input-group date']").datetimepicker();
	}	
	else
	{
		db.transaction(cleanSurvey, errorCB);
	}	
}
*/
function cleanSurvey(tx){		
	tx.executeSql('SELECT * FROM surveys WHERE id =' + surveyMasterId, [], CS, errorCB);	
}
function CS(tx, results){
	var len = results.rows.length;	
    if (len > 0) {				
		$("#SurveyBody").html(results.rows.item(0).bodySurvey);
		idSurveyWeb = results.rows.item(0).idSurvey;				
	}	
}
/*
function existSurvey(tx){
	tx.executeSql('SELECT * FROM answeredSurvey WHERE idSurveyAndroid =' + surveyMasterId + " AND finished = 0 AND orchardID = " + orchardMasterId, [], insertUpdate, errorCB);
}
function insertUpdate(tx, results){
	var len = results.rows.length;									
	if (len > 0) {
	$("textarea").each(function(index){
		answersTextAreas.push($(this).val() + "-$");
		idTextAreas.push($(this).attr("id"));		
	});
	$("input:checkbox").each(function(index){			
		if($(this).attr("checked")){
			answersCheckBox.push("True");
		}			
		else
			answersCheckBox.push("False");
		idCheckBoxs.push($(this).attr("id"));
	});	
	$("input:radio").each(function(index){
		if($(this).attr("checked")){
			answersRadio.push("True");
		}			
		else
			answersRadio.push("False");
		idRadios.push($(this).attr("id"));
	});			
	$("input:text").each(function(index){
		answersDate.push($(this).val());
		idDates.push($(this).attr("id"));
	});		
		answeredSurveyMasterId = results.rows.item(0).id;		
		db.transaction(updateAS, errorCB);	
	}	
	else
	{
			$("textarea").each(function(index){
		answersTextAreas.push($(this).val() + "-$");
		idTextAreas.push($(this).attr("id"));		
	});
	$("input:checkbox").each(function(index){			
		if($(this).attr("checked")){
			answersCheckBox.push("True");
		}			
		else
			answersCheckBox.push("False");
		idCheckBoxs.push($(this).attr("id"));
	});	
	$("input:radio").each(function(index){
		if($(this).attr("checked")){
			answersRadio.push("True");
		}			
		else
			answersRadio.push("False");
		idRadios.push($(this).attr("id"));
	});			
	$("input:text").each(function(index){
		answersDate.push($(this).val());
		idDates.push($(this).attr("id"));
	});		
		db.transaction(insertAS, errorCB);
	}	
}
function insertAS(tx){		
	getGPS();			
	var sql = "INSERT INTO answeredSurvey (finished, idSurveyAndroid, titleSurvey, bodySurvey, surveyIDWeb, answerTextArea, answersCheckBox, answersRadio, answersDate,  orchardID, idsTextAreas, idsCheckBox, idsRadio, idsDate, synchronized, timestamp, gps) ";	
	sql += "VALUES(0, '"+ surveyMasterId + "' , '"+ surveyMasterTitle +"', '"+ $("#SurveyBody").html() + "', '"+ idSurveyWeb +"', '" + answersTextAreas + "', '"+ answersCheckBox +"', '" + answersRadio + "', '"+ answersDate +"', "+ orchardMasterId +", '" + idTextAreas + "', '" + idCheckBoxs + "', '" + idRadios + "', '" + idDates + "', 0, '"+ getCurrentDateTime() +"', '"+ gps +"')";					
	tx.executeSql(sql);
	messageTitle = "¡Se guardó la encuesta incompleta con el siguiente título: '" + surveyMasterTitle + "' correctamente!";	
	if(isForClean == true){
		isForClean = false;
		getPage("views/surveys/clean.title.html", "views/surveys/clean.html");
	}		
	else
		getPage("views/surveys/index.title.html", "views/surveys/index.html");
}
function updateAS(tx){	
	getGPS();	
	var sql = "UPDATE answeredSurvey SET finished = 0, idSurveyAndroid = "+ surveyMasterId +" , titleSurvey = '"+ surveyMasterTitle +"', bodySurvey = '"+ $("#SurveyBody").html()+  "', surveyIDWeb = '"+ idSurveyWeb +"' , answerTextArea = '"+ answersTextAreas +"', answersCheckBox = '" + answersCheckBox + "', answersRadio = '"+ answersRadio +"', answersDate = '"+ answersDate +"',  orchardID = "+ orchardMasterId + ", idsTextAreas ='"+ idTextAreas + "', idsCheckBox = '"+ idCheckBoxs +"', idsRadio = '"+ idRadios +"', idsDate = '"+ idDates +"',  synchronized = 0, timestamp = '"+ getCurrentDateTime() +"', gps = '"+ gps + "' WHERE id = "+ answeredSurveyMasterId;	
	tx.executeSql(sql);
	messageTitle = "¡Se actualizo encuesta con el título: '" + surveyMasterTitle + "' correctamente!";	
	if(isForClean == true){
		isForClean = false;
		getPage("views/surveys/clean.title.html", "views/surveys/clean.html");
	}		
	else
		getPage("views/surveys/index.title.html", "views/surveys/index.html");
}
function saveSurveyAnswered(tx){	
	if(answeredSurveyMasterId == undefined){
		getGPS();
		var sql = "INSERT INTO answeredSurvey (finished, idSurveyAndroid, titleSurvey, bodySurvey, surveyIDWeb, answerTextArea, answersCheckBox, answersRadio, answersDate,  orchardID, idsTextAreas, idsCheckBox, idsRadio, idsDate, synchronized, timestamp, gps) ";	
		sql += "VALUES(1, '"+ surveyMasterId + "' , '"+ surveyMasterTitle +"', '"+ $("#SurveyBody").html() + "', '"+ idSurveyWeb + "', '" + answersTextAreas + "', '"+ answersCheckBox +"', '" + answersRadio + "', '"+ answersDate +"', "+ orchardMasterId +", '"+ idTextAreas + "', '"+ idCheckBoxs + "', '"+ idRadios +"', '"+ idDates +"', 0, '"+ getCurrentDateTime() +"', '"+ gps +"')";							
		tx.executeSql(sql);		
		messageTitle = "¡Se guardó encuesta: '" + surveyMasterTitle + "' correctamente!";	
	}
	else{
		getGPS();
		var sql = "UPDATE answeredSurvey SET finished = 1 , idSurveyAndroid = "+ surveyMasterId +" , titleSurvey = '"+ surveyMasterTitle +"', bodySurvey = '"+ $("#SurveyBody").html()+  "', surveyIDWeb = '"+ idSurveyWeb +"',  answerTextArea = '"+ answersTextAreas +"', answersCheckBox = '" + answersCheckBox + "', answersRadio = '"+ answersRadio +"', answersDate = '"+ answersDate +"',  orchardID = "+ orchardMasterId + ", idsTextAreas ='"+ idTextAreas +"' , idsCheckBox ='"+ idCheckBoxs +"' , idsRadio = '"+ idRadios +"', idsDate= '"+ idDates +"',synchronized = 0, timestamp = '"+ getCurrentDateTime() +"', gps = '"+ gps + "' WHERE id = "+ answeredSurveyMasterId;	
		answeredSurveyMasterId = undefined;
		tx.executeSql(sql);
		messageTitle = "¡Se actualizo encuesta con el título: '" + surveyMasterTitle + "' correctamente!";	
	}	
	getPage("views/answeredSurveys/index.title.html", "views/answeredSurveys/index.html");
}
*/