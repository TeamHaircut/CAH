const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const socket = require('socket.io');
const formatMessage = require('./utils/messages');
const { getGameUserList, setUserStatus, getCurrentUserByUsername, userRejoin, userJoin, getCurrentUser, getRoomUserList, resetPoints, updateRoomUsersWhiteCards, updatePoints  } = require('./utils/users');
const { mergeSelectedDecks, getGameState, setCardCzar, getCardCzar, drawBlackCard, initializeWhiteCards, appendCzarHand, clearHand, nextCardCzar, replaceWhiteCards, popCzarHand, appendCards, getJudgeHand} = require('./utils/game');
const { setDeckMap, getDeckMap} = require('./utils/serverDeck');
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

const GameState = {
	TERMINATE: 1,
	INITIALIZE: 2,
	REJOIN: 3
};
var gameState = GameState.TERMINATE;

var cardSelected;

//Run when client connects
io.on('connection', socket => {

	socket.on('joinRoom', ({ username, room }) => {
		var user = getCurrentUserByUsername(username);
		if (!user) {
			const user = userJoin(socket.id, username, room);

			//Add the connecting socket to the defined room
			socket.join(user.room);

			// Welcome current user to the room
			socket.emit('message', formatMessage(`Mr. ${user.room}`, `Welcome to the ${user.room} room.`));

			/* Send GameState, room user list, and czar to all the room's clients*/
			io.to(user.room).emit('gamestate', {
				gameState,
				GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room))
			});	
		} else {
			userRejoin(socket.id, user);

			//Add the connecting socket to the defined room			
			socket.join(user.room);

			/* Send GameState, room user list, and czar to all the room's clients*/
			io.to(user.room).emit('gamestate', {
				gameState,
				GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room))
			});	
		}
		
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
			//merge selected decks

			mergeSelectedDecks();
			cardSelected = false;
			gameState = GameState.INITIALIZE;

			// Set card czar to current user
			setCardCzar(user);
			
			// Set points for all users to 0
			resetPoints();
			
			// Draw a Black Card
			drawBlackCard(true);
			
			//Initialize White Cards for all clients in the room
			var roomUserList = getRoomUserList(user.room);
			updateRoomUsersWhiteCards(initializeWhiteCards(roomUserList, true));

			//Send czar and room info to everybody in the room
			io.to(user.room).emit('launch', {
				GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room))
			});

			// Refresh user UI
			socket.emit('refreshDOM', { 
				GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room)),
				bcSelected: cardSelected
			});
			
		} else {
			const user = getCurrentUser(socket.id);
			gameState = GameState.TERMINATE;

			// Remove card czar
			setCardCzar(false);

			// Clear black card
			drawBlackCard(false);

			// Clear white cards
			var roomUserList = getRoomUserList(user.room);
			updateRoomUsersWhiteCards(initializeWhiteCards(roomUserList, false));

			// Clear czar and judge hand
			clearHand();
			io.to(user.room).emit('terminate', {
				GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room))
			});
		}
	});

	socket.on('selectDeck', ({optionMap}) => {
		setDeckMap(optionMap.key, optionMap.value);
	});

	socket.on('getServerDeckOptions', () => {

				io.emit('serverDeckData', 
				Array.from(
					getDeckMap()
					)
			);

	});

	socket.on('requestDeckInfo', ({key, val}) => {
		setDeckMap(key, val);

		io.emit('serverDeckData', 
		Array.from(
			getDeckMap()
			)
		);

	});
	
	// Listen for incoming white cards
	socket.on('sendWhiteCardToServer', ({whiteCard}) => {
		const user = getCurrentUser(socket.id);
		//this event occurs after client plays a white card
		//and simulates the action of the czar receiving a white card from user
		//example whiteCard = "AXE Body Spray."

		// push white card and sending user to czar's hand
		appendCzarHand(user, whiteCard);

		// Emit czar hand to clients
		io.to(user.room).emit('czarHand', {
			GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room))
		});
	});

	// Listen Event of czar turnin czarhand cards
	socket.on('removeCzarCard', () => {
		const user = getCurrentUser(socket.id);
		
		// push white card and sending user to czar's hand
		appendCards(popCzarHand());
		//example judgeHand
/*		[
			{
			  user: {
				id: 'pNBnWH_HlfQ70NIWAAAE',
				username: 'Joe',
				room: 'Sausage',
				points: 0,
				whiteCards: [Array],
				status: 'active'
			  },
			  whiteCard: 'Racism.'
			}
		  ]								*/

		// Emit judge hand to clients
		io.to(user.room).emit('displayCards', {
			GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room))
		});

		// Emit czar hand to clients
		io.to(user.room).emit('drawCzarCards', {
			GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room))
		});
	});
	
	// Listen for winner event
	socket.on('declareWinner', ({card}) => {
		console.log(card);
/*		example card
		{
			user: {
			  id: '6opNp_yzzaEqM0E8AAAE',
			  username: 'Joe',
			  room: 'Sausage',
			  points: 0,
			  whiteCards: [
				'Sexy pillow fights.',
				'A pyramid of severed heads.',
				'This year’s mass shootings.',
				'Christopher Walken.',
				'Wearing underwear inside-out to avoid doing laundry.',
				'Me time.',
				'Spontaneous human combustion.',
				'Full frontal nudity.',
				'Doing the right thing.',
				'Sean Connery.'
			  ],
			  status: 'active'
			},
			whiteCard: 'Sexy pillow fights.'
		  }										*/
		cardSelected = false;
		const user = getCurrentUser(socket.id);
		//extract user from card
		var name = card.user.username;

		//update points for name
		updatePoints(name);
		
		// Replace Used White Cards
		updateRoomUsersWhiteCards(replaceWhiteCards(getRoomUserList(card.user.room), getJudgeHand()));
		
		//Emit updated DOM to all users
		io.to(card.user.room).emit('updateDOM', {
			winner: card, 
			GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room))
		});

		// Update card czar
		setCardCzar(
			nextCardCzar(
				getCardCzar(), getGameUserList(card.user.room)
			)
		);
				
		/* Send GameState, room user list, and czar to all the room's clients*/
		io.to(user.room).emit('gamestate', {
			gameState,
			GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room))
		});

	});

	// Listen for draw black card event
	socket.on('drawBlackCard', () => {
		const user = getCurrentUser(socket.id);
		drawBlackCard(true);

		io.to(user.room).emit('drawBlackCard', {
			GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room))
		});
	});

	// Listen for clear czarHand event
	socket.on('clearHand', () => {
		const user = getCurrentUser(socket.id);
		clearHand();

		io.to(user.room).emit('clear');

	});
	
	// Listen for rejoin event
	socket.on('rejoinRoom', ({ username }) => {
		var user = getCurrentUserByUsername(username);
		if(user) {
			// set current user to active in user.js
			userRejoin(socket.id, user);
			socket.join(user.room);

			// get updated current user and sent it to gamestate
			user = getCurrentUser(socket.id);
			
			// Refresh user UI
			socket.emit('refreshDOM', { 
				GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room)),
				bcSelected: cardSelected
			});

			io.to(user.room).emit('gamestate', {
				gameState: GameState.REJOIN,
				GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room))
			});
		}
	});

	socket.on('startRound', ({ username, blackCardSelected }) => {
		cardSelected = blackCardSelected;
		var user = getCurrentUserByUsername(username);
		if(user){
			io.to(user.room).emit('refreshDOM', { 
				GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room)),
				bcSelected: blackCardSelected
			});
		}
	});

	socket.on('logoutUser', () => {

		var user = getCurrentUser(socket.id);

		if (user) {
			setUserStatus(user, 'offline');
			user = getCurrentUser(socket.id);

			// Send users and room info
			io.to(user.room).emit('gamestate', {
				gameState: "default",
				GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room))
			});
		}
	});

	// Runs when client closes browser
	socket.on('disconnect', () => {

		var user = getCurrentUser(socket.id);

		if (user) {
			setUserStatus(user, 'offline');
			user = getCurrentUser(socket.id);

			// Send users and room info
			io.to(user.room).emit('gamestate', {
				gameState: "default",
				GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room))
			});
		}
	});

	// Runs when client changes tab or app
	socket.on('goIdle', () => {

		var user = getCurrentUser(socket.id);

		if (user) {
			if(user.status == 'active'){
				setUserStatus(user,'idle');
				user = getCurrentUser(socket.id);

				// Send users and room info
				io.to(user.room).emit('gamestate', {
					gameState: "default",
					GameState: getGameState(user, getRoomUserList(user.room), getGameUserList(user.room))
				});
			}
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