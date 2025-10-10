import { IAddStats, IStats } from "../api/apiInterface";

const url = "https://localhost:7066/api";

export const statRepository = {
  getStatByPlayerId: async (playerId: string): Promise<IStats[]> => {
    const result = await fetch(`${url}/Stats/player/${playerId}`);
    if (!result.ok) throw new Error("Failed to fetch stats");

    const allStats: IStats[] = await result.json();
    return allStats;
  },

  addStats: async (stats: IAddStats): Promise<IStats> => {
    const response = await fetch(`${url}/Stats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...stats,
        player_id: stats.playerId,
      }),
    });
    if (!response.ok) throw new Error("Failed to add stats");

    const data: IStats = await response.json();
    return data;
  },
};
