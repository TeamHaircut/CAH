var authController = require('../controllers/auth.server.controller.js');
var appController = require('../../public/controllers/app.client.controller.js');
 
module.exports = function(app, passport, user) {
 
	var User = user;
	var uname;
 
    app.get('/register', authController.register);
 
    app.get('/login', authController.login);
 
    app.post('/register', passport.authenticate('local-register', {
            successRedirect: '/cah',
 
            failureRedirect: '/register'
        }
 
    ));
	
	app.post('/cah', isLoggedIn, function (req, res, next) {
		res.locals.user = User;
		res.locals.uname = uname;
		res.locals.displayname = req.body.username;
		res.locals.room = req.body.room;
		next();
		}, appController.entercahpost
	);	

    app.get('/logout', authController.logout);
	
    app.post('/login', passport.authenticate('local-login', {failureRedirect: '/login'}), 
		(req, res, next) => {
			uname = req.body.username;
			res.redirect('/option');}
    );
	
	app.get('/option', isLoggedIn, appController.options);
	
	app.get('/createroom', isLoggedIn, appController.createroom);
	
	app.post('/createroom', function (req, res) {
			res.redirect('/createroom');
		}
    );
	
	app.get('/joinroom', isLoggedIn, appController.joinroom);
	
	app.post('/joinroom', function (req, res) {
			res.redirect('/joinroom');
		}
    );
	
	app.get('/shareroom', isLoggedIn, appController.shareroom);
	
	app.post('/create', function (req, res) {
			res.redirect('/shareroom');
		}
    );
	
	app.get('/displayname', isLoggedIn, function (req, res, next) {
		res.locals.user = User; 
		res.locals.uname = uname; 
		next();}, appController.displayname
	);
	
	app.post('/continue', function (req, res) {
			res.redirect('/displayname');
		}
    );
	
    function isLoggedIn(req, res, next) {
		
        if (req.isAuthenticated())
 
			{console.log("Authenticated"); return next();}
 
        res.redirect('/login');
 
    }
 
}