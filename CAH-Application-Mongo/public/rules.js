/*******Uncomment to to integrate gambling option*******
const gamblingBtnGroup = document.getElementById('gamblingBtnGroup');*/
const rulesBtnGroup = document.getElementById('rulesBtnGroup');

const  deckMap = new Map();
const map2 = new Map();
//New Deck Options go here
////////////////////////////////////////////////////////////
/*******Uncomment to to integrate gambling option*******
//var gambling = [{id:'Gambling', text:'Gambling'}];*/
var houseRules = [
    {id:'WhitecardReboot', text:'<h4>Trade In White Cards:</h4><br> The Card Czar is allowed to trade in as many White Cards as they\'d like to the deck and draw back up to ten.'}
//    {id:'Happy', text:'<h4>Happy Ending:</h4><br> When you\'re ready to stop playing, play the "Make a Haiku" Black Card to end the game. This is the official ceremonial ending of a good game of Cards Against Humanity, and this card should be reserved for the end. (Note: Haikus don\'t need to follow the 5-7-5 form. They just have to be read dramatically.)'},
//    {id:'Rebooting', text:'<h4>Rebooting the Universe:</h4><br> At any time, players may trade in an Awesome Point to return as many White Cards as they\'d like to the deck and draw back up to ten.'},
//    {id:'Packing', text:'<h4>Packing Heat:</h4><br> For Pick 2s, all players draw an extra card before playing the hand to open up more options.'},
//    {id:'Rando', text:'<h4>Rando Cardrissian:</h4><br> Every round, pick one random White Card from the pile and place it into play. This card belongs to an imaginary player named Rando Cardrissian, and if he wins the game, all players go home in a state of everlasting shame.'},
//    {id:'God', text:'<h4>God Is Dead:</h4><br> Play without a Card Czar. Each player picks his or her favorite card each round. The card with the most votes wins the round.'},
//    {id:'Survival', text:'<h4>Survival of the Fittest:</h4><br> After everyone has answered the question, players take turns eliminating one card each. The last remaining card is declared the funniest.'},
//    {id:'Serious', text:'<h4>Serious Business:</h4><br> Instead of picking a favorite card each round, the Card Czar ranks the top three in order. The best card gets 3 Awesome Points, the second-best gets 2, and third gets 1. Keep a running tally of the score, and at the end of the game, the winner is declared the funniest, mathematically speaking.'},
//    {id:'Never', text:'<h4>Never Have I Ever:</h4><br> At any time, players may discard cards that they don\'t understand, but they must confess their ignorance to the group and suffer the resulting humiliation.'}
];

/*******Uncomment to to integrate gambling option*******
//createToggleButtons(gambling, gamblingBtnGroup);*/
createToggleButtons(houseRules, rulesBtnGroup);

function createToggleButtons(ruleSet, btnGroup) {
    for (r of ruleSet) {
        const button = document.createElement('button');
        button.id = r.id;
        button.classList.add("btn", "btn-outline-primary", "btn-lg", "btn-block");
        button.style.borderColor = "black";
        button.onclick = function() {buttonPressed(this)};
        button.innerHTML = r.text;
        btnGroup.appendChild(button);
        map2.set(r.id, button);
    }
}

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
        console.log(key);
        console.log(element);
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