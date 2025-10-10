import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddStats.css";
import { playerRepository } from "../repositories/playerRepository";
import { useEffect } from "react";
import { statRepository } from "../repositories/statRepository";

export const AddStats = () => {
  const [season, setSeason] = useState("");
  const [club, setClub] = useState("");
  const [matchesPlayed, setMatchesPlayed] = useState(0);
  const [goals, setGoals] = useState(0);
  const [assists, setAssists] = useState(0);
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const { playerId } = useParams<{ playerId: string }>();

  useEffect(() => {
    if (!playerId) return;

    const fetchPlayer = async () => {
      try {
        const player = await playerRepository.getSinglePlayer(playerId);
        if (player) {
          setFullName(`${player.name} ${player.surname}`);
        }
      } catch (error) {
        console.error("Error fetching player:", error);
      }
    };

    fetchPlayer();
  }, [playerId]);

  const submitBtn = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const newStats = await statRepository.addStats({
        playerId: Number(playerId),
        season,
        club,
        matchesPlayed,
        goals,
        assists,
        fullName,
      });
      navigate(`/players/${playerId}/full-report`);
    } catch (error) {
      console.error("Error adding stats:", error);
    }
  };
  return (
    <div className="add-stats">
      <div className="header">
        <h4>Add stats</h4>
      </div>
      <div className="form-container">
        <form className="form" onSubmit={submitBtn}>
          <div className="form-section">
            <label>Full name</label>
            <input type="text" value={fullName} readOnly />

            <label>Season</label>
            <input
              type="string"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              required
            />

            <label>Club</label>
            <input
              type="string"
              value={club}
              onChange={(e) => setClub(e.target.value)}
              required
            />

            <label>Matches played</label>
            <input
              type="number"
              value={matchesPlayed}
              onChange={(e) => setMatchesPlayed(Number(e.target.value))}
              required
            />

            <label>Goals</label>
            <input
              type="number"
              value={goals}
              onChange={(e) => setGoals(Number(e.target.value))}
              required
            />

            <label>Assists</label>
            <input
              type="number"
              value={assists}
              onChange={(e) => setAssists(Number(e.target.value))}
              required
            />
          </div>
          <button type="submit" className="add-stats-button">
            Add stats
          </button>
        </form>
      </div>
    </div>
  );
};
