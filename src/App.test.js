import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders SNAP! header", () => {
  render(<App />);
  const header = screen.getByText(/snap!/i);
  expect(header).toBeVisible();
});

