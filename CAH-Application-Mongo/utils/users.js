const users = [];

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
	const user = { id, username, room, points, whiteCards};
	users.push(user);
	return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

// Update Room Users
function updateRoomUsersWhiteCards(roomusers) {
	//console.log(roomusers);
	users.forEach(user => {
		roomusers.forEach(roomuser => {
			if(roomuser.username == user.username) {
				user.whiteCards = roomuser.whiteCards;
			}
		});
	});
	//console.log(users);
	//users = roomusers;
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  resetPoints,
  updateRoomUsersWhiteCards
};
