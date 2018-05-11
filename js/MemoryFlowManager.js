class MemoryFlowManager {
  constructor(deckId) {
    this.deck = document.getElementById(deckId);
    this.solvedMessage = document.getElementById('memorySolved');
    this.successMessage = document.getElementById('successMessage');
    this.scoringManager = new ScoringManager();
  }

  initFlowManager() {
    this.openCards = [];
    this.matchedCards = [];
    this.displayDeck();
    this.hideSuccessMessage();
    this.scoringManager.initScoring();
    this.initCardEventListeners();
  }

  initCardEventListeners() {
    const cardElements = this.deck.getElementsByClassName('card');
    for (let cardElement of cardElements) {
      cardElement.addEventListener('click', this.handleClickEventOnCard.bind(this));
    }
  }

  handleClickEventOnCard(event) {
    if (this.isNodeOfTypeLI(event) && this.isCardNotYetOpenOrMatched(event)) {
      this.openCard(event.target);
      this.openCards.push(event.target);
    }
    if (this.openCards.length === 2) {
      this.scoringManager.increaseMovesByOne();
      if (this.openCardsDoMatch()) {
        this.markOpenCardsAsMatch();
      } else {
        this.coverOpenCards();
      }
    }
  }

  openCardsDoMatch() {
    return this.getCardSymbol(this.openCards[0]) ===
            this.getCardSymbol(this.openCards[1]);
  }

  isNodeOfTypeLI(event) {
    return event.target.nodeName === 'LI';
  }

  isCardNotYetOpenOrMatched(event) {
    return !this.openCards.includes(event.target)
            && !this.matchedCards.includes(event.target);
  }

  getCardSymbol(card) {
    const symbol = card.getAttribute('data-symbol');
    return symbol;
  }

  openCard(card) {
    card.setAttribute('class', 'card show open');
  }

  coverCard(card) {
    card.setAttribute('class', 'card');
  }

  markCardAsMatch(card) {
    card.setAttribute('class', 'card show match');
  }

  coverOpenCards() {
    this.openCards.forEach((card) => {
      setTimeout(this.coverCard.bind(this, card), 1000);
    });
    this.openCards = [];
  }

  markOpenCardsAsMatch() {
    this.matchedCards.push(this.openCards[0], this.openCards[1]);
    this.openCards.forEach((card) => {
      setTimeout(this.markCardAsMatch.bind(this, card), 1000);
    });
    if (this.matchedCards.length === 16) {
      setTimeout(() => {
        this.hideDeck();
        this.displaySuccessMessage();
      }, 2000);
    }

    this.openCards = [];
  }

  displaySuccessMessage() {
    this.solvedMessage.style.display = 'block';
    this.successMessage.innerHTML = 'You solved the memory in '
      + this.scoringManager.getMoves() + ' moves.';
  }

  hideSuccessMessage() {
    this.solvedMessage.style.display = 'none';
  }

  displayDeck() {
    this.deck.style.display = 'flex';
  }

  hideDeck() {
    this.deck.style.display = 'none';
  }

}
