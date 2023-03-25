import calculateSnapOdds from "./calculateSnapOdds";

describe("calculateSnapOdds", () => {
  test("should return 0 when there are no cards left in the deck", () => {
    const cards = new Array(52).fill({ value: "A", suit: "hearts" });
    expect(calculateSnapOdds(cards, 0)).toBe(0);
  });

  test("should return correct probability for value snap", () => {
    const cards = [
      { value: "A", suit: "hearts" },
      { value: "10", suit: "spades" },
      { value: "Q", suit: "diamonds" },
    ];
    const remainingCards = 3;
    const expectedValueSnapOdds = (4 - 1) / remainingCards; // 3 "Q" cards left in the deck
    const odds = calculateSnapOdds(cards, remainingCards);
    expect(odds).toBeGreaterThanOrEqual(expectedValueSnapOdds);
  });

  test("should return correct probability for suit snap", () => {
    const cards = [
      { value: "A", suit: "hearts" },
      { value: "10", suit: "hearts" },
      { value: "Q", suit: "hearts" },
    ];
    const remainingCards = 3;
    const expectedSuitSnapOdds = (13 - 3) / remainingCards; // 10 hearts left in the deck
    const odds = calculateSnapOdds(cards, remainingCards);
    expect(odds).toBeGreaterThanOrEqual(expectedSuitSnapOdds);
  });

  test("should return correct probability for both value and suit snap", () => {
    const cards = [
      { value: "A", suit: "hearts" },
      { value: "A", suit: "spades" },
      { value: "A", suit: "diamonds" },
    ];
    const remainingCards = 52 - 3;
    const expectedSnapOdds = 1 / remainingCards; // Only 1 card (A of clubs) results in both value and suit snap
    const odds = calculateSnapOdds(cards, remainingCards);
    expect(odds).toBeGreaterThanOrEqual(expectedSnapOdds);
  });
});
