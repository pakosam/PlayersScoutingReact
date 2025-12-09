import { IScouts } from "../../api/apiInterface";
import { ScoutCard } from "./ScoutCard";
import "./ScoutList.css";

interface ScoutListProps {
  scouts: IScouts[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ScoutList = ({ scouts, onEdit, onDelete }: ScoutListProps) => {
  return (
    <div className="list">
      {scouts.map((scout) => (
        <ScoutCard
          key={scout.id}
          scout={scout}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
