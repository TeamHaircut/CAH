const blackDeck = require('./blackcards');
const whiteDeck = require('./whitecards');

var cardCzar = false;
var blackCard = '';

var czarHand = [];
var judgeHand =[];

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
function appendCzarHand(user, whiteCard) {
	czarHand.push({user, whiteCard});
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

//Grab a top card from czar hand
function popCzarHand() {
	czarHand = shuffleCards(getCzarHand());
	return czarHand.pop();
}

function clearHand() {
	judgeHand = [];
}

// Initialize White Cards
function initializeWhiteCards(roomusers,flag) {
	roomusers.forEach(user => {
		var i;
		for(i = 0; i < 10 ; i++) {
			if(flag) {
				var whiteCard = whiteDeck.getWhiteDeck().pop();
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
		roomUserList[userIndex].whiteCards[cardIndex] = whiteDeck.getWhiteDeck().pop();

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
		blackCard = blackDeck.getBlackDeck().pop();
	} else {
		blackCard = '';
	}
}

// Get black card
function getBlackCard() {
	return blackCard;
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
  getBlackCard,
  initializeWhiteCards, 
  appendCzarHand,
  getCzarHand,
  clearHand,
  nextCardCzar,
  replaceWhiteCards,
  popCzarHand,
  appendCards,
  getJudgeHand
};