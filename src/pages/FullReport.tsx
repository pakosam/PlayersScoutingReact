import { useParams } from "react-router-dom";
import { useState } from "react";
import { IPlayer, IStats } from "../api/apiInterface";
import { IRatings } from "../api/apiInterface";
import { useEffect } from "react";
import { playerRepository } from "../repositories/playerRepository";
import { ratingRepository } from "../repositories/ratingRepository";
import "./FullReport.css";
import { statRepository } from "../repositories/statRepository";
import { getPlayerImage } from "../utilities/getPlayerImage";
import { HexagonRatingsChart } from "../components/FullReport/HexagonRatingsChart";
import { CalendarIcon } from "../icons/CalendarIcon";
import { HeightIcon } from "../icons/HeightIcon";
import { HomeIcon } from "../icons/HomeIcon";
import { ShirtIcon } from "../icons/ShirtIcon";
import { formatDate } from "../utilities/formatDate";
import { parsePositions } from "../utilities/parsePositions";
import { getDotPosition } from "../components/FullReport/getDotByPosition";
import { PenModifyIcon } from "../icons/PenModifyIcon";
import { TrashCanIcon } from "../icons/TrashCanIcon";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ConfirmModal } from "../components/PlayerView/ConfirmModal";

export const FullReport = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const [player, setPlayer] = useState<IPlayer | null>(null);
  const [rating, setRating] = useState<IRatings | null>(null);
  const [stats, setStats] = useState<IStats[]>();
  const [ratingToDelete, setRatingToDelete] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!playerId) return;

    const load = async () => {
      try {
        const player = await playerRepository.getSinglePlayer(playerId);
        setPlayer(player);

        const rating = await ratingRepository.getRatingByPlayerId(playerId);
        setRating(rating);

        const stat = await statRepository.getStatByPlayerId(playerId);
        setStats(stat);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [playerId]);

  const updatePlayerButton = () => {
    if (!playerId) return;
    navigate(`/players/${playerId}/update-player`);
  };

  const addRatingsButton = () => {
    if (!playerId) return;
    navigate(`/players/${playerId}/add-ratings`);
  };

  const updateRatingButton = () => {
    if (!playerId) return;
    navigate(`/players/${playerId}/update-ratings`);
  };

  const addStatsButton = () => {
    if (!playerId) return;
    navigate(`/players/${playerId}/add-stats`);
  }

  const requestDelete = (id: number) => {
    setRatingToDelete(id);
  };

  const confirmDelete = async () => {
    if (ratingToDelete === null) return;

    try {
      await ratingRepository.delete(ratingToDelete);
      setRating(null);
      setRatingToDelete(null);
    } catch (err) {
      console.error("Failed to delete rating:", err);
    }
  };

  const cancelDelete = () => {
    setRatingToDelete(null);
  };

  if (!player) return <p>Loading player...</p>;

  return (
    <div className="full-report-container">
      <div className="header">
        <h4>FULL PLAYER REPORT</h4>
      </div>
      <div className="main-content">
        <div className="player-infos">
          {player ? (
            <>
              <div className="personal-infos" onClick={updatePlayerButton}>
                <div className="image-container">
                  <img
                    className="player-image"
                    src={getPlayerImage(player.image, player.positions)}
                    alt="player-icon"
                  />
                </div>
                <div className="infos-container">
                  <div className="name-and-surname">
                    {player.name} {player.surname}
                  </div>
                  <div className="properties-with-icons">
                    <div className="property">
                      <div className="icon">
                        <CalendarIcon />
                      </div>
                      <div>{formatDate(player.birthdate)}</div>
                    </div>
                    <div className="property">
                      <div className="icon">
                        <HeightIcon />
                      </div>
                      <div>{player.height} cm</div>
                    </div>
                    <div className="property">
                      <div className="icon">
                        <HomeIcon />
                      </div>
                      <div>{player.birthplace}</div>
                    </div>
                    <div className="property">
                      <div className="icon">
                        <ShirtIcon />
                      </div>
                      <div>{player.shirtNumber}</div>
                    </div>
                  </div>
                  <div>Current club: {player.club}</div>
                </div>

                <div className="edit-icon">
                  <PenModifyIcon />
                </div>
              </div>
              <div className="positions-display">
                <div className="field-image">
                  <img
                    src="/assets/30547222_football_field_right_side_61.jpg"
                    alt="soccer-field"
                  />
                  {player?.positions &&
                    parsePositions(player.positions).map((pos, index) => (
                      <div
                        key={index}
                        className="position-dot"
                        style={getDotPosition(pos)}
                        title={pos}
                      />
                    ))}
                </div>

                <div className="positions">
                  <span>Position: {player.positions}</span>
                </div>
              </div>

              <div className="ratings-showcase">
                {rating ? (
                  <>
                    <HexagonRatingsChart
                      ratings={rating}
                      playerName={`${player?.name} ${player?.surname}`}
                    />
                    <div className="ratings-hover-icons">
                      <div
                        className="edit-icon"
                        onClick={() => updateRatingButton()}
                      >
                        <PenModifyIcon />
                      </div>
                      <div
                        className="trash-can-icon"
                        onClick={() => requestDelete(player.id)}
                      >
                        <TrashCanIcon />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="add-ratings-container">
                    <p>Add player's ratings</p>
                    <div className="btn-container">
                      <button
                        className="add-ratings-btn"
                        onClick={addRatingsButton}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <p>No player found</p>
          )}
        </div>
        <div className="stats">
          <div className="header">
            <div className="header-and-button-wrapped">
              <h3>STATS</h3>
              <div className="btn-container">
                <button className="add-stats-btn" onClick={addStatsButton}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          </div>
          <div className="table-container">
            <table>
              <tr>
                <th>Season</th>
                <th>Club</th>
                <th>Matches Played</th>
                <th>Goals</th>
                <th>Assists</th>
                <th></th>
              </tr>
              {stats?.map((stat, index) => {
                const { season, club, matchesPlayed, goals, assists } = stat;
                return (
                  <tr key={`${index}${season}${club}`}>
                    <td>{season}</td>
                    <td>{club}</td>
                    <td>{matchesPlayed}</td>
                    <td>{goals}</td>
                    <td>{assists}</td>
                    <td>
                      <div className="table-cell-icons">
                        <PenModifyIcon />
                        <TrashCanIcon />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
        <div>
          <a>Report by</a>
        </div>
      </div>
      <ConfirmModal
        isOpen={ratingToDelete !== null}
        title="Delete Rating"
        message={`Are you sure you want to delete this player's rating?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};
