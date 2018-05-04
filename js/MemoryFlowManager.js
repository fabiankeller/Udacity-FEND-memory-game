class MemoryFlowManager {
  constructor(deckId) {
    this.deck = document.getElementById(deckId);
    this.moves = 0;
    this.openCards = [];
    this.matchedCards = [];
  }

  initEventListeners() {
    const cardElements = this.deck.getElementsByClassName('card');
    for (let cardElement of cardElements) {
      cardElement.addEventListener('click', this.handleClickEventOnCard.bind(this));
    }
    document.getElementById('restartButton').addEventListener('click', () => {
      const symbols = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube',
                        'leaf', 'bicycle', 'bomb'];
      symbols.forEach((symbol) => {
        const elements = document.getElementsByClassName('fa-' + symbol);
        for (let element of elements) {
          element.parentNode.dispatchEvent(new MouseEvent('click'));
        }
      });
    });

  }

  handleClickEventOnCard(event) {
    if (this.isNodeOfTypeLI(event) && this.isCardNotYetOpenOrMatched(event)) {
      this.openCard(event.target);
      this.openCards.push(event.target);
    }
    if (this.openCards.length === 2) {
      if (this.getCardSymbol(this.openCards[0]) === this.getCardSymbol(this.openCards[1])) {
        this.markOpenCardsAsMatch();
      } else {
        this.coverOpenCards();
      }
    }
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

  coverOpenCards() {
    this.openCards.forEach((card) => {
      setTimeout(() => {card.setAttribute('class', 'card')}, 1000);
    });
    this.openCards = [];
  }

  markOpenCardsAsMatch() {
    this.matchedCards.push(this.openCards[0]);
    this.matchedCards.push(this.openCards[1]);
    this.openCards.forEach((card) => {
      setTimeout(() => {card.setAttribute('class', 'card show match')}, 1000);
    });
    if (this.matchedCards.length === 16) {
      setTimeout(this.memorySolved.bind(this), 1000);
    }
    this.openCards = [];
  }

  memorySolved() {
    this.deck.style.display = 'none';
    const solvedMessage = document.getElementById('memorySolved');
    solvedMessage.style.display = 'block';
  }

}
