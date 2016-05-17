var express = require('express');
var router = express.Router();
var db = require('../../modules/db/db');
db.connect();

router.get('/',function(req,res){
	
	db.showItem(0,0,res);

});

router.route('/delete/:id').get(function(req,res){

	db.deleteItem(req.params.id);

	res.redirect('/management/item');
});

router.route('/assign/:id').get(function(req,res){

	db.lookupItem(req.params.id,res);


}).post(function(req,res){

	db.assignItem([req.body.user_id,req.body.rowid]);

	res.redirect('/management/item');
});


module.exports = router;