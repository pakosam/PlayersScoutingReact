import { useEffect, useState } from "react";
import "./PlayerView.css";
import { error } from "console";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { OptionIcon } from "../icons/OptionIcon";
import { useNavigate } from "react-router-dom";

interface IPlayers {
  id: number;
  image?: string;
  name: string;
  surname: string;
  club: string;
}

export const PlayerView = () => {
  const [players, setPlayers] = useState<IPlayers[]>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://localhost:7066/api/Players")
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Error: ", error));
  }, []);

  const addPlayerButton = () => {
    navigate("/players/add-player");
  };

  return (
    <div id="main-menu">
      <div className="header-and-options-button">
        <div>
          <h1>Players Scouting</h1>
        </div>
        <div>
          <OptionIcon />
        </div>
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
        <div className="list">
          {players?.map((player, index) => {
            const { image, name, surname, club } = player;
            return (
              <div key={`${index}${name}${surname}${club}`} className="player">
                <div className="image-container">
                  <img
                    className="player-image"
                    src={image || "/assets/forward.png"}
                  />
                </div>
                <div className="player-info">
                  <p className="player-info-fullname">
                    Scouting report: {name + " " + surname}
                  </p>
                  <p className="player-info-club">Club: {club}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
