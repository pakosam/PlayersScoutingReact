import { IPlayers } from "../../api/apiInterface";
import { getPlayerImage } from "../../utilities/getPlayerImage";
import { MoreInfoIcon } from "../../icons/MoreInfoIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import "./PlayerCard.css";

interface PlayerCardProps {
  player: IPlayers;
  onInfo: (id: number) => void;
  onDelete: (id: number) => void;
}

export const PlayerCard = ({ player, onInfo, onDelete }: PlayerCardProps) => {
  return (
    <div className="player">
      <div className="image-container">
        <img
          className="player-image"
          src={getPlayerImage(player.image, player.positions)}
        />
      </div>
      <div className="player-info">
        <p className="player-info-fullname">
          Scouting report: {player.name} {player.surname}
        </p>
        <p className="player-info-club">Club: {player.club}</p>
      </div>

      <div className="player-hover-icons">
        <div className="more-info" onClick={() => onInfo(player.id)}>
          <MoreInfoIcon />
        </div>
        <div className="delete" onClick={() => onDelete(player.id)}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
};
