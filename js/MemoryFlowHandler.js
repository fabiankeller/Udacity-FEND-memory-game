class MemoryFlowHandler {
  constructor(deck) {
    this.deck = deck;
    this.solvedMessage = document.getElementById('memorySolved');
    this.successMessage = document.getElementById('successMessage');
    this.scoringHandler = new ScoringHandler();
  }

  initFlowManager() {
    this.openCards = [];
    this.matchedCards = [];
    this.displayDeck();
    this.hideSuccessMessage();
    this.scoringHandler.initScoring();
    this.initCardEventListeners();
  }

  initCardEventListeners() {
    const cardElements = this.deck.getElementsByClassName('card');
    for (let cardElement of cardElements) {
      cardElement.addEventListener('click', this.handleClickEventOnCard.bind(this));
    }
  }

  handleClickEventOnCard(event) {
    if (!this.scoringHandler.isTimerStarted()) {
      this.scoringHandler.startTimer();
    }
    if (this.isNodeOfTypeLI(event) && this.isCardNotYetOpenOrMatched(event)) {
      this.openCard(event.target);
    }
    if (this.openCards.length === 2) {
      this.scoringHandler.increaseMovesByOne();
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
    return card.getAttribute('data-symbol');
  }

  openCard(card) {
    this.openCards.push(card);
    card.setAttribute('class', 'card show open');
  }

  coverCard(card) {
    card.setAttribute('class', 'card');
  }

  markCardAsMatch(card) {
    card.setAttribute('class', 'card show match');
  }

  markCardAsNoMatch(card) {
    card.setAttribute('class', 'card show no-match');
  }

  coverOpenCards() {
    this.openCards.forEach((card) => {
      setTimeout(this.markCardAsNoMatch.bind(this, card), 100);
      setTimeout(this.coverCard.bind(this, card), 1000);
    });
    this.openCards = [];
  }

  markOpenCardsAsMatch() {
    this.matchedCards.push(this.openCards[0], this.openCards[1]);
    this.openCards.forEach((card) => {
      setTimeout(this.markCardAsMatch.bind(this, card), 500);
    });
    if (this.matchedCards.length === 16) {
      setTimeout(() => {
        this.hideDeck();
        this.displaySuccessMessage();
      }, 2000);
      this.scoringHandler.stopTimer();
    }

    this.openCards = [];
  }

  displaySuccessMessage() {
    this.solvedMessage.style.display = 'block';
    this.successMessage.innerHTML = '<p>You solved the memory </p>'
      + '<p>in ' + this.scoringHandler.formatTimer() + '</p>'
      + '<p>with ' + this.scoringHandler.getMoves() + ' moves.</p>';
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
