import { createDeck, drawCard } from "./api";
import nock from "nock";

describe("api", () => {
  const API_BASE_URL = "https://deckofcardsapi.com/api/deck";
  beforeEach(() => {
    nock.cleanAll();
  });
  afterEach(() => {
    nock.cleanAll();
  });

  test("createDeck returns a new deck", async () => {
    const mockDeck = {
      success: true,
      deck_id: "newdeck123",
      remaining: 52,
      shuffled: true,
    };

    nock(API_BASE_URL)
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
      })
      .get("/new/shuffle/?deck_count=1")
      .reply(200, mockDeck);

    const deck = await createDeck();

    expect(deck).toEqual(mockDeck);
  });

  test("createDeck throws an error when the API call fails", async () => {
    nock(API_BASE_URL)
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
      })
      .get("/new/shuffle/?deck_count=1")
      .reply(500, { message: "Internal Server Error" });

    await expect(createDeck()).rejects.toThrow(
      "An error occurred: Internal Server Error"
    );
  });

  test("drawCard returns drawn cards", async () => {
    const deckId = "deck123";
    const mockDrawnCards = {
      success: true,
      deck_id: deckId,
      cards: [
        {
          code: "AS",
          image: "https://deckofcardsapi.com/static/img/AS.png",
          value: "ACE",
          suit: "SPADES",
        },
      ],
      remaining: 51,
    };

    nock(API_BASE_URL)
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
      })
      .get(`/${deckId}/draw/?count=1`)
      .reply(200, mockDrawnCards);

    const drawnCards = await drawCard(deckId, 1);

    expect(drawnCards).toEqual(mockDrawnCards);
  });

  test("drawCard throws an error when the API call fails", async () => {
    const deckId = "deck123";

    nock(API_BASE_URL)
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
      })
      .get(`/${deckId}/draw/?count=1`)
      .reply(500, { message: "Internal Server Error" });

    await expect(drawCard(deckId, 1)).rejects.toThrow(
      "An error occurred: Internal Server Error"
    );
  });
});
