import { IRatings } from "../api/apiInterface";

const url = "https://localhost:7066/api";

export const ratingRepository = {
  getRatingByPlayerId: async (playerId: string): Promise<IRatings | null> => {
    const res = await fetch(`${url}/Ratings`);
    if (!res.ok) throw new Error("Failed to fetch ratings");

    const allRatings: IRatings[] = await res.json();
    return allRatings.find((r) => r.playerId === Number(playerId)) || null;
  },
};
