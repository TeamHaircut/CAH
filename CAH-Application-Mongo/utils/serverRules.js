const ruleMap = new Map();
const serverRuleMap = new Map();

////////////////////////////////////////////////////////////
//const AbsurdBox_BlackCards = require('../cards/AbsurdBox_BlackCards');
//const AbsurdBox_WhiteCards = require('../cards/AbsurdBox_WhiteCards');
ruleMap.set('WhitecardReboot', 0);
//serverRuleMap.set('WhitecardReboot', {white: AbsurdBox_WhiteCards.getWhiteDeck(), black: AbsurdBox_BlackCards.getBlackDeck()});
serverRuleMap.set('WhitecardReboot', 0);
////////////////////////////////
function setRuleMap(key, value) {
	ruleMap.set(key, value);
}

function getRuleMap() {
	return ruleMap;
}
/*
function mergeSelectedBlackDecks() {
	var tempBlack = [];
	for (let key of getRuleMap().keys()) {
		if(getRuleMap().get(key) == true) {
			tempBlack = tempBlack.concat(map2.get(key).black);
		}

	}
	return tempBlack;
}

function mergeSelectedWhiteDecks() {
	var tempWhite = [];
	for (let key of getRuleMap().keys()) {
		if(getRuleMap().get(key) == true) {
			tempWhite = tempWhite.concat(map2.get(key).white);
		}

	}
	return tempWhite;
}
*/
module.exports = {
    setRuleMap,
    getRuleMap
    //mergeSelectedBlackDecks,
    //mergeSelectedWhiteDecks
  };