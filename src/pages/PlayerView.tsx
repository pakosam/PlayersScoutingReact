import { useEffect, useState } from "react";
import "./PlayerView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { OptionIcon } from "../icons/OptionIcon";
import { useNavigate } from "react-router-dom";
import { MoreInfoIcon } from "../icons/MoreInfoIcon";
import { DeleteIcon } from "../icons/DeleteIcon";

interface IPlayers {
  id: number;
  image?: string;
  name: string;
  surname: string;
  club: string;
  positions: string;
}

const getPlayerImage = (
  image: string | undefined,
  positions?: string
): string => {
  if (image) return image;

  const firstPosition = positions?.split(",")[0]?.trim().toLowerCase();

  switch (firstPosition) {
    case "goalkeeper":
      return "/assets/goalkeeper.png";
    case "defender":
    case "centre back":
    case "left back":
    case "right back":
    case "wingback":
    case "left wingback":
    case "right wingback":
      return "/assets/defender.png";
    case "midfielder":
    case "defensive midfielder":
    case "central midfielder":
    case "left midfielder":
    case "right midfielder":
    case "attacking midfielder":
      return "/assets/midfielder.png";
    case "winger":
    case "left winger":
    case "right winger":
    case "forward":
    case "striker":
      return "/assets/forward.png";
    default:
      return "/assets/default.png";
  }
};

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

  const infoIcon = async (playerId: number) => {
    navigate(`/players/${playerId}/info`);
  };

  const deleteIcon = async (playerId: number) => {
    const response = await fetch(
      `https://localhost:7066/api/Players?id=${playerId}`,
      {
        method: "DELETE",
      }
    );
    setPlayers((prev) => prev?.filter((player) => player.id !== playerId));
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
                    src={getPlayerImage(player.image, player.positions)}
                  />
                </div>
                <div className="player-info">
                  <p className="player-info-fullname">
                    Scouting report: {name + " " + surname}
                  </p>
                  <p className="player-info-club">Club: {club}</p>
                </div>

                <div className="player-hover-icons">
                  <div
                    className="more-info"
                    onClick={() => infoIcon(player.id)}
                  >
                    <MoreInfoIcon />
                  </div>
                  <div className="delete" onClick={() => deleteIcon(player.id)}>
                    <DeleteIcon />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
