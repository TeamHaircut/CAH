var cardCzar = false;
var blackCard = '';

var czarHand = [];

function nextCardCzar(currentCzar, roomUserList) { 
	var czar = false;
	const czarIndex = roomUserList.findIndex(user => user.username === currentCzar.username);
	console.log("CzarIndex: "+czarIndex);
	var roomUserListLength = roomUserList.length;
	console.log("RoomUserListLength: "+roomUserListLength);
	var nextCzarIndex = czarIndex+1;
	console.log("NextCzarIndex: "+nextCzarIndex);
	if(nextCzarIndex >= roomUserListLength) {
		nextCzarIndex = 0;
		console.log("HERE");
	}
	czar = roomUserList[nextCzarIndex];
	console.log("New czar: "+ czar);
	return czar;
}

// Push white card info to czarHand Array
function appendCzarHand(user, whiteCard) {
	czarHand.push({user, whiteCard});
}

function clearCzarHand() {
	czarHand = [];
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
	blackCard = "Black Card #"+ Math.floor((Math.random()* (1000-0) +0));
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
  clearCzarHand,
  nextCardCzar
};