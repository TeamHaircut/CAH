const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const currentUser = document.getElementById('currentUser');
const roomName = document.getElementById('room-name');
const userTable = document.querySelector('.users-table');

const blackCardDiv = document.querySelector('.blackCardDiv');
const czarCardsDiv = document.querySelector('.czarCardsDiv');
const whiteCardsDiv = document.querySelector('.whiteCardsDiv');


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
	outputUsersTable(users, czar);
  
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
	tdPoints.innerHTML = `${user.points}`;
	tr.appendChild(tdPoints);

	document.querySelector('.users-table').appendChild(tr);
	});  

}

// Add black card to DOM
function outputBlackCard(blackCard) {
	console.log(blackCard);
	blackCardDiv.innerHTML = ``;
	const div1 = document.createElement('div');
	div1.classList.add("card", "text-white", "bg-dark", "mb-3");
	div1.style.height = "20rem";
	//
	const div2 = document.createElement('div');
	div2.classList.add('card-header');
	div2.innerHTML = "Shared Resource";
	//div1.appendChild(div2);
	//
	const div3 = document.createElement('div');
	div3.classList.add('card-body');
	//
	const h4 = document.createElement('h4');
	h4.classList.add('card-title');
	h4.style.fontFamily = "Helvetica, Neue, Bold";
	h4.innerHTML = `${blackCard}`;
	div3.appendChild(h4);
	//
	const p = document.createElement('p');
	p.classList.add('card-text');
	p.innerHTML = 'example black card';
	div3.appendChild(p);
	//
	div1.appendChild(div3);
	div1.appendChild(div2);
	document.querySelector('.blackCardDiv').appendChild(div1);
}

gameControl.addEventListener("click", function(){ 
	//Emit game control state to server
	const state = gameControl.innerHTML;
	socket.emit('gameControlState', {state, username, room});
	
});

// Launch event from server
socket.on('launch', ({users, czar, blackCard}) => {
	initializeGame(users,czar, blackCard);
});

// Apply game intialization to DOM
function initializeGame(users, czar, blackCard, whiteCards) {
	console.log("GAME INITIALIZED");
	gameControl.innerHTML = `<i class="fas fa-stop"></i> Terminate Game`;
	outputUsersTable(users, czar);
	outputBlackCard(blackCard);
	outputWhiteCards(users, czar);
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

// Add white cards to DOM
function outputWhiteCards(users, czar) {
	whiteCardsDiv.innerHTML = ``;
	users.forEach(user => {
		if(user.username == username) {
			user.whiteCards.forEach(whiteCard=>{
				const div1 = document.createElement('div');
				div1.classList.add("card", "text-black", "border-dark", "mr-3");
				div1.style.height = "20rem";
				div1.style.minWidth = "15rem";
				//
				const div2 = document.createElement('div');
				div2.classList.add('card-header');

				//
				const div3 = document.createElement('div');
				div3.classList.add('card-body');
				//
				const h4 = document.createElement('h4');
				h4.classList.add('card-title');
				h4.style.fontFamily = "Helvetica, Neue, Bold";
				h4.innerHTML = `${whiteCard}`;
				div3.appendChild(h4);
				//
				const p = document.createElement('p');
				p.classList.add('card-text');
				p.innerHTML = 'example white card';
				div3.appendChild(p);
				//
				div1.appendChild(div3);
				
				if(username != czar.username) {//!=
					const playCard = document.createElement('button');
					playCard.classList.add("nav-link");
					playCard.href ="#";
					playCard.innerHTML = `<i class="fas fa-play"></i> Play Card`;
					playCard.addEventListener('click', () => {
						// Send Card to Server
						console.log("Card Clicked");
						//socket.emit('sendWhiteCardToServer', { username, index });
					});
					div2.appendChild(playCard);
				}
				
				div1.appendChild(div2);
				document.querySelector('.whiteCardsDiv').appendChild(div1);
			});
		}
	});
}

/*	CZAR CARDS HTML (czarCardsDiv)
				<div class="card border-dark mr-3" style="min-width: 15rem;">
					  <div class="card-header">Shared Resource</div>
					  <div class="card-body">
						<h4 class="card-title">White Card</h4>
						<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
					  </div>
				</div>
*/



