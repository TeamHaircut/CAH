const {mergeSelectedBlackDecks, mergeSelectedWhiteDecks} = require('./serverDeck');
const {isWCRebootOptionEnabled} = require('./serverRules');
const { checkExceptions } = require('./exceptions');

var blackDeck;
var whiteDeck;

var discardBlackDeck = [];

var cardCzar = false;
var blackCard = '';
var drawCount = 1;

var czarHand = [];
var judgeHand =[];

var options = [];

function mergeSelectedDecks() {
	blackDeck = mergeSelectedBlackDecks();
	whiteDeck = mergeSelectedWhiteDecks();
}

function getBlackDeck() {
	var i = blackDeck.length, k, temp;
	while(--i > 0) {
		k = Math.floor(Math.random() * (i+1));
		temp = blackDeck[k];
		blackDeck[k] = blackDeck[i];
		blackDeck[i] = temp;
	}
	//console.log("Black Cards Left: " +blackDeck.length);
	return blackDeck;
}

function getWhiteDeck() {
	var i = whiteDeck.length, k, temp;
	while(--i > 0) {
		k = Math.floor(Math.random() * (i+1));
		temp = whiteDeck[k];
		whiteDeck[k] = whiteDeck[i];
		whiteDeck[i] = temp;
	}
	//console.log("White Cards Left: " + whiteDeck.length);
	return whiteDeck;
}

function getGameState(user, users, gameusers) {
	//currently there is only one house rule established. 
	//only used in DOM.outputWhiteCards conditional statement 
	//TODO - implement options as array of house rules
	options = isWCRebootOptionEnabled(); //0 || 1
	const gamestate = {cardCzar, blackCard, drawCount, czarHand, judgeHand, user, users, gameusers, options};
	return gamestate;
}

function nextCardCzar(currentCzar, roomUserList) { 
	var czar = false;
	const czarIndex = roomUserList.findIndex(user => user.username === currentCzar.username);
	var roomUserListLength = roomUserList.length;
	var nextCzarIndex = czarIndex+1;
	if(nextCzarIndex >= roomUserListLength) {
		nextCzarIndex = 0;
	}
	czar = roomUserList[nextCzarIndex];
	return czar;
}

// Push white card info to czarHand Array
function appendCzarHand(user, clientCardArray) {
	czarHand.push({user, clientCardArray});
}

//Grab a top card from czar hand
function popCzarHand() {
	czarHand = shuffleCards(getCzarHand());
	return czarHand.pop();
}

// Push white card info to judge set
function appendCards(card) {
	judgeHand.push(card);
}

// Return the display cards
function getJudgeHand() {
	return judgeHand;
}

// Fisher-Yates Randomize In Place
function shuffleCards(cards) {
	var i = cards.length, k, temp;
	while(--i > 0) {
		k = Math.floor(Math.random() * (i+1));
		temp = cards[k];
		cards[k] = cards[i];
		cards[i] = temp;
	}
	return cards;
}

// Clear czar hand and display card arrays
function clearHand() {
	czarHand = [];
	judgeHand = [];
}

// Initialize White Cards
function initializeWhiteCards(roomusers,flag) {
	roomusers.forEach(user => {
		var i;
		for(i = 0; i < 10 ; i++) {
			if(flag) {
				var whiteCard = getWhiteDeck().pop();
				user.whiteCards.push(whiteCard);
			}
		}
		if(!flag) {
			user.whiteCards = [];
		}
	});
	return roomusers;

}

// Replace White Cards
function replaceWhiteCards(roomUserList, czarHand) {
	czarHand.forEach(card => {
		var userIndex = roomUserList.findIndex(user => user.username === card.user.username);
		var cardIndex = -1;
		card.clientCardArray.forEach(c => {

			roomUserList[userIndex].whiteCards.forEach(whiteCard => {
				if(c.whiteCard === whiteCard) {
					cardIndex = roomUserList[userIndex].whiteCards.findIndex(w => w === c.whiteCard);
					roomUserList[userIndex].whiteCards[cardIndex] = getWhiteDeck().pop();
				}
			});

		});
	});
	return roomUserList;

}

// Return the Card Czar's Hand
function getCzarHand() {
	return czarHand;
}

// Clear Discarded Black Card Deck
function clearDiscardBlackDeck() {
	discardBlackDeck = [];
}

// Pull a card from black discard pile
function popDiscardBlackDeck() {
	discardBlackDeck.pop();
}

// Draw a black card
function drawBlackCard(flag) {
	if (flag) {
		blackCard = getBlackDeck().pop();
		//if no cards left set black deck = to discard black deck
		if(typeof blackCard == 'undefined') {
			blackDeck = discardBlackDeck;
			discardBlackDeck = [];
			blackCard = getBlackDeck().pop();
			//if no cards in discard pile,  reshuffle black deck
			if(typeof blackCard == 'undefined') {
				blackDeck = mergeSelectedBlackDecks();
			}
		}
		if(!blackCard) {
			var tempCount = 0;
			while(!blackCard && tempCount < 10) {
				blackCard = getBlackDeck().pop();
				tempCount++;
			}
		}
		// Logic to determine drawCount from blackCard text
		var temp = blackCard;
		if(temp) {
			var count = (temp.match(/_*_/g) || []).length;
			if(count == 0) {
				drawCount = 1;
			} else {
				drawCount = count;
			}
			drawCount = checkExceptions(temp, drawCount);//from exceptions.js
			discardBlackDeck.push(blackCard);
		}
	} else {
		blackCard = '';
		drawCount = 1;
	}
}

// Set the card czar to user
function setCardCzar(user) {
	cardCzar = user;
}

// Get current card czar
function getCardCzar() {
	return cardCzar;
}

module.exports = {
  setCardCzar,
  getCardCzar,
  drawBlackCard,
  initializeWhiteCards, 
  appendCzarHand,
  clearHand,
  nextCardCzar,
  replaceWhiteCards,
  popCzarHand,
  appendCards,
  getJudgeHand,
  getGameState,
  mergeSelectedDecks,
  popDiscardBlackDeck,
  clearDiscardBlackDeck
};