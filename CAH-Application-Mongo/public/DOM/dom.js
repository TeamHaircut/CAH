const roomName = document.getElementById('room-name');

const infoDiv = document.querySelector('.info-div');

const blackCardDiv = document.querySelector('.blackcard-div');
const judgeHandDiv = document.querySelector('.judgehand-div');
const czarDeckDiv = document.querySelector('.czardeck-div');
const whiteCardsDiv = document.querySelector('.whiteCardsDiv');

const roomUserTable = document.querySelector('.userlist-table');

const chatMessages = document.querySelector('.chat-messages');

var myBlackCard;

// Add room name to DOM
function outputRoomName(room) {
	roomName.innerText = room;
}

// Add black card to DOM
function outputBlackCard(czar, blackCard) {
	myBlackCard = blackCard;
	blackCardDiv.innerHTML = ``;
	if(blackCard != false) {
		const div1 = buildBlackCard(czar, blackCard);
		document.querySelector('.blackcard-div').appendChild(div1);
	}
}

function buildBlackCard(czar, blackCard) {
	const cardBorder = getCardBorder('dark');
	const cardHeader = getCardHeader(czar, blackCard, false, true, 'next');
	const cardBody = getCardBody(blackCard);
	cardBorder.appendChild(cardBody);
	cardBorder.appendChild(cardHeader);
	return cardBorder;
}

function outputCzarHand(users, czarHand, czar) {
	outputBlackCard(false, myBlackCard);
	czarDeckDiv.innerHTML =``;
	czarHand.forEach(card => {
		const myCard = document.createElement('div');
		myCard.classList.add("card");
		myCard.style.height = "13rem";
		myCard.style.minWidth = "8rem";
		myCard.style.maxWidth = "8rem";
		myCard.style.borderColor = "black";
		myCard.style.backgroundColor = "border-dark";
		myCard.style.marginRight ="-7rem";
		myCard.style.boxShadow = "1px 1px 1px 1px black";

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

		const cardBody = document.createElement('div');
		cardBody.classList.add('card-body');

		const h4 = document.createElement('h4');
		h4.style.fontFamily = "Helvetica, Neue, Bold";
		h4.style.fontSize = "large";
		h4.innerHTML = "Cards<br>Against<br>Humanity<br>";
		cardBody.appendChild(h4);

		if(difference.length != 0){
			infoDiv.innerHTML = "Waiting for";

			difference.forEach(name => {
				infoDiv.innerHTML+=` ... ${name} `; 
			});
		} else {
			infoDiv.innerHTML = ``;
			if(username != czar.username){
				infoDiv.innerHTML = `Waiting for ... ${czar.username}<i class="fas fa-gavel"></i> `;
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

		document.querySelector('.czardeck-div').appendChild(myCard);
	});
}

function getCardBorder(type) {
	const cahCardDiv = document.createElement('div');
	
	var textColor;
	var bgColor;
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
		if(buttonType == 'play') {
			if(username != czar.username) {
				const button0 = getCardButton(buttonType);
				button0.addEventListener('click', () => {
					sendWhiteCardToServer(whiteCard);
					removePlayButton(czar, user);
					
				});
				cardHeader.appendChild(button0);
			}
		} else if (buttonType == 'select') {// select button
			if(username == czar.username) {
				//console.log(username);
				const button0 = getCardButton(buttonType);
				button0.addEventListener('click', () => {
					sendWinnerInfoToServer(whiteCard);
					setTimeout(() => {
						clearHand();
					},
						3000
					)
				});
				cardHeader.appendChild(button0);
			}
		} else if (buttonType == 'next') {
			if(username == czar.username) {
				const button0 = getCardButton(buttonType);
				button0.addEventListener('click', () => {
					drawBlackCard();
				});
				cardHeader.appendChild(button0);
			} 
		} 
	}

	if (buttonType == 'client') {
		const p0 = document.createElement('p');
		p0.innerHTML = `<i class="fas fa-gavel"></i>`;
		cardHeader.appendChild(p0);
	}

	return cardHeader;
}

function getCardButton(type) {
	const cardButton = document.createElement('button');
	cardButton.classList.add("nav-link");
	cardButton.href ="#";

	var text;
	var icon;
	if (type === 'play'){
		text = ''; 
		icon =`<i class="fas fa-play"></i>`;
	} else if (type === 'select'){
		text = ''; 
		icon = `<i class="fas fa-gavel"></i>`;
	} else if (type === 'next'){
		text = ''; 
		icon = `<i class="fas fa-forward"></i>`;
	}
	cardButton.innerHTML = `${icon} ${text}`;
	return cardButton;
}

function getCardBody(card) {
	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body');
	//
	const cardText = document.createElement('h4');
	cardText.classList.add('card-title');
	cardText.style.fontFamily = "Helvetica, Neue, Bold";
	cardText.style.fontSize = "small";
	//console.log(card);
	if(typeof card === 'object') {
		card = card.whiteCard;
	}
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

function buildWhiteCard(whiteCard, czar, user, buttonFlag, buttonType) {
	const cardBorder = getCardBorder('light');
	const cardHeader = getCardHeader(czar, whiteCard, user, buttonFlag, buttonType);
	const cardBody = getCardBody(whiteCard);
	cardBorder.appendChild(cardBody);
	cardBorder.appendChild(cardHeader);
	return cardBorder;
}

// Add white cards to DOM
function outputWhiteCards(users, czar, flag) {
	whiteCardsDiv.innerHTML = ``;
	whiteCardsDiv.style.overflowX = "auto";
	whiteCardsDiv.style.height = "0rem";
	if(flag) {
		users.forEach(user => {
			if(user.username == username) {
				whiteCardsDiv.style.height = "15rem";
				user.whiteCards.forEach(whiteCard=>{
					document.querySelector('.whiteCardsDiv').appendChild(buildWhiteCard(whiteCard, czar, user, true, 'play'));
				});
			}
		});
	}
}

// Remove play button from DOM
function removePlayButton(czar, user) {
	whiteCardsDiv.innerHTML = ``;
	whiteCardsDiv.style.overflowX = "auto";
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
		czarDeckDiv.innerHTML =``;
	//console.log(czarHand);
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

		const cardBody = document.createElement('div');
		cardBody.classList.add('card-body');

		const h4 = document.createElement('h4');
		h4.style.fontFamily = "Helvetica, Neue, Bold";
		h4.style.fontSize = "large";
		h4.innerHTML = "Cards<br>Against<br>Humanity<br>";
		cardBody.appendChild(h4);

		if(difference.length == 0){
			infoDiv.innerHTML = "Waiting for";

			difference.forEach(name => {
				infoDiv.innerHTML+=` ... ${name} `;
			});
		} else {
			if(username != czar.username){
				infoDiv.innerHTML = `Waiting for ... ${czar.username}<i class="fas fa-gavel"></i>`;
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

		document.querySelector('.czardeck-div').appendChild(myCard);
	});
}

function outputJudgeHand(roomUserList, czarHand, czar) {
	judgeHandDiv.innerHTML =``;
	judgeHandDiv.style.overflowX = "auto";
	var count = 0;
	czarHand.slice().reverse().forEach(card => {
		count++;
		var scrollSize = 9*count;
		judgeHandDiv.style.maxWidth = `${scrollSize}rem`;
		var myCard;
		
//		if(czarHand.length === (roomUserList.length-1) )  {
//			myCard = buildWhiteCard(card, czar, false, true, 'select');
//		} else {
//			myCard = buildWhiteCard(card, czar, false, true, 'client');
//		}

		if(czarHand.length === (roomUserList.length-1)  && (username == czar.username) )  {
			myCard = buildWhiteCard(card, czar, false, true, 'select');
		} else {
			myCard = buildWhiteCard(card, czar, false, false, 'client');
		}

		if(username != czar.username) {
			myCard = buildWhiteCard(card, czar, false, false, 'client');
		}

		document.querySelector('.judgehand-div').appendChild(myCard);
	});
}

function outputWinner(winner) {
	infoDiv.innerHTML = ``;
	judgeHandDiv.innerHTML = ``;
	judgeHandDiv.style.overflowX = "auto";

			const div1 = document.createElement('div');
			div1.classList.add("card", "text-black", "border-dark", "mr-3");
			div1.classList.add("bg-success");
			div1.style.height = "13rem";
			div1.style.minWidth = "8rem";
			div1.style.maxWidth = "8rem";
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
			h4.style.fontSize = "small";
			h4.innerHTML = `${winner.whiteCard}`;
			div3.appendChild(h4);
			//
			const p = document.createElement('p');
			p.classList.add('card-text');
			p.innerHTML = `${winner.user.username} wins!`;

			div3.appendChild(p);
			div1.appendChild(div3);	

			div1.appendChild(div2);
			document.querySelector('.judgehand-div').appendChild(div1);
}