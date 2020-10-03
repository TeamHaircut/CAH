const clientUsername = document.getElementById('client-username');
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

function drawBlackCard() {
	socket.emit('drawBlackCard');
}

socket.on('drawBlackCard', ({czar, blackCard})=> {
	// Update DOM with new black card
	outputBlackCard(czar, blackCard);
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
	judgeHandDiv.innerHTML = ``;
	infoDiv.innerHTML = ``;
});

//  Update points in user table, and braodcast winner to room users
socket.on('updateDOM', ({roomUserList, cardCzar, winner, blackCard}) => {

	// Update DOM with updated room user table
	outputRoomUserTable(roomUserList, cardCzar);

	// Update DOM with new black card
	outputBlackCard(cardCzar, blackCard);

	// Update DOM with winner info
	outputWinner(winner);

	// Update DOM with new white cards
	outputWhiteCards(roomUserList, cardCzar, true);
});

//  Broadcast white cards received by server
socket.on('czarHand', ({roomUserList, czarHand, czar}) => {

	// Update DOM with czar info
	outputCzarHand(roomUserList, czarHand, czar);
});

//  Broadcast white cards received by server
socket.on('drawCzarCards', ({roomUserList, czarHand, czar}) => {

	// Update DOM with czar info
	drawCzarHand(roomUserList, czarHand, czar);
});

//  Broadcast white cards received by server
socket.on('displayCards', ({roomUserList, judgeHand, czar}) => {

	// Update DOM with czar info
	outputJudgeHand(roomUserList, judgeHand, czar);
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
	outputBlackCard(cardCzar, blackCard);
	outputWhiteCards(roomUserList, cardCzar, true);
}

// Termination event from server
socket.on('terminate', ({roomUserList}) => {
	terminateGame(roomUserList);
});

// Apply game termination to DOM
function terminateGame(roomUserList) {
	console.log("GAME TERMINATED");
	gameControl.innerHTML = `<i class="fas fa-play"></i> Launch Game`;
	outputBlackCard(false, false);
	//socket.emit('clearCzarHand');
	outputWhiteCards(roomUserList, false, false);
	czarDeckDiv.innerHTML =``;
	judgeHandDiv.innerHTML = ``;
	outputRoomUserTable(roomUserList, false);
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
	//console.log(roomUserList);
	outputRoomUserTable(roomUserList, cardCzar);
	console.log("Gamestate EVENT ON CLIENT");
});