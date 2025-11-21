import { IScout, IScouts, IAddScout, IUpdateScout } from "../api/apiInterface";
import { axiosInstance } from "../api/axiosInstance";

class ScoutRepository {
  async getAllScouts(): Promise<IScouts[]> {
    const response = await axiosInstance.get<IScouts[]>("/Scouts");
    return response.data;
  }

  async getSingleScout(id: number) {
    const response = await axiosInstance.get<IScout>(`/Scouts/${id}`);
    return response.data;
  }

  async deleteScout(id: number): Promise<IScout> {
    const response = await axiosInstance.delete<IScout>(`/Scouts?id=${id}`);
    return response.data;
  }

  async addScout(credentials: IAddScout) {
    const response = await axiosInstance.post("/Scouts", credentials);
    return response.data;
  }

  async updateScout(credentials: IUpdateScout) {
    const response = await axiosInstance.put("/Scouts", credentials);
    return response.data;
  }
}

export const scoutRepository = new ScoutRepository();
