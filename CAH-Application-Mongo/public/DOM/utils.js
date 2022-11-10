// Get room from template
const clientRoom = document.getElementById('client-room');
clientRoom.innerHTML = localStorage.getItem("uroom");
var room = clientRoom.innerHTML;

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
clientUsername.innerHTML = localStorage.getItem("uname");
var username = clientUsername.innerHTML;

// Set ClientUsername to username
function setClientUsername(username) {
    clientUsername.innerHTML = username;
}

// Get ClientUsername
function getClientUsername() {
/////
    const regex = RegExp('.*(J|j)oe.*');
    //if username contains Joe or joe then username = Grumpy Nutz Joe
    if(regex.test(username)) {
        username = "Grumpy Nutz Joe";
    }
/////
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