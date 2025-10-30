import { IScout, IScouts } from "../api/apiInterface";

const url = "https://localhost:7066/api";

export const scoutRepository = {
  getAllScouts: async (): Promise<IScouts[]> => {
    const response = await fetch(`${url}/Scouts`);
    if (!response.ok) throw new Error("Failed to fetch scouts");
    return response.json();
  },

  getSingleScout: async (id: string): Promise<IScout> => {
      const response = await fetch(`${url}/Scouts/${id}`);
      if (!response.ok) throw new Error("Failed to fetch scout");
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

  update: async (scout: Omit<IScouts, "id">): Promise<IScouts> => {
    const response = await fetch(`${url}/Scouts`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scout),
    });
    if (!response.ok)
      throw new Error(`Failed to update scout: ${response.status}`);
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${url}/Scouts?id=${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete scout");
    return response.json();
  },
};
