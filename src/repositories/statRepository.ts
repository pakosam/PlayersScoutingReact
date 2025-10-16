import { IStats } from "../api/apiInterface";

const url = "https://localhost:7066/api";

export const statRepository = {
  getStatByPlayerId: async (playerId: string): Promise<IStats[]> => {
    const result = await fetch(`${url}/Stats/player/${playerId}`);
    if (!result.ok) throw new Error("Failed to fetch stats");

    const allStats: IStats[] = await result.json();
    return allStats
  },
};
