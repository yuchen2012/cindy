var express = require('express');
var router = express.Router();
var db = require('../../modules/db/db');
db.connect();

router.route('/')
.get(function(req,res){
	
	db.showBlueprint(0,0,res,'management');
	
})
.post(function(req,res){

	db.addBlueprint([req.body.name,req.body.description,req.body.logo]);
	
	res.redirect('/management/blueprint');		
});

router.route('/show')
.get(function(req,res){
	
	db.showBlueprint(0,0,res,'show');
	
});

router.route('/delete/:id').get(function(req,res){
	
	db.deleteBlueprint(req.params.id);
	
	res.redirect('/management/blueprint');
});

router.route('/update/:id').get(function(req,res){
	
	db.lookupBlueprint(req.params.id,res,'management');
	
}).post(function(req,res){
	
	db.updateBlueprint([req.body.name,req.body.description,req.body.logo,req.body.rowid]);
	
	res.redirect('/management/blueprint');
});

router.route('/create/:id').get(function(req,res){
	
	db.addItem([0,req.params.id]);
	
	res.redirect('/management/item');
});


module.exports = router;