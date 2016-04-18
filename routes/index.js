var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cindy' });
});

router.get('/login',function(req,res){
	res.render('login',{title:'Sign in'})
});

router.get('/logout',function(req,res){
	res.redirect('/');
});

router.get('/home',function(req,res){
	res.render('home',{title:'Home'})
})

module.exports = router;
