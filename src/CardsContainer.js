import "./CardsContainer.css";
import Card from "./Card";

function CardsContainer({ cards }) {
  let leftCard = cards[1]?.cards[0];
  let rightCard = cards[0]?.cards[0];

  return (
    <div className="card-view">
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
    </div>
  );
}

export default CardsContainer;
