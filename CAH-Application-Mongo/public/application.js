const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const currentUser = document.getElementById('currentUser');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

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
  outputUsers(users);
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
	div.innerHTML = `<p class="meta card border-info mb-3">${message.username} <span>${message.time}</span>
	<span>${message.text}</span>
	</p>`;
	document.querySelector('.chat-messages').appendChild(div);
}
	
// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach(user=>{
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

