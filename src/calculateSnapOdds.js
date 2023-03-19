export const calculateSnapOdds = (cards, cardsRemaining) => {
  let valueCount = {};
  let suitCount = {};

  if (cards.length === 0 || cardsRemaining === 0) {
    return 0;
  }

  for (let card of cards) {
    valueCount[card.value] = (valueCount[card.value] || 0) + 1;
    suitCount[card.suit] = (suitCount[card.suit] || 0) + 1;
  }

  let lastCard = cards[0];
  let remainingValueCards = 4 - valueCount[lastCard.value];
  let remainingSuitCards = 13 - suitCount[lastCard.suit];

  let totalSnapOdds =
    (remainingValueCards + remainingSuitCards) / cardsRemaining;

  return totalSnapOdds;
};
