import "./App.css";
import CardsContainer from "./CardsContainer";
import { useState, useEffect } from "react";

function App() {
  const [deck, setDeck] = useState();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchDeck()
      .then((res) => res.json())
      .then((deckData) => setDeck(deckData));
  }, []);

  return (
    <div className="App">
      <header>
        <h1>SNAP!</h1>
      </header>
      <div className="max-width-wrapper">
        <CardsContainer cards={cards} />
      </div>
      <button
        onClick={() =>
          fetchCard(deck)
            .then((res) => res.json())
            .then((cardData) => setCards([cardData, ...cards]))
        }
      >
        Draw
      </button>
    </div>
  );
}

async function fetchDeck() {
  let deckResponse = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );

  return deckResponse;
}

async function fetchCard(deck) {
  let cardResponse = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
  );

  return cardResponse;
}

export default App;

