import { IStats } from "../../api/apiInterface";
import "./EditStatsModal.css";
import { useState } from "react";

interface EditStatsModalProps {
  stats: IStats;
  onSave: (updated: IStats) => void;
  onCancel: () => void;
}

export const EditStatsModal = ({
  stats,
  onSave,
  onCancel,
}: EditStatsModalProps) => {
  const [statsToEdit, setStatsToEdit] = useState(stats);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(statsToEdit);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Stats</h3>
        <form onSubmit={handleSubmit}>
          <label>Season</label>
          <input
            value={statsToEdit.season}
            onChange={(e) =>
              setStatsToEdit({ ...statsToEdit, season: e.target.value })
            }
          />

          <label>Club</label>
          <input
            value={statsToEdit.club}
            onChange={(e) =>
              setStatsToEdit({ ...statsToEdit, club: e.target.value })
            }
          />

          <label>Matches</label>
          <input
            type="number"
            value={statsToEdit.matchesPlayed}
            onChange={(e) =>
              setStatsToEdit({
                ...statsToEdit,
                matchesPlayed: Number(e.target.value),
              })
            }
          />

          <label>Goals</label>
          <input
            type="number"
            value={statsToEdit.goals}
            onChange={(e) =>
              setStatsToEdit({ ...statsToEdit, goals: Number(e.target.value) })
            }
          />

          <label>Assists</label>
          <input
            type="number"
            value={statsToEdit.assists}
            onChange={(e) =>
              setStatsToEdit({ ...statsToEdit, assists: Number(e.target.value) })
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
