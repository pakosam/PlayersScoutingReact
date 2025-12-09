import {
  IPlayer,
  IPlayers,
  IAddPlayer,
  IUpdatePlayer,
} from "../api/apiInterface";
import { axiosInstance } from "../api/axiosInstance";

class PlayerRepository {
  async getAllPlayers(): Promise<IPlayers[]> {
    const response = await axiosInstance.get<IPlayers[]>("/Players");
    return response.data;
  }

  async getSinglePlayer(id: number) {
    const response = await axiosInstance.get<IPlayer>(`/Players/${id}`);
    return response.data;
  }

  async deletePlayer(id: number): Promise<void> {
    const response = await axiosInstance.delete<void>(`/Players?id=${id}`);
    return response.data;
  }

  async addPlayer(credentials: IAddPlayer) {
    const response = await axiosInstance.post("/Players", credentials);
    return response.data;
  }

  async updatePlayer(credentials: IUpdatePlayer) {
    const response = await axiosInstance.put("/Players", credentials);
    return response.data;
  }
}

export const playerRepository = new PlayerRepository();
