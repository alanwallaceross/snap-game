import { render, screen } from "@testing-library/react";
import SnapInfo from "./SnapInfo";

test("renders suit snap", () => {
  render(<SnapInfo isSuitSnap />);
  expect(screen.getByText(/suit snap/i)).toBeVisible();
  expect(screen.queryByText(/value snap/i)).not.toBeInTheDocument();
});

test("renders value snap", () => {
  render(<SnapInfo isValueSnap />);
  expect(screen.getByText(/value snap/i)).toBeVisible();
  expect(screen.queryByText(/suit snap/i)).not.toBeInTheDocument();
});

test("renders no snap", () => {
  render(<SnapInfo />);
  expect(screen.queryByText(/suit snap/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/value snap/i)).not.toBeInTheDocument();
});
