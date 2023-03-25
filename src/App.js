import "./App.css";
import CardsContainer from "./CardsContainer";
import useDeck from "./hooks/useDeck";

function App() {
  const {
    deckStatus,
    cardStatus,
    cards,
    cardsRemaining,
    snapOdds,
    isValueSnap,
    isSuitSnap,
    valueSnapCount,
    suitSnapCount,
    drawCard,
    reset,
  } = useDeck();

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
              <p>{`Chance of a SNAP in the next draw: ${(
                snapOdds * 100
              ).toFixed(1)}% `}</p>
            </div>
            <div className="snap-info">
              {isValueSnap ? <h2>VALUE SNAP</h2> : null}
              {isSuitSnap ? <h2>SUIT SNAP</h2> : null}
            </div>

            <CardsContainer status={cardStatus} cards={cards} />

            <div className="button-result-container">
              {cardsRemaining ? (
                <div className="draw-card-container">
                  <button className="draw-card-button" onClick={drawCard}>
                    Draw card
                  </button>
                </div>
              ) : (
                <div className="result-info">
                  <div>
                    <h2>{`VALUE MATCHES: ${valueSnapCount.current}`}</h2>
                    <h2>{`SUIT MATCHES: ${suitSnapCount.current}`}</h2>
                  </div>
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
  const cardResponse = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  );

  const json = cardResponse.json();

  return json;
}

export default App;

