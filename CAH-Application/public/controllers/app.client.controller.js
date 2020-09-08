var exports = module.exports = {}

exports.options = function(req, res) {
 
	res.render('option');
 
}

exports.createroom = function(req, res) {
 
	res.render('createroom');
 
}

exports.joinroom = function(req, res) {
 
	res.render('joinroom');
 
}

exports.shareroom = function(req, res) {
 
	res.render('shareroom');
 
}

exports.displayname = async function(req, res, next) {
	const user = await res.locals.user.findOne({ where: { username: res.locals.uname } });
	res.render('displayname', { name: user.displayname });
 
}

exports.entercahpost = async function(req, res, next) {
	const user = await res.locals.user.findOne({ where: {username: res.locals.uname } });
	user.displayname = res.locals.displayname;
	await user.save();
	res.render('cah', {name: user.displayname, room: res.locals.room});
}


