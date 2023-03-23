import PropTypes from "prop-types";
import "./Card.css";

function Card({ imageRef, altText }) {
  return (
    <div className="card">
      <img src={imageRef} alt={altText}></img>
    </div>
  );
}

export default Card;

Card.propTypes = {
  imageRef: PropTypes.string,
  altText: PropTypes.string,
};
