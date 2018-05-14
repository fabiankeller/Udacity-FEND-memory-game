class MemoryDeck {
  constructor() {
    this.symbols = ['less', 'css3', 'angular', 'git', 'react',
                      'vuejs', 'sass', 'js'];
    this.allCardSymbols = [...this.symbols, ...this.symbols];
    this.deck = document.getElementById('deck');
    this.memoryFlowHandler = new MemoryFlowHandler(this.deck);
  }

  initDeck() {
    this.cleanUpDeck();
    this.shuffleCards(this.allCardSymbols);
    this.appendCardsToDeck();
    this.memoryFlowHandler.initFlowManager();
  }

  appendCardsToDeck() {
    const documentFragment = document.createDocumentFragment();
    this.allCardSymbols.forEach((symbol) => {
      documentFragment.appendChild(this.createMemoryCardElement(symbol));
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

  createMemoryCardElement (symbol) {
    const cardElement = document.createElement('li');
    cardElement.setAttribute('class', 'card');
    cardElement.setAttribute('data-symbol', symbol);

    const icon = document.createElement('i');
    icon.setAttribute('class', 'fab fa-' + symbol);

    cardElement.appendChild(icon);
    return cardElement;
  }
}
