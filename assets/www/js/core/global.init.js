//50 megabytes data base size
var nameSeller;
var db;
var Message;
var photoMessage;
var orchardMasterId;
var ochardMasterName;
var orchardsLeft;
var guidUserKey;
var clientID;
var clientName;
var factureNumber;
//One navegation step back title url
var backTitleUrl;

//One navegation step back body url
var backBodyUrl;

var loader;
var sessionPrompt;
var gps;
var role="";
var accountType;

var lengthe='';
var length2='';
var numletter="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var key=0;
var temp,temp2,t3='';
var userinput;

var userFormErrors = 0;
var userLogInErrors = 0;

var cutcontent='';
var thepassword="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var tempvar=new Array("","","","","","");
var cur=0;
var ep='';
var keypiece='';
var p1='';
var p2='';
var p3=0;
var p4='';

var urlService = "http://test.tcertifica.com/Service/";

$(function () {
	db = window.openDatabase("disapp", "1.0", "disapp", 99999900);
});