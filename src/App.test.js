import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App.js", () => {
  test("renders 'Snap!' header", () => {
    render(<App />);
    const header = screen.getByText(/snap!/i);
    expect(header).toBeVisible();
  });

  test("renders 'Draw' button", () => {
    render(<App />);
    const button = screen.getByText(/draw/i);
    expect(button).toBeVisible();
  });
});

