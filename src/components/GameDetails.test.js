import { render, screen } from "@testing-library/react";
import GameDetails from "./GameDetails";

test("renders game details with correct remaining cards and snaps count", () => {
  const cardsRemaining = 10;
  const snapOdds = 0.2883434;

  render(<GameDetails cardsRemaining={cardsRemaining} snapOdds={snapOdds} />);

  expect(screen.getByText(/cards remaining: 10/i)).toBeVisible();
  expect(
    screen.getByText(/chance of a snap in the next draw: 28.8/i)
  ).toBeVisible();
});
