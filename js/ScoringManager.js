class ScoringManager {
  constructor() {
    this.scoringElement = document.getElementById('scoring');
    this.counterElement = document.getElementById('movesCounter');
    this.moves = 0;
  }

  getMoves() {
    return this.moves;
  }

  getAmountOfStars() {
    return 3 - Math.floor(this.moves / 10);
  }

  initScoring() {
    this.moves = 0;
    this.setScoringOnDeck();
  }

  setScoringOnDeck() {
    this.counterElement.innerHTML = this.moves;
    this.cleanUpScoring();
    for (let i = 1; i <= this.getAmountOfStars(); i++) {
      this.scoringElement.appendChild(this.getStarElement());
    }
  }

  increaseMovesByOne() {
    this.moves++;
    this.setScoringOnDeck();
  }

  getStarElement() {
    const star = document.createElement('li');
    const starIcon = document.createElement('i');
    starIcon.setAttribute('class', 'fa fa-star');
    star.appendChild(starIcon);
    return star;
  }

  cleanUpScoring() {
    while(this.scoringElement.hasChildNodes()) {
      this.scoringElement.removeChild(this.scoringElement.firstChild);
    }
  }
}
