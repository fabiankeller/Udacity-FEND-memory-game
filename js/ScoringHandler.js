class ScoringHandler {
  constructor() {
    this.scoringElement = document.getElementById('scoring');
    this.counterElement = document.getElementById('movesCounter');
    this.moves = 0;
  }

  getMoves() {
    return this.moves;
  }

  getAmountOfStars() {
    return Math.max(0, 3 - Math.floor((this.moves - 7) / 7));

    // if (this.moves < 14) {
    //   return 3;
    // } else if (this.moves < 20) {
    //   return 2;
    // } else if (this.moves < 25) {
    //   return 1;
    // } else {
    //   return 0;
    // }
    // return Math.max(0, 3 - Math.floor(this.moves / 10));
  }

  initScoring() {
    this.moves = 0;
    this.setScoringOnDeck();
  }

  setScoringOnDeck() {
    this.counterElement.innerHTML = this.moves;
    this.cleanUpScoring();
    for (let i = 1; i <= this.getAmountOfStars(); i++) {
      this.scoringElement.appendChild(this.getStarElement(true));
    }
    for (let i = 0; i < (3 - this.getAmountOfStars()); i++) {
      this.scoringElement.appendChild(this.getStarElement(false));
    }
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
