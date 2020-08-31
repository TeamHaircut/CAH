var authController = require('../controllers/auth.server.controller.js');
var appController = require('../../public/controllers/app.client.controller.js');
 
module.exports = function(app, passport) {
 
 
    app.get('/register', authController.register);
 
 
    app.get('/login', authController.login);
 
 
    app.post('/register', passport.authenticate('local-register', {
            successRedirect: '/cah',
 
            failureRedirect: '/register'
        }
 
    ));
 
	app.get('/cah', isLoggedIn, appController.entercah);
 
 
    app.get('/logout', authController.logout);
 
 
    app.post('/login', passport.authenticate('local-login', {
			successRedirect: '/cah',
 
            failureRedirect: '/login'
        }
 
    ));
 
 
    function isLoggedIn(req, res, next) {
		
        if (req.isAuthenticated())
 
			{console.log("Authenticated"); return next();}
 
        res.redirect('/login');
 
    }
 
}