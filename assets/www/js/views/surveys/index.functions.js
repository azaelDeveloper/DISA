function surveysMasterModel(surveysMasters, completeModel) {
	var self = this;
	self.surveys = ko.observableArray(surveysMasters);
	self.sincronizeMasters = ko.observableArray(completeModel);
	
	self.selectSurveyMaster = function(pesticidesMaster) {
		surveyMasterId = $(this).attr("id");
		surveyMasterDate = $(this).attr("timestamp");
		getPage("file:///android_asset/www/views/surveys/use.title.html", "file:///android_asset/www/views/surveys/use.html");
	};
	
	self.detailSurveyMaster = function(pesticidesMaster) {
		surveyMasterId = $(this).attr("id");
		surveyMasterDate = $(this).attr("timestamp");
		getPage("file:///android_asset/www/views/surveys/detail.title.html", "file:///android_asset/www/views/surveys/detail.html");		
	};
};
function synchronizeSurveys() {	
	// body...		
	$("#spinner").addClass(" spin");
	//var url = "http://test.tcertifica/Service/GetNewSurveys/";	
	var url = "http://187.204.29.143/Tsandu.TSERP.Web/Service/GetAllSurveysXML/"
	$.ajax({
      type: "POST",
      url: url,
      data: { guid: guidUserKey},
      dataType: "xml",
      cache: false,
      success: function(result) {            
			var surveys = result.getElementsByTagName("survey");																						
			loadSurvey(surveys);	
			db.transaction(checkSurveys, errorCB);
			getPage("file:///android_asset/www/views/surveys/index.title.html", "file:///android_asset/www/views/surveys/index.html");
        },
      error:function (xhr, ajaxOptions, thrownError){
            navigator.notification.alert("No se puede contactar al servidor", alertMiss, "Respuesta del servidor", "Aceptar");
        },              
            async: true
    });
    function loadSurvey(survey){			
	var firstPass = false;		
	for(var i = 0; i < survey.length; i++){
		alert(survey[i].attributes["name"].nodeValue);
		titleSurvey.push(survey[i].attributes["name"].nodeValue);		
		version.push(survey[i].attributes["datetime"].nodeValue);						
		idSurveysWeb.push(survey[i].attributes["id"].nodeValue);		
		var surveyIDWEB = survey[i].attributes["id"].nodeValue;
		htmlBody = '<h2>' + survey[i].attributes["name"].nodeValue + "</h2> <br >&nbsp; <strong>" + survey[i].attributes["datetime"].nodeValue + "</strong><br >";
		sections = survey[i].getElementsByTagName("sections");
		loadSections(sections, surveyIDWEB);				
		arraySurveys.push(htmlBody);								
	}
}

function loadSections(sections, surveyID){
	for(var i = 0; i < sections.length; i++){		
		section = sections[i].getElementsByTagName("section");
		loadSection(section, surveyID);
	}
}

function loadSection(section, surveyID){
	for(var i = 0; i < section.length; i++){
		var sectionID = section[i].attributes["id"].nodeValue;
		htmlBody += '<h3>' + section[i].attributes["name"].nodeValue + "</h3><br ><strong>" + section[i].attributes["datetime"].nodeValue + "</strong><br >";				
		questions = section[i].getElementsByTagName("questions");
		loadQuestions(questions, sectionID, surveyID);
	}
}

function loadQuestions(questions, idSection, surveyID){
	for(var i = 0; i < questions.length; i++){
		qht = questions[i].childNodes;
		loadQHT(qht, idSection, surveyID);
		//SAVE THE BODY IN THE D.B.
	}	
}
function loadQHT(qht, idSection, surveyID){
	var ques = [];
	for(var i = 0; i < qht.length; i++){		
		tagName = qht[i].tagName;
		var counter;
		var questionID = "";
		switch(tagName){
			case "question":
				questionID = qht[i].attributes["id"].nodeValue;			
				if(qht[i].attributes["showType"].nodeValue == 4){					
					
					ques.push(qht[i]);									
					createTableType1(ques, questionID, idSection, surveyID);
					ques = [];
				}
				else
				{						
					var questionNumber = qht[i].attributes["questionNumber"].nodeValue;
					var questionText =  qht[i].attributes["text"].nodeValue;												
					typeValue = qht[i].attributes["type"].nodeValue;
					posibleAnswers = qht[i].getElementsByTagName("posibleAnswers");//posibleAnswers
					answer = loadPosibleAnswers(posibleAnswers, questionID, idSection, surveyID);					
					createQuestionType(typeValue,answer, questionNumber, questionText, idSection, questionID);
				}
				
			break;
			case "hr":								
				htmlBody += "<br ><hr ><br >";
			break;
			case "table":			
				headers = qht[i].attributes["headers"].nodeValue;
				token = headers.split("/");
				htmlBody += '<br ><table class="table table-striped table-hover" width="100%"><thead><tr>';
				for(var j = 0; j < token.length - 1; j++){
					htmlBody += '<th>' + token[j] + "</th>";
				}
				htmlBody += "</tr></thead><tbody><tr>";
				table = qht[i].childNodes;//question
				for(var j = 0; j < table.length; j++){
					htmlBody += "<td>";
					typeValue = table[j].attributes["type"].nodeValue;
					var questionID = table[j].attributes["id"].nodeValue;
					var questionNumber = table[j].attributes["questionNumber"].nodeValue;
					var questionText =  table[j].attributes["text"].nodeValue;													
					posibleAnswers = table[j].getElementsByTagName("posibleAnswers");//posibleAnswers
					answer = loadPosibleAnswers(posibleAnswers, questionID, idSection, surveyID);					
					createQuestionType(typeValue, answer, questionNumber, questionText, idSection, questionID);
					htmlBody += "</td>";
				}
				htmlBody += "</tr></tbody></table><br >";
			break;
		}
	}	
}
function loadPosibleAnswers(posibleAnswers, questionID, idSection, SurveyID){
	for(var i = 0; i < posibleAnswers.length; i++){
		posibleAnswer = posibleAnswers[i].getElementsByTagName("posibleAnswer");		
		posibleAnswersArray = loadPosibleAnswer(posibleAnswer, questionID, idSection, SurveyID);
	} 
	return posibleAnswersArray;
}
function loadPosibleAnswer(posibleAnswer, questionID, idSection, SurveyID){
	posibleAnswerArray = [];	
	for(var i = 0; i < posibleAnswer.length; i++){				
		if(posibleAnswer[i].attributes["answer"].nodeValue != undefined){
			var answer = posibleAnswer[i].attributes["answer"].nodeValue;
			var idPosibleAnswer = posibleAnswer[i].attributes["id"].nodeValue;
			var sql = "INSERT INTO posibleAnswers (alternative, idPosibleAnswer, idQuestion, idSection, idSurvey, timestamp) VALUES ('"+ answer +"', '"+ idPosibleAnswer +"', '"+ questionID +"', '"+ idSection +"', '"+ SurveyID +"', '" + getCurrentDateTime() + "')";
			queryPosibleAnswers.push(sql);						
			posibleAnswerArray.push(answer + "@-" + posibleAnswer[i].attributes["justification"].nodeValue + "@-" + posibleAnswer[i].attributes["id"].nodeValue);			
		}			
	}
	return posibleAnswerArray;
}
function createQuestionType(value,answer, questionNumber, questionText, idSection, idQuestion, surveyID){
	switch(value){
		case "1":			
 			htmlBody += '<br ><label class="question-text">'+questionNumber+ '.-'+ questionText +'</label><textarea class="form-control" placeholder="Respuesta para pregunta abierta..." id="'+ idSection + '-' + idQuestion +'" data-idSurvey="'+ surveyID + '"  ></textarea><br>';
		break;
		case "2":			
			htmlBody += '<br ><div class="checkbox"><input type = "checkbox" id="'+ idSection +'-'+ idQuestion +'" value="true" name="checkbox" data-idSurvey="'+ surveyID +'"><label for="'+ idSection +'-'+ idQuestion +'">'+ questionNumber +'.-'+ questionText +'</label>(Sí/No)</div><br >';
		break;
		case "3":			
			htmlBody += '<br ><label class="question-text">'+questionNumber +'.-'+ questionText +'</label><br ><div class="col-sm-4"><div class="form-group"><div class="input-group date"><input type="text" class="form-control" id="'+ idSection +'-' + idQuestion +'" disabled data-idSurvey="'+ surveyID +'"><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span></div></div></div><br /><br />';
		break;
		case "4":									
			htmlBody += '<br /><label class="question-text">' + questionNumber + ".- " + questionText + '</label><div class="radio">';			
			for(i = 0; i < answer.length; i++){
				token = answer[i].split("@-");					
				htmlBody += '<input type="radio" value="true" name="'+ questionText + idSection +'" id="'+ idSection +'-'+ idQuestion +'-'+ i +'" data-idSurvey="' + surveyID+ '" data-idPosibleAnswer="'+ token[2] +'" ><label for="'+ idSection +'-'+ idQuestion +'-'+ i +'">' + token[0] + '</label><br />';
			}
			htmlBody += "</div><br />";			
		break;
		case "5":
			htmlBody += '<br ><label class="question-text">'+ questionNumber +'.-'+ questionText + '</label><div class="checkbox">';
			for(i = 0; i < answer.length; i++){
				token = answer[i].split("@-");							
				htmlBody += '<input type ="checkbox" name = "group" value = "true" id="'+ idSection +'-'+ idQuestion +'-'+ i +'" data-idSurvey="'+ surveyID +'" data-idPosibleAnswer="'+ token[2] + '"><label for="'+ idSection +'-'+ idQuestion +'-'+ i +'">' + token[0] + "</label><br/>";
			}
			htmlBody += "</div><br />";
		break;
	}
}
function createTableType1(ques, idQuestion, idSection, surveyID){	
	
	htmlBody += '<table class="table" width="100%"><thead><tr>';	
	for(var x = 0; x < ques.length; x++){
		var number = ques[x].attributes["questionNumber"].nodeValue;
		var question = ques[x].attributes["text"].nodeValue;
		htmlBody +=  '<th style="width:auto;">'+ number + ".- " + question + "</th>";
	}
	htmlBody += "</tr><tbody><tr>";
	for(var x = 0; x < ques.length; x++){
		var typeQues = ques[x].attributes["type"].nodeValue;
		var id = ques[x].attributes["text"].nodeValue;		
		var width = (100/ques.length);
		answer = loadPosibleAnswers(posibleAnswers, idQuestion, idSection, surveyID);		
		htmlBody +=  '<td width="' + width + '%">' + inputForTable(typeQues, idQuestion, idSection, surveyID) + "</td>";
	}
	htmlBody += "</tr></tbody></table>";
}
function inputForTable(value, idQuestion, idSection, surveyID){
	var input = "";
	switch(value){
		case "1":
			input += '<br /><textarea class="form-control" placeholder="Respuesta para pregunta abierta..." id="'+ idSection + '-' + idQuestion +'"></textarea><br />';
		break;
		case "2":
			input += '<br /><div class="checkbox"><input type ="checkbox" id="'+ idSection +'-'+ idQuestion +'"><label for="'+ idSection +'-'+ idQuestion +'">(Sí/No)</label></div><br />';
		break;
		case "3":
			input += '<br /><br /><div class="col-sm-8"><div class="form-group"><div class="input-group date"><input type="text" id="'+ idSection + '-' + idQuestion +'" class="form-control" disabled ><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span></div></div></div><br /><br />';
		break;
		case "4":			
			input += '<br /><div class="radio">';			
			for(i = 0; i < answer.length; i++){
				token = answer[i].split("@-");											
				input += '<input type="radio" value="true" name="'+ questionText + idSection +'" id="'+ idSection +'-'+ idQuestion +'-'+ i +'"><label for=id="'+ idSection +'-'+ idQuestion +'-'+ i +'">' + token[0] + '</label><br />';
			}
			htmlBody += "</div><br />";			
		break;
		case "5":
			input += '<br ><div class="checkbox">';
			for(i = 0; i < answer.length; i++){
				token = answer[i].split("@-");							
 				input += '<input type ="checkbox" name = "group" value = "true" id="'+ idSection +'-'+ idQuestion +'-'+ i +'"><label for=id="'+ idSection +'-'+ idQuestion +'-'+ i +'">' + token[0] + "</label><br />";
			}	
			input += "</div><br />";
		break;		
	}
	return input;
	}
};
function checkSurveys(tx){	
	getGPS();
	tx.executeSql('DELETE FROM surveys');	
	db.transaction(dropAnsweredSurveys, errorCB);		
	for(var x = 0; x < arraySurveys.length; x++){		
		var sql = "INSERT INTO surveys (title, version, bodySurvey, timestamp, gps) ";			
		sql += "VALUES('"+ titleSurvey[x] +"', '"+ version[x] + "' , '"+ arraySurveys[x] +"', '"+ getCurrentDateTime() +"', '"+ gps +"')";		
		tx.executeSql(sql);
	}			
	for( var x =0; x < queryPosibleAnswers.length; x++){
		//alert(queryPosibleAnswers[x]);
		//tx.executeSql(queryPosibleAnswers[x]);
	}	
}
function dropAnsweredSurveys(tx){	
	tx.executeSql('DELETE FROM answeredSurvey WHERE finished=0');	
	tx.executeSql('DELETE FROM posibleAnswers');	
}
// Query the database
//
function queryDB(tx) {
	tx.executeSql('SELECT * FROM surveys', [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {	
	var len = results.rows.length;
	var surveysMasters = [];	

	if (len > 0) {
		for ( var i = 0; i < len; i++) {			
			surveysMasters.push(results.rows.item(i));
		}		
		completeModel = surveysMasters;
		$("#noRecordsFound").hide("fast");
	} else {
		
		$("#noRecordsFound").show("fast");
	}

	viewModel = new surveysMasterModel(eval(surveysMasters), eval(synchronizeModel));
	ko.applyBindings(viewModel);
	if (Message != null && Message != "")
	{		
		writeMessage(Message);
	}
	else
		Message = null;
}
