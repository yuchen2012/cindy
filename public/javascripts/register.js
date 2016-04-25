
$('#password2').blur(function() {
	var p1 = $('#password1').val();
	var p2 = $('#password2').val();
	if(p1!=p2)alert("The passwords are not the same!");
});




$('#username').blur(function() {
	var username = $('#username').val();
	$.get('/register/check/'+username, function (result){
		if(result){
			alert("The username already exists!");  
		}
  });
});


