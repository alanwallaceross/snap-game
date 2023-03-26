import PropTypes from "prop-types";
import "./styles/SnapInfo.css";

function SnapInfo({ isValueSnap, isSuitSnap }) {
  return (
    <div className="snap-info">
      {isValueSnap ? <h2>VALUE SNAP</h2> : null}
      {isSuitSnap ? <h2>SUIT SNAP</h2> : null}
    </div>
  );
}

SnapInfo.propTypes = {
  isValueSnap: PropTypes.bool,
  isSuitSnap: PropTypes.bool,
};

export default SnapInfo;
