var blackDeck;
var whiteDeck;

const blackDeck_base = require('./blackcards');
const whiteDeck_base = require('./whitecards');

const blackDeck_1stexp = require('./firstExpBlackcards');
const whiteDeck_1stexp = require('./firstExpWhitecards');

const blackDeck_custom = require('./customBlackcards');
const whiteDeck_custom = require('./customWhitecards');

var cardCzar = false;
var blackCard = '';

var czarHand = [];
var judgeHand =[];

var selectedDecks = { deck_base: true};

function setSelectedDecks(decks) {
	selectedDecks = decks;
	console.log(decks);
}

function mergeSelectedDecks() {
	//mergeDecks
	var tempBlack = [];
	var tempWhite = [];
	console.log(selectedDecks);
	if(selectedDecks.deck_base == true) {
		tempBlack = tempBlack.concat(blackDeck_base.getBlackDeck());
		tempWhite = tempWhite.concat(whiteDeck_base.getWhiteDeck());
		console.log(whiteDeck_base.getWhiteDeck());
	}
	if(selectedDecks.deck_1stexp == true) {
		tempBlack = tempBlack.concat(blackDeck_1stexp.getBlackDeck());
		tempWhite = tempWhite.concat(whiteDeck_1stexp.getWhiteDeck());
	}
	if(selectedDecks.deck_custom == true) {
		tempBlack = tempBlack.concat(blackDeck_custom.getBlackDeck());
		tempWhite = tempWhite.concat(whiteDeck_custom.getWhiteDeck());
	}
	blackDeck = tempBlack;
	whiteDeck = tempWhite;

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
	const gamestate = {cardCzar, blackCard, czarHand, judgeHand, user, users, gameusers, selectedDecks};
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
  setSelectedDecks,
  mergeSelectedDecks
};