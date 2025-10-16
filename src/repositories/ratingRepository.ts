import { IRatings } from "../api/apiInterface";

const url = "https://localhost:7066/api";

export const ratingRepository = {
  getRatingByPlayerId: async (playerId: string): Promise<IRatings> => {
    const result = await fetch(`${url}/Ratings/${playerId}`);
    if (!result.ok) throw new Error("Failed to fetch ratings");

    const allRatings: IRatings = await result.json();
    return allRatings
  },
};
