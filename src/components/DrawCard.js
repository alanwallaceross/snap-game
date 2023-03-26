import PropTypes from "prop-types";
import "./styles/DrawCard.css";

function DrawCard({ onDrawCard }) {
  return (
    <div className="draw-card-container">
      <button className="draw-card-button" onClick={onDrawCard}>
        Draw card
      </button>
    </div>
  );
}

DrawCard.propTypes = {
  onDrawCard: PropTypes.func,
};

export default DrawCard;
