import PropTypes from "prop-types"; // ES6
import "./CardsContainer.css";
import Card from "./Card";
import loadingGif from "./assets/200w.gif";

function CardsContainer({ cards, status }) {
  const leftCard = cards[1];
  const rightCard = cards[0];

  return (
    <div className="card-view">
      {status === "loading" ? (
        <>
          <Card className="card" imageRef={""} altText="Loading" />
          <Card className="card" imageRef={loadingGif} altText="Loading" />
        </>
      ) : (
        <>
          <Card
            className="card"
            imageRef={leftCard?.image ?? ""}
            altText={`${leftCard?.value} of ${leftCard?.suit}`}
          />
          <Card
            className="card"
            imageRef={rightCard?.image ?? ""}
            altText={`${rightCard?.value} of ${rightCard?.suit}`}
          />
        </>
      )}
    </div>
  );
}

CardsContainer.propTypes = {
  cards: PropTypes.array,
  status: PropTypes.string,
};

export default CardsContainer;
