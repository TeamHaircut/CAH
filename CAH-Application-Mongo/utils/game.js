var cardCzar = false;
var blackCard = '';
var blackDeck = [];

var czarHand = [];

// Push white card info to czarHand Array
function appendCzarHand(user, whiteCard) {
	czarHand.push({user, whiteCard});
}

// Initialize White Cards
function initializeWhiteCards(roomusers,count) {
	
	roomusers.forEach(user => {
		var i;
		for(i = 0; i < count ; i++) {
			var whiteCard = "White Card #"+ Math.floor((Math.random()* (1000-0) +0));
			user.whiteCards.push(whiteCard);
		}
	});
	return roomusers;

}

// Return the Card Czar's Hand
function getCzarHand() {
	return czarHand;
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
  initializeWhiteCards, 
  appendCzarHand,
  getCzarHand
};
