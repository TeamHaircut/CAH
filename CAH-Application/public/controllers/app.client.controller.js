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

exports.displayname = function(req, res) {
 
	res.render('displayname');
 
}

exports.entercah = function(req, res) {
 
	res.render('cah');
 
}

