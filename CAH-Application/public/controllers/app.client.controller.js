var exports = module.exports = {}

exports.options = function(req, res) {
 
	res.render('option');
 
}

exports.createroom = function(req, res) {
 
	res.render('createroom');
 
}

exports.shareroom = function(req, res) {
 
	res.render('shareroom');
 
}

exports.entercah = function(req, res) {
 
	res.render('cah');
 
}

