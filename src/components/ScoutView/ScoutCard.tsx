import { IScouts } from "../../api/apiInterface";
import { DeleteIcon } from "../../icons/DeleteIcon";
import "./ScoutCard.css";
import { PenModifyIcon } from "../../icons/PenModifyIcon";

interface ScoutCardProps {
  scout: IScouts;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ScoutCard = ({ scout, onEdit, onDelete }: ScoutCardProps) => {
  return (
    <div className="scout">
      <div className="image-container">
        <img className="scout-image" src={scout.image || "/assets/scout.png"} />
      </div>
      <div className="scout-info">
        <p className="scout-info-fullname">
          Scout name: {scout.name} {scout.surname}
        </p>
      </div>

      <div className="scout-hover-icons">
        <div className="edit-icon" onClick={() => onEdit(scout.id)}>
          <PenModifyIcon />
        </div>
        <div className="delete" onClick={() => onDelete(scout.id)}>
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
};
