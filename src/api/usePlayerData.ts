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

  useEffect(() => {
    if (!playerId) return;

    const load = async () => {
      try {
        setError(null);

        const [player, rating, stats] = await Promise.all([
          playerRepository.getSinglePlayer(playerId),
          ratingRepository.getRatingByPlayerId(playerId),
          statRepository.getStatByPlayerId(playerId),
        ]);

        setPlayer(player);
        setRating(rating);
        setStats(stats);
      } catch (err) {
        console.error("Error loading player data:", err);
        setError("Failed to load player data");
      }
    };

    load();
  }, [playerId]);

  return { player, rating, stats, error, setPlayer, setRating, setStats };
};
