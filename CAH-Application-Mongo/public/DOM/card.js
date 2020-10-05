function getCardBorder(type) {
	const cardBorderDiv = document.createElement('div');
	
	var textColor;
	var bgColor;
	if (type === 'light'){
		textColor = "text-black"; 
		bgColor = "border-dark";
	} else if (type === 'dark') {
		textColor = "text-white"; 
		bgColor = "bg-dark";
	} else {
		textColor = "text-dark"; 
		bgColor = "border-dark";
		cardBorderDiv.style.borderWidth = `${type}px`;	
	}
	cardBorderDiv.classList.add(
		"card", 
		textColor, 
		bgColor, 
		"mr-3");
	cardBorderDiv.style.height = "13rem";
	cardBorderDiv.style.minWidth = "8rem";
    cardBorderDiv.style.maxWidth = "8rem";
	return cardBorderDiv;
}

function getCardBody(card) {
	const cardBody = document.createElement('div');
	cardBody.classList.add('card-body');
	//
	const cardText = document.createElement('h4');
	cardText.classList.add('card-title');
	cardText.style.fontFamily = "Helvetica, Neue, Bold";
	cardText.style.fontSize = "small";
	//
	if(typeof card === 'object') {
		card = card.whiteCard;
	}
	cardText.innerHTML = `${card}`;
	cardBody.appendChild(cardText);
	//
	const altCardText = document.createElement('p');
	altCardText.classList.add('card-text');
	altCardText.innerHTML = '';
	cardBody.appendChild(altCardText);
	//
	return cardBody;
}

function getCardHeader() {
	const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
	return cardHeader;
}

function getCardButton(czar, card, user, buttonType) {
    var button0 = document.createElement('p');
    switch(buttonType) {
        case 'play':
            if(getClientUsername() != czar.username) {
                button0 = getButtonText(buttonType);
                button0.addEventListener('click', () => {
                    sendWhiteCardToServer(card);
                    removePlayButton(czar, user);	
                });
            }
            break;
        case 'select':
            if(getClientUsername() == czar.username) {
                button0 = getButtonText(buttonType);
                button0.addEventListener('click', () => {
                    sendWinnerInfoToServer(card);
                    setTimeout(() => {
                        clearHand();
                    },
                        3000
                    )
                });
            }
            break;
        case 'next':
            if(getClientUsername() == czar.username) {
                button0 = getButtonText(buttonType);
                button0.addEventListener('click', () => {
                    drawBlackCard();
                });
            } 
            break;
        case 'client':
            button0 = document.createElement('p');
            button0.innerHTML = `<i class="fas fa-gavel"></i>`;
            break;
        case 'flip':
            button0 = getButtonText(buttonType);
            button0.addEventListener('click', () => {
                turnCzarCard(user, card, czar);
            });
	}
    
    return button0;
}

function getButtonText(type) {
    const button = document.createElement('button');
    button.classList.add("nav-link");
    button.href ="#";

    var text = '';
    var icon;

    switch(type) {
        case 'play':
            icon =`<i class="fas fa-play"></i>`;
            break;
        case 'select':
            icon = `<i class="fas fa-gavel"></i>`;
            break;
        case 'next':
            icon = `<i class="fas fa-forward"></i>`;
            break;
        case 'flip':
            icon = `<i class="fas fa-play"></i>`;
            break;
        default:
    }

    button.innerHTML = `${icon} ${text}`;
    return button;
}

function updateCardButton(list, czar, czarHand, users, cardB, flag) {
	if(flag) {
		if(list.length != 0){
			getInfoDivText(list);
		} else {
			infoDiv.innerHTML = ``;
			cardB = getFlipButton(false,czar,cardB,czarHand, users);
		}
	} else {
		if(list.length != 0){
			cardB = getFlipButton(true,czar,cardB, czarHand, users);
		} else {
			getInfoDivText(list);
		}		
	}
	return cardB;
}

function getFlipButton(flag,czar,cardB, czarHand, users) {
	if(getClientUsername() != czar.username){
		infoDiv.innerHTML = `Waiting for ... ${czar.username}<i class="fas fa-gavel"></i> `;
	} else {
		if(flag) {infoDiv.innerHTML = ``;}
		const cardButton = getCardButton(czar, czarHand, users, 'flip');//
		cardB.appendChild(cardButton);
	}
	return cardB;
}

function getInfoDivText(list) {
	infoDiv.innerHTML = "Waiting for";
	list.forEach(name => {
		infoDiv.innerHTML+=` ... ${name} `;
	});
}

function buildCard(bgColor, czar, card, user, buttonType) {
	const cardBorder = getCardBorder(bgColor);
	const cardHeader = getCardHeader();
	const cardButton = getCardButton(czar, card, user, buttonType);
	const cardBody = getCardBody(card);
	cardHeader.appendChild(cardButton);
	cardBorder.appendChild(cardBody);
	cardBorder.appendChild(cardHeader);
	return cardBorder;
}