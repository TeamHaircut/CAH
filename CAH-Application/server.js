var path = require('path');
var express = require('express');
var socket = require('socket.io');//
var app = express();
 
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');

const dotenv = require('dotenv').config({ path: './config/env/.env'});

var exphbs = require('express-handlebars');

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//For Passport
app.use(session({ secret: process.env.SECRET ,resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/', function(req, res) {
 
    res.send('Welcome to CAH');
 
});

//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs',
	defaultLayout: "",
	layoutsDir: "",
}));
app.set('view engine', '.hbs');

//Models
var models = require("./app/models");

//Routes
var authRoute = require('./app/routes/auth.server.routes.js')(app,passport);

//Load Passport Strategies
require('./config/passport/passport.js')(passport, models.user);
 
//Sync Database
models.sequelize.sync().then(function() {
    console.log('App models have successfully synced with db')
 
}).catch(function(err) {
 
    console.log(err, "Model Sync Failed")
 
});
 
//app.listen(5000, function(err) {
var server = app.listen(process.env.PORT, function(err) {
 
    if (!err)
        console.log("Server is Listening on port"+process.env.PORT);
    else console.log(err)
 
});

//For Static Files
app.use(express.static(path.join(__dirname, '/public')));

// Socket setup & pass server
var io = socket(server);

io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
         //console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});