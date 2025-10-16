import { useParams } from "react-router-dom";
import { useState } from "react";
import { IPlayer, IStats } from "../api/apiInterface";
import { IRatings } from "../api/apiInterface";
import { useEffect } from "react";
import { playerRepository } from "../repositories/playerRepository";
import { ratingRepository } from "../repositories/ratingRepository";
import "./FullReport.css";
import { statRepository } from "../repositories/statRepository";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../components/PlayerView/ConfirmModal";
import { EditStatModal } from "../components/PlayerView/EditStatModal";
import { PlayerInfos } from "../components/FullReport/PlayerInfos";
import { StatsSection } from "../components/FullReport/StatsSection";

export const FullReport = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const [player, setPlayer] = useState<IPlayer | null>(null);
  const [rating, setRating] = useState<IRatings | null>(null);
  const [stats, setStats] = useState<IStats[]>();
  const [ratingToDelete, setRatingToDelete] = useState<number | null>(null);
  const [statToDelete, setStatToDelete] = useState<number | null>(null);
  const navigate = useNavigate();

  const [editingStat, setEditingStat] = useState<IStats | null>(null);

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
  };

  const requestRatingsDelete = (id: number) => {
    setRatingToDelete(id);
  };

  const confirmRatingsDelete = async () => {
    if (ratingToDelete === null) return;

    try {
      await ratingRepository.delete(ratingToDelete);
      setRating(null);
      setRatingToDelete(null);
    } catch (err) {
      console.error("Failed to delete rating:", err);
    }
  };

  const cancelRatingsDelete = () => {
    setRatingToDelete(null);
  };

  const requestStatsDelete = (id: number) => {
    setStatToDelete(id);
  };

  const confirmStatsDelete = async () => {
    if (statToDelete === null) return;

    try {
      await statRepository.delete(statToDelete);
      setStats((prevStats) =>
        prevStats?.filter((stat) => stat.id !== statToDelete)
      );
      setStatToDelete(null);
    } catch (err) {
      console.error("Failed to delete stats:", err);
    }
  };

  const cancelStatsDelete = () => {
    setStatToDelete(null);
  };

  const startEditStat = (stat: IStats) => setEditingStat(stat);

  if (!player) return <p>Loading player...</p>;

  return (
    <div className="full-report-container">
      <div className="header">
        <h4>FULL PLAYER REPORT</h4>
      </div>
      <div className="main-content">
        <PlayerInfos
          player={player}
          rating={rating}
          onUpdatePlayer={updatePlayerButton}
          onAddRatings={addRatingsButton}
          onUpdateRating={updateRatingButton}
          onDeleteRating={() => requestRatingsDelete(player.id)}
        />
        <StatsSection
          stats={stats || []}
          onAddStats={addStatsButton}
          onEditStat={startEditStat}
          onDeleteStat={requestStatsDelete}
        />
        {editingStat && (
          <EditStatModal
            stat={editingStat}
            onSave={async (updatedStat) => {
              setEditingStat(null);
              const player = await playerRepository.getSinglePlayer(playerId!);
              const fullName = `${player.name} ${player.surname}`;
              const updatePayload = { ...updatedStat, fullName };
              await statRepository.updateStats(updatePayload);
              const refreshed = await statRepository.getStatByPlayerId(
                playerId!
              );
              setStats(refreshed);
            }}
            onCancel={() => setEditingStat(null)}
          />
        )}
        <div>
          <a>Report by</a>
        </div>
      </div>
      <ConfirmModal
        isOpen={ratingToDelete !== null}
        title="Delete Rating"
        message={`Are you sure you want to delete this player's rating?`}
        onConfirm={confirmRatingsDelete}
        onCancel={cancelRatingsDelete}
      />
      <ConfirmModal
        isOpen={statToDelete !== null}
        title="Delete Stats"
        message={`Are you sure you want to delete this player's stats?`}
        onConfirm={confirmStatsDelete}
        onCancel={cancelStatsDelete}
      />
    </div>
  );
};
