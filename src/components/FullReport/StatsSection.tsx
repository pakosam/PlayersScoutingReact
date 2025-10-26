import { IStats } from "../../api/apiInterface";
import { PenModifyIcon } from "../../icons/PenModifyIcon";
import { TrashCanIcon } from "../../icons/TrashCanIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./StatsSection.css";

interface StatsTableProps {
  stats: IStats[];
  onAddStats: () => void;
  onEditStat: (stat: IStats) => void;
  onDeleteStat: (id: number) => void;
}

export const StatsSection: React.FC<StatsTableProps> = ({
  stats,
  onAddStats,
  onEditStat,
  onDeleteStat,
}) => {
  return (
    <div className="stats">
      <div className="header">
        <div className="header-and-button-wrapped">
          <h3>STATS</h3>
          <div className="btn-container">
            <button className="add-stats-btn" onClick={onAddStats}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Season</th>
              <th>Club</th>
              <th>Matches Played</th>
              <th>Goals</th>
              <th>Assists</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stats?.map((stat, index) => (
              <tr key={`${index}${stat.season}${stat.club}`}>
                <td>{stat.season}</td>
                <td>{stat.club}</td>
                <td>{stat.matchesPlayed}</td>
                <td>{stat.goals}</td>
                <td>{stat.assists}</td>
                <td>
                  <div className="table-cell-icons">
                    <PenModifyIcon onClick={() => onEditStat(stat)} />
                    <TrashCanIcon onClick={() => onDeleteStat(stat.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
