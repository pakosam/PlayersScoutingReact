import React from "react";
import { IPlayer, IRatings } from "../../api/apiInterface";
import { formatDate } from "../../utilities/formatDate";
import { playerDescriptionByRatings } from "../../utilities/playerDescriptionByRatings";
import "./GeneralPlayerDescription.css"

interface GeneralPlayerDescriptionProps {
  player: IPlayer;
  rating: IRatings | null;
}

export const GeneralPlayerDescription: React.FC<
  GeneralPlayerDescriptionProps
> = ({ player, rating }) => (
  <div className="description">
    <p>
      {player.name} {player.surname} ({player.birthplace},{" "}
      {formatDate(player.birthdate)}) is {player.foot} foot {player.positions}{" "}
      who currently plays for {player.club}.
    </p>

    <div className="player-report">
      <h4>Performance Report:</h4>
      <p>
        {rating
          ? playerDescriptionByRatings(rating, player.name).join(" ")
          : "Report not available for this player yet."}
      </p>
    </div>
  </div>
);
