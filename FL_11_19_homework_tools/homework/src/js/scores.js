// Calculate game process.
class Score {
  constructor () {
    this.score = {
      win: 0,
      lose: 0,
      draw: 0,
      round: 0,
    };
  }

  getRound(){
    return this.score.round;
  }

  addRound(){
    this.score.round++;
  }

  addWin() {
    this.score.win++;
  }

  addLose() {
    this.score.lose++;
  }

  addDraw() {
    this.score.draw++;
  }

  getWins() {
    return this.score.win;
  }

  getLose() {
    return this.score.lose;
  }

  reset() {
    this.score = {
      win: 0,
      lose: 0,
      draw: 0,
      round: 0,
    };
  }

}

export default Score;