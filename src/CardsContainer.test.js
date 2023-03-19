import { render, screen } from "@testing-library/react";
import CardsContainer from "./CardsContainer";

const cards = [
  {
    image: "https://deckofcardsapi.com/static/img/QS.png",
    value: "QUEEN",
    suit: "SPADES",
  },
  {
    image: "https://deckofcardsapi.com/static/img/3D.png",
    value: "3",
    suit: "DIAMONDS",
  },
];

describe("CardsContainer.js", () => {
  test("renders two cards", () => {
    render(<CardsContainer cards={cards} />);
    let card1 = screen.getByRole("img", { name: "3 of DIAMONDS" });
    let card2 = screen.getByRole("img", { name: "QUEEN of SPADES" });
    expect(card1).toBeVisible();
    expect(card2).toBeVisible();
  });
});
