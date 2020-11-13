const customBtnGroup = document.getElementById('customBtnGroup');
const baseBtnGroup = document.getElementById('baseBtnGroup');
const expansionBtnGroup = document.getElementById('expansionBtnGroup');
const boxBtnGroup = document.getElementById('boxBtnGroup');
const internationalBtnGroup = document.getElementById('internationalBtnGroup');
const themeBtnGroup = document.getElementById('themeBtnGroup');
const limitedBtnGroup = document.getElementById('limitedBtnGroup');

const  deckMap = new Map();
const map2 = new Map();
//New Deck Options go here
////////////////////////////////////////////////////////////
var customPacks = [{id:'Custom', text:'Custom Cards'}];
var basePacks = [
    {id:'BaseGameUS', text:'Base Game (US)'},{id:'BaseGame1v0', text:'Base Game 1.0'},{id:'BaseGame1v3', text:'Base Game 1.3'},
    {id:'BaseGame1v5', text:'Base Game 1.5'},{id:'BaseGame1v6', text:'Base Game 1.6'}
];
var expansionPacks = [
    {id:'FirstExpansion', text:'1st Expansion'},{id:'SecondExpansion', text:'2nd Expansion'},{id:'ThirdExpansion', text:'3rd Expansion'},
    {id:'FourthExpansion', text:'4th Expansion'},{id:'FifthExpansion', text:'5th Expansion'},{id:'SixthExpansion', text:'6th Expansion'}
];
var boxPacks = [
    {id:'AbsurdBox', text:'Absurd Box'},{id:'BiggerBlackerBox', text:'The Bigger Blacker Box'},{id:'TheGreenBox', text:'The Green Box'}
];
var internationalPacks = [
    {id:'BaseGameAustralia', text:'Base Game (AUS)'},{id:'BaseGameCanada', text:'Base Game (CAN)'},{id:'BaseGameUK', text:'Base Game (UK)'}
];
var themePacks = [
    {id:'p90sNostalgia', text:'90\'s Nostalgia'},{id:'p2000sNostalgiaPack', text:'2000\'s Nostalgia'},{id:'AIPack', text:'A.I. Pack'},
    {id:'AssPack', text:'Ass Pack'},{id:'CollegePack', text:'College Pack'},{id:'DadPack', text:'Dad Pack'},
    {id:'FantasyPack', text:'Fantasy Pack'},{id:'FoodPack', text:'Food Pack'},{id:'GeekPack', text:'Geek Pack'},
    {id:'HolidayPack2012', text:'Holiday Pack 2012'},{id:'HolidayPack2013', text:'Holiday Pack 2013'},{id:'HolidayPack2014', text:'Holiday Pack 2014'},
    {id:'HumanPack', text:'Human Pack'},{id:'JewPack2015', text:'Jew Pack 2015'},{id:'PeriodPack', text:'Period Pack'},
    {id:'PostTrumpPack', text:'Post-Trump Pack'},{id:'PridePack', text:'Pride Pack'},{id:'SavesAmericaPack', text:'CAH Saves America Pack'},
    {id:'SciencePack', text:'Science Pack'},{id:'SciFiPack', text:'Sci-Fi Pack'},{id:'TheTheatrePack', text:'The Theatre Pack'},
    {id:'VoteForHillary', text:'Vote For Hillary Pack'},{id:'WeedPack', text:'Weed Pack'},{id:'WorldWideWeb', text:'World Wide Web Pack'}
];
var limitedPacks = [
    {id:'FascismPack', text:'Fascism Pack'},{id:'HanukkahLOLPack', text:'Hanukkah LOL Pack'},{id:'HiddenCompartment', text:'Hidden Compartment'},
    {id:'HouseOfCards', text:'House Of Cards'},{id:'MassEffectPack', text:'Mass Effect Pack'},{id:'PAX2013EastPack', text:'PAX East 2013 Pack'},
    {id:'PAX2013PrimePack', text:'PAX East 2013 Prime Pack'},{id:'PAX2014EastPack', text:'PAX East 2014 Pack'},{id:'PAX2014EastPanelPack', text:'PAX East 2014 Panel Pack'},
    {id:'PAX2014PrimePanelPack', text:'PAX East 2014 Prime Panel Pack'},{id:'RejectPack', text:'Reject Pack'},{id:'RetailPack', text:'Retail Pack'},
    {id:'TabletopPack', text:'Tabletop Pack'}
];

createToggleButtons(customPacks, customBtnGroup);
createToggleButtons(basePacks, baseBtnGroup);
createToggleButtons(expansionPacks, expansionBtnGroup);
createToggleButtons(boxPacks, boxBtnGroup);
createToggleButtons(internationalPacks, internationalBtnGroup);
createToggleButtons(themePacks, themeBtnGroup);
createToggleButtons(limitedPacks, limitedBtnGroup);

function createToggleButtons(packs, btnGroup) {
    for (p of packs) {
        const button = document.createElement('button');
        button.id = p.id;
        button.classList.add("btn", "btn-outline-primary", "btn-lg", "btn-block");
        button.style.borderColor = "black";
        button.onclick = function() {buttonPressed(this)};
        button.innerHTML = p.text;
        btnGroup.appendChild(button);
        map2.set(p.id, button);
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