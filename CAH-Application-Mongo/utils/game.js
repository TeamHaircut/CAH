var cardCzar = false;
var blackCard = '';
var blackDeck = [];

var whiteCards = [];

// Draw a white card
function drawWhiteCards(count) {
	whiteCards = [];
	
	var i;
	for(i = 0; i < count ; i++) {
		var whiteCard = "White Card #"+ Math.floor((Math.random()* (1000-0) +0));
		whiteCards.push(whiteCard);
	}
}

// Get white card
function getWhiteCards() {
	return whiteCards;
}

// Draw a black card
function drawBlackCard() {
	blackCard = 'Instead of coal, Santa now gives the bad children ___.';
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
  drawWhiteCards,
  getWhiteCards
};
