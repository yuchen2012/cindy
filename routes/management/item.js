var express = require('express');
var router = express.Router();
var db = require('../../modules/db/db');

router.get('/',function(req,res){
	db.connect();
	db.showItem(0,0,res);
	db.disconnect();
});

router.route('/delete/:id').get(function(req,res){
	db.connect();
	db.deleteItem(req.params.id);
	db.disconnect();
	res.redirect('/management/item');
});

router.route('/assign/:id').get(function(req,res){
	db.connect();
	db.lookupItem(req.params.id,res);
	db.disconnect();

}).post(function(req,res){
	db.connect();
	db.assignItem([req.body.user_id,req.body.rowid]);
	db.disconnect();
	res.redirect('/management/item');
});


module.exports = router;