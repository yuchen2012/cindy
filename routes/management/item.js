var express = require('express');
var router = express.Router();
var db = require('../../modules/db/db');

router.get('/',function(req,res){
	db.connect();
	db.showItem(0,0,res);
	db.disconnect();
});



module.exports = router;