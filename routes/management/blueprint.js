var express = require('express');
var router = express.Router();
var db = require('../../modules/db/db');


router.route('/')
.get(function(req,res){
	db.connect();
	db.showBlueprint(0,0,res,'management');
	db.disconnect();
})
.post(function(req,res){
	db.connect();
	db.addBlueprint([req.body.name,req.body.description,req.body.logo]);
	db.disconnect();
	res.redirect('/management/blueprint');		
});

router.route('/show')
.get(function(req,res){
	db.connect();
	db.showBlueprint(0,0,res,'show');
	db.disconnect();
});

router.route('/delete/:id').get(function(req,res){
	db.connect();
	db.deleteBlueprint(req.params.id);
	db.disconnect();
	res.redirect('/management/blueprint');
});

router.route('/update/:id').get(function(req,res){
	db.connect();
	db.lookupBlueprint(req.params.id,res,'management');
	db.disconnect();
}).post(function(req,res){
	db.connect();
	db.updateBlueprint([req.body.name,req.body.description,req.body.logo,req.body.rowid]);
	db.disconnect();
	res.redirect('/management/blueprint');
});

router.route('/create/:id').get(function(req,res){
	db.connect();
	db.addItem([0,req.params.id]);
	db.disconnect();
	res.redirect('/management/item');
});


module.exports = router;