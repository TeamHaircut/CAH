var path = require('path');
var express = require('express');
var socket = require('socket.io');

const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

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
var authRoute = require('./app/routes/auth.server.routes.js')(app,passport,models.user);

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
	{
		console.log("Server is Listening on port "+ process.env.PORT);
		console.log("Visit http://teamhaircut.org:"+process.env.PORT+ " to test the application");
	}
    else console.log(err)
 
});

//For Static Files
app.use(express.static(path.join(__dirname, '/public')));

// Socket setup & pass server
var io = socket(server);

const botName = 'CAH Bot';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to CAH!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});
