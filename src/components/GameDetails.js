import PropTypes from "prop-types";
import "./styles/GameDetails.css";

function GameDetails({ cardsRemaining, snapOdds }) {
  return (
    <div className="game-details">
      <p>{`Cards remaining: ${cardsRemaining}`}</p>
      <p>{`Chance of a SNAP in the next draw: ${(snapOdds * 100).toFixed(
        1
      )}% `}</p>
    </div>
  );
}

GameDetails.propTypes = {
  cardsRemaining: PropTypes.number,
  snapOdds: PropTypes.number,
};

export default GameDetails;
