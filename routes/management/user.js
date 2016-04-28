var express = require('express');
var router = express.Router();
var db = require('../../modules/db/db');


router.route('/')
.get(function(req,res){
	db.connect();
	db.showUser(0,0,res,'management');
	db.disconnect();
});

router.route('/show')
.get(function(req,res){
	db.connect();
	db.showUser(0,0,res,'show');
	db.disconnect();
});

router.route('/delete/:id').get(function(req,res){
	db.connect();
	db.deleteUser(req.params.id);
	db.disconnect();
	res.redirect('/management/user');
});



module.exports = router;