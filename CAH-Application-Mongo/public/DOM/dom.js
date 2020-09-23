const roomName = document.getElementById('room-name');

const blackCardDiv = document.querySelector('.blackCardDiv');
const czarCardsDiv = document.querySelector('.czarCardsDiv');
const whiteCardsDiv = document.querySelector('.whiteCardsDiv');

const roomUserTable = document.querySelector('.userlist-table');

const chatMessages = document.querySelector('.chat-messages');

// Add room name to DOM
function outputRoomName(room) {
	roomName.innerText = room;
}

// Add black card to DOM
function outputBlackCard(blackCard) {
	blackCardDiv.innerHTML = ``;
	if(blackCard != false) {
		const div1 = document.createElement('div');
		div1.classList.add("card", "text-white", "bg-dark", "mb-3");
		div1.style.height = "20rem";
		//
		const div2 = document.createElement('div');
		div2.classList.add('card-header');
		div2.innerHTML = "Shared Resource";
		//div1.appendChild(div2);
		//
		const div3 = document.createElement('div');
		div3.classList.add('card-body');
		//
		const h4 = document.createElement('h4');
		h4.classList.add('card-title');
		h4.style.fontFamily = "Helvetica, Neue, Bold";
		h4.innerHTML = `${blackCard}`;
		div3.appendChild(h4);
		//
		const p = document.createElement('p');
		p.classList.add('card-text');
		p.innerHTML = 'example black card';
		div3.appendChild(p);
		//
		div1.appendChild(div3);
		div1.appendChild(div2);
		document.querySelector('.blackCardDiv').appendChild(div1);
	}
}

function outputCzarHand(czarHand, czar, winner) {
	czarCardsDiv.innerHTML = ``;
	czarHand.forEach(card => {
		if(winner == false || card.whiteCard == winner.whiteCard){
			const div1 = document.createElement('div');
			div1.classList.add("card", "text-black", "border-dark", "mr-3");
			if(card.whiteCard == winner.whiteCard) {
				div1.classList.add("bg-success");
			}
			div1.style.height = "20rem";
			div1.style.minWidth = "15rem";
			//
			const div2 = document.createElement('div');
			div2.classList.add('card-header');
			//
			const div3 = document.createElement('div');
			div3.classList.add('card-body');
			//
			const h4 = document.createElement('h4');
			h4.classList.add('card-title');
			h4.style.fontFamily = "Helvetica, Neue, Bold";
			h4.innerHTML = `${card.whiteCard}`;
			div3.appendChild(h4);
			//
			const p = document.createElement('p');
			p.classList.add('card-text');
			if(card.whiteCard == winner.whiteCard) {
				p.innerHTML = `${winner.user.username} wins!`;
			} else {
				p.innerHTML = 'placeholder';
			}
			div3.appendChild(p);
			div1.appendChild(div3);	
			if(username == czar.username) {
				const playCard = document.createElement('button');
				playCard.classList.add("nav-link");
				playCard.href ="#";
				playCard.innerHTML = `<i class="fas fa-play"></i> Select`;
				playCard.addEventListener('click', () => {
					sendWinnerInfoToServer(czarHand, card);
					setTimeout(()=>{
						clearCzarHand();
					},
						3000
					)
				});
				div2.appendChild(playCard);
				
			}
			div1.appendChild(div2);
			document.querySelector('.czarCardsDiv').appendChild(div1);
		}
	});
}

// Add white cards to DOM
function outputWhiteCards(users, czar, flag) {
	whiteCardsDiv.innerHTML = ``;
	if(flag) {
		users.forEach(user => {
			if(user.username == username) {
				user.whiteCards.forEach(whiteCard=>{
					const div1 = document.createElement('div');
					div1.classList.add("card", "text-black", "border-dark", "mr-3");
					div1.style.height = "20rem";
					div1.style.minWidth = "15rem";
					//
					const div2 = document.createElement('div');
					div2.classList.add('card-header');

					//
					const div3 = document.createElement('div');
					div3.classList.add('card-body');
					//
					const h4 = document.createElement('h4');
					h4.classList.add('card-title');
					h4.style.fontFamily = "Helvetica, Neue, Bold";
					h4.innerHTML = `${whiteCard}`;
					div3.appendChild(h4);
					//
					const p = document.createElement('p');
					p.classList.add('card-text');
					p.innerHTML = 'placeholder';
					div3.appendChild(p);
					//
					div1.appendChild(div3);
					
					if(username != czar.username) {//!=
						const playCard = document.createElement('button');
						playCard.classList.add("nav-link");
						playCard.href ="#";
						playCard.innerHTML = `<i class="fas fa-play"></i> Play Card`;
						playCard.addEventListener('click', () => {
							// Send Card to Server
							sendWhiteCardToServer(whiteCard);
							removePlayButton(user);
							
						});
						div2.appendChild(playCard);
						
					}
					
					div1.appendChild(div2);
					document.querySelector('.whiteCardsDiv').appendChild(div1);
				});
			}
		});
	}
}

// Remove play button from DOM
function removePlayButton(user) {
	whiteCardsDiv.innerHTML = ``;
	user.whiteCards.forEach(whiteCard=>{
		const div1 = document.createElement('div');
		div1.classList.add("card", "text-black", "border-dark", "mr-3");
		div1.style.height = "20rem";
		div1.style.minWidth = "15rem";
		//
		const div2 = document.createElement('div');
		div2.classList.add('card-header');

		//
		const div3 = document.createElement('div');
		div3.classList.add('card-body');
		//
		const h4 = document.createElement('h4');
		h4.classList.add('card-title');
		h4.style.fontFamily = "Helvetica, Neue, Bold";
		h4.innerHTML = `${whiteCard}`;
		div3.appendChild(h4);
		//
		const p = document.createElement('p');
		p.classList.add('card-text');
		p.innerHTML = 'placeholder';
		div3.appendChild(p);
		//
		div1.appendChild(div3);
		
		div1.appendChild(div2);
		document.querySelector('.whiteCardsDiv').appendChild(div1);
	});
}

// Show each room user in the room user table
function outputRoomUserTable(roomUserList, czar) {
    // Clear the outdated table
    roomUserTable.innerHTML = '';
    
    // Build a table row for each user in the room
	roomUserList.forEach(user=>{
	const tr = document.createElement('tr');
	tr.classList.add('table-light');
    
    // Indicate who is the current card czar
	const th = document.createElement('th');
	th.setAttribute("scope","row");
	if(user.username == czar.username) {
		th.innerHTML = `<i class="fas fa-gavel"></i>`;
	} else {
		th.innerHTML = ``;
	}
    tr.appendChild(th);
    
	//  Append username and point data to the table row
	const tdName = document.createElement('td');
	tdName.innerHTML = `${user.username}`;
	tr.appendChild(tdName);
	const tdPoints = document.createElement('td');
	tdPoints.innerHTML = `${user.points}`;
	tr.appendChild(tdPoints);

    //  Append table row to the userlist table
	document.querySelector('.userlist-table').appendChild(tr);
	});  
}

// Output message to DOM
function outputMessage(message) {
	const div = document.createElement('div');
	div.classList.add('message');
	//message.time not used
	div.innerHTML = `<p style="padding:5px;" class="meta card border-info mb-3"><b>${message.username}:</b> ${message.text}</p>`;
	document.querySelector('.chat-messages').appendChild(div);
}