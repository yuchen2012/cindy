var express = require('express');
var router = express.Router();
var db = require('../modules/db/db');

router.route('/')
.get(function(req, res, next) {
  res.render('login',{title:'Sign in'});
})
.post(function(req,res){
	db.connect();
	db.loginCheck(req.body.username,req.body.password,res,req);
	
	db.disconnect();
		
});




module.exports = router;
