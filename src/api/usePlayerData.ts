import { useEffect, useState } from "react";
import { IPlayer, IRatings, IStats } from "./apiInterface";
import { playerRepository } from "../repositories/playerRepository";
import { ratingRepository } from "../repositories/ratingRepository";
import { statRepository } from "../repositories/statRepository";

export const usePlayerData = (playerId?: string) => {
  const [player, setPlayer] = useState<IPlayer | null>(null);
  const [rating, setRating] = useState<IRatings | null>(null);
  const [stats, setStats] = useState<IStats[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!playerId) return;

    const load = async () => {
      setLoading(true);
      try {
        setError(null);

        const player = await playerRepository.getSinglePlayer(Number(playerId));
        const rating = await ratingRepository.getRatingByPlayerId(
          Number(playerId)
        );
        const stats = await statRepository.getStatByPlayerId(Number(playerId));

        setPlayer(player);
        setRating(rating);
        setStats(stats);
      } catch (err) {
        console.error("Error loading player data:", err);
        setError("Failed to load player data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [playerId]);

  return {
    player,
    rating,
    stats,
    error,
    loading,
    setPlayer,
    setRating,
    setStats,
  };
};
