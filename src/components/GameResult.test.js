import { render, screen } from "@testing-library/react";
import GameResult from "./GameResult";

describe("GameResult", () => {
  it("should render the correct snap counts and show reset button", () => {
    const valueSnapCount = 1;
    const suitSnapCount = 2;
    const onReset = jest.fn();

    render(
      <GameResult
        valueSnapCount={valueSnapCount}
        suitSnapCount={suitSnapCount}
        onReset={onReset}
      />
    );

    const valueSnap = screen.getByText(/value matches: 1/i);
    const suitSnap = screen.getByText(/suit matches: 2/i);
    const resetButton = screen.getByRole("button", { name: /reset/i });

    expect(valueSnap).toBeInTheDocument();
    expect(suitSnap).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  it("should call onReset when reset button is clicked", () => {
    const onReset = jest.fn();

    render(
      <GameResult valueSnapCount={0} suitSnapCount={0} onReset={onReset} />
    );

    const resetButton = screen.getByRole("button", { name: /reset/i });

    expect(onReset).not.toHaveBeenCalled();
    resetButton.click();
    expect(onReset).toHaveBeenCalled();
  });
});
