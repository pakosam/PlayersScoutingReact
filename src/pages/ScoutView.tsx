import { OptionIcon } from "../icons/OptionIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DeleteIcon } from "../icons/DeleteIcon";
import "./ScoutView.css";
import { PenModifyIcon } from "../icons/PenModifyIcon";
import { useEffect, useState } from "react";
import { IScouts } from "../api/apiInterface";
import { scoutRepository } from "../repositories/scoutRepository";

export const ScoutView = () => {
  const [scouts, setScouts] = useState<IScouts[]>([]);

  useEffect(() => {
    scoutRepository.getAllScouts().then((data) => {
      setScouts(data);
    });
  }, []);

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
          <button className="add-scout-btn">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="list">
          {scouts.map((player, index) => (
            <div className="scout">
              <div className="image-container">
                <img className="scout-image" src="/assets/scout.png" />
              </div>
              <div className="scout-info">
                <p className="scout-info-fullname">
                  Scout name: {player.name} {player.surname}
                </p>
              </div>

              <div className="scout-hover-icons">
                <div className="edit-icon">
                  <PenModifyIcon />
                </div>
                <div className="delete">
                  <DeleteIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
