document.addEventListener('DOMContentLoaded', () => {
  const cardElements = document.querySelectorAll('.memory-card');
  const resetButton = document.getElementById('resetButton');
  const messageElement = document.getElementById('message');
  const livesCountElement = document.querySelector('.playerLivesCount');
  
  let lives = 10;
  let hasFlippedCard = false;
  let firstCard, secondCard;
  let lockBoard = false;
  
  function shuffleCards() {
      cardElements.forEach(card => {
          let randomPos = Math.floor(Math.random() * cardElements.length);
          card.style.order = randomPos;
      });
  }
  
  function flipCard() {
      if (lockBoard || this === firstCard) return;

      this.classList.add('flip');
      if (!hasFlippedCard) {
          // First click
          hasFlippedCard = true;
          firstCard = this;
          return;
      }

      // Second click
      hasFlippedCard = false;
      secondCard = this;

      checkForMatch();
  }

  function checkForMatch() {
      if (firstCard.dataset.framework === secondCard.dataset.framework) {
          disableCards();
      } else {
          unflipCards();
      }
  }

  function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      resetBoard();
  }

  function unflipCards() {
      lockBoard = true;
      setTimeout(() => {
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');
          resetBoard();
          updateLives(-1); 
      }, 1000);
  }

  function updateLives(amount) {
      lives += amount;
      livesCountElement.textContent = lives;

      if (lives <= 0) {
          messageElement.textContent = 'Game Over! Click Reset to try again.';
          cardElements.forEach(card => {
              card.removeEventListener('click', flipCard);
          });
      }
  }

  function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
  }

  function initializeGame() {
      lives = 10;
      livesCountElement.textContent = lives;
      shuffleCards();
      cardElements.forEach(card => {
          card.classList.remove('flip');
          card.addEventListener('click', flipCard);
      });
      messageElement.textContent = '';
  }

  function resetGame() {
      initializeGame();
  }

  resetButton.addEventListener('click', resetGame);

  
  initializeGame();
});
