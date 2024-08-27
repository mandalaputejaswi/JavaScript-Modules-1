const circle1 = document.querySelector('.circle1');
const circle2 = document.querySelector('.circle2');
const circle3 = document.querySelector('.circle3');
const gameContainer = document.querySelector('.game-container');
const gradientContainer1 = document.querySelector('.gradient-container1');
const gradientContainer2 = document.querySelector('.gradient-container2');
const computerScoreElement = document.querySelector('#computer-score');
const userScoreElement = document.querySelector('#user-score');
const resultMessage = document.querySelector('#result-message');
const userResultCircle = document.querySelector('#user-result-circle');
const computerResultCircle = document.querySelector('#computer-result-circle');
const circleContainer = document.querySelector('.circle-container');
const resultContainer = document.querySelector('#result-container');
const playAgainButton = document.querySelector('#play-again');
const againstPcMessage = document.querySelector('#against-pc-message');
const nextButton = document.querySelector('#next-button');
const rulesButton = document.querySelector('#rules-button');
const rulesCard = document.querySelector('#rules-card');
const closeButton = document.querySelector('#close-button');
const nextPage = document.querySelector('#next-page');
const nextPlay = document.querySelector('.next-play');
console.log(parseInt(localStorage.getItem('userScore'))!= null, parseInt(localStorage.getItem('userScore')));
let userScore = parseInt(localStorage.getItem('userScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
console.log(userScore, computerScore);
// Function to update the score display
function updateScoreDisplay() {
  userScoreElement.textContent = userScore;
  computerScoreElement.textContent = computerScore;
}

// Update the score display on page load
updateScoreDisplay();

function resetScores() {
  userScore = 0;
  computerScore = 0;
  localStorage.setItem('userScore', userScore);
  localStorage.setItem('computerScore', computerScore);
  updateScoreDisplay(); // Update the score display on the page
}

// Initialize scores based on session status
window.addEventListener('load', () => {
  if (isPageClosed()) {
    // Reset scores if the page was closed and reopened
    resetScores();
    sessionStorage.removeItem('closed'); // Clear the flag
  } else {
    // Update the score display if not closed
    updateScoreDisplay();
  }
});

// Set the close flag in session storage when the user is about to leave the page
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('closed', 'true');
});

nextPlay.addEventListener('click', () => {
  gameContainer.style.display = 'block';
  circleContainer.style.display = 'block';
  resultContainer.style.display = 'none';
  nextButton.style.display = 'none';
  gradientContainer1.classList.remove("gradient-class");
  gradientContainer2.classList.remove("gradient-class");

  userScore = 0;
  computerScore = 0;
  localStorage.setItem('userScore', userScore);
  localStorage.setItem('computerScore', computerScore);
  updateScoreDisplay(); 

});

// Hide the rules card
closeButton.addEventListener('click', () => {
  rulesCard.style.display = 'none';
});

nextButton.addEventListener('click', () => {
  gameContainer.style.display = 'none';
  rulesCard.style.display = 'none';
  nextPage.style.display = 'block'
});

function rulesButtons () {
  console.log("hello");
  rulesCard.style.display = 'block';
}

// Function to get a random choice for the computer
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return 'TIE UP';
  }

  if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'scissors' && computerChoice === 'paper') ||
    (userChoice === 'paper' && computerChoice === 'rock')
  ) {
    return 'YOU WIN';
  } else {
    return 'YOU LOST';
  }
}

// Helper function to get result class based on choice
function getResultClass(choice) {
  if (choice === 'rock') return 'result-rock';
  if (choice === 'scissors') return 'result-scissors';
  if (choice === 'paper') return 'result-paper';
}

// Function to update result display
function updateResultDisplay(userChoice, computerChoice, result) {
  const choiceImages = {
    rock: 'rock.png',
    paper: 'paper.png',
    scissors: 'scissor.png'
  };

  // Reset circles
  userResultCircle.className = 'result-circle'; // Remove all classes
  computerResultCircle.className = 'result-circle'; // Remove all classes

  // Add the appropriate class based on choice
  userResultCircle.classList.add(getResultClass(userChoice));
  computerResultCircle.classList.add(getResultClass(computerChoice));

  // Set the images for result circles
  userResultCircle.innerHTML = `<img src="${choiceImages[userChoice]}" class="rock-image" alt="${userChoice}-image" />`;
  computerResultCircle.innerHTML = `<img src="${choiceImages[computerChoice]}" class="rock-image" alt="${computerChoice}-image" />`;
  resultMessage.textContent = result;

  // Show "Against PC" message and "Play Again" button
  if(result === "TIE UP") {
    againstPcMessage.style.display = 'none';
    playAgainButton.textContent = 'REPLAY';
    playAgainButton.style.display = 'block';
    gradientContainer1.classList.remove("gradient-class");
    gradientContainer2.classList.remove("gradient-class");
  }
  else {
    if(result === "YOU WIN") {
      gradientContainer2.classList.remove("gradient-class");
    }
    else{
      gradientContainer1.classList.remove("gradient-class");
    }
    againstPcMessage.style.display = 'block';
    playAgainButton.textContent = 'PLAY AGAIN';
    playAgainButton.style.display = 'block';
  }

  // Hide circle container and show result container
  circleContainer.style.display = 'none';
  resultContainer.style.display = 'flex';
}

// Function to handle the game
function handleClick(userChoice) {
  const computerChoice = getComputerChoice();
  const result = determineWinner(userChoice, computerChoice);

  // Update result display
  updateResultDisplay(userChoice, computerChoice, result);

  // Update scores
  if (result === 'YOU WIN') {
    userScore++;
    localStorage.setItem('userScore', userScore);
    userScoreElement.textContent = userScore;
    gradientContainer1.classList.add('gradient-class');
    nextButton.style.display = 'block'; // Show next button
  } else if (result === 'YOU LOST') {
    computerScore++;
    localStorage.setItem('computerScore', computerScore); 
    computerScoreElement.textContent = computerScore;
    gradientContainer2.classList.add('gradient-class');
    nextButton.style.display = 'none'; // Hide next button
  }
}


// Event listeners for user choices
circle1.addEventListener('click', () => handleClick('rock'));
circle2.addEventListener('click', () => handleClick('scissors'));
circle3.addEventListener('click', () => handleClick('paper'));

// Event listener for "Play Again" button
playAgainButton.addEventListener('click', () => {
  // Show circle container and hide result container
  circleContainer.style.display = 'flex';
  resultContainer.style.display = 'none';
  
  // Hide "Play Again" button and "Against PC" message
  playAgainButton.style.display = 'none';
  againstPcMessage.style.display = 'none';
  nextButton.style.display = 'none';

  // Clear result circles
  userResultCircle.innerHTML = '';
  computerResultCircle.innerHTML = '';
});

