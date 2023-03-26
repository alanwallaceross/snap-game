import "./App.css";
import CardsContainer from "./components/CardsContainer";
import GameDetails from "./components/GameDetails";
import SnapInfo from "./components/SnapInfo";
import DrawCard from "./components/DrawCard";
import GameResult from "./components/GameResult";
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
            <GameDetails cardsRemaining={cardsRemaining} snapOdds={snapOdds} />
            <SnapInfo isValueSnap={isValueSnap} isSuitSnap={isSuitSnap} />
            <CardsContainer status={cardStatus} cards={cards} />

            <div className="button-result-container">
              {cardsRemaining ? (
                <DrawCard onDrawCard={drawCard} />
              ) : (
                <GameResult
                  valueSnapCount={valueSnapCount}
                  suitSnapCount={suitSnapCount}
                  onReset={reset}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

