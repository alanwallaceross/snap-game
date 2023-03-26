import { render, screen, fireEvent } from "@testing-library/react";
import DrawCard from "./DrawCard";

test("calls the onClick handler when button is clicked", () => {
  const handleClick = jest.fn();
  render(<DrawCard onDrawCard={handleClick} />);

  const button = screen.getByText(/draw card/i);
  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
