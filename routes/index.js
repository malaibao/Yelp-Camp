var express = require('express');
var router = express.Router();

var passport = require('passport');
var User = require('../models/user');

//ROOT ROUTE
router.get('/', (req, res)=>{
	res.render('landing');
})

//===========LOGIN=================//
router.get('/login', (req, res)=>{
	res.render('login');
})

router.post('/login', passport.authenticate('local', {
	successRedirect: '/campgrounds',
	failureRedirect: '/login'
}),(req, res)=>{

})

//==========register===============//
router.get('/register', (req, res)=>{
	res.render('register');
})

router.post('/register', (req, res)=>{
	User.register(new User({username: req.body.username}), req.body.password, (err, user)=>{
		if(err){
			req.flash('error', err.message);
			return res.redirect('/register');
		}
		passport.authenticate('local')(req, res, ()=>{
			req.flash('success', 'Welcome to YelpCamp, ' + user.username);
			res.redirect('/campgrounds');
		});
	});
});

//==========LOGOUT===============//
router.get('/logout', (req, res)=>{
	req.logout();
	req.flash('success', 'Logged out');
	res.redirect('/');
})

// //=======STAY LOGIN==============//
// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect('/login');
// }

module.exports = router;