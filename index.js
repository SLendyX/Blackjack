let Player = {
    name: "Radu",
    chips: 200
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

let dealerEl = document.getElementById("dealer-el");
let dealerCards = [];
let sumDealer = 0;

let sumDealerEl = document.getElementById("sumdealer-el")

let hasStoped;




function getRandomCard(player) {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        if(sum <11 && player)
            return 11
        else
            return 1
        if(sumDealer <11 && !player)
            return 11
        else
            return 1
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    hasBlackJack = false
    hasStoped = false;
    sum = 0, sumDealer = 0;
    let firstCard = getRandomCard(true)
    cards = [firstCard]
    sum = firstCard
    let secondCard = getRandomCard(true)
    cards.push(secondCard)
    sum+=secondCard

    let card = getRandomCard(false);
    dealerCards = [card];
    sumDealer=card;

    renderGame()
}

function renderGame() {
    playerEl.textContent = Player.name + ": $" + Player.chips

    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    dealerEl.textContent = "Dealer's Cards: ";
    for(let i=0; i<dealerCards.length;i++){
        dealerEl.textContent += dealerCards[i]+ " ";
    }
    
    sumEl.textContent = "Sum: " + sum
    sumDealerEl.textContent = "Sum: " + sumDealer;

    if (sum <= 20) {
        messageEl.textContent = "Do you want to draw a new card?"
    } else if (sum === 21) {
        hasBlackJack = true;
        dealerDraw();
    } else {
        message = "You're out of the game!"
        isAlive = false
        getWinner(false, true);
    }
    
}


function newCard() {
    if (isAlive === true && hasBlackJack === false && hasStoped == false) {
        let card = getRandomCard(true)
        sum += card
        cards.push(card)
        renderGame()        
    }
}


function dealerDraw(){
    while(sumDealer <17){
        let card = getRandomCard(false);
        sumDealer+=card;
        dealerCards.push(card);
    }

    dealerEl.textContent = "Dealer's Cards: ";
    for(let i=0; i<dealerCards.length;i++){
        dealerEl.textContent+=dealerCards[i] + " ";
    }

    sumDealerEl.textContent = "Sum: " + sumDealer;

    if(!hasStoped && isAlive){ 

        hasStoped = true;
        if(sumDealer <=21){
            if(sum > sumDealer)
                getWinner(true, false); 
            else if(sum < sumDealer)
                getWinner(false, true);
            else
                getWinner(false, false);
        }else
            getWinner(true, false);

    }
}

function getWinner(player, dealer){
    if(player && !dealer){
        messageEl.textContent = "You have won!";
        Player.chips +=10;
        if(hasBlackJack)
            messageEl.textContent = "You've got Blackjack!"
    }else if(!player && dealer){
        messageEl.textContent = "You have lost!";
        Player.chips -=10;
    }else{
        messageEl.textContent = "It's a tie!";
        Player.chips +=5;
    }
    
    
}