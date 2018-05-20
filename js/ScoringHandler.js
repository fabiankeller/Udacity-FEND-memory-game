/*
 * This handler takes care of updating the scoring panel.
 * This includes updateing the amount of stars and the timer.
 */
class ScoringHandler {
  constructor() {
    this.scoringElement = document.getElementById('scoring');
    this.counterElement = document.getElementById('movesCounter');
    this.timerElement = document.getElementById('timer');
  }

  getMoves() {
    return this.moves;
  }

  getAmountOfStars() {
    // 3 stars => x < 14, 2 stars => x < 21, 1 star => x < 28, 0 stars => x >= 28
    return Math.max(0, 3 - Math.max(0, Math.floor((this.moves - 7) / 7)));
  }

  initScoring() {
    this.timer = 0;
    this.moves = 0;
    this.setScoringOnDeck();
    this.timerElement.innerHTML = this.formatTimer();
    this.timerActive = false;
  }

  /*
   * Updates amount of filled and not filled stars on page.
   */
  setScoringOnDeck() {
    this.counterElement.innerHTML = this.moves;
    this.cleanUpScoring();
    const amountOfStars = this.getAmountOfStars();
    for (let i = 1; i <= amountOfStars; i++) {
      this.scoringElement.appendChild(this.getStarElement(true));
    }
    for (let i = 0; i < (3 - amountOfStars); i++) {
      this.scoringElement.appendChild(this.getStarElement(false));
    }
  }

  startTimer() {
    this.timerActive = true;
    setTimeout(this.increaseTimer.bind(this), 1000);
  }

  stopTimer() {
    this.timerActive = false;
  }

  increaseTimer() {
    if (this.timerActive) {
      this.timer += 1;
      this.timerElement.innerHTML = this.formatTimer();
      setTimeout(this.increaseTimer.bind(this), 1000);
    }
  }

  /*
   * Returns timer in format '01 Min 09 Sec'
   */
  formatTimer() {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    let time = '';
    time += (minutes < 10 ? '0' : '') + minutes + ' Min ';
    time += (seconds < 10 ? '0' : '') + seconds + ' Sec'
    return time;
  }

  isTimerStarted() {
    return this.timerActive;
  }

  increaseMovesByOne() {
    this.moves++;
    this.setScoringOnDeck();
  }

  getStarElement(filled) {
    const star = document.createElement('li');
    const starIcon = document.createElement('i');
    const starStyle = filled ? 'fas' : 'far';
    starIcon.setAttribute('class', starStyle + ' fa-star');
    star.appendChild(starIcon);
    return star;
  }

  cleanUpScoring() {
    while(this.scoringElement.hasChildNodes()) {
      this.scoringElement.removeChild(this.scoringElement.firstChild);
    }
  }
}
