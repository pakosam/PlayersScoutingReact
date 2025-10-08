import { IAddRatings, IPlayers, IRatings } from "../api/apiInterface";

const url = "https://localhost:7066/api";

export const ratingRepository = {
  getRatingByPlayerId: async (playerId: string): Promise<IRatings | null> => {
    const result = await fetch(`${url}/Ratings`);
    if (!result.ok) throw new Error("Failed to fetch ratings");

    const allRatings: IRatings[] = await result.json();
    const ratingForPlayer =
      allRatings.find((r) => r.playerId === Number(playerId)) || null;
    return ratingForPlayer;
  },

  addRatings: async (ratings: IAddRatings): Promise<IRatings> => {
    const response = await fetch(`${url}/Ratings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ratings),
    });
    if (!response.ok) throw new Error("Failed to add ratings");

    const data: IRatings = await response.json();
    return data;
  },
};
