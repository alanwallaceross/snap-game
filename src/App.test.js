import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { server } from "./mocks/server";

describe("App.js", () => {
  test("renders 'Snap!' header", async () => {
    render(<App />);
    expect(await screen.findByText(/snap!/i)).toBeVisible();
  });

  test("renders 'Draw card' button", async () => {
    render(<App />);
    expect(await screen.findByText(/draw card/i)).toBeVisible();
  });

  test("draws two DIAMOND cards and renders them as well as SNAP SUIT", async () => {
    render(<App />);

    let button = await screen.findByText(/draw card/i);

    server.use(
      rest.get(
        "https://deckofcardsapi.com/api/deck/bxz1qselhorw/draw/:count",
        (req, res, ctx) => {
          return res(
            ctx.json({
              success: true,
              deck_id: "u7pibmxs0no3",
              cards: [
                {
                  code: "4D",
                  image: "https://deckofcardsapi.com/static/img/4D.png",
                  images: {
                    svg: "https://deckofcardsapi.com/static/img/4D.svg",
                    png: "https://deckofcardsapi.com/static/img/4D.png",
                  },
                  value: "4",
                  suit: "DIAMONDS",
                },
              ],
              remaining: 51,
            })
          );
        }
      )
    );

    fireEvent.click(button);
    let card1 = await screen.findByRole("img", { name: "4 of DIAMONDS" });

    server.use(
      rest.get(
        "https://deckofcardsapi.com/api/deck/bxz1qselhorw/draw",
        (req, res, ctx) => {
          return res(
            ctx.json({
              success: true,
              deck_id: "u7pibmxs0no3",
              cards: [
                {
                  code: "9D",
                  image: "https://deckofcardsapi.com/static/img/9D.png",
                  images: {
                    svg: "https://deckofcardsapi.com/static/img/9D.svg",
                    png: "https://deckofcardsapi.com/static/img/9D.png",
                  },
                  value: "9",
                  suit: "DIAMONDS",
                },
              ],
              remaining: 50,
            })
          );
        }
      )
    );
    let suitSnap = screen.queryByText(/suit snap/);
    expect(suitSnap).toBeNull();
    fireEvent.click(button);

    let card2 = await screen.findByRole("img", { name: "9 of DIAMONDS" });
    suitSnap = await screen.findByText(/suit snap/i);
    expect(card1).toBeVisible();
    expect(card2).toBeVisible();
    expect(suitSnap).toBeVisible();
  });

  test("draws two cards of equal value and renders them as well as SNAP VALUE", async () => {
    render(<App />);

    let button = await screen.findByText(/draw card/i);

    server.use(
      rest.get(
        "https://deckofcardsapi.com/api/deck/bxz1qselhorw/draw/:count",
        (req, res, ctx) => {
          return res(
            ctx.json({
              success: true,
              deck_id: "u7pibmxs0no3",
              cards: [
                {
                  code: "4D",
                  image: "https://deckofcardsapi.com/static/img/4D.png",
                  images: {
                    svg: "https://deckofcardsapi.com/static/img/4D.svg",
                    png: "https://deckofcardsapi.com/static/img/4D.png",
                  },
                  value: "4",
                  suit: "DIAMONDS",
                },
              ],
              remaining: 51,
            })
          );
        }
      )
    );

    fireEvent.click(button);
    let card1 = await screen.findByRole("img", { name: "4 of DIAMONDS" });

    server.use(
      rest.get(
        "https://deckofcardsapi.com/api/deck/bxz1qselhorw/draw",
        (req, res, ctx) => {
          return res(
            ctx.json({
              success: true,
              deck_id: "u7pibmxs0no3",
              cards: [
                {
                  code: "4C",
                  image: "https://deckofcardsapi.com/static/img/4C.png",
                  images: {
                    svg: "https://deckofcardsapi.com/static/img/4C.svg",
                    png: "https://deckofcardsapi.com/static/img/4C.png",
                  },
                  value: "4",
                  suit: "CLUBS",
                },
              ],
              remaining: 50,
            })
          );
        }
      )
    );
    let valueSnap = screen.queryByText(/value snap/);
    expect(valueSnap).toBeNull();
    fireEvent.click(button);

    let card2 = await screen.findByRole("img", { name: "4 of CLUBS" });
    valueSnap = await screen.findByText(/value snap/i);
    expect(card1).toBeVisible();
    expect(card2).toBeVisible();
    expect(valueSnap).toBeVisible();
  });
});

