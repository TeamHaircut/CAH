const deckMap = new Map();
const map2 = new Map();

/////////////////////////////////
const AbsurdBox_BlackCards = require('./AbsurdBox_BlackCards');
const AbsurdBox_WhiteCards = require('./AbsurdBox_WhiteCards');
deckMap.set('AbsurdBox', 0);
map2.set('AbsurdBox', {white: AbsurdBox_WhiteCards.getWhiteDeck(), black: AbsurdBox_BlackCards.getBlackDeck()});

const AIPack_WhiteCards = require('./AIPack_WhiteCards');
deckMap.set('AIPack', 0);
map2.set('AIPack', {white: AIPack_WhiteCards.getWhiteDeck(), black: false});

const AssPack_BlackCards = require('./AssPack_BlackCards');
const AssPack_WhiteCards = require('./AssPack_WhiteCards');
deckMap.set('AssPack', 0);
map2.set('AssPack', {white: AssPack_WhiteCards.getWhiteDeck(), black: AssPack_BlackCards.getBlackDeck()});

const BaseGame1v0_BlackCards = require('./BaseGame1v0_BlackCards');
const BaseGame1v0_WhiteCards = require('./BaseGame1v0_WhiteCards');
deckMap.set('BaseGame1v0', 0);
map2.set('BaseGame1v0', {white: BaseGame1v0_WhiteCards.getWhiteDeck(), black: BaseGame1v0_BlackCards.getBlackDeck()});

const BaseGame1v3_WhiteCards = require('./BaseGame1v3_WhiteCards');
deckMap.set('BaseGame1v3', 0);
map2.set('BaseGame1v3', {white: BaseGame1v3_WhiteCards.getWhiteDeck(), black: false});

const BaseGame1v5_WhiteCards = require('./BaseGame1v5_WhiteCards');
deckMap.set('BaseGame1v5', 0);
map2.set('BaseGame1v5', {white: BaseGame1v5_WhiteCards.getWhiteDeck(), black: false});

const BaseGame1v6_BlackCards = require('./BaseGame1v6_BlackCards');
const BaseGame1v6_WhiteCards = require('./BaseGame1v6_WhiteCards');
deckMap.set('BaseGame1v6', 0);
map2.set('BaseGame1v6', {white: BaseGame1v6_WhiteCards.getWhiteDeck(), black: BaseGame1v6_BlackCards.getBlackDeck()});

const BaseGameAustralia_BlackCards = require('./BaseGameAustralia_BlackCards');
const BaseGameAustralia_WhiteCards = require('./BaseGameAustralia_WhiteCards');
deckMap.set('BaseGameAustralia', 0);
map2.set('BaseGameAustralia', {white: BaseGameAustralia_WhiteCards.getWhiteDeck(), black: BaseGameAustralia_BlackCards.getBlackDeck()});

const BaseGameCanada_BlackCards = require('./BaseGameCanada_BlackCards');
const BaseGameCanada_WhiteCards = require('./BaseGameCanada_WhiteCards');
deckMap.set('BaseGameCanada', 0);
map2.set('BaseGameCanada', {white: BaseGameCanada_WhiteCards.getWhiteDeck(), black: BaseGameCanada_BlackCards.getBlackDeck()});

const BaseGameUK_BlackCards = require('./BaseGameUK_BlackCards');
const BaseGameUK_WhiteCards = require('./BaseGameUK_WhiteCards');
deckMap.set('BaseGameUK', 0);
map2.set('BaseGameUK', {white: BaseGameUK_WhiteCards.getWhiteDeck(), black: BaseGameUK_BlackCards.getBlackDeck()});

const BaseGameUS_BlackCards = require('./BaseGameUS_BlackCards');
const BaseGameUS_WhiteCards = require('./BaseGameUS_WhiteCards');
deckMap.set('BaseGameUS', 0);
map2.set('BaseGameUS', {white: BaseGameUS_WhiteCards.getWhiteDeck(), black: BaseGameUS_BlackCards.getBlackDeck()});

const BiggerBlackerBox_WhiteCards = require('./BiggerBlackerBox_WhiteCards');
deckMap.set('BiggerBlackerBox', 0);
map2.set('BiggerBlackerBox', {white: BiggerBlackerBox_WhiteCards.getWhiteDeck(), black: false});

const CollegePack_BlackCards = require('./CollegePack_BlackCards');
const CollegePack_WhiteCards = require('./CollegePack_WhiteCards');
deckMap.set('CollegePack', 0);
map2.set('CollegePack', {white: CollegePack_WhiteCards.getWhiteDeck(), black: CollegePack_BlackCards.getBlackDeck()});

const Custom_BlackCards = require('./Custom_BlackCards');
const Custom_WhiteCards = require('./Custom_WhiteCards');
deckMap.set('Custom', 0);
map2.set('Custom', {white: Custom_WhiteCards.getWhiteDeck(), black: Custom_BlackCards.getBlackDeck()});

const DadPack_BlackCards = require('./DadPack_BlackCards');
const DadPack_WhiteCards = require('./DadPack_WhiteCards');
deckMap.set('DadPack', 0);
map2.set('DadPack', {white: DadPack_WhiteCards.getWhiteDeck(), black: DadPack_BlackCards.getBlackDeck()});

const FantasyPack_BlackCards = require('./FantasyPack_BlackCards');
const FantasyPack_WhiteCards = require('./FantasyPack_WhiteCards');
deckMap.set('FantasyPack', 0);
map2.set('FantasyPack', {white: FantasyPack_WhiteCards.getWhiteDeck(), black: FantasyPack_BlackCards.getBlackDeck()});

const FascismPack_BlackCards = require('./FascismPack_BlackCards');
const FascismPack_WhiteCards = require('./FascismPack_WhiteCards');
deckMap.set('FascismPack', 0);
map2.set('FascismPack', {white: FascismPack_WhiteCards.getWhiteDeck(), black: FascismPack_BlackCards.getBlackDeck()});

const FifthExpansion_BlackCards = require('./FifthExpansion_BlackCards');
const FifthExpansion_WhiteCards = require('./FifthExpansion_WhiteCards');
deckMap.set('FifthExpansion', 0);
map2.set('FifthExpansion', {white: FifthExpansion_WhiteCards.getWhiteDeck(), black: FifthExpansion_BlackCards.getBlackDeck()});

const FirstExpansion_BlackCards = require('./FirstExpansion_BlackCards');
const FirstExpansion_WhiteCards = require('./FirstExpansion_WhiteCards');
deckMap.set('FirstExpansion', 0);
map2.set('FirstExpansion', {white: FirstExpansion_WhiteCards.getWhiteDeck(), black: FirstExpansion_BlackCards.getBlackDeck()});

const FoodPack_BlackCards = require('./FoodPack_BlackCards');
const FoodPack_WhiteCards = require('./FoodPack_WhiteCards');
deckMap.set('FoodPack', 0);
map2.set('FoodPack', {white: FoodPack_WhiteCards.getWhiteDeck(), black: FoodPack_BlackCards.getBlackDeck()});

const FourthExpansion_BlackCards = require('./FourthExpansion_BlackCards');
const FourthExpansion_WhiteCards = require('./FourthExpansion_WhiteCards');
deckMap.set('FourthExpansion', 0);
map2.set('FourthExpansion', {white: FourthExpansion_WhiteCards.getWhiteDeck(), black: FourthExpansion_BlackCards.getBlackDeck()});

const GeekPack_BlackCards = require('./GeekPack_BlackCards');
const GeekPack_WhiteCards = require('./GeekPack_WhiteCards');
deckMap.set('GeekPack', 0);
map2.set('GeekPack', {white: GeekPack_WhiteCards.getWhiteDeck(), black: GeekPack_BlackCards.getBlackDeck()});

const HanukkahLOLPack_WhiteCards = require('./HanukkahLOLPack_WhiteCards');
deckMap.set('HanukkahLOLPack', 0);
map2.set('HanukkahLOLPack', {white: HanukkahLOLPack_WhiteCards.getWhiteDeck(), black: false});

const HiddenCompartment_WhiteCards = require('./HiddenCompartment_WhiteCards');
deckMap.set('HiddenCompartment', 0);
map2.set('HiddenCompartment', {white: HiddenCompartment_WhiteCards.getWhiteDeck(), black: false});

const HolidayPack2012_BlackCards = require('./HolidayPack2012_BlackCards');
const HolidayPack2012_WhiteCards = require('./HolidayPack2012_WhiteCards');
deckMap.set('HolidayPack2012', 0);
map2.set('HolidayPack2012', {white: HolidayPack2012_WhiteCards.getWhiteDeck(), black: HolidayPack2012_BlackCards.getBlackDeck()});

const HolidayPack2013_BlackCards = require('./HolidayPack2013_BlackCards');
const HolidayPack2013_WhiteCards = require('./HolidayPack2013_WhiteCards');
deckMap.set('HolidayPack2013', 0);
map2.set('HolidayPack2013', {white: HolidayPack2013_WhiteCards.getWhiteDeck(), black: HolidayPack2013_BlackCards.getBlackDeck()});

const HolidayPack2014_BlackCards = require('./HolidayPack2014_BlackCards');
const HolidayPack2014_WhiteCards = require('./HolidayPack2014_WhiteCards');
deckMap.set('HolidayPack2014', 0);
map2.set('HolidayPack2014', {white: HolidayPack2014_WhiteCards.getWhiteDeck(), black: HolidayPack2014_BlackCards.getBlackDeck()});

const HouseOfCards_BlackCards = require('./HouseOfCards_BlackCards');
const HouseOfCards_WhiteCards = require('./HouseOfCards_WhiteCards');
deckMap.set('HouseOfCards', 0);
map2.set('HouseOfCards', {white: HouseOfCards_WhiteCards.getWhiteDeck(), black: HouseOfCards_BlackCards.getBlackDeck()});

const HumanPack_BlackCards = require('./HumanPack_BlackCards');
const HumanPack_WhiteCards = require('./HumanPack_WhiteCards');
deckMap.set('HumanPack', 0);
map2.set('HumanPack', {white: HumanPack_WhiteCards.getWhiteDeck(), black: HumanPack_BlackCards.getBlackDeck()});

const JewPack2015_BlackCards = require('./JewPack2015_BlackCards');
const JewPack2015_WhiteCards = require('./JewPack2015_WhiteCards');
deckMap.set('JewPack2015', 0);
map2.set('JewPack2015', {white: JewPack2015_WhiteCards.getWhiteDeck(), black: JewPack2015_BlackCards.getBlackDeck()});

const MassEffectPack_BlackCards = require('./MassEffectPack_BlackCards');
const MassEffectPack_WhiteCards = require('./MassEffectPack_WhiteCards');
deckMap.set('MassEffectPack', 0);
map2.set('MassEffectPack', {white: MassEffectPack_WhiteCards.getWhiteDeck(), black: MassEffectPack_BlackCards.getBlackDeck()});

const p2000sNostalgiaPack_BlackCards = require('./p2000sNostalgiaPack_BlackCards');
const p2000sNostalgiaPack_WhiteCards = require('./p2000sNostalgiaPack_WhiteCards');
deckMap.set('p2000sNostalgiaPack', 0);
map2.set('p2000sNostalgiaPack', {white: p2000sNostalgiaPack_WhiteCards.getWhiteDeck(), black: p2000sNostalgiaPack_BlackCards.getBlackDeck()});

const p90sNostalgia_BlackCards = require('./p90sNostalgia_BlackCards');
const p90sNostalgia_WhiteCards = require('./p90sNostalgia_WhiteCards');
deckMap.set('p90sNostalgia', 0);
map2.set('p90sNostalgia', {white: p90sNostalgia_WhiteCards.getWhiteDeck(), black: p90sNostalgia_BlackCards.getBlackDeck()});

const PAX2013EastPack_BlackCards = require('./PAX2013EastPack_BlackCards');
const PAX2013EastPack_WhiteCards = require('./PAX2013EastPack_WhiteCards');
deckMap.set('PAX2013EastPack', 0);
map2.set('PAX2013EastPack', {white: PAX2013EastPack_WhiteCards.getWhiteDeck(), black: PAX2013EastPack_BlackCards.getBlackDeck()});

const PAX2013PrimePack_BlackCards = require('./PAX2013PrimePack_BlackCards');
const PAX2013PrimePack_WhiteCards = require('./PAX2013PrimePack_WhiteCards');
deckMap.set('PAX2013PrimePack', 0);
map2.set('PAX2013PrimePack', {white: PAX2013PrimePack_WhiteCards.getWhiteDeck(), black: PAX2013PrimePack_BlackCards.getBlackDeck()});

const PAX2014EastPack_WhiteCards = require('./PAX2014EastPack_WhiteCards');
deckMap.set('PAX2014EastPack', 0);
map2.set('PAX2014EastPack', {white: PAX2014EastPack_WhiteCards.getWhiteDeck(), black: false});

const PAX2014EastPanelPack_BlackCards = require('./PAX2014EastPanelPack_BlackCards');
const PAX2014EastPanelPack_WhiteCards = require('./PAX2014EastPanelPack_WhiteCards');
deckMap.set('PAX2014EastPanelPack', 0);
map2.set('PAX2014EastPanelPack', {white: PAX2014EastPanelPack_WhiteCards.getWhiteDeck(), black: PAX2014EastPanelPack_BlackCards.getBlackDeck()});

const PAX2014PrimePanelPack_BlackCards = require('./PAX2014PrimePanelPack_BlackCard');
const PAX2014PrimePanelPack_WhiteCards = require('./PAX2014PrimePanelPack_WhiteCard');
deckMap.set('PAX2014PrimePanelPack', 0);
map2.set('PAX2014PrimePanelPack', {white: PAX2014PrimePanelPack_WhiteCards.getWhiteDeck(), black: PAX2014PrimePanelPack_BlackCards.getBlackDeck()});

const PeriodPack_BlackCards = require('./PeriodPack_BlackCards');
const PeriodPack_WhiteCards = require('./PeriodPack_WhiteCards');
deckMap.set('PeriodPack', 0);
map2.set('PeriodPack', {white: PeriodPack_WhiteCards.getWhiteDeck(), black: PeriodPack_BlackCards.getBlackDeck()});

const PostTrumpPack_BlackCards = require('./PostTrumpPack_BlackCards');
const PostTrumpPack_WhiteCards = require('./PostTrumpPack_WhiteCards');
deckMap.set('PostTrumpPack', 0);
map2.set('PostTrumpPack', {white: PostTrumpPack_WhiteCards.getWhiteDeck(), black: PostTrumpPack_BlackCards.getBlackDeck()});

const PridePack_BlackCards = require('./PridePack_BlackCards');
const PridePack_WhiteCards = require('./PridePack_WhiteCards');
deckMap.set('PridePack', 0);
map2.set('PridePack', {white: PridePack_WhiteCards.getWhiteDeck(), black: PridePack_BlackCards.getBlackDeck()});

const RejectPack_BlackCards = require('./RejectPack_BlackCards');
const RejectPack_WhiteCards = require('./RejectPack_WhiteCards');
deckMap.set('RejectPack', 0);
map2.set('RejectPack', {white: RejectPack_WhiteCards.getWhiteDeck(), black: RejectPack_BlackCards.getBlackDeck()});

const RetailPack_BlackCards = require('./RetailPack_BlackCards');
const RetailPack_WhiteCards = require('./RetailPack_WhiteCards');
deckMap.set('RetailPack', 0);
map2.set('RetailPack', {white: RetailPack_WhiteCards.getWhiteDeck(), black: RetailPack_BlackCards.getBlackDeck()});

const SavesAmericaPack_BlackCards = require('./SavesAmericaPack_BlackCards');
const SavesAmericaPack_WhiteCards = require('./SavesAmericaPack_WhiteCards');
deckMap.set('SavesAmericaPack', 0);
map2.set('SavesAmericaPack', {white: SavesAmericaPack_WhiteCards.getWhiteDeck(), black: SavesAmericaPack_BlackCards.getBlackDeck()});

const SciencePack_BlackCards = require('./SciencePack_BlackCards');
const SciencePack_WhiteCards = require('./SciencePack_WhiteCards');
deckMap.set('SciencePack', 0);
map2.set('SciencePack', {white: SciencePack_WhiteCards.getWhiteDeck(), black: SciencePack_BlackCards.getBlackDeck()});

const SciFiPack_BlackCards = require('./SciFiPack_BlackCards');
const SciFiPack_WhiteCards = require('./SciFiPack_WhiteCards');
deckMap.set('SciFiPack', 0);
map2.set('SciFiPack', {white: SciFiPack_WhiteCards.getWhiteDeck(), black: SciFiPack_BlackCards.getBlackDeck()});

const SecondExpansion_BlackCards = require('./SecondExpansion_BlackCards');
const SecondExpansion_WhiteCards = require('./SecondExpansion_WhiteCards');
deckMap.set('SecondExpansion', 0);
map2.set('SecondExpansion', {white: SecondExpansion_WhiteCards.getWhiteDeck(), black: SecondExpansion_BlackCards.getBlackDeck()});

const SixthExpansion_BlackCards = require('./SixthExpansion_BlackCards');
const SixthExpansion_WhiteCards = require('./SixthExpansion_WhiteCards');
deckMap.set('SixthExpansion', 0);
map2.set('SixthExpansion', {white: SixthExpansion_WhiteCards.getWhiteDeck(), black: SixthExpansion_BlackCards.getBlackDeck()});

const TabletopPack_BlackCards = require('./TabletopPack_BlackCards');
const TabletopPack_WhiteCards = require('./TabletopPack_WhiteCards');
deckMap.set('TabletopPack', 0);
map2.set('TabletopPack', {white: TabletopPack_WhiteCards.getWhiteDeck(), black: TabletopPack_BlackCards.getBlackDeck()});

const TheGreenBox_BlackCards = require('./TheGreenBox_BlackCards');
const TheGreenBox_WhiteCards = require('./TheGreenBox_WhiteCards');
deckMap.set('TheGreenBox', 0);
map2.set('TheGreenBox', {white: TheGreenBox_WhiteCards.getWhiteDeck(), black: TheGreenBox_BlackCards.getBlackDeck()});

const TheTheatrePack_BlackCards = require('./TheTheatrePack_BlackCards');
const TheTheatrePack_WhiteCards = require('./TheTheatrePack_WhiteCards');
deckMap.set('TheTheatrePack', 0);
map2.set('TheTheatrePack', {white: TheTheatrePack_WhiteCards.getWhiteDeck(), black: TheTheatrePack_BlackCards.getBlackDeck()});

const ThirdExpansion_BlackCards = require('./ThirdExpansion_BlackCards');
const ThirdExpansion_WhiteCards = require('./ThirdExpansion_WhiteCards');
deckMap.set('ThirdExpansion', 0);
map2.set('ThirdExpansion', {white: ThirdExpansion_WhiteCards.getWhiteDeck(), black: ThirdExpansion_BlackCards.getBlackDeck()});

const VoteForHillary_BlackCards = require('./VoteForHillary_BlackCards');
const VoteForHillary_WhiteCards = require('./VoteForHillary_WhiteCards');
deckMap.set('VoteForHillary', 0);
map2.set('VoteForHillary', {white: VoteForHillary_WhiteCards.getWhiteDeck(), black: VoteForHillary_BlackCards.getBlackDeck()});

const WeedPack_BlackCards = require('./WeedPack_BlackCards');
const WeedPack_WhiteCards = require('./WeedPack_WhiteCards');
deckMap.set('WeedPack', 0);
map2.set('WeedPack', {white: WeedPack_WhiteCards.getWhiteDeck(), black: WeedPack_BlackCards.getBlackDeck()});

const WorldWideWeb_BlackCards = require('./WorldWideWeb_BlackCards');
const WorldWideWeb_WhiteCards = require('./WorldWideWeb_WhiteCards');
deckMap.set('WorldWideWeb', 0);
map2.set('WorldWideWeb', {white: WorldWideWeb_WhiteCards.getWhiteDeck(), black: WorldWideWeb_BlackCards.getBlackDeck()});


////////////////////////////////

var blackDeck;
var whiteDeck;

var cardCzar = false;
var blackCard = '';

var czarHand = [];
var judgeHand =[];

function setDeckMap(key, value) {
	deckMap.set(key, value);
}

function getDeckMap() {
	return deckMap;
}

function mergeSelectedDecks() {
	var tempBlack = [];
	var tempWhite = [];
	for (let key of getDeckMap().keys()) {
		if(getDeckMap().get(key) == true) {
			tempWhite = tempWhite.concat(map2.get(key).white);
			tempBlack = tempBlack.concat(map2.get(key).black);
		}

	}

	blackDeck = tempBlack;
	whiteDeck = tempWhite;

}

function getBlackDeck() {
	var i = blackDeck.length, k, temp;
	while(--i > 0) {
		k = Math.floor(Math.random() * (i+1));
		temp = blackDeck[k];
		blackDeck[k] = blackDeck[i];
		blackDeck[i] = temp;
	}
	//console.log("Black Cards Left: " +blackDeck.length);
	return blackDeck;
}

function getWhiteDeck() {
	var i = whiteDeck.length, k, temp;
	while(--i > 0) {
		k = Math.floor(Math.random() * (i+1));
		temp = whiteDeck[k];
		whiteDeck[k] = whiteDeck[i];
		whiteDeck[i] = temp;
	}
	//console.log("White Cards Left: " + whiteDeck.length);
	return whiteDeck;
}

function getGameState(user, users, gameusers) {
	const gamestate = {cardCzar, blackCard, czarHand, judgeHand, user, users, gameusers};
	return gamestate;
}

function nextCardCzar(currentCzar, roomUserList) { 
	var czar = false;
	const czarIndex = roomUserList.findIndex(user => user.username === currentCzar.username);
	var roomUserListLength = roomUserList.length;
	var nextCzarIndex = czarIndex+1;
	if(nextCzarIndex >= roomUserListLength) {
		nextCzarIndex = 0;
	}
	czar = roomUserList[nextCzarIndex];
	return czar;
}

// Push white card info to czarHand Array
function appendCzarHand(user, whiteCard) {
	czarHand.push({user, whiteCard});
}

// Push white card info to judge set
function appendCards(card) {
	judgeHand.push(card);
}

// Return the display cards
function getJudgeHand() {
	return judgeHand;
}

// Fisher-Yates Randomize In Place
function shuffleCards(cards) {
	var i = cards.length, k, temp;
	while(--i > 0) {
		k = Math.floor(Math.random() * (i+1));
		temp = cards[k];
		cards[k] = cards[i];
		cards[i] = temp;
	}
	return cards;
}

//Grab a top card from czar hand
function popCzarHand() {
	czarHand = shuffleCards(getCzarHand());
	return czarHand.pop();
}

function clearHand() {
	czarHand = [];
	judgeHand = [];
}

// Initialize White Cards
function initializeWhiteCards(roomusers,flag) {
	roomusers.forEach(user => {
		var i;
		for(i = 0; i < 10 ; i++) {
			if(flag) {
				//var whiteCard = whiteDeck.getWhiteDeck().pop();
				var whiteCard = getWhiteDeck().pop();
				user.whiteCards.push(whiteCard);
			}
		}
		if(!flag) {
			user.whiteCards = [];
		}
	});
	return roomusers;

}

// Replace White Cards
function replaceWhiteCards(roomUserList, czarHand) {
	czarHand.forEach(card => {
		var userIndex = roomUserList.findIndex(user => user.username === card.user.username);
		var cardIndex = roomUserList[userIndex].whiteCards.findIndex(whiteCard => whiteCard === card.whiteCard);
		//roomUserList[userIndex].whiteCards[cardIndex] = whiteDeck.getWhiteDeck().pop();
		roomUserList[userIndex].whiteCards[cardIndex] = getWhiteDeck().pop();

	});
	return roomUserList;

}

// Return the Card Czar's Hand
function getCzarHand() {
	return czarHand;
}

// Draw a black card
function drawBlackCard(flag) {
	if (flag) {
		//blackCard = blackDeck.getBlackDeck().pop();
		blackCard = getBlackDeck().pop();
	} else {
		blackCard = '';
	}
}

// Set the card czar to user
function setCardCzar(user) {
	cardCzar = user;
}

// Get current card czar
function getCardCzar() {
	return cardCzar;
}

module.exports = {
  setCardCzar,
  getCardCzar,
  drawBlackCard,
  initializeWhiteCards, 
  appendCzarHand,
  clearHand,
  nextCardCzar,
  replaceWhiteCards,
  popCzarHand,
  appendCards,
  getJudgeHand,
  getGameState,
  mergeSelectedDecks,
  setDeckMap,
  getDeckMap
};