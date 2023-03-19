import "./App.css";
import CardsContainer from "./CardsContainer";
import { useState, useEffect, useRef } from "react";
import { calculateSnapOdds } from "./calculateSnapOdds";

function App() {
  const [deckId, setDeckId] = useState();
  const [cards, setCards] = useState([]);
  const [deckStatus, setDeckStatus] = useState("idle");
  const [cardStatus, setCardStatus] = useState("idle");
  const [isReset, setIsReset] = useState(true);
  const valueSnapCount = useRef(0);
  const suitSnapCount = useRef(0);

  const isValueSnap = cards[1]?.value && cards[1]?.value === cards[0]?.value;

  const isSuitSnap = cards[1]?.suit && cards[1]?.suit === cards[0]?.suit;

  const cardsRemaining = cards[0]?.remaining ?? 52;

  const snapOdds = calculateSnapOdds(cards, cardsRemaining);

  useEffect(() => {
    async function fetchDeck() {
      try {
        setDeckStatus("loading");
        let deckResponse = await fetch(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        const json = await deckResponse.json();
        setDeckId(json.deck_id);
        setDeckStatus("completed");
      } catch (error) {
        setDeckStatus("error");
        console.error("Error fetching data:", error);
      }
    }
    if (isReset) {
      fetchDeck();
      setIsReset(false);
    }
  }, [isReset]);

  useEffect(() => {
    if (isValueSnap) {
      valueSnapCount.current += 1;
    }
  }, [isValueSnap]);

  useEffect(() => {
    if (isSuitSnap) {
      suitSnapCount.current += 1;
    }
  }, [isSuitSnap]);

  async function cardDrawHandler() {
    try {
      setCardStatus("loading");
      let cardData = await fetchCard(deckId);
      setCards((prevCards) => [
        { ...cardData.cards[0], remaining: cardData.remaining },
        ...prevCards,
      ]);
      setCardStatus("completed");
    } catch (error) {
      setCardStatus("error");
      console.error("Error fetching data:", error);
    }
  }

  function reset() {
    setDeckId();
    setCards([]);
    setIsReset(true);
  }

  return (
    <div className="App">
      <header className="top-bar">
        <h1>SNAP!</h1>
      </header>
      {deckStatus === "loading" ? (
        <div>Loading</div>
      ) : (
        <div>
          <div className="max-width-wrapper">
            <div className="game-details">
              <p>{`Cards remaining: ${cardsRemaining}`}</p>
              <p>{`${(snapOdds * 100).toFixed(
                1
              )}% chance of a SNAP in the next draw`}</p>
            </div>
            <div className="snap-info">
              {isValueSnap ? <h2>VALUE SNAP</h2> : null}
              {isSuitSnap ? <h2>SUIT SNAP</h2> : null}
            </div>

            <CardsContainer status={cardStatus} cards={cards} />

            <div className="button-result-container">
              {cardsRemaining ? (
                <button className="draw-card-button" onClick={cardDrawHandler}>
                  Draw card
                </button>
              ) : (
                <div>
                  <h2>{`VALUE MATCHES: ${valueSnapCount.current}`}</h2>
                  <h2>{`SUIT MATCHES: ${suitSnapCount.current}`}</h2>
                  <button className="reset-button" onClick={reset}>
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

async function fetchCard(deckId) {
  let cardResponse = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  );

  const json = cardResponse.json();

  return json;
}

export default App;

