import React from "react";
import { parsePositions } from "../../utilities/parsePositions";
import { getDotPosition } from "./getDotByPosition";
import "./PositionsDisplay.css"

interface PositionsDisplayProps {
  positions: string;
}

export const PositionsDisplay: React.FC<PositionsDisplayProps> = ({
  positions,
}) => {
  return (
    <div className="positions-display">
      <div className="field-image">
        <img
          src="/assets/30547222_football_field_right_side_61.jpg"
          alt="soccer-field"
        />
        {positions &&
          parsePositions(positions).map((pos, index) => (
            <div
              key={index}
              className="position-dot"
              style={getDotPosition(pos)}
              title={pos}
            />
          ))}
      </div>

      <div className="positions">
        <span>Position: {positions}</span>
      </div>
    </div>
  );
};
