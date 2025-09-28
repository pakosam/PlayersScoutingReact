import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./PlayerView.css";
import { OptionIcon } from "../icons/OptionIcon";
import { PlayerList } from "../components/PlayerView/PlayerList";
import { IPlayers } from "../api/apiInterface";
import { playerRepository } from "../repositories/playerRepository";

export const PlayerView = () => {
  const [players, setPlayers] = useState<IPlayers[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    playerRepository
      .getAllPlayers()
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const addPlayerButton = () => navigate("/players/add-player");
  const infoIcon = (id: number) => navigate(`/players/${id}/info`);

  const deleteIcon = async (id: number) => {
    try {
      await playerRepository.delete(id);
      setPlayers((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete player");
    }
  };

  return (
    <div
      id="main-menu"
      style={{
        backgroundImage:
          'url("assets/izuddin-helmi-adnan-ndxwXAt0jpg-unsplash.jpg")',
      }}
    >
      <div className="header-and-options-button">
        <h1>Players Scouting</h1>
        <OptionIcon />
      </div>

      <div className="selected-option">
        <h3>Reports</h3>
      </div>

      <div className="main-content">
        <div className="btn-container">
          <button className="add-player-btn" onClick={addPlayerButton}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <PlayerList players={players} onInfo={infoIcon} onDelete={deleteIcon} />
        )}
      </div>
    </div>
  );
};
