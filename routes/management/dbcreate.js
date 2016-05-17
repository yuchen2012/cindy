var express = require('express');
var router = express.Router();
var db = require('../../modules/db/db');

router.route('/')
.get(function(req,res){
	db.connect();
	db.userSetup();
	db.itemSetup();
	db.blueprintSetup();
	db.progressSetup();
	db.storySetup();
	db.pageSetup();
	res.send('success');
});


module.exports = router;