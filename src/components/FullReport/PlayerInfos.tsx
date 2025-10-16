import { IPlayer, IRatings } from "../../api/apiInterface";
import "./PlayerInfos.css";
import { PersonalInfos } from "./PersonalInfos";
import { PositionsDisplay } from "./PositionsDisplay";
import { RatingsShowcase } from "./RatingsShowcase";

interface PlayerInfosProps {
  player: IPlayer;
  rating: IRatings | null;
  onUpdatePlayer: () => void;
  onAddRatings: () => void;
  onUpdateRating: () => void;
  onDeleteRating: () => void;
}

export const PlayerInfos: React.FC<PlayerInfosProps> = ({
  player,
  rating,
  onUpdatePlayer,
  onAddRatings,
  onUpdateRating,
  onDeleteRating,
}) => {
  return (
    <div className="player-infos">
      <PersonalInfos player={player} onUpdatePlayer={onUpdatePlayer} />
      <PositionsDisplay positions={player.positions} />
      <RatingsShowcase
        rating={rating}
        playerName={`${player.name} ${player.surname}`}
        onUpdateRating={onUpdateRating}
        onDeleteRating={onDeleteRating}
        onAddRatings={onAddRatings}
      />
    </div>
  );
};
