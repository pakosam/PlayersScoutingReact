import React from "react";
import { IPlayer } from "../../api/apiInterface";
import { PlayerImage } from "./PlayerImage";
import "./PlayerHeader.css";

interface PlayerHeaderProps {
  player: IPlayer;
}

export const PlayerHeader: React.FC<PlayerHeaderProps> = ({ player }) => (
  <div className="player-name-and-surname">
    <div className="player-header">
      <h4>Report:</h4>
      <span>
        {player.name} {player.surname}
      </span>
    </div>
    <PlayerImage
      image={player.image}
      positions={player.positions}
      alt={player.name}
    />
  </div>
);
