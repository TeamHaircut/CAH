const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const socket = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers, resetPoints  } = require('./utils/users');
const { setCardCzar, getCardCzar, drawBlackCard, getBlackCard, drawWhiteCards, getWhiteCards} = require('./utils/game');

const app = express();

// Socket setup & pass server
const PORT = 5000 || process.env.PORT;
const server = app.listen(PORT, function(err) {
 
    if (!err)
	{
		console.log(`Server is Listening on port ${PORT}`);
		console.log(`Visit http://teamhaircut.org:${PORT} to test the application`);
	}
    else console.log(err)
 
});
const io = socket(server);

// Set static folder
app.use(express.static(path.join(__dirname, '/public')));

const botName = 'CAH Admin';
const GameState = {
	TERMINATE: 1,
	INITIALIZE: 2
};
var gameState = GameState.TERMINATE;

//Run when client connects
io.on('connection', socket => {
	socket.on('joinRoom', ({ username, room }) => {
		const user = userJoin(socket.id, username, room);

		socket.join(user.room);
		
		// Welcome current user
		socket.emit('message', formatMessage(`Mr. ${user.room}`, `Welcome to the ${user.room} room.`));
	
		// Broadcast when a user connects
		socket.broadcast.to(user.room).emit('message', formatMessage(`Mr. ${user.room}`,`${user.username} has joined the room.`));
		
		// Send users and room info
		io.to(user.room).emit('roomUsers', {
			room: user.room,
			users: getRoomUsers(user.room),
			czar: getCardCzar()
		});
		
		const czar = getCardCzar();
		const users = getRoomUsers(user.room);
		// Send GameState to current user
		  socket.emit('gamestate', {gameState, users, czar});

	});
	
	// Listen for chatMessage
	socket.on('chatMessage', msg => {
		const user = getCurrentUser(socket.id);
		io.to(user.room).emit('message', formatMessage(user.username, msg));
	});
	
	// Listen for game control event
	socket.on('gameControlState', ({state, username, room}) => {
		const user = getCurrentUser(socket.id);
		if(state === `<i class="fas fa-play"></i> Launch Game`) {
			gameState = GameState.INITIALIZE;

			//set card czar to current user
			setCardCzar(user);
			
			//set all points for all users to 0
			resetPoints();
			
			//Draw Black Card
			drawBlackCard();
			
			//Draw White Card 
			drawWhiteCards(10);
			
			console.log("Black Card " + getBlackCard());
			//Send czar and room info
			io.to(user.room).emit('launch', {users: getRoomUsers(user.room), czar: getCardCzar(), blackCard: getBlackCard(), whiteCards: getWhiteCards()});
			
		} else {
			gameState = GameState.TERMINATE;
			setCardCzar(false);
			io.to(user.room).emit('terminate', {users: getRoomUsers(user.room), czar: getCardCzar()});
		}
	});
	
  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(`Mr. ${user.room}`, `${user.username} has left the room.`)
      );
      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
		czar: getCardCzar()
      });
    }
  });
});

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1/test', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
