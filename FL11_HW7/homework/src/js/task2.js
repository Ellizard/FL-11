const reset = 0;
const reward1 = 100;
const reward2 = 50;
const reward3 = 25;
const rewardCounter = 2;
const rangeCounter = 4;
const defaultMaxRange = 8;
const messages = {
  askMessage: 'Do you want to play a game?',
  abortGame: 'You did not become a billionaire, but can.',
  thanks: 'Thank you for your participation. Your prize is: ',
  currency: '$',
  playAgain: 'Do you want to play again?',
  totalPrice: 'Total price: ',
  chooseNumber: 'Choose a roulette pocket number from 0 to ',
  attemptsLeft: 'Attempts left: ',
  possiblePrize: 'Possible prize on current attempt: ',
  continue: ' Do you want to continue?',
  congratulation: 'Congratulation, you won!\nYour prize is: '
};

let minRange = 0;
let maxRange = 8;
let targetValue = 0;
let userMaxTry = 3;
let userInput = '';
let totalPrice = 0;
let winOnStep = [reward1, reward2, reward3];
let continuePlay = false;
let playAGame = confirm(messages.askMessage);

// Change flag for start game.
if (!playAGame) {
  alert(messages.abortGame);
}

// Start main loop.
while (playAGame) {
  let userTry = reset;

  // Generate a win number.
  targetValue = Math.floor(Math.random() * maxRange + minRange);

  //User try logic.
  for (let i = userTry; i < userMaxTry; i++) {
    userInput = +prompt(
      messages.chooseNumber + maxRange + '\n' +
      messages.attemptsLeft + (userMaxTry - i) + '\n' +
      messages.totalPrice + totalPrice + messages.currency + '\n' +
      messages.possiblePrize + winOnStep[i] + messages.currency
    );

    // Incorrect Answer.
    if (userInput !== targetValue) {
      userTry++;

      // Detect last step.
      if (userTry === userMaxTry) {
        // Change flag to ent of the game.
        playAGame = false;
        // Show user message.
        alert(messages.thanks + totalPrice + messages.currency);
        // Ask for start a new game.
        playAGame = confirm(messages.playAgain);

        // Start new game or finish current.
        if (playAGame) {
          // Start new game.
          userTry = reset;
          // Reset total price and leave current loop.
          totalPrice = reset;
          maxRange = defaultMaxRange;
          winOnStep = [reward1, reward2, reward3];
          break;
        } else {
          // Exit from game.
          userTry = userMaxTry;
          playAGame = false;
          break;
        }
      }
    }

    // Correct answer.
    if (userInput === targetValue) {
      // Show congrats message and ask for play again.
      totalPrice += winOnStep[i];
      continuePlay = confirm(messages.congratulation
        + totalPrice + messages.currency + messages.continue);

      // If user want to proceed the game.
      if (continuePlay) {
        // Reset user try.
        userTry = reset;
        // Reset loop counter.
        i = userMaxTry;
        // Increase max number range.
        maxRange += rangeCounter;
        // Increase reward for each try.
        for(let i = 0; i < winOnStep.length; i++) {
          winOnStep[i] = winOnStep[i] * rewardCounter;
        }
      } else {
        // Message for incorrect answer.
        alert(messages.thanks + totalPrice + messages.currency);
        // Ask for play again.
        playAGame = confirm(messages.playAgain);

        // New game logic.
        if (playAGame) {
          // Reset total price and leave current loop.
          totalPrice = reset;
          maxRange = defaultMaxRange;
          winOnStep = [reward1, reward2, reward3];
          break;
        } else {
          // Ends the game.
          userTry = userMaxTry;
          playAGame = false;
          break;
        }
      }
    }
  }
}
