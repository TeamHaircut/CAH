const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const currentUser = document.getElementById('currentUser');
const roomName = document.getElementById('room-name');
const userTable = document.querySelector('.users-table');

// Get username and room from template
const username = currentUser.innerHTML;
const room = roomName.innerHTML;

const gameControl = document.getElementById('gamecontrol');

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users from server
socket.on('roomUsers', ({ room, users, czar }) => {
  outputRoomName(room);
  //if( typeof czar !== 'undefined' && czar) {
	outputUsersTable(users, czar);
  //} else {
	  //outputUsersTable(users, false);
  //}
  
  
  
});

// Message from server
socket.on('message', message => {
	console.log(message);
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

// Output message to DOM
function outputMessage(message) {
	const div = document.createElement('div');
	div.classList.add('message');
	//message.time not used
	div.innerHTML = `<p style="padding:5px;" class="meta card border-info mb-3"><b>${message.username}:</b> ${message.text}</p>`;
	document.querySelector('.chat-messages').appendChild(div);
}
	
// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}
  
// Add users-table to DOM
function outputUsersTable(users, czar) {
  userTable.innerHTML = '';
  users.forEach(user=>{
	  console.log(user.username);
	  console.log(czar.username);
    const tr = document.createElement('tr');
	tr.classList.add('table-light');
	//
	const th = document.createElement('th');
	th.setAttribute("scope","row");
	if(user.username == czar.username) {
		th.innerHTML = `<i class="fas fa-gavel"></i>`;
	} else {
		th.innerHTML = ``;
	}
	tr.appendChild(th);
	//
	const tdName = document.createElement('td');
	tdName.innerHTML = `${user.username}`;
	tr.appendChild(tdName);
	//
	const tdPoints = document.createElement('td');
	tdPoints.innerHTML = `10`;
	tr.appendChild(tdPoints);
	
	document.querySelector('.users-table').appendChild(tr);
  });  

}

gameControl.addEventListener("click", function(){ 
	//Emit game control state to server
	const state = gameControl.innerHTML;
	socket.emit('gameControlState', {state, username, room});
	
});

// Launch event from server
socket.on('launch', ({users, czar}) => {
	initializeGame(users,czar);

});

// Apply game intialization to DOM
function initializeGame(users, czar) {
	console.log("GAME INITIALIZED");
	gameControl.innerHTML = `<i class="fas fa-stop"></i> Terminate Game`;
	outputUsersTable(users, czar);
}

// Termination event from server
socket.on('terminate', ({users, czar}) => {
	terminateGame(users,czar);

});

// Apply game termination to DOM
function terminateGame(users, czar) {
	console.log("GAME TERMINATED");
	gameControl.innerHTML = `<i class="fas fa-play"></i> Launch Game`;
	outputUsersTable(users, czar);
}

// get gamestate from server
socket.on('gamestate', ({gameState, users, czar}) => {
	switch (gameState) {
		case 1:
			terminateGame(users, czar);
			break;
		case 2:
			initializeGame(users, czar);
			break;
		default:
			break;
	}
	outputUsersTable(users, czar);
	console.log("Gamestate EVENT ON CLIENT");
});



