import { IPlayer, IPlayers } from "../api/apiInterface";

const url = "https://localhost:7066/api";

export const playerRepository = {
  getAllPlayers: async (): Promise<IPlayers[]> => {
    const response = await fetch(`${url}/Players`);
    if (!response.ok) throw new Error("Failed to fetch players");
    return response.json();
  },

  getSinglePlayer: async (id: string): Promise<IPlayer> => {
    const response = await fetch(`${url}/Players/${id}`);
    if (!response.ok) throw new Error("Failed to fetch player");
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${url}/Players?id=${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete player");
    return response.json();
  },

  create: async (player: Omit<IPlayers, "id">): Promise<IPlayers> => {
    const response = await fetch(`${url}/Players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(player),
    });
    if (!response.ok) throw new Error(`Failed to create player: ${response.status}`);
    return response.json();
  },
};
