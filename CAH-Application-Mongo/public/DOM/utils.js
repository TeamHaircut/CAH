
// Get room from template
const clientRoom = document.getElementById('client-room');
const room = clientRoom.innerHTML;

// Set ClientRoom element to room
function setClientRoom(room) {
	clientRoom.innerText = room;
}