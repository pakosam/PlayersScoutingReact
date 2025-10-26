import { IScouts } from "../api/apiInterface";

const url = "https://localhost:7066/api";

export const scoutRepository = {
  getAllScouts: async (): Promise<IScouts[]> => {
    const response = await fetch(`${url}/Scouts`);
    if (!response.ok) throw new Error("Failed to fetch scouts");
    return response.json();
  },

  create: async (scout: Omit<IScouts, "id">): Promise<IScouts> => {
    const response = await fetch(`${url}/Scouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scout),
    });
    if (!response.ok)
      throw new Error(`Failed to create scout: ${response.status}`);
    return response.json();
  },
};
