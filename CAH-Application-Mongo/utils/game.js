const {mergeSelectedBlackDecks, mergeSelectedWhiteDecks} = require('./serverDeck');

var blackDeck;
var whiteDeck;

var cardCzar = false;
var blackCard = '';

var czarHand = [];
var judgeHand =[];

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
	const gamestate = {cardCzar, blackCard, czarHand, judgeHand, user, users, gameusers};
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
	//example czarHand contents
/*	[
		{
		  user: {
			id: 'apEG879H73_udWOyAAAE',
			username: 'Joe',
			room: 'Sausage',
			points: 0,
			whiteCards: [Array],
			status: 'active'
		  },
		  whiteCard: 'Crucifixion.'					-old
		  clientCardArray: [ [Object], [Object] ]	-new
		}
	]									*/
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
				//var whiteCard = whiteDeck.getWhiteDeck().pop();
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
		var cardIndex = roomUserList[userIndex].whiteCards.findIndex(whiteCard => whiteCard === card.whiteCard);
		//roomUserList[userIndex].whiteCards[cardIndex] = whiteDeck.getWhiteDeck().pop();
		roomUserList[userIndex].whiteCards[cardIndex] = getWhiteDeck().pop();

	});
	return roomUserList;

}

// Return the Card Czar's Hand
function getCzarHand() {
	return czarHand;
}

// Draw a black card
function drawBlackCard(flag) {
	if (flag) {
		//blackCard = blackDeck.getBlackDeck().pop();
		blackCard = getBlackDeck().pop();
	} else {
		blackCard = '';
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
  mergeSelectedDecks
};