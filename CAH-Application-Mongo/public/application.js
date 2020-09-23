const clientUsername = document.getElementById('clientUsername');
const gameControl = document.getElementById('gamecontrol');
const chatForm = document.getElementById('chat-form');

// Get username and room from template
const username = clientUsername.innerHTML;
const room = roomName.innerHTML;

const socket = io();

/* Send an object contianing the client's username, 
and room name as soon as they join the room*/
socket.emit('joinRoom', { username, room });

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

function sendWhiteCardToServer(whiteCard) {
	socket.emit('sendWhiteCardToServer', {whiteCard});
}

function sendWinnerInfoToServer(czarHand, card) {
	socket.emit('declareWinner', {czarHand, card});
}

function clearCzarHand() {
	socket.emit('clearCzarHand');
}

//  Update points in user table, and braodcast winner to room users
socket.on('updatePoints', ({roomUserList, cardCzar, winner, czarHand, blackCard}) => {
	outputRoomUserTable(roomUserList, cardCzar);
	// Update DOM with new black card
	outputBlackCard(blackCard);

	// Update DOM with winner info
	outputCzarHand(czarHand, false, winner);

	// Update DOM with New White Cards
	outputWhiteCards(roomUserList, cardCzar);
});

//  Broadcast white cards received by server
socket.on('czarHand', ({czarHand, czar}) => {

	// Update DOM with czar info
	outputCzarHand(czarHand, czar, false);
});

// Launch event from server
socket.on('launch', ({roomUserList, cardCzar, blackCard}) => {
	initializeGame(roomUserList, cardCzar, blackCard);
});

// Apply game intialization to DOM
function initializeGame(roomUserList, cardCzar, blackCard) {
	console.log("GAME INITIALIZED");
	gameControl.innerHTML = `<i class="fas fa-stop"></i> Terminate Game`;
	outputRoomUserTable(roomUserList, cardCzar);
	outputBlackCard(blackCard);
	outputWhiteCards(roomUserList, cardCzar);
}

// Termination event from server
socket.on('terminate', ({roomUserList, cardCzar}) => {
	terminateGame(roomUserList, cardCzar);
});

// Apply game termination to DOM
function terminateGame(roomUserList, cardCzar) {
	console.log("GAME TERMINATED");
	gameControl.innerHTML = `<i class="fas fa-play"></i> Launch Game`;
	outputRoomUserTable(roomUserList, cardCzar);
}

// get gamestate from server
socket.on('gamestate', ({gameState, roomUserList, cardCzar}) => {
	switch (gameState) {
		case 1:
			terminateGame(roomUserList, cardCzar);
			break;
		case 2:
			initializeGame(roomUserList, cardCzar);
			break;
		default:
			break;
	}
	outputRoomName(room);
	console.log(roomUserList);
	outputRoomUserTable(roomUserList, cardCzar);
	console.log("Gamestate EVENT ON CLIENT");
});