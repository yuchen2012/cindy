var express = require('express');
var router = express.Router();
var db = require('../modules/db/db');
db.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(!req.session.userid||req.session.userid==0){
		res.render('index', { title: 'Cindy' });
	}else{
		db.lookupProgress(req.session.userid,res);
	}
});

router.route('/:user_id').get(function(req,res,next){
	if(!isNaN(req.params.user_id)){
		if(req.session.userid==req.params.user_id)
			db.showProgress(req.params.user_id,res,'game');
		else res.redirect('/');
	}
	else next();
});

router.route('/:user_id/:story_id/:page_index/:action').get(function(req,res,next){
	if(!isNaN(req.params.user_id)){
		if(req.session.userid==req.params.user_id)
			db.nextProgress([req.params.user_id,req.params.story_id,req.params.page_index,req.params.action],res);
		else res.redirect('/');
	}
	else next();
});


router.get('/logout',function(req,res){
	req.session.username = {};
	req.session.userid = 0;
	res.redirect('/');
});








module.exports = router;
