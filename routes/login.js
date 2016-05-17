var express = require('express');
var router = express.Router();
var db = require('../modules/db/db');
db.connect();
router.route('/')
.get(function(req, res, next) {
  res.render('login',{title:'Sign in'});
})
.post(function(req,res){
	db.loginCheck(req.body.username,req.body.password,res,req);
	
		
});




module.exports = router;
