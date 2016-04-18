var express = require('express');
var router = express.Router();
var db = require('./db/db');

router.route('/')
.get(function(req, res, next) {
  res.render('register',{title:'Sign up'});

})
.post(function(req,res){
	if(req.body.password1!=req.body.password2){
		
		console.log('password is not the same!');
	}else{
		console.log('222');
		db.connect();
		db.addUser([req.body.username,req.body.password1]);
	
		db.disconnect();
		res.redirect('/home');
	}
		
});


module.exports = router;
