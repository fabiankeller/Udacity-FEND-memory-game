/*
 * Init memory deck
 */
const memoryDeck = new MemoryDeck('deck');
memoryDeck.initDeck();

document.getElementById('restartButton').addEventListener('click', () => {
  memoryDeck.initDeck();
});
