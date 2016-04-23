var express = require('express');
var router = express.Router();
var db = require('../../modules/db/db');


router.route('/')
.get(function(req,res){
	db.connect();
	db.showBlueprint(0,0,res);
	db.disconnect();
})
.post(function(req,res){
	db.connect();
	db.addBlueprint([req.body.name,req.body.description,req.body.logo],res);
	
	db.disconnect();
		
});


router.route('/delete/:id').get(function(req,res){
	db.connect();
	db.deleteBlueprint(req.params.id,res);
	
	db.disconnect();
});


module.exports = router;