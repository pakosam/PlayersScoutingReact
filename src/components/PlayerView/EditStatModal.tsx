import { IStats } from "../../api/apiInterface";
import "./EditStatModal.css";
import { useState } from "react";

interface EditStatModalProps {
  stat: IStats;
  onSave: (updated: IStats) => void;
  onCancel: () => void;
}

export const EditStatModal = ({
  stat,
  onSave,
  onCancel,
}: EditStatModalProps) => {
  const [localStat, setLocalStat] = useState(stat);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localStat);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Stats</h3>
        <form onSubmit={handleSubmit}>
          <label>Season</label>
          <input
            value={localStat.season}
            onChange={(e) =>
              setLocalStat({ ...localStat, season: e.target.value })
            }
          />

          <label>Club</label>
          <input
            value={localStat.club}
            onChange={(e) =>
              setLocalStat({ ...localStat, club: e.target.value })
            }
          />

          <label>Matches</label>
          <input
            type="number"
            value={localStat.matchesPlayed}
            onChange={(e) =>
              setLocalStat({
                ...localStat,
                matchesPlayed: Number(e.target.value),
              })
            }
          />

          <label>Goals</label>
          <input
            type="number"
            value={localStat.goals}
            onChange={(e) =>
              setLocalStat({ ...localStat, goals: Number(e.target.value) })
            }
          />

          <label>Assists</label>
          <input
            type="number"
            value={localStat.assists}
            onChange={(e) =>
              setLocalStat({ ...localStat, assists: Number(e.target.value) })
            }
          />

          <div className="modal-actions">
            <button type="submit" className="btn-confirm">
              Save
            </button>
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
