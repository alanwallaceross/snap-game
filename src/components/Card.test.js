import { render, screen } from "@testing-library/react";
import Card from "./Card";

const cardData = {
  imageRef: "https://deckofcardsapi.com/static/img/3D.png",
  altText: "3 of DIAMONDS",
};

describe("CardsContainer.js", () => {
  test("renders two cards", () => {
    render(<Card imageRef={cardData.imageRef} altText={cardData.altText} />);
    const card = screen.getByRole("img", { name: "3 of DIAMONDS" });
    expect(card).toBeVisible();
  });
});
