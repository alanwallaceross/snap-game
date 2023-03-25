const updateCount = (acc, key, value) => ({
  ...acc,
  [key]: (acc[key] || 0) + value,
});

const countBy = (key, list) =>
  list.reduce((acc, item) => updateCount(acc, item[key], 1), {});

export const calculateSnapOdds = (cards, cardsRemaining) => {
  if (cards.length === 0 || cardsRemaining === 0) {
    return 0;
  }

  const valueCount = countBy("value", cards);
  const suitCount = countBy("suit", cards);
  const lastCard = cards[0];
  const remainingValueCards = 4 - (valueCount[lastCard.value] || 0);
  const remainingSuitCards = 13 - (suitCount[lastCard.suit] || 0);

  return (remainingValueCards + remainingSuitCards) / cardsRemaining;
};
