function headerViewModel() {
	self = this;	
	headerMasterModel(self)
};
function Header(Name, PU, Sagarpa, Crop, Variety, Senasica, Address, Surface) {
	var self1 = this;
	self1.nameProductor = ko.observable(Name);
	self1.namePU = ko.observable(PU);
	self1.sagarpa = ko.observable(Sagarpa);
	self1.crop = ko.observable(Crop);
	self1.variety = ko.observable(Variety);
	self1.senasica = ko.observable(Senasica);
	self1.address = ko.observable(Address);
	self1.surface = ko.observable(Surface);	
}
function headerMasterModel(self){
	self.header = ko.observableArray([new Header("", "", "", "", "", "", "", "")]);		
	self.SaveHeader = function (){
		db.transaction(queryHeader, errorCB);
	}
	function queryHeader(tx){
		var sql = "INSERT INTO header_safety (nameProductor, namePU, record_SAGARPA, crop, variety, record_SENASICA, address, surface, timestamp, idOrchard, finished) VALUES ('"+ self.header()[0].nameProductor() + "', '"+ self.header()[0].namePU() +"', '"+ self.header()[0].sagarpa() +"', '"+ self.header()[0].crop() +"', '"+ self.header()[0].variety() +"', '"+ self.header()[0].senasica() +"', '"+ self.header()[0].address() +"', '"+ self.header()[0].surface() +"', '"+ getCurrentDateTime() +"', "+ orchardMasterId +", 0)";
		tx.executeSql(sql);
		getPage("file:///android_asset/www/views/home/index.title.html", "file:///android_asset/www/views/home/index.html");
	}
}
