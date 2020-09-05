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

exports.displaynamepost = async function(req, res, next) {
	console.log(res.locals.user);
	const user = await res.locals.user.findOne({ username: res.locals.uname });
	//validate displayname here req.body.displayname cannot be empty ("")
	if(req.body.displayname != "") {
		user.displayname = req.body.displayname;
		await user.save();
		res.render('cah', { name: user.displayname });
	}else {
		res.render('displayname');
	}
	
 
}

exports.entercah = async function(req, res) {
 	const user = await res.locals.user.findOne({ username: res.locals.uname });
	res.render('cah', { name: user.displayname } );
 
}


