import PropTypes from "prop-types";
import "./styles/GameResult.css";

function GameResult({ valueSnapCount, suitSnapCount, onReset }) {
  return (
    <div className="result-info">
      <div>
        <h2>{`VALUE MATCHES: ${valueSnapCount}`}</h2>
        <h2>{`SUIT MATCHES: ${suitSnapCount}`}</h2>
      </div>
      <button className="reset-button" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

GameResult.propTypes = {
  valueSnapCount: PropTypes.number,
  suitSnapCount: PropTypes.number,
  onReset: PropTypes.func,
};

export default GameResult;
