var exports = module.exports = {}

var ssn;

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

exports.logsession = function(req, res) {
	ssn = req.session;
	//console.log("LOGIN CONTROLLER "+req.session);
	res.redirect('/option');
	
}

exports.displayname = async function(req, res, next) {
	//ssn = req.session;
	//console.log(ssn);
	const user = await ssn.user.findOne({ where: { username: ssn.uname } });
	//const user = await res.locals.user.findOne({ where: { username: res.locals.uname } });
	res.render('displayname', { name: user.displayname });
 
}

exports.entercahpost = async function(req, res, next) {
	const user = await ssn.user.findOne({ where: {username: ssn.uname } });
	console.log("HERE");
	console.log(ssn);
	user.displayname = ssn.displayname;
	await user.save();
	res.render('cah', {name: ssn.displayname, room: ssn.room});
}


