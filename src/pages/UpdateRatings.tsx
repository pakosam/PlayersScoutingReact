import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { playerRepository } from "../repositories/playerRepository";
import { IUpdateRatings } from "../api/apiInterface";
import { ratingRepository } from "../repositories/ratingRepository";
import "./UpdateRatings.css";

export const UpdateRatings = () => {
  const [id, setId] = useState(0);
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
        const player = await playerRepository.getSinglePlayer(Number(playerId));
        if (player) {
          setFullName(`${player.name} ${player.surname}`);
        }
        const ratings = await ratingRepository.getRatingByPlayerId(
          Number(playerId)
        );
        if (ratings) {
          setId(ratings.id);
          setAttack(ratings.attack);
          setDefense(ratings.defense);
          setTactics(ratings.tactics);
          setTechnique(ratings.technique);
          setPhysicalStrength(ratings.physicalStrength);
          setMentalStrength(ratings.mentalStrength);
        }
      } catch (error) {
        console.error("Error fetching player:", error);
      }
    };

    fetchPlayer();
  }, [playerId]);

  const submitBtn = async (event: FormEvent) => {
    event.preventDefault();

    const updatedRatings: IUpdateRatings = {
      playerId: Number(playerId),

      id,
      attack,
      defense,
      tactics,
      technique,
      physicalStrength,
      mentalStrength,
      fullName,
    };

    try {
      await ratingRepository.updateRatings(updatedRatings);
      navigate(`/players/${playerId}/full-report`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="update-ratings">
      <div className="header">
        <h4>Update ratings</h4>
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
          <button type="submit" className="update-ratings-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
