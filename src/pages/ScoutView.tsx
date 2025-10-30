import { OptionIcon } from "../icons/OptionIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DeleteIcon } from "../icons/DeleteIcon";
import "./ScoutView.css";
import { PenModifyIcon } from "../icons/PenModifyIcon";
import { useEffect, useState } from "react";
import { IScouts } from "../api/apiInterface";
import { scoutRepository } from "../repositories/scoutRepository";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../components/PlayerView/ConfirmModal";

export const ScoutView = () => {
  const [scouts, setScouts] = useState<IScouts[]>([]);
  const [scoutToDelete, setScoutToDelete] = useState<IScouts | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    scoutRepository.getAllScouts().then((data) => {
      setScouts(data);
    });
  }, []);

  const addScoutButton = () => navigate("/scouts/add-scout");
  const updateScoutButton = async (id: number) => {
    navigate(`/scouts/${id}/update-scout`);
  };

  const requestDelete = (id: number) => {
    const scout = scouts.find((s) => s.id === id);
    if (scout) setScoutToDelete(scout);
  };

  const confirmDelete = async () => {
    if (!scoutToDelete) return;

    await scoutRepository.delete(scoutToDelete.id);
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
        <OptionIcon />
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
        <div className="list">
          {scouts.map((scout, index) => {
            const {
              image,
              name,
              surname,
              birthdate,
              birthplace,
              email,
              password,
              playerFullName,
            } = scout;
            return (
              <div
                className="scout"
                key={`${index}${name}${surname}${birthdate}${email}`}
              >
                <div className="image-container">
                  <img className="scout-image" src="/assets/scout.png" />
                </div>
                <div className="scout-info">
                  <p className="scout-info-fullname">
                    Scout name: {scout.name} {scout.surname}
                  </p>
                </div>

                <div className="scout-hover-icons">
                  <div className="edit-icon">
                    <PenModifyIcon
                      onClick={() => updateScoutButton(scout.id)}
                    />
                  </div>
                  <div className="delete">
                    <DeleteIcon onClick={() => requestDelete(scout.id)} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ConfirmModal
        isOpen={scoutToDelete !== null}
        title="Delete Scout"
        message={`Are you sure you want to delete ${scoutToDelete?.name} ${scoutToDelete?.surname}?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};
