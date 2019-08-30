import "../scss/main.scss";

import Score from './scores';
let score = new Score;

// Generate computer choice.
const computerChoise = () => {
  let randomNum = Math.floor(Math.random() * 3);
  let choiceStack = ['rock', 'paper', 'scissors'];
  return choiceStack[randomNum];
};

// DOM elements.
const rock = document.getElementsByClassName('rock')[0];
const paper = document.getElementsByClassName('paper')[0];
const scissors = document.getElementsByClassName('scissors')[0];
const reset = document.getElementsByClassName('reset')[0];
const status = document.getElementsByClassName('status')[0];
const final = document.getElementsByClassName('final')[0];

// Switch button state.
const switchButtonState = () => {
  rock.disabled = !rock.disabled;
  paper.disabled = !paper.disabled;
  scissors.disabled = !scissors.disabled;
};

// Start game.
const startRound = (e) => {
  let comp = computerChoise();
  let user = e.target.innerHTML.toLowerCase();

  // Object with Player and PC choices.
  let result = {
    comp: comp,
    user: user
  };

  // Find a winner for each round.
  const chooseWinner = () => {
    if (result.comp === result.user) {
      score.addDraw();
      drawMessage();
    }
    else if (result.comp === 'rock') {
      if (result.user === 'paper') {
        score.addWin();
        winMessage();
      }
      else if (result.user === 'scissors') {
        score.addLose();
        loseMessage();
      }
    }
    else if (result.comp === 'paper') {
      if (result.user === 'rock') {
        score.addLose();
        loseMessage();
      }
      else if (result.user === 'scissors') {
        score.addWin();
        winMessage();
      }
    }
    else {
      if (result.user === 'rock') {
        score.addWin();
        winMessage();
      }
      else if (result.user === 'paper') {
        score.addLose();
        loseMessage();
      }
    }
  };

  // Messages for each round.
  function winMessage (){
    status.innerHTML =
      `<span class="round">Round ${score.getRound()}</span>.  
      <span class="player">${result.user}</span> vs 
      <span class="player">${result.comp}</span>, You’ve WON!`;
  };
  function loseMessage() {
    status.innerHTML =
      `<span class="round">Round ${score.getRound()}</span>. 
      <span class="player">${result.user}</span> vs 
      <span class="player">${result.comp}</span>, You’ve LOSE!`;
  };
  function drawMessage() {
    status.innerHTML =
      `<span class="round">Round ${score.getRound()}</span>. 
      <span class="player">${result.user}</span> vs 
      <span class="player">${result.comp}</span>, DRAW!`;
  };


  // Get total result. After 3 rounds.
  const defineWinner = () => {
    const win = score.getWins();
    const lose = score.getLose();
    let info = '';
    if (win === lose) {
      info = 'Try again for win.';
    } else if (win > lose) {
      info = 'Congrats, You Won!';
    } else {
      info = 'You Lose :(';
    }

    // Message patterns.
    const stats = `Wins: ${score.getWins()} <br> 
                  Lose: ${score.getLose()} <br>`;
    const resultMessage = `<span class="final">${info}</span>`;
    final.innerHTML = stats +  resultMessage;
  };

  // Three round for game.
  if (score.getRound() < 3 && score.getRound() !== 2) {
    score.addRound();
    chooseWinner();
  }
  else {
    score.addRound();
    chooseWinner();
    switchButtonState();
    defineWinner();
  }

};

// Reset game.
const resetGame = () => {
  score.reset();
  rock.disabled = false;
  paper.disabled = false;
  scissors.disabled = false;
  status.innerHTML = '';
  final.innerHTML = '';
};


rock.onclick = startRound;
scissors.onclick = startRound;
paper.onclick = startRound;
reset.onclick = resetGame;