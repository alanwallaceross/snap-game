import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { rest } from "msw";
import { server } from "./mocks/server";
import { cleanup } from "@testing-library/react";

// Establish API mocking before all tests.
beforeAll(() => {
  delete window.location;
  window.location = new URL("http://localhost");
  server.listen();
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
// Clean up after the tests are finished.
afterAll(() => {
  server.close();
});

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

    const button = await screen.findByText(/draw card/i);

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
    const card1 = await screen.findByRole("img", { name: "4 of DIAMONDS" });
    expect(card1).toBeVisible();

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

    expect(card2).toBeVisible();
    expect(suitSnap).toBeVisible();
  });

  test("draws two cards of equal value and renders them as well as SNAP VALUE", async () => {
    render(<App />);

    const button = await screen.findByText(/draw card/i);

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
    const card1 = await screen.findByRole("img", { name: "4 of DIAMONDS" });
    expect(card1).toBeVisible();

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

    const card2 = await screen.findByRole("img", { name: "4 of CLUBS" });
    valueSnap = await screen.findByText(/value snap/i);
    expect(card2).toBeVisible();
    expect(valueSnap).toBeVisible();
  });

  test("allows game to be reset", async () => {
    render(<App />);

    const button = await screen.findByText(/draw card/i);

    server.use(
      rest.get(
        "https://deckofcardsapi.com/api/deck/bxz1qselhorw/draw/:count",
        (req, res, ctx) => {
          return res(
            ctx.json({
              success: true,
              deck_id: "bxz1qselhorw",
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
              remaining: 1,
            })
          );
        }
      )
    );

    fireEvent.click(button);
    let card1 = await screen.findByRole("img", { name: "4 of DIAMONDS" });
    expect(card1).toBeVisible();

    server.use(
      rest.get(
        "https://deckofcardsapi.com/api/deck/bxz1qselhorw/draw",
        (req, res, ctx) => {
          return res(
            ctx.json({
              success: true,
              deck_id: "bxz1qselhorw",
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
              remaining: 0,
            })
          );
        }
      )
    );

    fireEvent.click(button);

    let card2 = await screen.findByRole("img", { name: "4 of CLUBS" });
    expect(card2).toBeVisible();

    const resetButton = screen.getByText(/reset/i);
    // I would also test that VALUE MATCHES: 1 is visible however
    // refs don't seem to be working nicely inside the tests as the value remains at 0
    fireEvent.click(resetButton);
    card1 = screen.queryByRole("img", { name: "4 of DIAMONDS" });
    card2 = screen.queryByRole("img", { name: "4 of CLUBS" });
    expect(card1).toBeNull();
    expect(card2).toBeNull();

    server.use(
      rest.get(
        "https://deckofcardsapi.com/api/deck/bxz1qselhorw/draw",
        (req, res, ctx) => {
          return res(
            ctx.json({
              success: true,
              deck_id: "bxz1qselhorw",
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

    const drawCardButton2 = await screen.findByText(/draw card/i);
    expect(drawCardButton2).toBeVisible();
    fireEvent.click(drawCardButton2);

    card1 = await screen.findByRole("img", { name: "4 of DIAMONDS" });
    expect(card1).toBeVisible();
  });
});

