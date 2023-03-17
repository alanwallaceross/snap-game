import "./App.css";
import CardsContainer from "./CardsContainer";
import { useState, useEffect } from "react";

function App() {
  const [deck, setDeck] = useState();
  const [cards, setCards] = useState([]);
  const [deckStatus, setDeckStatus] = useState("loading");

  const isValueSnap =
    cards[1]?.cards[0]?.value &&
    cards[1]?.cards[0]?.value === cards[0]?.cards[0].value;

  const isSuitSnap =
    cards[1]?.cards[0]?.suit &&
    cards[1]?.cards[0]?.suit === cards[0]?.cards[0].suit;

  useEffect(() => {
    async function fetchDeck() {
      try {
        setDeckStatus("loading");
        let deckResponse = await fetch(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        const json = await deckResponse.json();
        setDeck(json);
        setDeckStatus("completed");
      } catch (error) {
        setDeckStatus("error");
        console.error("Error fetching data:", error);
      }
    }
    fetchDeck();
  }, []);

  return (
    <div className="App">
      <header className="top-bar">
        <h1>SNAP!</h1>
      </header>
      {deckStatus === "loading" ? (
        <div>Loading</div>
      ) : (
        <div>
          <div className="snap-info">
            {isValueSnap ? <h2>VALUE SNAP</h2> : null}
            {isSuitSnap ? <h2>SUIT SNAP</h2> : null}
          </div>
          <div className="max-width-wrapper">
            <CardsContainer cards={cards} />
          </div>
          <button
            onClick={() => {
              fetchCard(deck).then((cardData) =>
                setCards([cardData, ...cards])
              );
            }}
          >
            Draw card
          </button>
        </div>
      )}
    </div>
  );
}

async function fetchCard(deck) {
  let cardResponse = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
  );

  const json = cardResponse.json();

  return json;
}

export default App;

