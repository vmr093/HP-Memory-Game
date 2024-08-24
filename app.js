// Define Consts

const cards = document.querySelectorAll('.memory-card');
const playerLivesCount = document.querySelector('span');
let playerlives = 10;
playerLivesCount.textContent = playerlives
const message=document.querySelector("#message")


// Define Variables

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Define Functions

function flipCard() {
  if (lockBoard) return;
  
  if (this === firstCard) return;

  this.classList.add('flip');

   // When user clicks the first card
  if (!hasFlippedCard) {    
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}
// Looking to see if the cards match by looking at the framework of both cards
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards(); // terinary operator allows to write if else statment in one line
}
// If it is a match, need to remove the event listener so they arent clickable anymore
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}
// if it is not a match, need to flip the cards back around
function unflipCards() {
  lockBoard = true; // to make sure no other cards can be selected until the 2 flip back
  setTimeout(() => { // allows us to see the flipping and the cards
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
}, 1500); 

playerlives--;
playerLivesCount.textContent = playerlives;
if(playerlives <=0){
  playerlives = 0;
  message.textContent = 'No more Lives! Try again'
  document.querySelectorAll(".memory-card").forEach((card) => {
    card.classList.remove("flip"); //will make all cards turn back down
  });
  cardFlipped = false;
  lock = false
  firstCard = null;
  secondCard = null;
  }
}


function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12); // returns a random number. Need 11 numbers so x by 12
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

