import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./PlayerView.css";
import { OptionIcon } from "../icons/OptionIcon";
import { PlayerList } from "../components/PlayerView/PlayerList";
import { IPlayers } from "../api/apiInterface";
import { playerRepository } from "../repositories/playerRepository";
import { ConfirmModal } from "../components/PlayerView/ConfirmModal";

export const PlayerView = () => {
  const [players, setPlayers] = useState<IPlayers[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playerToDelete, setPlayerToDelete] = useState<IPlayers | null>(null);
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

  const requestDelete = (id: number) => {
    const player = players.find((p) => p.id === id);
    if (player) setPlayerToDelete(player);
  };

  const confirmDelete = async () => {
    if (!playerToDelete) return;

    try {
      await playerRepository.delete(playerToDelete.id);
      setPlayers((prev) => prev.filter((p) => p.id !== playerToDelete.id));
      setPlayerToDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete player");
    }
  };

  const cancelDelete = () => setPlayerToDelete(null);

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
          <PlayerList
            players={players}
            onInfo={infoIcon}
            onDelete={requestDelete}
          />
        )}
      </div>

      <ConfirmModal
        isOpen={playerToDelete !== null}
        title="Delete Player"
        message={`Are you sure you want to delete ${playerToDelete?.name} ${playerToDelete?.surname}?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};
