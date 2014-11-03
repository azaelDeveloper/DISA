function deleteAllOrchard(){
	db.transaction(deleteDaily, errorCB);
	db.transaction(deleteWeekly, errorCB);
	db.transaction(deleteMonthly, errorCB);
	db.transaction(deleteYearly, errorCB);	
	db.transaction(deleteReports, errorCB);
	db.transaction(deleteOrchard, errorCB);	
}
function deleteDaily(tx) {
	query = 'DELETE FROM daily_master WHERE idOrchard = ' + orchardMasterId;
	tx.executeSql(query);	
}
function deleteWeekly(tx) {
	query = 'DELETE FROM  weekly_master WHERE idOrchard = ' + orchardMasterId;
	tx.executeSql(query);	
}
function deleteMonthly(tx) {
	query = 'DELETE FROM monthly_master WHERE idOrchard = ' + orchardMasterId;
	tx.executeSql(query);	
}
function deleteYearly(tx) {
	query = 'DELETE FROM yearly_master WHERE idOrchard = ' + orchardMasterId;
	tx.executeSql(query);	
}
function deleteReports(tx) {
	query = 'DELETE FROM reports WHERE idOrchard = ' + orchardMasterId;
	tx.executeSql(query);	
}
function deleteOrchard(tx) {
	query = 'DELETE FROM orchard WHERE id = ' + orchardMasterId;
	tx.executeSql(query);
	Message = "Se borró todo correctamente";	
	orchardMasterId = null;
	ochardMasterName = null;
	getPage("file:///android_asset/www/views/orchards/index.title.html", "file:///android_asset/www/views/orchards/index.html");
}