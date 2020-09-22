const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const socket = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUserList, resetPoints, updateRoomUsersWhiteCards, updatePoints  } = require('./utils/users');
const { setCardCzar, getCardCzar, drawBlackCard, getBlackCard, initializeWhiteCards, appendCzarHand, getCzarHand, clearCzarHand} = require('./utils/game');

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

		//Add the connecting socket to the defined room
		socket.join(user.room);
		
		// Welcome current user to the room
		socket.emit('message', formatMessage(`Mr. ${user.room}`, `Welcome to the ${user.room} room.`));
	
		// Broadcast to other room users when a new user connects
		socket.broadcast.to(user.room).emit('message', formatMessage(`Mr. ${user.room}`,`${user.username} has joined the room.`));
		
		/* Send GameState, room user list, and czar to
		all the room's clients*/
		io.to(user.room).emit('gamestate', {gameState, 
			roomUserList: getRoomUserList(user.room), 
			cardCzar: getCardCzar()
		});

	});
	
	// Listen for chatMessage
	socket.on('chatMessage', msg => {
		const user = getCurrentUser(socket.id);
		io.to(user.room).emit('message', formatMessage(user.username, msg));
	});
	
	// Listen for game control event
	socket.on('gameControlState', ({state}) => {
		const user = getCurrentUser(socket.id);
		if(state === `<i class="fas fa-play"></i> Launch Game`) {
			gameState = GameState.INITIALIZE;

			//set card czar to current user
			setCardCzar(user);
			
			//set points for all users to 0
			resetPoints();
			
			//Draw a Black Card
			drawBlackCard();
			
			//Initialize White Cards for all clients in the room
			var roomUserList = getRoomUserList(user.room);
			updateRoomUsersWhiteCards(initializeWhiteCards(roomUserList, 10));
			
			//Send czar and room info to everybody in the room
			io.to(user.room).emit('launch', {roomUserList: getRoomUserList(user.room), cardCzar: getCardCzar(), blackCard: getBlackCard()});
			
		} else {
			gameState = GameState.TERMINATE;
			setCardCzar(false);
			io.to(user.room).emit('terminate', {roomUserList: getRoomUserList(user.room), cardCzar: getCardCzar()});
		}
	});
	
	// Listen for incoming white cards
	socket.on('sendWhiteCardToServer', ({whiteCard}) => {
		const user = getCurrentUser(socket.id);
		
		// push white card and sending user to czar's hand
		appendCzarHand(user, whiteCard);

		// Emit when you have received all white cards
		if(getCzarHand().length == (getRoomUserList(user.room).length - 1)) {
			io.to(user.room).emit('czarHand', {czarHand: getCzarHand(), czar: getCardCzar()});
		}
	});
	
	// Listen for winner event
	socket.on('declareWinner', ({czarHand, card}) => {
		//extract user from card
		var name = card.user.username;
		//update points for name
		updatePoints(name);
		
		//update card czar
		
		//Emit updated score to all users
		io.to(card.user.room).emit('updatePoints', {roomUserList: getRoomUserList(card.user.room), cardCzar: getCardCzar(), winner: card, czarHand: czarHand});

	});

	// Listen for clear czarHand event
	socket.on('clearCzarHand', () => {
		const user = getCurrentUser(socket.id);
		clearCzarHand();
		io.to(user.room).emit('czarHand', {czarHand: getCzarHand(), czar: getCardCzar()});

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
	  io.to(user.room).emit('gamestate', {gameState: "default", 
		roomUserList: getRoomUserList(user.room), 
		cardCzar: getCardCzar()
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