function monthlyMasterModel(monthlyMasters) {
  var self = this;
  self.monthlyMasters = ko.observableArray(monthlyMasters);    
};

function buildGraphic(items){
	chart1 = new cfx.Chart();
    chart1.setGallery(cfx.Gallery.Gantt);
    chart1.getLegendBox().setVisible(false);
    chart1.setGallery(cfx.Gallery.Gantt);
    chart1.getData().setSeries(4);
    chart1.getAllSeries().setStackedStyle(cfx.Stacked.Normal);    
    chart1.setDataSource(items);
    var divHolder = document.getElementById('ChartDiv');
    chart1.create(divHolder);
	$("svg#chart a").css("display", "none");
}

function splitDate(date){
  var numberMonth = [];
  var nameMonth;
  numberMonth = date.split('/');  
  switch(Number(numberMonth[1])){
    case 1:
    nameMonth = "Enero";       
    break;
    case 2:
    nameMonth = "Febrero";    
    break;
    case 3:
    nameMonth = "Marzo";    
    break;
    case 4:
    nameMonth = "Abril";    
    break;
    case 5:
    nameMonth = "Mayo";    
    break;
    case 6:
    nameMonth = "Junio";    
    break;
    case 7:
    nameMonth = "Julio";    
    break;
    case 8:
    nameMonth = "Agosto";    
    break;
    case 9:
    nameMonth = "Septiembre";    
    break;
    case 10:
    nameMonth = "Octubre";    
    break;
    case 11:
    nameMonth = "Noviembre";        
    break;
    case 12:
    nameMonth = "Diciembre";        
    break;
  }    
  return nameMonth;  
}
function nameInitialMonth(date){
  var name;
  var numberMonth = [];
  var nameMonth;
  numberMonth = date.split('/');
  switch(Number(numberMonth[1])){
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
  tx.executeSql('SELECT * FROM monthly_master WHERE idOrchard = '+ orchardMasterId +' ORDER BY timestamp ASC', [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
  bodyGraphics = "";
  var len = results.rows.length;
  Month = len;  
  var monthlyMasters = [];  

  if (len > 0) {
    for ( var i = 0; i < len; i++) {
      monthlyMasters[i] = results.rows.item(i);     
      var name = nameInitialMonth(results.rows.item(i).timestamp);
      if (i == len - 1)
      {
        bodyGraphics += '{ "Month": "' + name + '",'      
        + ' "Plagas": ' + results.rows.item(i).averagePoblation + ','
        + ' "Organismos Beneficos": ' + results.rows.item(i).averageAgencies + '}';                      
      }
      else
      {        
        bodyGraphics += '{ "Month": "' + name + '",'      
        + ' "Plagas": ' + results.rows.item(i).averagePoblation + ','
        + ' "Organismos Beneficos": ' + results.rows.item(i).averageAgencies + '},';      
        
      }      
    }
    buildGraphic(eval("[" + bodyGraphics + "]"));    
    $("#noRecordsFound").hide("fast");

  } else {
    $("#noRecordsFound").show("fast");
  }

  viewModel = new monthlyMasterModel(eval(monthlyMasters));
  ko.applyBindings(viewModel);
  
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