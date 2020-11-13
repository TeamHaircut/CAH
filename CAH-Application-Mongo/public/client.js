const gameControl = document.getElementById('gamecontrol');
const logoutControl = document.getElementById('logoutcontrol');

const chatForm = document.getElementById('chat-form');

const socket = io('http://teamhaircut.org:5000', {
	'reconnection': true,
	'reconnectionDelay': 50,
	'maxReconnectionAttempts': Infinity
});

socket.on('reconnecting', () => {
		socket.emit('rejoinRoom', { username: getClientUsername() });
});

/* Send an object containing the client's username, and room name as soon as they join the room*/
socket.emit('joinRoom', { username: getClientUsername(), room: getClientRoom() });

// Message from server
socket.on('message', message => {
	outputMessage(message);
	
	// Scroll down
	chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', e => {
	e.preventDefault();
	
	// Get message text
	const msg = e.target.elements.msg.value;
	
	//Emit message to server
	socket.emit('chatMessage', msg);
	
	// Clear input
	e.target.elements.msg.value = '';
	e.target.elements.msg.focus();
});

gameControl.addEventListener("click", function(){ 
	//Emit game control state to server
	const state = gameControl.innerHTML;
	socket.emit('gameControlState', {state});
	
});

logoutControl.addEventListener("click", function() {
	socket.emit('logoutUser');
});

var logoutUser;

document.addEventListener("visibilitychange", function() {

	if (document.visibilityState === 'visible') {
		socket.emit('rejoinRoom', { username: getClientUsername() });
		clearTimeout(logoutUser);
	} else {
		socket.emit('goIdle');
		logoutUser = setTimeout(() => {
				socket.emit('logoutUser');
		},
			90000
		)
	}	
	
  })

function drawBlackCard() {
	socket.emit('drawBlackCard');
}

socket.on('drawBlackCard', ({GameState})=> {
	// Update DOM with new black card
	//console.log(GameState);
	outputBlackCard(GameState);
});

function sendWhiteCardToServer(clientCardArray) {
	//this event occurs after client plays a white card
	//and simulates the action of handing a white card to the czar
	//example whiteCard = "AXE Body Spray."

	socket.emit('sendWhiteCardToServer', {clientCardArray});
}

function turnCzarCard() {
	socket.emit('removeCzarCard');
}

function sendWinnerInfoToServer(card) {
	//example card
	/*
	{user: {…}, whiteCard: "Getting drunk on mouthwash."}
		=>user: {id: "EyRQfZz0DJRFpoIqAAAE", username: "Joe", room: "Sausage", points: 0, whiteCards: Array(10), …}
		=>whiteCard: "Getting drunk on mouthwash."
	*/
	//const cardArray = [];
	//cardArray.push(card);
	//cardArray.push(card);
	//cardArray.push(card);
	socket.emit('declareWinner', {card});
}

function clearHand() {
	socket.emit('clearHand');
}

// Clear Divs
socket.on('clear', () => {
	czarDeckDiv.innerHTML = ``;
	judgeHandDiv.innerHTML = ``;
	infoDiv.innerHTML = ``;
});

//  Update points in user table, and braodcast winner to room users
socket.on('updateDOM', ({winnerArray, GameState}) => {
	/* example winner
	{user: {…}, whiteCard: "YOU MUST CONSTRUCT ADDITIONAL PYLONS."}
		=>user: {id: "QrtAPvMfiVpLLJgxAAAE", username: "Joe", room: "Sausage", points: 0, whiteCards: Array(10), …}
		=>whiteCard: "YOU MUST CONSTRUCT ADDITIONAL PYLONS."
	*/
	cardSelected = false;
	// Update DOM with updated room user table
	outputRoomUserTable(GameState);

	// Update DOM with new black card
	outputBlackCard(GameState);

	// Update DOM with winner info
	//const winnerArray = [];
	//winnerArray.push(winner);
	//winnerArray.push(winner);
	//winnerArray.push(winner);
	outputWinner(winnerArray);

	// Update DOM with new white cards
	outputWhiteCards(GameState, true);
});

//  Update points in user table, and braodcast winner to room users
socket.on('refreshDOM', ({GameState, bcSelected}) => {
	cardSelected = bcSelected;
	
	infoDiv.innerHTML =``;
	// Update DOM with updated room user table
	outputRoomUserTable(GameState);

	// Update DOM with new black card
	outputBlackCard(GameState);

	outputCzarHand(GameState, true);
	outputJudgeHand(GameState);

	//There are three conditions when the idle user would not have the play card button
	//1. if they are the czar.
	//2. if czarHand contains a card from idleUser.
	//3. if judgeHand contains a card from idleUser.

	var flag = true;
	if(GameState.cardCzar.username == getClientUsername()) {
		flag = false;
	}
	GameState.czarHand.forEach(card => {
		if (card.user.username == getClientUsername()) {
			flag = false;
		}
	});
	GameState.judgeHand.forEach(card => {
		if (card.user.username == getClientUsername()) {
			flag = false;
		}
	});

	// Update DOM with new white cards
	outputWhiteCards(GameState, true);
	if(!flag) {
		removePlayButton(GameState.user, GameState.user);
	}

});

//  Broadcast white cards received by server
socket.on('czarHand', ({GameState}) => {
	// Update DOM with czar info
	outputCzarHand(GameState, true);
});

//  Broadcast white cards received by server
socket.on('drawCzarCards', ({GameState}) => {

	// Update DOM with czar info
	outputCzarHand(GameState, false);
});

//  Broadcast white cards received by server
socket.on('displayCards', ({GameState}) => {

	// Update DOM with czar info
	outputJudgeHand(GameState);
});

// Launch event from server
socket.on('launch', ({GameState}) => {
	initializeGame(GameState);
});

// Apply game intialization to DOM
function initializeGame(GameState) {

	gameControl.innerHTML = `<i class="fas fa-stop"></i> Terminate Game`;
	outputRoomUserTable(GameState);
	outputBlackCard(GameState);
	outputWhiteCards(GameState, true);
}

// Termination event from server
socket.on('terminate', ({GameState}) => {

	terminateGame(GameState);
});

// Apply game termination to DOM
function terminateGame(GameState) {

	gameControl.innerHTML = `<i class="fas fa-play"></i> Launch Game`;
	outputBlackCard(GameState);
	outputWhiteCards(GameState, false);
	infoDiv.innerHTML = ``;
	czarDeckDiv.innerHTML =``;
	judgeHandDiv.innerHTML = ``;
	outputRoomUserTable(GameState);
}

// get gamestate from server
socket.on('gamestate', ({gameState, GameState}) => {
	
	switch (gameState) {
		case 1:
			terminateGame(GameState);
			break;
		case 2:
			initializeGame(GameState);
			break;			
		default:
			break;
	}
	setClientRoom(room);
	outputRoomUserTable(GameState);
});