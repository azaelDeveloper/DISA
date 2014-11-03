function graphicsMasterModel(graphicsMaster) {
  var self = this;
  self.graphicsMaster = ko.observableArray(graphicsMaster);    
};

function buildGraphic(items){
	chart1 = new cfx.Chart();
    chart1.setGallery(cfx.Gallery.Gantt);
    chart1.getLegendBox().setVisible(false); 
    chart1.setGallery(cfx.Gallery.Gantt);   
    chart1.getData().setSeries(2);
    chart1.getAllSeries().setStackedStyle(cfx.Stacked.Normal);    
    chart1.setDataSource(items);
    var divHolder = document.getElementById('ChartDiv');
    chart1.create(divHolder);
	$("svg#chart a").css("display", "none");
}

function nameMonth(date){
  var name;
  switch(date){
    case 1:
    name = "Enero";
    break;
    case 2:
    name = "Febrero";    
    break;
    case 3:
    name = "Marzo";
    break;
    case 4:
    name = "Abril";
    break;
    case 5:
    name = "Mayo";
    break;
    case 6:
    name = "Junio";
    break;
    case 7:
    name = "Julio";
    break;
    case 8:
    name = "Agosto";
    break;
    case 9:
    name = "Septiembre"
    break;
    case 10:
    name = "Octubre";
    break;
    case 11:
    name = "Noviembre";
    break;
    case 12:
    name = "Diciembre";
    break;
  }    
  return name;  
}
function nameInitialMonth(date){
  var name;
  switch(date){
    case 1:
    name = "En";
    break;
    case 2:
    name = "Fe";    
    break;
    case 3:
    name = "Mr";
    break;
    case 4:
    name = "Ab";
    break;
    case 5:
    name = "My";
    break;
    case 6:
    name = "Jn";
    break;
    case 7:
    name = "Jl";
    break;
    case 8:
    name = "Ag";
    break;
    case 9:
    name = "Se"
    break;
    case 10:
    name = "Oc";
    break;
    case 11:
    name = "No";
    break;
    case 12:
    name = "Di";
    break;
  }    
  return name;  
}

// Query the database
//
function queryDB(tx) {
  var query = 'SELECT COUNT(month) AS counting, month, year FROM reports WHERE timestamp BETWEEN ';
  query += "'"+ oneYearBefore() +"' AND '" + getCurrentDateTime() + "'";
  query += ' AND idOrchard = '+ orchardMasterId + ' GROUP BY month, year';    
  tx.executeSql(query, [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {    
  var body;
  var table = document.getElementById('monthTable');    
  body = '<table class="table table-striped table-bordered">';
  body += '<thead><tr><th># de Reportes</th>';
  body += '<th>Mes</th>';
  body += '<th>Año</th></tr></thead>';
  body += '<tbody>';

  bodyGraphics = "";
  var len = results.rows.length;  
  var graphicsMaster = [];  

  if (len > 0) {
    for ( var i = 0; i < len; i++) {      
      graphicsMaster[i] = results.rows.item(i);                
      body = drawBodyTable(results.rows.item(i).counting, results.rows.item(i).month, results.rows.item(i).year, body);
      var name = nameInitialMonth(results.rows.item(i).month);      
      if (i == len - 1)
      {
        bodyGraphics += '{ "Mes/Año": "' + name + '/' + results.rows.item(i).year + '",'      
        + ' "# Reportes": ' + results.rows.item(i).counting + '}';
                  
      }
      else
      {        
        //name + ' - ' + results.rows.item(i).year
        bodyGraphics += '{ "Mes/Año": "' + name + '/' + results.rows.item(i).year + '",'   
        + ' "# Reportes": ' + results.rows.item(i).counting + '},';
      }      
    }
    body += '</tbody></table>';    
    table.innerHTML = body;
    //drawBodyTable(results.rows.item(i).counting, name, results.rows.item(i).year, body);
    buildGraphic(eval("[" + bodyGraphics + "]"));    
    $("#noRecordsFound").hide("fast");
    } else {
        $("#noRecordsFound").show("fast");
      }
    
      viewModel = new graphicsMasterModel(eval(graphicsMaster));
      ko.applyBindings(viewModel);
      
    }
    function drawBodyTable(counting, numberMonth, year, body){          
      switch (numberMonth){
        case 1:
          body += '<tr>';
          body += '<td width="40%">'+ counting +'</td>';
          body += '<td width="20%">Enero</td>';
          body += '<td width="40%">'+ year +'</td>';
          body += '</tr>';
        break;
        case 2:
          body += '<tr>';
          body += '<td width="40%">'+ counting +'</td>';
          body += '<td width="20%">Febrero</td>';
          body += '<td width="40%">'+ year +'</td>';
          body += '</tr>';
        break;
        case 3:
          body += '<tr>';
          body += '<td width="40%">'+ counting +'</td>';
          body += '<td width="20%">Marzo</td>';
          body += '<td width="40%">'+ year +'</td>';
          body += '</tr>';
        break;
        case 4:
          body += '<tr>';
          body += '<td width="60%">'+ counting +'</td>';
          body += '<td width="20%">Abril</td>';
          body += '<td width="20%">'+ year +'</td>';
          body += '</tr>';
        break;
        case 5:
          body += '<tr>';
          body += '<td width="40%">'+ counting +'</td>';
          body += '<td width="20%">Mayo</td>';
          body += '<td width="40%">'+ year +'</td>';
          body += '</tr>';
        break;
        case 6:
          body += '<tr>';
          body += '<td width="60%">'+ counting +'</td>';
          body += '<td width="20%">Junio</td>';
          body += '<td width="40%">'+ year +'</td>';
          body += '</tr>';
        break;
        case 7:                    
          body += '<tr>';
          body += '<td width="40%">'+ counting +'</td>';
          body += '<td width="20%">Julio</td>';
          body += '<td width="40%">'+ year +'</td>';
          body += '</tr>';          
        break;
        case 8:
          body += '<tr>';
          body += '<td width="40%">'+ counting +'</td>';
          body += '<td width="20%">Agosto</td>';
          body += '<td width="40%">'+ year +'</td>';
          body += '</tr>';
        break;
        case 9:
          body += '<tr>';
          body += '<td width="40%">'+ counting +'</td>';
          body += '<td width="20%">Septiembre</td>';
          body += '<td width="40%">'+ year +'</td>';
          body += '</tr>';
        break;
        case 10:
          body += '<tr>';
          body += '<td width="40%">'+ counting +'</td>';
          body += '<td width="20%">Octubre</td>';
          body += '<td width="40%">'+ year +'</td>';
          body += '</tr>';
        break;
        case 11:
          body += '<tr>';
          body += '<td width="40%">'+ counting +'</td>';
          body += '<td width="20%">Noviembre</td>';
          body += '<td width="40%">'+ year +'</td>';
          body += '</tr>';
        break;
        case 12:
          body += '<tr>';
          body += '<td width="40%">'+ counting +'</td>';
          body += '<td width="20%">Diciembre</td>';
          body += '<td width="40%">'+ year +'</td>';
          body += '</tr>';
        break;
      }
      return body;
}

// Transaction error callback
//
function errorCB(err) {
  console.log("Error processing SQL: " + err.code);
}
$("#getHomeTablet").click(function(){
    getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");    
  });
$("#getHomePhone").click(function(){
    getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");    
  });