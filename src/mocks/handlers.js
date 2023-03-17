import { rest } from "msw";

const deck = {
  success: true,
  deck_id: "bxz1qselhorw",
  remaining: 52,
  shuffled: true,
};

export const handlers = [
  rest.get(
    "https://deckofcardsapi.com/api/deck/new/shuffle",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(deck));
    }
  ),

  rest.get(
    `https://deckofcardsapi.com/api/deck/bxz1qselhorw/draw`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
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
  ),
];
