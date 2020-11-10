const infoDiv = document.querySelector('.info-div');

const blackCardDiv = document.querySelector('.blackcard-div');
const czarDeckDiv = document.querySelector('.czardeck-div');
const judgeHandDiv = document.querySelector('.judgehand-div');
const whiteCardsDiv = document.querySelector('.whitecards-div');

const roomUserTable = document.querySelector('.userlist-table');

const chatMessages = document.querySelector('.chat-messages');

var myBlackCard;
var cardSelected = false;

// Add black card to DOM
function outputBlackCard(GameState) {
	myBlackCard = GameState.blackCard;
	blackCardDiv.innerHTML = ``;
	if(GameState.blackCard != false) {
		var div1;
		if(GameState.czarHand.length == 0 && (GameState.judgeHand.length <= 1 || GameState.judgeHand.length == 0 )  ) {
			if(!cardSelected) {
				div1 = buildCard('dark', GameState.cardCzar, GameState.blackCard, false, 'next');
			} else {
				div1 = buildCard('dark', GameState.cardCzar, GameState.blackCard, false, '');
			}
		} else {
			div1 = buildCard('dark', GameState.cardCzar, GameState.blackCard, false, '');
		}
		document.querySelector('.blackcard-div').appendChild(div1);
	}
}

function outputCzarHand(GameState, flag) {
	outputBlackCard(GameState);
	czarDeckDiv.innerHTML =``;

	GameState.czarHand.forEach(card => {
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

		setUserWaitList(GameState.gameusers, GameState.czarHand, GameState.cardCzar);

			infoDiv.innerHTML = "Waiting for";

			getUserWaitList().forEach(name => {
				infoDiv.innerHTML+=` ... ${name} `; 
			});

		const inter = updateCardButton(getUserWaitList(), GameState.cardCzar, GameState.czarHand, GameState.gameusers, cardB, flag);
		
		cardBorder.appendChild(inter);
		cardBorder.appendChild(cardHead);

		document.querySelector('.czardeck-div').appendChild(cardBorder);
	});
}

// Add white cards to DOM
function outputWhiteCards(GameState, flag) {
	whiteCardsDiv.innerHTML = ``;
	whiteCardsDiv.style.overflowX = "auto";
	if(flag) {
		GameState.gameusers.forEach(user => {
			if(getClientUsername() == user.username) {
				user.whiteCards.forEach(whiteCard=>{
					if (cardSelected) {
						document.querySelector('.whitecards-div').appendChild(buildCard('light', GameState.cardCzar, whiteCard, user, 'play'));
					} else {
						document.querySelector('.whitecards-div').appendChild(buildCard('light', GameState.cardCzar, whiteCard, user, ''));
					}
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
function outputRoomUserTable(GameState) {
    // Clear the outdated table
    roomUserTable.innerHTML = '';
    
    // Build a table row for each user in the room
	GameState.users.forEach(user=>{
	const tr = document.createElement('tr');
	tr.classList.add('table-light');
    
    // Indicate who is the current card czar
	const th = document.createElement('th');
	th.setAttribute("scope","row");
	if(user.username == GameState.cardCzar.username) {
		th.innerHTML = `<i class="fas fa-gavel"></i>`;
	} else {
		th.innerHTML = ``;
	}
    tr.appendChild(th);
    
	//  Append username and point data to the table row
	const tdName = document.createElement('td');
	if(user.status == 'active') {
		tdName.style.color = "black";
		tdName.innerHTML = `${user.username}`;
	} else if(user.status == 'idle'){
		tdName.style.color = "red";
		tdName.innerHTML = `${user.username} (busy)`;
	} else {
		tdName.style.color = "red";
		tdName.innerHTML = `${user.username} (offline)`;		
	}
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

function outputJudgeHand(GameState) {
	judgeHandDiv.innerHTML =``;
	judgeHandDiv.style.overflowX = "auto";
	var count = 0;
	GameState.judgeHand.slice().reverse().forEach(card => {
		//example of card
		/*
		{user: {…}, whiteCard: "Black people."}
			=>user: {id: "K0sFyAMM-yNy1gQsAAAE", username: "Joe", room: "Sausage", points: 0, whiteCards: Array(10), …}
			=>whiteCard: "Black people."
		*/
		count++;
		var scrollSize = 9*count;
		judgeHandDiv.style.maxWidth = `${scrollSize}rem`;
		var myCard;
		
		if(GameState.judgeHand.length === (GameState.gameusers.length-1)  && (getClientUsername() == GameState.cardCzar.username) )  {
			myCard = buildCard('light', GameState.cardCzar, card, false, 'select');
		} else {
			myCard = buildCard('light', GameState.cardCzar, card, false, 'client');
		}

		if(getClientUsername() != GameState.cardCzar.username) {
			myCard = buildCard('light', GameState.cardCzar, card, false, 'client');
		}

		document.querySelector('.judgehand-div').appendChild(myCard);
	});
}

function outputWinner(winner) {
	/* example winner
	{user: {…}, whiteCard: "YOU MUST CONSTRUCT ADDITIONAL PYLONS."}
		=>user: {id: "QrtAPvMfiVpLLJgxAAAE", username: "Joe", room: "Sausage", points: 0, whiteCards: Array(10), …}
		=>whiteCard: "YOU MUST CONSTRUCT ADDITIONAL PYLONS."
	*/
	infoDiv.innerHTML = ``;
	judgeHandDiv.innerHTML = ``;
	judgeHandDiv.style.overflowX = "auto";

	const cardBorder = document.createElement('div');
		cardBorder.classList.add("card");
		cardBorder.classList.add("bg-success");
		cardBorder.style.height = "13rem";
		cardBorder.style.minWidth = "8rem";
		cardBorder.style.maxWidth = "8rem";
		cardBorder.style.borderColor = "black";
		cardBorder.style.marginRight ="-7rem";
		cardBorder.style.boxShadow = "1px 1px 1px 1px black";

		const cardHead = getCardHeader();

		const cardB = getCardBody(winner);
		cardB.querySelector('.card-text').innerHTML = `${winner.user.username} Wins!`;

		cardBorder.appendChild(cardB);
		cardBorder.appendChild(cardHead);

		document.querySelector('.judgehand-div').appendChild(cardBorder);
}