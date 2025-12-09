import { OptionIcon } from "../icons/OptionIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./ScoutView.css";
import { useEffect, useState } from "react";
import { IScouts } from "../api/apiInterface";
import { scoutRepository } from "../repositories/scoutRepository";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../components/PlayerView/ConfirmModal";
import { ScoutList } from "../components/ScoutView/ScoutList";
import { LogoutModal } from "../components/LogoutModal";

export const ScoutView = () => {
  const [scouts, setScouts] = useState<IScouts[]>([]);
  const [scoutToDelete, setScoutToDelete] = useState<IScouts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    scoutRepository
      .getAllScouts()
      .then((data) => {
        setScouts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const addScoutButton = () => navigate("/scouts/add-scout");
  const editIcon = async (id: number) => {
    navigate(`/scouts/${id}/update-scout`);
  };

  const requestDelete = (id: number) => {
    const scout = scouts.find((s) => s.id === id);
    if (scout) setScoutToDelete(scout);
  };

  const confirmDelete = async () => {
    if (!scoutToDelete) return;

    await scoutRepository.deleteScout(scoutToDelete.id);
    setScouts((prev) => prev.filter((s) => s.id !== scoutToDelete.id));
    setScoutToDelete(null);
  };

  const cancelDelete = () => setScoutToDelete(null);

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
        <OptionIcon onClick={() => setLogoutOpen(true)} />
      </div>

      <div className="selected-option">
        <h3>Scouts</h3>
      </div>

      <div className="main-content">
        <div className="btn-container">
          <button className="add-scout-btn" onClick={addScoutButton}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <ScoutList
            scouts={scouts}
            onEdit={editIcon}
            onDelete={requestDelete}
          />
        )}
      </div>

      <ConfirmModal
        isOpen={scoutToDelete !== null}
        title="Delete Scout"
        message={`Are you sure you want to delete ${scoutToDelete?.name} ${scoutToDelete?.surname}?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        property="Players"
      />
    </div>
  );
};
