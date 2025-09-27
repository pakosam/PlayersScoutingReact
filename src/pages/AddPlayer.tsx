import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import "./AddPlayer.css";

interface IAddPlayer {
  name: string;
  surname: string;
  birthdate: string;
  birthplace: string;
  height: number;
  foot: string;
  shirtNumber: number;
  positions: string;
  club: string;
}

export const AddPlayer = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [height, setHeight] = useState(0);
  const [foot, setFoot] = useState("");
  const [shirtNumber, setShirtNumber] = useState(0);
  const [positions, setPositions] = useState("");
  const [club, setClub] = useState("");
  const navigate = useNavigate();

  const addPlayerButton = async (event: FormEvent) => {
    event.preventDefault();

    const newPlayer: IAddPlayer = {
      name,
      surname,
      birthdate,
      birthplace,
      height,
      foot,
      shirtNumber,
      positions,
      club,
    };

    try {
      const response = await fetch("https://localhost:7066/api/Players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Player created:", data);

      navigate("/players");
    } catch (error) {
      console.error("Error:", error);
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
              <div className="name-field">
                <label>Name</label>
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="surname-field">
                <label>Surname</label>
                <input
                  type="text"
                  className="input"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              </div>
              <div className="birthdate-field">
                <label>Birthdate</label>
                <input
                  type="date"
                  className="input"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  required
                />
              </div>
              <div className="birthplace-field">
                <label>Birthplace</label>
                <input
                  type="text"
                  className="input"
                  value={birthplace}
                  onChange={(e) => setBirthplace(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-section">
              <p className="section-title">Professional Info</p>
              <div className="height-field">
                <label>Height</label>
                <input
                  type="number"
                  className="input"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  required
                />
              </div>
              <div className="foot-field">
                <label>Foot</label>
                <input
                  type="text"
                  className="input"
                  value={foot}
                  onChange={(e) => setFoot(e.target.value)}
                  required
                />
              </div>
              <div className="shirt-number-field">
                <label>Shirt number</label>
                <input
                  type="number"
                  className="input"
                  value={shirtNumber}
                  onChange={(e) => setShirtNumber(Number(e.target.value))}
                  required
                />
              </div>
              <div className="positions-field">
                <label>Positions</label>
                <input
                  type="text"
                  className="input"
                  value={positions}
                  onChange={(e) => setPositions(e.target.value)}
                  required
                />
              </div>
              <div className="club-field">
                <label>Club</label>
                <input
                  type="text"
                  className="input"
                  value={club}
                  onChange={(e) => setClub(e.target.value)}
                  required
                />
              </div>
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
