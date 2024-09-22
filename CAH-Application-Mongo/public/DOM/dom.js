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
	drawCount = GameState.drawCount;
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
						} 
						else {
								if((getClientUsername() == GameState.cardCzar.username) && GameState.options) {
									document.querySelector('.whitecards-div').appendChild(buildCard('light', GameState.cardCzar, whiteCard, user, 'exchange'));
								}
								else {
									document.querySelector('.whitecards-div').appendChild(buildCard('light', GameState.cardCzar, whiteCard, user, ''));	
								}
						}
				});
			}
		});
	}
}

// Remove exchange button from DOM
function removeExchangeButton(czar, user) {
	if (getClientUsername() == czar.username) {
		whiteCardsDiv.innerHTML = ``;
		whiteCardsDiv.style.overflowX = "auto";
		user.whiteCards.forEach(whiteCard=>{
			var localArray = getClientCardArray();
			var localMap = new Map();	
			localArray.forEach(card => {
				localMap.set(card.whiteCard, true);
			});	
			if(localMap.get(whiteCard)) {
				document.querySelector('.whitecards-div').appendChild(buildCard('light', czar, whiteCard, user, false));
			} else {
				document.querySelector('.whitecards-div').appendChild(buildCard('light', czar, whiteCard, user, 'exchange'));
			}

		});
	}
}

// Remove play button from DOM
function removePlayButton(czar, user) {
	if (getClientUsername() != czar.username) {
		whiteCardsDiv.innerHTML = ``;
		whiteCardsDiv.style.overflowX = "auto";
		user.whiteCards.forEach(whiteCard=>{
			var localArray = getClientCardArray();
			var localMap = new Map();	
			localArray.forEach(card => {
				localMap.set(card.whiteCard, true);
			});	
			if(localMap.get(whiteCard) || (cardCount == drawCount)) {
				document.querySelector('.whitecards-div').appendChild(buildCard('light', czar, whiteCard, user, false));
			} else {
				document.querySelector('.whitecards-div').appendChild(buildCard('light', czar, whiteCard, user, 'play'));
			}

		});
	}
}

// Show each room user in the room user table
function outputRoomUserTable(GameState) {
    // Clear the outdated table
    roomUserTable.innerHTML = '';
    
    // Build a table row for each user in the room
	GameState.users.forEach(user=>{
	const tr = document.createElement('tr');
	//tr.classList.add('table-dark');
    
    // Indicate who is the current card czar
	const th = document.createElement('th');
	th.setAttribute("scope","row");
	//
	th.setAttribute("id", "header");
	//
	if(user.username == GameState.cardCzar.username) {
		th.style.border = "2px solid white";
		th.style.color= "white";
		th.style.padding= "1px 2px 4px 1px";
		th.style.textAlign= "center";
		th.style.textDecoration= "none";
		th.style.display= "inline-block";
		th.style.borderRadius= "3px";
		th.style.color = "white";
		th.style.lineHeight = "1";
		th.style.maxWidth = "40px";
		th.style.fontSize = "small";
		th.innerHTML = `<b>CARD CZAR</b>`;
	} else {
		th.innerHTML = ``;
	}
    tr.appendChild(th);
    
	//  Append username and point data to the table row
	const tdName = document.createElement('td');
	if(user.status == 'active') {
		tdName.style.color = "white";
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
	tdPoints.style.color = "white";
	tdPoints.innerHTML = `${user.points}`;
	tr.appendChild(tdPoints);

    //  Append table row to the userlist table
	document.querySelector('.userlist-table').appendChild(tr);
	});  
}

// Output message to DOM
function outputMessage(message) {
	const div = document.createElement('div');
	if(message.username == getClientUsername()) {
		div.classList.add('mine');
	} else {
		div.classList.add('yours');
		div.style.fontSize = "small";
		div.innerHTML =`${message.username}`;
	}

	div.classList.add('messages');
	
	const div1 = document.createElement('div');
	div1.classList.add("message");
	div1.classList.add('last');
	
	div1.style.fontSize = "medium";
	//message.time not used
	div1.innerHTML = `<p>${message.text}</p>`;
	div.appendChild(div1);
	document.querySelector('.chat-messages').appendChild(div);
}

function outputJudgeHand(GameState) {
	judgeHandDiv.innerHTML =``;
	judgeHandDiv.style.overflowX = "auto";//auto
	
	GameState.judgeHand.slice().reverse().forEach(player => {
		var count = 0;	
		player.clientCardArray.forEach(card => {

			count++;
			judgeHandDiv.style.maxWidth = `210rem`;
			var cardBorder;
			var cardHead;
			var cardButton;
			var cardB;
			
			if(GameState.judgeHand.length === (GameState.gameusers.length-1)  && (getClientUsername() == GameState.cardCzar.username) )  {
				cardBorder = document.createElement('div');
				cardBorder.classList.add("card");
				cardBorder.style.height = "13rem";
				cardBorder.style.minWidth = "8rem";
				cardBorder.style.maxWidth = "8rem";
				cardBorder.style.borderColor = "black";
				cardBorder.style.backgroundColor = "border-dark";
				if(count==1) {
					cardBorder.style.marginLeft ="1rem";//set margin-left =2 to increase separation between judge cardArrays
				}
				cardBorder.style.marginRight ="0rem";
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

			} else {
				cardBorder = document.createElement('div');
				cardBorder.classList.add("card");
				cardBorder.style.height = "13rem";
				cardBorder.style.minWidth = "8rem";
				cardBorder.style.maxWidth = "8rem";
				cardBorder.style.borderColor = "black";
				cardBorder.style.backgroundColor = "border-dark";
				if(count==1) {
					cardBorder.style.marginLeft ="1rem";//set margin-left =2 to increase separation between judge cardArrays
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
			}

			if(getClientUsername() != GameState.cardCzar.username) {
				cardBorder = document.createElement('div');
				cardBorder.classList.add("card");
				cardBorder.style.height = "13rem";
				cardBorder.style.minWidth = "8rem";
				cardBorder.style.maxWidth = "8rem";
				cardBorder.style.borderColor = "black";
				cardBorder.style.backgroundColor = "border-dark";
				if(count==1) {
					cardBorder.style.marginLeft ="1rem";//set margin-left =2 to increase separation between judge cardArrays
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
			}

			document.querySelector('.judgehand-div').appendChild(cardBorder);
		});
	});
}

function outputWinner(winnerArray) {

	infoDiv.innerHTML = ``;
	judgeHandDiv.innerHTML = ``;
	judgeHandDiv.style.overflowX = "visible";

	//assume winner is an array with multiple cards
	var count = 0;
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

