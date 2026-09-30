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

let hasStoped = true;
let gameOver = false;

let bet = 20
let betEl=document.getElementById("bet-el");
betEl.textContent= "Current Bet: " + bet;


function getRandomCard(player) {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        if(player){
            if(sum <11)
                return 11
            else
                return 1
        }else{
            if(sumDealer <11)
                return 11
            else
                return 1
        }
    } else {
        return randomNumber
    }
}

function startGame() {
    if(hasStoped){
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
}

function renderGame() {
    if(Player.chips <=0)
        gameOver=true;

    if(!gameOver){
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
    }else
        messageEl.textContent = "Game over!\nYou have lost all your money!"
    
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
    if(!hasStoped && !gameOver){
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
}

function getWinner(player, dealer){
    if(player && !dealer){
        messageEl.textContent = "You have won!";
        Player.chips +=bet;
        if(hasBlackJack)
            messageEl.textContent = "You've got Blackjack!"
    }else if(!player && dealer){
        messageEl.textContent = "You have lost!";
        Player.chips -=bet;
    }else{
        messageEl.textContent = "It's a tie!";
        Player.chips +=bet/2;
    }
    hasStoped = true
    
    playerEl.textContent = Player.name + ": $" + Player.chips
}

function getBet(amount){
    if(amount === Infinity)
        bet = Player.chips;
    else
        bet = amount;

    betEl.textContent = "Current Bet: " + bet;
}