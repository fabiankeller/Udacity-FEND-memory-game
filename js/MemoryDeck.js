class MemoryDeck {
  constructor(deckId) {
    this.symbols = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube',
                      'leaf', 'bicycle', 'bomb'];
    this.allCardSymbols = [...this.symbols, ...this.symbols];
    this.allMemoryCards = [];
    this.deck = document.getElementById(deckId);
    this.memoryFlowManager = new MemoryFlowManager(deckId);
  }

  initDeck() {
    this.cleanUpDeck();
    this.shuffleCards(this.allCardSymbols);
    this.appendCardsToDeck();
    this.memoryFlowManager.initEventListeners();
  }

  appendCardsToDeck() {
    const documentFragment = document.createDocumentFragment();
    this.allCardSymbols.forEach((symbol) => {
      const memoryCard = new MemoryCard(symbol);
      documentFragment.appendChild(memoryCard.createMemoryCardElement());
      this.allMemoryCards.push(memoryCard);
    });
    document.getElementById('deck').appendChild(documentFragment);
  }

  shuffleCards(cards) {
    let currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
    return cards;
  }

  cleanUpDeck() {
    while(this.deck.hasChildNodes()) {
      this.deck.removeChild(this.deck.firstChild);
    }
  }
}
