import { IAddStats, IStats, IUpdateStats } from "../api/apiInterface";
import { axiosInstance } from "../api/axiosInstance";

class StatRepository {
  async getStatByPlayerId(playerId: number): Promise<IStats[]> {
    const response = await axiosInstance.get<IStats[]>(
      `/Stats/player/${playerId}`
    );
    return response.data;
  }

  async addStats(credentials: IAddStats) {
    const response = await axiosInstance.post<IAddStats>("/Stats", credentials);
    return response.data;
  }

  async updateStats(credentials: IUpdateStats) {
    const response = await axiosInstance.put<IUpdateStats>(
      "/Stats",
      credentials
    );
    return response.data;
  }

  async deleteStats(id: number) {
    const response = await axiosInstance.delete<IStats>(`/Stats/${id}`);
    return response.data;
  }
}

export const statRepository = new StatRepository();
