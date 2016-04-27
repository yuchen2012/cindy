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



module.exports = router;