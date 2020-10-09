const gameControl = document.getElementById('gamecontrol');
const chatForm = document.getElementById('chat-form');

//const socket = io();
const socket = io('http://teamhaircut.org:5000', {
	'reconnection': true,
	'reconnectionDelay': 50,
	'maxReconnectionAttempts': Infinity
});

socket.on('reconnecting', () => {
	console.log('reconnecting'); 
	socket.emit('rejoinRoom', { username: getClientUsername() });
});

/* Send an object contianing the client's username, 
and room name as soon as they join the room*/
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

function drawBlackCard() {
	socket.emit('drawBlackCard');
}

socket.on('drawBlackCard', ({GameState})=> {
	// Update DOM with new black card
	outputBlackCard(GameState);
});

function sendWhiteCardToServer(whiteCard) {
	socket.emit('sendWhiteCardToServer', {whiteCard});
}

function turnCzarCard(users, czarHand, czar) {
	socket.emit('removeCzarCard', {users, czarHand, czar});
}

function sendWinnerInfoToServer(card) {
	socket.emit('declareWinner', {card});
}

function clearHand() {
	socket.emit('clearHand');
}

socket.on('clear', () => {
	czarDeckDiv.innerHTML = ``;
	judgeHandDiv.innerHTML = ``;
	infoDiv.innerHTML = ``;
});

//  Update points in user table, and braodcast winner to room users
socket.on('updateDOM', ({winner, GameState}) => {

	// Update DOM with updated room user table
	outputRoomUserTable(GameState);

	// Update DOM with new black card
	outputBlackCard(GameState);

	// Update DOM with winner info
	outputWinner(winner);

	// Update DOM with new white cards
	outputWhiteCards(GameState, true);
});

//  Update points in user table, and braodcast winner to room users
socket.on('refreshDOM', ({GameState}) => {

	// Update DOM with updated room user table
	outputRoomUserTable(GameState);

	// Update DOM with new black card
	outputBlackCard(GameState);

	outputCzarHand(GameState, true);
	outputJudgeHand(GameState);

	// Update DOM with new white cards
	outputWhiteCards(GameState, true);
});

//  Broadcast white cards received by server
socket.on('czarHand', ({GameState}) => {
	// Update DOM with czar info
	outputCzarHand(GameState, true);
	//drawCzarHand(roomUserList, czarHand, czar);
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