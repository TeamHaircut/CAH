const  deckMap = new Map();
const map2 = new Map();
////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
const socket1 = io('http://teamhaircut.org:5000', {
	'reconnection': true,
	'reconnectionDelay': 50,
	'maxReconnectionAttempts': Infinity
});

socket1.emit('getServerDeckOptions');

socket1.on('serverDeckData', deckData => {

    for(let [key, value] of deckData) {
        deckMap.set(key, value);

        var element = map2.get(key);
            if(value == 0) {
                element.style.backgroundColor= "white";
                element.style.color = "rgb(235,104,100)";
            } else {
                element.style.backgroundColor= "rgb(235,104,100)";
                element.style.color = "white";           
            }
    }

});

function buttonPressed(element) {
    var val = '';
    console.log(element.style.color);
    if(element.style.color==="rgb(235, 104, 100)") {
        val = 1;
    } else {
        val = 0;
    }
    socket1.emit('requestDeckInfo', {key: element.id, val});
}