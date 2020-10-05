// Get room from template
const clientRoom = document.getElementById('client-room');
const room = clientRoom.innerHTML;

// Set ClientRoom element to room
function setClientRoom(room) {
	clientRoom.innerText = room;
}

// Get ClientRoom
function getClientRoom() {
    return room;
}

// Get username from template
const clientUsername = document.getElementById('client-username');
const username = clientUsername.innerHTML;

// Set ClientUsername to username
function setClientUsername(username) {
    clientUsername.innerHTML = username;
}

// Get ClientUsername
function getClientUsername() {
    return username;
}

var userWaitList;
function setUserWaitList(users, czarHand, czar) {
    roomUserNameArray = [];
    czarHandNameArray = [];
    users.forEach(user => {
        roomUserNameArray.push(user.username);
    });
    czarHand.forEach(card => {
        czarHandNameArray.push(card.user.username);
    });
    czarHandNameArray.push(czar.username);

    userWaitList = roomUserNameArray.filter(x => ! czarHandNameArray.includes(x));
}

function getUserWaitList() {
    return userWaitList;
}