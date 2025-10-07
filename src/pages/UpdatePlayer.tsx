import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdatePlayer.css";
import { playerRepository } from "../repositories/playerRepository";
import { IUpdatePlayer } from "../api/apiInterface";

export const UpdatePlayer = () => {
  const navigate = useNavigate();

  const { playerId } = useParams();

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [height, setHeight] = useState(0);
  const [foot, setFoot] = useState("");
  const [shirtNumber, setShirtNumber] = useState(0);
  const [positions, setPositions] = useState("");
  const [club, setClub] = useState("");

  useEffect(() => {
    const fetchPlayer = async () => {
      if (!playerId) return;
      try {
        const data = await playerRepository.getSinglePlayer(playerId);

        setId(data.id);
        setName(data.name);
        setSurname(data.surname);
        setBirthdate(data.birthdate);
        setBirthplace(data.birthplace);
        setHeight(data.height);
        setFoot(data.foot);
        setShirtNumber(data.shirtNumber);
        setPositions(data.positions);
        setClub(data.club);
      } catch (err) {
        console.error("Failed to load parking", err);
      }
    };

    fetchPlayer();
  }, [playerId]);

  const submitBtn = async (event: FormEvent) => {
    event.preventDefault();

    const updatedPlayer: IUpdatePlayer = {
      id,
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
      await playerRepository.update(updatedPlayer);
      navigate(`/players/${playerId}/full-report`);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="update-player">
      <div className="header">
        <h4>Update player</h4>
      </div>
      <div className="form-container">
        <form className="form" onSubmit={submitBtn}>
          <div className="both-form-sections">
            <div className="form-section">
              <p className="section-title">Personal Info</p>
              <label>ID</label>
              <input type="number" value={id} readOnly />
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>Surname</label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />

              <label>Birthdate</label>
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />

              <label>Birthplace</label>
              <input
                type="text"
                value={birthplace}
                onChange={(e) => setBirthplace(e.target.value)}
                required
              />
            </div>

            <div className="form-section">
              <p className="section-title">Professional Info</p>

              <label>Height</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                required
              />

              <label>Foot</label>
              <input
                type="text"
                value={foot}
                onChange={(e) => setFoot(e.target.value)}
                required
              />

              <label>Shirt number</label>
              <input
                type="number"
                value={shirtNumber}
                onChange={(e) => setShirtNumber(Number(e.target.value))}
                required
              />

              <label>Positions</label>
              <input
                type="text"
                value={positions}
                onChange={(e) => setPositions(e.target.value)}
                required
              />

              <label>Club</label>
              <input
                type="text"
                value={club}
                onChange={(e) => setClub(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="update-player-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
