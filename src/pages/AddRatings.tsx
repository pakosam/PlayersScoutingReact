import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddRatings.css";
import { ratingRepository } from "../repositories/ratingRepository";
import { playerRepository } from "../repositories/playerRepository";
import { useEffect } from "react";

export const AddRatings = () => {
  const [attack, setAttack] = useState(0);
  const [defense, setDefense] = useState(0);
  const [tactics, setTactics] = useState(0);
  const [technique, setTechnique] = useState(0);
  const [physicalStrength, setPhysicalStrength] = useState(0);
  const [mentalStrength, setMentalStrength] = useState(0);
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const { playerId } = useParams<{ playerId: string }>();

  useEffect(() => {
    if (!playerId) return;

    const fetchPlayer = async () => {
      try {
        const player = await playerRepository.getSinglePlayer(playerId);
        if (player.name && player.surname) {
          setFullName(`${player.name} ${player.surname}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPlayer();
  }, [playerId]);

  const submitBtn = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const newRatings = await ratingRepository.addRatings({
        attack,
        defense,
        tactics,
        technique,
        physicalStrength,
        mentalStrength,
        fullName,
      });
      navigate(`/players/${playerId}/full-report`);
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };
  return (
    <div className="add-ratings">
      <div className="header">
        <h4>Add ratings</h4>
      </div>
      <div className="form-container">
        <form className="form" onSubmit={submitBtn}>
          <div className="form-section">
            <label>Full name</label>
            <input type="text" value={fullName} readOnly />

            <label>Attack</label>
            <input
              type="number"
              value={attack}
              onChange={(e) => setAttack(Number(e.target.value))}
              required
            />

            <label>Defense</label>
            <input
              type="number"
              value={defense}
              onChange={(e) => setDefense(Number(e.target.value))}
              required
            />

            <label>Tactics</label>
            <input
              type="number"
              value={tactics}
              onChange={(e) => setTactics(Number(e.target.value))}
              required
            />

            <label>Technique</label>
            <input
              type="number"
              value={technique}
              onChange={(e) => setTechnique(Number(e.target.value))}
              required
            />

            <label>Physical Strength</label>
            <input
              type="number"
              value={physicalStrength}
              onChange={(e) => setPhysicalStrength(Number(e.target.value))}
              required
            />

            <label>Mental Strength</label>
            <input
              type="number"
              value={mentalStrength}
              onChange={(e) => setMentalStrength(Number(e.target.value))}
              required
            />
          </div>
          <button type="submit" className="add-player-button">
            Add ratings
          </button>
        </form>
      </div>
    </div>
  );
};
