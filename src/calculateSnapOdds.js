export const calculateSnapOdds = (cards, cardsRemaining) => {
  const valueCount = {};
  const suitCount = {};

  if (cards.length === 0 || cardsRemaining === 0) {
    return 0;
  }

  for (let card of cards) {
    valueCount[card.value] = (valueCount[card.value] || 0) + 1;
    suitCount[card.suit] = (suitCount[card.suit] || 0) + 1;
  }

  const lastCard = cards[0];
  const remainingValueCards = 4 - valueCount[lastCard.value];
  const remainingSuitCards = 13 - suitCount[lastCard.suit];

  const totalSnapOdds =
    (remainingValueCards + remainingSuitCards) / cardsRemaining;

  return totalSnapOdds;
};
