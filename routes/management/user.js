var express = require('express');
var router = express.Router();
var db = require('../../modules/db/db');
db.connect();

router.route('/')
.get(function(req,res){
	
	db.showUser(0,0,res,'management');
	
});

router.route('/show')
.get(function(req,res){
	
	db.showUser(0,0,res,'show');
	
});

router.route('/delete/:id').get(function(req,res){
	
	db.deleteUser(req.params.id);
	
	res.redirect('/management/user');
});



module.exports = router;