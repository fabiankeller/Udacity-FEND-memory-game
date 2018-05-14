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
    // 3 stars => x < 14, 2 stars => x < 21, 1 star => x < 28, 0 stars => x >= 28
    return Math.max(0, 3 - Math.max(0, Math.floor((this.moves - 7) / 7)));
  }

  initScoring() {
    this.moves = 0;
    this.setScoringOnDeck();
  }

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
