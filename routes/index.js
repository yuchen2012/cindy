var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cindy' });
});



router.get('/logout',function(req,res){
	req.session.username = {};
	res.redirect('/');
});

router.get('/home',function(req,res){
	if(!req.session.username){
		res.redirect('/login');
	}else{
		res.render('home',{title:'home',username:req.session.username});
	}
})

module.exports = router;
