//load bcrypt
var bCrypt = require('bcrypt-nodejs');
 
 
module.exports = function(passport, user) {
 
    var User = user;
 
    var LocalStrategy = require('passport-local').Strategy;
 
	//serialize user
	passport.serializeUser(function(user, done) {
 
    done(null, user.id);
 
	});
	
	//deserialize user 
	passport.deserializeUser(function(id, done) {
 
		User.findByPk(id).then(function(user) {
	 
			if (user) {
	 
				done(null, user.get());
	 
			} else {
	 
				done(user.errors, null);
	 
			}
	 
		});
 
	});
	
	//LOCAL REGISTER STRATEGY
    passport.use('local-register', new LocalStrategy(
 
        {
 
            usernameField: 'username',
 
            passwordField: 'password',
 
            passReqToCallback: true
 
        },
 
 
 
        function(req, username, password, done) {
 
            var generateHash = function(password) {
 
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
 
            };
 
            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {
 
                if (user)
 
                {
 
                    return done(null, false, {
                        message: 'That username is already taken'
                    });
 
                } else
 
                {
 
                    var userPassword = generateHash(password);
 
                    var data =
 
                        {
                            username: username,
 
                            password: userPassword
 
                        };
 
                    User.create(data).then(function(newUser, created) {
 
                        if (!newUser) {
 
                            return done(null, false);
 
                        }
 
                        if (newUser) {
 
                            return done(null, newUser);
 
                        }
 
                    });
 
                }
 
            });
 
        }
 
    ));
	
	//LOCAL LOGIN STRATEGY
	passport.use('local-login', new LocalStrategy(
	 
		{
	 
			usernameField: 'username',
	 
			passwordField: 'password',
	 
			passReqToCallback: true
	 
		},
	 
	 
		function(req, username, password, done) {
	 
			var User = user;
	 
			var isValidPassword = function(userpass, password) {
	 
				return bCrypt.compareSync(password, userpass);
	 
			}

			User.findOne({
				where: {
					username: username
				}
			}).then(function(user) {
	 
				if (!user) {
	 
					return done(null, false, {
						message: 'Username does not exist'
					});
	 
				}
	 
				if (!isValidPassword(user.password, password)) {
	 
					return done(null, false, {
						message: 'Incorrect password.'
					});
	 
				}
	 
	 
				var userinfo = user.get();
				return done(null, userinfo);
	 
	 
			}).catch(function(err) {
	 
				console.log("Error:", err);
	 
				return done(null, false, {
					message: 'Something went wrong with your login'
				});
	 
			});
	 
	 
		}
	 
	));
 
}