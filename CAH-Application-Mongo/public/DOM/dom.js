const roomName = document.getElementById('room-name');

const blackCardDiv = document.querySelector('.blackCardDiv');
const czarCardsDiv = document.querySelector('.czarCardsDiv');
const czarCzar = document.querySelector('.czarCzar');
const whiteCardsDiv = document.querySelector('.whiteCardsDiv');

const roomUserTable = document.querySelector('.userlist-table');

const chatMessages = document.querySelector('.chat-messages');

// Add room name to DOM
function outputRoomName(room) {
	roomName.innerText = room;
}

// Add black card to DOM
function outputBlackCard(blackCard) {
	blackCardDiv.innerHTML = ``;
	if(blackCard != false) {
		const div1 = buildBlackCard(blackCard, false, false);
		document.querySelector('.blackCardDiv').appendChild(div1);
	}
}

function buildBlackCard(blackCard, czar, user) {
	const cardBorder = getCardBorder('dark');
	const cardHeader = getCardHeader(false, blackCard, false, false, false);
	const cardBody = getCardBody(blackCard);
	cardBorder.appendChild(cardBody);
	cardBorder.appendChild(cardHeader);
	return cardBorder;
}

function outputCzarHand(users, czarHand, czar) {
	czarCzar.innerHTML =``;
	console.log(czarHand);
	czarHand.forEach(card => {
		const myCard = document.createElement('div');
		myCard.classList.add(
			"card");
			myCard.style.height = "13rem";
			myCard.style.minWidth = "8rem";
			myCard.style.maxWidth = "8rem";
			myCard.style.borderColor = "black";
			myCard.style.backgroundColor = "border-dark";
			//myCard.style.padding = "1rem";
			myCard.style.marginRight ="-7rem";
			myCard.style.boxShadow = "1px 1px 1px 1px black";

		
		//const cardBorder = getCardBorder(czarHand.length+1);
		const cardHeader = document.createElement('div');
		cardHeader.classList.add('cardHeader');

		roomUserNameArray = [];
		czarHandNameArray = [];
		users.forEach(user => {
			roomUserNameArray.push(user.username);
		});
		czarHand.forEach(card => {
			czarHandNameArray.push(card.user.username);
		});
		czarHandNameArray.push(czar.username);

		let difference = roomUserNameArray.filter(x => ! czarHandNameArray.includes(x));
		console.log(difference);

		const cardBody = document.createElement('div');
		cardBody.classList.add('card-body');

		const h4 = document.createElement('h4');
		h4.style.fontFamily = "Helvetica, Neue, Bold";
		h4.style.fontSize = "large";
		h4.innerHTML = "Cards<br>Against<br>Humanity<br>";
		cardBody.appendChild(h4);

		const p0 = document.createElement('p');
		p0.style.fontFamily = "Helvetica, Neue, Bold";
		p0.style.fontSize = "small";
		p0.style.color = "red";

		if(difference.length != 0){
			p0.innerHTML = "Waiting for...<br>";

			difference.forEach(name => {
				p0.innerHTML+=`${name} <br>`;  
			});
			cardBody.appendChild(p0);
		} else {
			if(username != czar.username){
				p0.innerHTML = "Waiting for...<br>";
				p0.innerHTML+=`${czar.username} <br>`; 
				cardBody.appendChild(p0);
			} else {
				const cardButton = document.createElement('button');
				cardButton.classList.add("nav-link");
				cardButton.href ="#";
				cardButton.innerHTML = `<i class="fas fa-play"></i>`;
				cardButton.addEventListener('click', () => {
					turnCzarCard(users, czarHand, czar);
				});
				cardBody.appendChild(cardButton);
			}
		}
		
		myCard.appendChild(cardBody);
		myCard.appendChild(cardHeader);

		document.querySelector('.czarCzar').appendChild(myCard);
	});
}

function getCardBorder(type) {
	const cahCardDiv = document.createElement('div');
	
	var textColor;
	var bgColor;
	var borderWidth = `1px`;
	if (type === 'light'){
		textColor = "text-black"; 
		bgColor = "border-dark";
	} else if (type === 'dark') {
		textColor = "text-white"; 
		bgColor = "bg-dark";
	} else {
		textColor = "text-dark"; 
		bgColor = "border-dark";
		cahCardDiv.style.borderWidth = `${type}px`;	
	}
	cahCardDiv.classList.add(
		"card", 
		textColor, 
		bgColor, 
		"mr-3");
	cahCardDiv.style.height = "13rem";
	cahCardDiv.style.minWidth = "8rem";
	cahCardDiv.style.maxWidth = "8rem";
	return cahCardDiv;
}

function getCardHeader(czar, whiteCard, user, buttonFlag, buttonType) {
	const cardHeader = document.createElement('div');
	cardHeader.classList.add('card-header');

	if(buttonFlag) {
		if(username != czar.username) {//!=
			const button0 = getCardButton(buttonType);
			button0.addEventListener('click', () => {
				//do something for specific button type
				sendWhiteCardToServer(whiteCard);
				removePlayButton(czar, user);
				
			});
			cardHeader.appendChild(button0);
		}
	}
	return cardHeader;
}

function getCardBody(card) {
	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body');
	//
	const cardText = document.createElement('h4');
	cardText.classList.add('card-title');
	cardText.style.fontFamily = "Helvetica, Neue, Bold";
	cardText.style.fontSize = "small";
	cardText.innerHTML = `${card}`;
	cardBody.appendChild(cardText);
	//
	const altCardText = document.createElement('p');
	altCardText.classList.add('card-text');
	altCardText.innerHTML = '';
	cardBody.appendChild(altCardText);
	//
	return cardBody;
}

function getCardButton(type) {
	const cardButton = document.createElement('button');
	cardButton.classList.add("nav-link");
	cardButton.href ="#";

	var text;
	if (type === 'play'){text = 'play'} else {text = 'select'};
	cardButton.innerHTML = `<i class="fas fa-play"></i> ${text}`;
	return cardButton;
}

function buildWhiteCard(whiteCard, czar, user) {
	const cardBorder = getCardBorder('light');
	const cardHeader = getCardHeader(czar, whiteCard, user, true, 'play');
	const cardBody = getCardBody(whiteCard);
	cardBorder.appendChild(cardBody);
	cardBorder.appendChild(cardHeader);
	return cardBorder;
}

// Add white cards to DOM
function outputWhiteCards(users, czar, flag) {
	whiteCardsDiv.innerHTML = ``;
	if(flag) {
		users.forEach(user => {
			if(user.username == username) {
				whiteCardsDiv.style.height = "15rem";
				user.whiteCards.forEach(whiteCard=>{
					document.querySelector('.whiteCardsDiv').appendChild(buildWhiteCard(whiteCard, czar, user));
				});
			}
		});
	}
}

// Remove play button from DOM
function removePlayButton(czar, user) {
	whiteCardsDiv.innerHTML = ``;
	user.whiteCards.forEach(whiteCard=>{
		const cardBorder = getCardBorder('light');
		const cardHeader = getCardHeader(czar, whiteCard, user, false, false);
		const cardBody = getCardBody(whiteCard);
		cardBorder.appendChild(cardBody);
		cardBorder.appendChild(cardHeader);
		document.querySelector('.whiteCardsDiv').appendChild(cardBorder);
	});
}

// Show each room user in the room user table
function outputRoomUserTable(roomUserList, czar) {
    // Clear the outdated table
    roomUserTable.innerHTML = '';
    
    // Build a table row for each user in the room
	roomUserList.forEach(user=>{
	const tr = document.createElement('tr');
	tr.classList.add('table-light');
    
    // Indicate who is the current card czar
	const th = document.createElement('th');
	th.setAttribute("scope","row");
	if(user.username == czar.username) {
		th.innerHTML = `<i class="fas fa-gavel"></i>`;
	} else {
		th.innerHTML = ``;
	}
    tr.appendChild(th);
    
	//  Append username and point data to the table row
	const tdName = document.createElement('td');
	tdName.innerHTML = `${user.username}`;
	tr.appendChild(tdName);
	const tdPoints = document.createElement('td');
	tdPoints.innerHTML = `${user.points}`;
	tr.appendChild(tdPoints);

    //  Append table row to the userlist table
	document.querySelector('.userlist-table').appendChild(tr);
	});  
}

// Output message to DOM
function outputMessage(message) {
	const div = document.createElement('div');
	div.classList.add('message');
	//message.time not used
	div.innerHTML = `<p style="padding:5px;" class="meta card border-info mb-3"><b>${message.username}:</b> ${message.text}</p>`;
	document.querySelector('.chat-messages').appendChild(div);
}

function drawCzarHand(users, czarHand, czar) {
	czarCzar.innerHTML =``;
	console.log(czarHand);
	czarHand.forEach(card => {
		const myCard = document.createElement('div');
		myCard.classList.add(
			"card");
			myCard.style.height = "13rem";
			myCard.style.minWidth = "8rem";
			myCard.style.maxWidth = "8rem";
			myCard.style.borderColor = "black";
			myCard.style.backgroundColor = "border-dark";
			//myCard.style.padding = "1rem";
			myCard.style.marginRight ="-7rem";
			myCard.style.boxShadow = "1px 1px 1px 1px black";

		
		//const cardBorder = getCardBorder(czarHand.length+1);
		const cardHeader = document.createElement('div');
		cardHeader.classList.add('cardHeader');

		roomUserNameArray = [];
		czarHandNameArray = [];
		users.forEach(user => {
			roomUserNameArray.push(user.username);
		});
		czarHand.forEach(card => {
			czarHandNameArray.push(card.user.username);
		});
		czarHandNameArray.push(czar.username);

		let difference = roomUserNameArray.filter(x => ! czarHandNameArray.includes(x));
		console.log(difference);

		const cardBody = document.createElement('div');
		cardBody.classList.add('card-body');

		const h4 = document.createElement('h4');
		h4.style.fontFamily = "Helvetica, Neue, Bold";
		h4.style.fontSize = "large";
		h4.innerHTML = "Cards<br>Against<br>Humanity<br>";
		cardBody.appendChild(h4);

		const p0 = document.createElement('p');
		p0.style.fontFamily = "Helvetica, Neue, Bold";
		p0.style.fontSize = "small";
		p0.style.color = "red";

			if(username != czar.username){
				p0.innerHTML = "Waiting for...<br>";
				p0.innerHTML+=`${czar.username} <br>`; 
				cardBody.appendChild(p0);
			} else {
				const cardButton = document.createElement('button');
				cardButton.classList.add("nav-link");
				cardButton.href ="#";
				cardButton.innerHTML = `<i class="fas fa-play"></i>`;
				cardButton.addEventListener('click', () => {
					turnCzarCard(users, czarHand, czar);
				});
				cardBody.appendChild(cardButton);
			}
		
		myCard.appendChild(cardBody);
		myCard.appendChild(cardHeader);

		document.querySelector('.czarCzar').appendChild(myCard);
	});
}