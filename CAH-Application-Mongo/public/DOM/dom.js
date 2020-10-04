const infoDiv = document.querySelector('.info-div');

const blackCardDiv = document.querySelector('.blackcard-div');
const czarDeckDiv = document.querySelector('.czardeck-div');
const judgeHandDiv = document.querySelector('.judgehand-div');
const whiteCardsDiv = document.querySelector('.whitecards-div');

const roomUserTable = document.querySelector('.userlist-table');

const chatMessages = document.querySelector('.chat-messages');

var myBlackCard;

// Add black card to DOM
function outputBlackCard(czar, blackCard) {
	myBlackCard = blackCard;
	blackCardDiv.innerHTML = ``;
	if(blackCard != false) {
		const div1 = buildCard('dark', czar, blackCard, false, 'next');
		document.querySelector('.blackcard-div').appendChild(div1);
	}
}

function outputCzarHand(users, czarHand, czar, flag) {
	outputBlackCard(false, myBlackCard);
	czarDeckDiv.innerHTML =``;

	czarHand.forEach(card => {
		const cardBorder = document.createElement('div');
		cardBorder.classList.add("card");
		cardBorder.style.height = "13rem";
		cardBorder.style.minWidth = "8rem";
		cardBorder.style.maxWidth = "8rem";
		cardBorder.style.borderColor = "black";
		cardBorder.style.backgroundColor = "border-dark";
		cardBorder.style.marginRight ="-7rem";
		cardBorder.style.boxShadow = "1px 1px 1px 1px black";

		const cardHead = getCardHeader();

		const cardB = getCardBody(card);
		cardB.querySelector('.card-title').style.fontSize = "large";
		cardB.querySelector('.card-title').innerHTML = "Cards<br>Against<br>Humanity<br>";

		setUserWaitList(users, czarHand, czar);

			infoDiv.innerHTML = "Waiting for";

			getUserWaitList().forEach(name => {
				infoDiv.innerHTML+=` ... ${name} `; 
			});

		const inter = updateCardButton(getUserWaitList(), czar, czarHand, users, cardB, flag);
		
		cardBorder.appendChild(inter);
		cardBorder.appendChild(cardHead);

		document.querySelector('.czardeck-div').appendChild(cardBorder);
	});
}

function updateCardButton(list, czar, czarHand, users, cardB, flag) {
	if(flag) {
		if(list.length != 0){
			getInfoDivText(list);
		} else {
			infoDiv.innerHTML = ``;
			cardB = getFlipButton(false,czar,cardB,czarHand, users);
		}
	} else {
		if(list.length != 0){
			cardB = getFlipButton(true,czar,cardB, czarHand, users);
		} else {
			getInfoDivText(list);
		}		
	}
	return cardB;
}

function getFlipButton(flag,czar,cardB, czarHand, users) {
	if(username != czar.username){
		infoDiv.innerHTML = `Waiting for ... ${czar.username}<i class="fas fa-gavel"></i> `;
	} else {
		if(flag) {infoDiv.innerHTML = ``;}
		const cardButton = getCardButton(czar, czarHand, users, 'flip');//
		cardB.appendChild(cardButton);
	}
	return cardB;
}

function getInfoDivText(list) {
	infoDiv.innerHTML = "Waiting for";
	list.forEach(name => {
		infoDiv.innerHTML+=` ... ${name} `;
	});
}

// Add white cards to DOM
function outputWhiteCards(users, czar, flag) {
	whiteCardsDiv.innerHTML = ``;
	whiteCardsDiv.style.overflowX = "auto";
	if(flag) {
		users.forEach(user => {
			if(getClientUsername() == user.username) {
				user.whiteCards.forEach(whiteCard=>{
					document.querySelector('.whitecards-div').appendChild(buildCard('light', czar, whiteCard, user, 'play'));
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
		document.querySelector('.whitecards-div').appendChild(buildCard('light', czar, whiteCard, user, false));
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

function outputJudgeHand(roomUserList, czarHand, czar) {
	judgeHandDiv.innerHTML =``;
	judgeHandDiv.style.overflowX = "auto";
	var count = 0;
	czarHand.slice().reverse().forEach(card => {
		count++;
		var scrollSize = 9*count;
		judgeHandDiv.style.maxWidth = `${scrollSize}rem`;
		var myCard;
		
		if(czarHand.length === (roomUserList.length-1)  && (getClientUsername() == czar.username) )  {
			myCard = buildCard('light', czar, card, false, 'select');
		} else {
			myCard = buildCard('light', czar, card, false, 'client');
		}

		if(getClientUsername() != czar.username) {
			myCard = buildCard('light', czar, card, false, 'client');
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