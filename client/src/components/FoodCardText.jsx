import { useState } from "react";
import "./FoodCard.css"; // make sure to keep your CSS here

const FoodCardText = ({ text, maxLength = 100 }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isLong = text.length > maxLength;
  const displayedText = expanded || !isLong ? text : text.slice(0, maxLength) + "...";

  return (
    <div className="food-card-text">
      {displayedText}
      {isLong && (
        <button
          className="read-more-btn"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default FoodCardText;