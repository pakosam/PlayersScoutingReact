import React from "react";
import { IRatings } from "../../api/apiInterface";
import { HexagonRatingsChart } from "../FullReport/HexagonRatingsChart";
import { PenModifyIcon } from "../../icons/PenModifyIcon";
import { TrashCanIcon } from "../../icons/TrashCanIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface RatingsShowcaseProps {
  rating: IRatings | null;
  playerName: string;
  onUpdateRating: () => void;
  onDeleteRating: () => void;
  onAddRatings: () => void;
}

export const RatingsShowcase: React.FC<RatingsShowcaseProps> = ({
  rating,
  playerName,
  onUpdateRating,
  onDeleteRating,
  onAddRatings,
}) => {
  return (
    <div className="ratings-showcase">
      {rating ? (
        <>
          <HexagonRatingsChart ratings={rating} playerName={playerName} />
          <div className="ratings-hover-icons">
            <div className="edit-icon" onClick={onUpdateRating}>
              <PenModifyIcon />
            </div>
            <div className="trash-can-icon" onClick={onDeleteRating}>
              <TrashCanIcon />
            </div>
          </div>
        </>
      ) : (
        <div className="add-ratings-container">
          <p>Add player's ratings</p>
          <div className="btn-container">
            <button className="add-ratings-btn" onClick={onAddRatings}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
