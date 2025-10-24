import { useParams } from "react-router-dom";
import { useState } from "react";
import { IStats } from "../api/apiInterface";
import { playerRepository } from "../repositories/playerRepository";
import { ratingRepository } from "../repositories/ratingRepository";
import "./FullReport.css";
import { statRepository } from "../repositories/statRepository";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../components/PlayerView/ConfirmModal";
import { EditStatsModal } from "../components/PlayerView/EditStatsModal";
import { PlayerInfos } from "../components/FullReport/PlayerInfos";
import { StatsSection } from "../components/FullReport/StatsSection";
import { usePlayerData } from "../api/usePlayerData";

export const FullReport = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const { player, rating, stats, setStats } = usePlayerData(playerId);
  const [showDeleteRatingModal, setShowDeleteRatingModal] = useState(false);
  const [showDeleteStatsModal, setShowDeleteStatsModal] = useState(false);
  const [statsToEdit, setStatsToEdit] = useState<IStats | null>(null);
  const navigate = useNavigate();

  const navigateTo = (
    action: "update-player" | "add-ratings" | "update-ratings" | "add-stats"
  ) => {
    if (!playerId) return;
    const path = `/players/${playerId}/${action}`;

    if (action === "add-stats" && player) {
      navigate(path, {
        state: { fullName: `${player.name} ${player.surname}` },
      });
    } else {
      navigate(path);
    }
  };

  const requestDeleteRatings = () => {
    setShowDeleteRatingModal(true);
  };

  const cancelDeleteRatings = () => {
    setShowDeleteRatingModal(false);
  };

  const confirmDeleteRatings = async () => {
    if (!playerId) return;

    try {
      await ratingRepository.delete(Number(playerId));
      setShowDeleteRatingModal(false);
    } catch (err) {
      console.error("Failed to delete rating:", err);
    }
  };

  const requestDeleteStats = () => {
    setShowDeleteStatsModal(true);
  };

  const cancelDeleteStats = () => {
    setShowDeleteStatsModal(false);
  };

  const confirmDeleteStats = async (id: number) => {
    try {
      await statRepository.delete(id);
      setStats(
        (prevStats) => prevStats?.filter((stats) => stats.id !== id) || []
      );
      setShowDeleteStatsModal(false);
    } catch (err) {
      console.error("Failed to delete stats:", err);
    }
  };

  const editStatsModal = () => {
    if (!statsToEdit || !playerId) return null;

    const updateStats = async (updatedStat: IStats) => {
      setStatsToEdit(null);
      const player = await playerRepository.getSinglePlayer(playerId);
      const fullName = `${player.name} ${player.surname}`;
      const updatePayload = { ...updatedStat, fullName };
      await statRepository.updateStats(updatePayload);
      const updatedStats = await statRepository.getStatByPlayerId(playerId);
      setStats(updatedStats);
    };

    const cancelEditStats = () => {
      setStatsToEdit(null);
    };

    return (
      <EditStatsModal
        stats={statsToEdit}
        onSave={updateStats}
        onCancel={cancelEditStats}
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
          onDeleteRating={requestDeleteRatings}
        />
        <StatsSection
          stats={stats || []}
          onAddStats={() => navigateTo("add-stats")}
          onEditStat={setStatsToEdit}
          onDeleteStat={requestDeleteStats}
        />
        {editStatsModal()}
        <div>
          <a>Report by</a>
        </div>
      </div>
      <ConfirmModal
        isOpen={showDeleteRatingModal}
        title="Delete Rating"
        message={`Are you sure you want to delete this player's rating?`}
        onConfirm={confirmDeleteRatings}
        onCancel={cancelDeleteRatings}
      />
      <ConfirmModal
        isOpen={showDeleteStatsModal}
        title="Delete Stats"
        message={`Are you sure you want to delete this player's stats?`}
        onConfirm={() => confirmDeleteStats(Number(playerId!))}
        onCancel={cancelDeleteStats}
      />
    </div>
  );
};
