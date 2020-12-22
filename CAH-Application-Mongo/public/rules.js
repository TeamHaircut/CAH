const rulesBtnGroup = document.getElementById('rulesBtnGroup');

const  ruleMap = new Map();
const localRuleMap = new Map();

var houseRules = [
    {id:'WhitecardReboot', text:'<h4>Trade In White Cards:</h4><br> The Card Czar is allowed to trade in as many White Cards as they\'d like to the deck and draw back up to ten.'}
];

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
        localRuleMap.set(r.id, button);
    }
}

const socket1 = io('http://teamhaircut.org:5000', {
	'reconnection': true,
	'reconnectionDelay': 50,
	'maxReconnectionAttempts': Infinity
});

//Request List of Enabled Rules from Server
socket1.emit('getServerRules');

socket1.on('serverRulesData', rulesData => {

    for(let [key, value] of rulesData) {
        ruleMap.set(key, value);

        var element = localRuleMap.get(key);
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
    socket1.emit('requestRulesInfo', {key: element.id, val});
}