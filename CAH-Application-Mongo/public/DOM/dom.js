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
	//GameState.czarHand.forEach(card => {
	GameState.czarHand.forEach(player => {
		player.clientCardArray.forEach(card => {
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
	judgeHandDiv.style.overflowX = "auto";//auto
	
	//GameState.judgeHand.slice().reverse().forEach(card => {
	GameState.judgeHand.slice().reverse().forEach(player => {
		var count = 0;	
		player.clientCardArray.forEach(card => {

			count++;
			var scrollSize = 10*count;
			//judgeHandDiv.stle.minWidth = "5rem";
			//judgeHandDiv.style.maxWidth = `${scrollSize}rem`;
			judgeHandDiv.style.maxWidth = `210rem`;
			var cardBorder;
			var cardHead;
			var cardButton;
			var cardB;
			var inter;
			
			if(GameState.judgeHand.length === (GameState.gameusers.length-1)  && (getClientUsername() == GameState.cardCzar.username) )  {
				//cardBorder = buildCard('light', GameState.cardCzar, card, false, 'select');
				cardBorder = document.createElement('div');
				cardBorder.classList.add("card");
				cardBorder.style.height = "13rem";
				cardBorder.style.minWidth = "8rem";
				cardBorder.style.maxWidth = "8rem";
				cardBorder.style.borderColor = "black";
				cardBorder.style.backgroundColor = "border-dark";
				if(count==1) {
					cardBorder.style.marginLeft ="2rem";//-7, 1.5?
				}
				cardBorder.style.marginRight ="0rem";//-7, 1.5?
				cardBorder.style.boxShadow = "1px 1px 1px 1px black";

				cardHead = getCardHeader();
				if(count==1) {
					cardButton = getCardButton(GameState.cardCzar, card, false, 'select');
					cardHead.appendChild(cardButton);
				} else {
					cardHead.appendChild(document.createElement('p'));
				}
				cardB = getCardBody(card);
				
				cardBorder.appendChild(cardB);
				cardBorder.appendChild(cardHead);				

				//inter = updateCardButton(getUserWaitList(), GameState.cardCzar, GameState.czarHand, GameState.gameusers, cardB, false);
				//cardBorder.appendChild(inter);
				//cardBorder.appendChild(cardHead);
			} else {
				//cardBorder = buildCard('light', GameState.cardCzar, card, false, 'client');
				cardBorder = document.createElement('div');
				cardBorder.classList.add("card");
				cardBorder.style.height = "13rem";
				cardBorder.style.minWidth = "8rem";
				cardBorder.style.maxWidth = "8rem";
				cardBorder.style.borderColor = "black";
				cardBorder.style.backgroundColor = "border-dark";
				if(count==1) {
					cardBorder.style.marginLeft ="2rem";//-7, 1.5?
				}
				cardBorder.style.marginRight ="0rem";//-7, 1.5?
				cardBorder.style.boxShadow = "1px 1px 1px 1px black";

				cardHead = getCardHeader();
				if(count==1) {
					cardButton = getCardButton(GameState.cardCzar, card, false, 'client');
					cardHead.appendChild(cardButton);
				} else {
					cardHead.appendChild(document.createElement('p'));
				}
				cardB = getCardBody(card);
				
				cardBorder.appendChild(cardB);
				cardBorder.appendChild(cardHead);				

				//inter = updateCardButton(getUserWaitList(), GameState.cardCzar, GameState.czarHand, GameState.gameusers, cardB, false);
				//cardBorder.appendChild(inter);
				//cardBorder.appendChild(cardHead);
			}

			if(getClientUsername() != GameState.cardCzar.username) {
				//cardBorder = buildCard('light', GameState.cardCzar, card, false, 'client');
				cardBorder = document.createElement('div');
				cardBorder.classList.add("card");
				cardBorder.style.height = "13rem";
				cardBorder.style.minWidth = "8rem";
				cardBorder.style.maxWidth = "8rem";
				cardBorder.style.borderColor = "black";
				cardBorder.style.backgroundColor = "border-dark";
				if(count==1) {
					cardBorder.style.marginLeft ="2rem";//-7, 1.5?
				}
				cardBorder.style.marginRight ="0rem";//-7, 1.5?
				cardBorder.style.boxShadow = "1px 1px 1px 1px black";

				cardHead = getCardHeader();
				if(count==1) {
					cardButton = getCardButton(GameState.cardCzar, card, false, 'client');
					cardHead.appendChild(cardButton);
				} else {
					cardHead.appendChild(document.createElement('p'));
				}
				cardB = getCardBody(card);
				
				cardBorder.appendChild(cardB);
				cardBorder.appendChild(cardHead);				

				//inter = updateCardButton(getUserWaitList(), GameState.cardCzar, GameState.czarHand, GameState.gameusers, cardB, false);
				//cardBorder.appendChild(inter);
				//cardBorder.appendChild(cardHead);
			}
			//////////////////////////////////////////////////////////
			//TODO OVERLAP RELATED JUDGE HAND CARDS.
			//TODO FIX WINNER SELECTION
			//TODO FIX REMOVEPLAYBUTTON FUNCTION
			//TESTING CURRENTLY SET FOR DRAW 2 (see cards.js)
			//////////////////////////////////////////////////////////
			document.querySelector('.judgehand-div').appendChild(cardBorder);
		});
	});
}

function outputWinner(winnerArray) {
	
	/* example winner
	{user: {…}, whiteCard: "YOU MUST CONSTRUCT ADDITIONAL PYLONS."}
		=>user: {id: "QrtAPvMfiVpLLJgxAAAE", username: "Joe", room: "Sausage", points: 0, whiteCards: Array(10), …}
		=>whiteCard: "YOU MUST CONSTRUCT ADDITIONAL PYLONS."
	*/
	infoDiv.innerHTML = ``;
	judgeHandDiv.innerHTML = ``;
	judgeHandDiv.style.overflowX = "visible";

	//assume winner is an array with multiple cards
	var count = 0;
	//const winnerArray = [];
	//winnerArray.push(winner);
	//winnerArray.push(winner);
	//winnerArray.push(winner);
	winnerArray.forEach(winner => {
		winner.forEach(card=> {

			count++;
			var multiplier = 1;
			switch(count) {
				case 1:
					multiplier = 1; break;
				case 2:
					multiplier = 4; break;
				case 3:
					multiplier = 5; break;
				default:
					multiplier = 9; break;
			}
			var scrollSize = multiplier*count;
			judgeHandDiv.style.maxWidth = `${scrollSize}rem`;

			const cardBorder = document.createElement('div');
			cardBorder.classList.add("card");
			cardBorder.classList.add("bg-success");
			cardBorder.style.height = "13rem";
			cardBorder.style.minWidth = "8rem";
			cardBorder.style.maxWidth = "8rem";
			cardBorder.style.borderColor = "black";
			cardBorder.style.marginRight ="0rem";
			cardBorder.style.boxShadow = "1px 1px 1px 1px black";

			const cardHead = getCardHeader();

			const cardB = getCardBody(card.whiteCard);
			cardB.querySelector('.card-text').innerHTML = `${card.username} Wins!`;

			cardBorder.appendChild(cardB);
			cardBorder.appendChild(cardHead);

			document.querySelector('.judgehand-div').appendChild(cardBorder);
			cardCount = 0;
			clientCardArray = [];
		});
	});
}