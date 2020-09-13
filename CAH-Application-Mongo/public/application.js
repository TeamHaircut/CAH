const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const currentUser = document.getElementById('currentUser');
const roomName = document.getElementById('room-name');

const userTable = document.querySelector('.users-table');

// Get username and room from template
const username = currentUser.innerHTML;
const room = roomName.innerHTML;

console.log(username + " " + room);

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsersTable(users);
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
function outputUsersTable(users) {
  userTable.innerHTML = '';
  users.forEach(user=>{
    const tr = document.createElement('tr');
	tr.classList.add('table-light');
	//
	const th = document.createElement('th');
	th.setAttribute("scope","row");//?
	if(user.username === "Poop Man") {
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

