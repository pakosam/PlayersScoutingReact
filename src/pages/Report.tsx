import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Report.css";

import { IPlayer, IRatings } from "../api/apiInterface";
import { playerRepository } from "../repositories/playerRepository";
import { ratingRepository } from "../repositories/ratingRepository";

import { PlayerHeader } from "../components/Report/PlayerHeader";
import { GeneralPlayerDescription } from "../components/Report/GeneralPlayerDescription";

export const Report = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const [player, setPlayer] = useState<IPlayer | null>(null);
  const [rating, setRating] = useState<IRatings | null>(null);

  useEffect(() => {
    if (!playerId) return;

    const load = async () => {
      try {
        const player = await playerRepository.getSinglePlayer(Number(playerId));
        setPlayer(player);

        const rating = await ratingRepository.getRatingByPlayerId(
          Number(playerId)
        );
        setRating(rating);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [playerId]);

  return (
    <div
      className="report-container"
      style={{
        backgroundImage:
          'url("/assets/view-empty-soccer-stadium-with-fantasy-dreamy-sky.jpg")',
      }}
    >
      {player ? (
        <>
          <PlayerHeader player={player} />
          <GeneralPlayerDescription player={player} rating={rating} />
          <div className="link-for-full-report">
            <a href={`/players/${player.id}/full-report`}>View full report →</a>
          </div>
        </>
      ) : (
        <p>No player found</p>
      )}
    </div>
  );
};
