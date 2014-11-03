var myForm = new Validate();
myForm.addRules({
	id : 'nameUser',
	option : 'required',
	error : 'Es necesario su nombre'
});

myForm.addRules({
	id : 'lastNameUser',
	option : 'required',
	error : 'Es necesario su apellido'
});
myForm.addRules({
	id : 'emailUser',
	option : 'email',
	error : 'Es necesario su email'
});

myForm.addRules({
	id : 'passwordUser',
	option : 'required',
	error : 'Es necesaria su contraseña'
});
myForm.addRules({
	id : 'repitPasswordUser',
	option : 'required',
	error : 'Es necesario repetir su contraseña'
});

$("#save").click(function (){
	Save();
});