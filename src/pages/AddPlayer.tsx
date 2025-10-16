import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import "./AddPlayer.css";
import { playerRepository } from "../repositories/playerRepository";
import { IAddPlayer } from "../api/apiInterface"; 

export const AddPlayer = () => {
  const [playerData, setPlayerData] = useState<IAddPlayer>({
    name: "",
    surname: "",
    birthdate: "",
    birthplace: "",
    height: 0,
    foot: "",
    shirtNumber: 0,
    positions: "",
    club: "",
  });

  const navigate = useNavigate();

  const handleChange = (field: keyof IAddPlayer, value: string | number) => {
    setPlayerData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addPlayerButton = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await playerRepository.create(playerData); 
      navigate("/players");
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  return (
    <div className="add-player">
      <div className="header">
        <h4>New player</h4>
      </div>
      <div className="form-container">
        <form className="form" onSubmit={addPlayerButton}>
          <div className="both-form-sections">
            <div className="form-section">
              <p className="section-title">Personal Info</p>

              <label>Name</label>
              <input
                type="text"
                value={playerData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />

              <label>Surname</label>
              <input
                type="text"
                value={playerData.surname}
                onChange={(e) => handleChange("surname", e.target.value)}
                required
              />

              <label>Birthdate</label>
              <input
                type="date"
                value={playerData.birthdate}
                onChange={(e) => handleChange("birthdate", e.target.value)}
                required
              />

              <label>Birthplace</label>
              <input
                type="text"
                value={playerData.birthplace}
                onChange={(e) => handleChange("birthplace", e.target.value)}
                required
              />
            </div>

            <div className="form-section">
              <p className="section-title">Professional Info</p>

              <label>Height</label>
              <input
                type="number"
                value={playerData.height}
                onChange={(e) => handleChange("height", Number(e.target.value))}
                required
              />

              <label>Foot</label>
              <input
                type="text"
                value={playerData.foot}
                onChange={(e) => handleChange("foot", e.target.value)}
                required
              />

              <label>Shirt number</label>
              <input
                type="number"
                value={playerData.shirtNumber}
                onChange={(e) =>
                  handleChange("shirtNumber", Number(e.target.value))
                }
                required
              />

              <label>Positions</label>
              <input
                type="text"
                value={playerData.positions}
                onChange={(e) => handleChange("positions", e.target.value)}
                required
              />

              <label>Club</label>
              <input
                type="text"
                value={playerData.club}
                onChange={(e) => handleChange("club", e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="add-player-button">
            Add player
          </button>
        </form>
      </div>
    </div>
  );
};
