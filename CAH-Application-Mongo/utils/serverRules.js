const ruleMap = new Map();
const serverRuleMap = new Map();

ruleMap.set('WhitecardReboot', 0);
serverRuleMap.set('WhitecardReboot', 0);

function setRuleMap(key, value) {
	ruleMap.set(key, value);
}

function getRuleMap() {
	return ruleMap;
}

function isWCRebootOptionEnabled() {
    return ruleMap.get('WhitecardReboot');
}

module.exports = {
    setRuleMap,
    getRuleMap,
    isWCRebootOptionEnabled
  };