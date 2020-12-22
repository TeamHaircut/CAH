const users = [];

function setUserStatus(currentUser, status) {
	users.forEach(user => {
		if(user.username == currentUser.username) {
			user.status = status;
		}
	});
}

function getCurrentUserByUsername(username) {
	return users.find(user => user.username === username);
}

function updatePoints(name) {
	users.forEach(user => {
		if(user.username == name) {
			user.points = user.points + 1;
		}
	});
}

// Reset Points to 0
function resetPoints() {
	users.forEach(user =>
		user.points = 0
	)
}

// Join user to chat
function userJoin(id, username, room) {
	const points = '-';
	const whiteCards = [];
	const status = 'active';
	const user = { id, username, room, points, whiteCards, status};
	users.push(user);
	return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// Rejoin user to room
function userRejoin(id, user) {
	user.id = id;
	user.status = 'active';
}

// Get room users
function getRoomUserList(room) {
  var roomUsers = users.filter(user => user.room === room); 
  return roomUsers.filter(user => user.status !== 'inactive');
}

// Get active game users
function getGameUserList(room) {
	var roomUsers = users.filter(user => user.room === room); 
	var temp = roomUsers.filter(user => user.status !== 'inactive');
	return temp.filter(user => user.status !== 'offline');
  }

// Update Room Users
function updateRoomUsersWhiteCards(roomusers) {
	users.forEach(user => {
		roomusers.forEach(roomuser => {
			if(roomuser.username == user.username) {
				user.whiteCards = roomuser.whiteCards;
			}
		});
	});
}

module.exports = {
  userJoin,
  getCurrentUser,
  getRoomUserList,
  getGameUserList,
  resetPoints,
  updateRoomUsersWhiteCards,
  updatePoints,
  userRejoin,
  getCurrentUserByUsername, 
  setUserStatus
};