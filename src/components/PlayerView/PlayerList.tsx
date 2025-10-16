import { IPlayers } from "../../api/apiInterface";
import { PlayerCard } from "./PlayerCard";
import "./PlayerList.css";


interface PlayerListProps {
  players: IPlayers[];
  onInfo: (id: number) => void;
  onDelete: (id: number) => void;
}

export const PlayerList = ({ players, onInfo, onDelete }: PlayerListProps) => {
  return (
    <div className="list">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          onInfo={onInfo}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
