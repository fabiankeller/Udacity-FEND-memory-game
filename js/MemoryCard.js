class MemoryCard {
  constructor(symbol) {
      this.symbol = symbol;
  }

  createMemoryCardElement () {
    this.cardElement = document.createElement('li');
    this.cardElement.setAttribute('class', 'card');
    this.cardElement.setAttribute('data-symbol', this.symbol);

    const icon = document.createElement('i');
    icon.setAttribute('class', 'fa fa-' + this.symbol);

    this.cardElement.appendChild(icon);
    return this.cardElement;
  }
}
