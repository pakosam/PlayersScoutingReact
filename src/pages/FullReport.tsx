import { useParams } from "react-router-dom";
import { useState } from "react";
import { IStats } from "../api/apiInterface";
import { playerRepository } from "../repositories/playerRepository";
import { ratingRepository } from "../repositories/ratingRepository";
import "./FullReport.css";
import { statRepository } from "../repositories/statRepository";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../components/PlayerView/ConfirmModal";
import { EditStatModal } from "../components/PlayerView/EditStatModal";
import { PlayerInfos } from "../components/FullReport/PlayerInfos";
import { StatsSection } from "../components/FullReport/StatsSection";
import { usePlayerData } from "../api/usePlayerData";

export const FullReport = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const { player, rating, stats, setStats } = usePlayerData(playerId);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [editingStat, setEditingStat] = useState<IStats | null>(null);
  const navigate = useNavigate();

  const navigateTo = (
    action: "update-player" | "add-ratings" | "update-ratings" | "add-stats"
  ) => {
    if (!playerId) return;

    let path = `/players/${playerId}`;

    switch (action) {
      case "update-player":
        path += "/update-player";
        break;
      case "add-ratings":
        path += "/add-ratings";
        break;
      case "update-ratings":
        path += "/update-ratings";
        break;
      case "add-stats":
        path += "/add-stats";
        break;
    }

    if (action === "add-stats" && player) {
      navigate(path, {
        state: { fullName: `${player.name} ${player.surname}` },
      });
    } else {
      navigate(path);
    }
  };

  const requestRatingsDelete = () => setShowRatingModal(true);
  const cancelRatingsDelete = () => setShowRatingModal(false);

  const confirmRatingsDelete = async () => {
    if (!playerId) return;

    try {
      await ratingRepository.delete(Number(playerId));
      setShowRatingModal(false);
    } catch (err) {
      console.error("Failed to delete rating:", err);
    }
  };

  const requestStatsDelete = () => setShowStatsModal(true);
  const cancelStatsDelete = () => setShowStatsModal(false);

  const confirmStatsDelete = async (id: number) => {
    try {
      await statRepository.delete(id);
      setStats(
        (prevStats) => prevStats?.filter((stats) => stats.id !== id) || []
      );
      setShowStatsModal(false);
    } catch (err) {
      console.error("Failed to delete stats:", err);
    }
  };

  const editStatModal = () => {
    if (!editingStat || !playerId) return null;

    const handleSave = async (updatedStat: IStats) => {
      setEditingStat(null);
      const player = await playerRepository.getSinglePlayer(playerId);
      const fullName = `${player.name} ${player.surname}`;
      const updatePayload = { ...updatedStat, fullName };
      await statRepository.updateStats(updatePayload);
      const refreshed = await statRepository.getStatByPlayerId(playerId);
      setStats(refreshed);
    };

    const handleCancel = () => setEditingStat(null);

    return (
      <EditStatModal
        stat={editingStat}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  };

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
          onUpdatePlayer={() => navigateTo("update-player")}
          onAddRatings={() => navigateTo("add-ratings")}
          onUpdateRating={() => navigateTo("update-ratings")}
          onDeleteRating={requestRatingsDelete}
        />
        <StatsSection
          stats={stats || []}
          onAddStats={() => navigateTo("add-stats")}
          onEditStat={setEditingStat}
          onDeleteStat={requestStatsDelete}
        />
        {editStatModal()}
        <div>
          <a>Report by</a>
        </div>
      </div>
      <ConfirmModal
        isOpen={showRatingModal}
        title="Delete Rating"
        message={`Are you sure you want to delete this player's rating?`}
        onConfirm={confirmRatingsDelete}
        onCancel={cancelRatingsDelete}
      />
      <ConfirmModal
        isOpen={showStatsModal}
        title="Delete Stats"
        message={`Are you sure you want to delete this player's stats?`}
        onConfirm={() => confirmStatsDelete(Number(playerId!))}
        onCancel={cancelStatsDelete}
      />
    </div>
  );
};
