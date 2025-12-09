import { IAddRatings, IRatings, IUpdateRatings } from "../api/apiInterface";
import { axiosInstance } from "../api/axiosInstance";

class RatingRepository {
  async getRatingByPlayerId(playerId: number): Promise<IRatings> {
    const response = await axiosInstance.get(`/Ratings/player/${playerId}`);
    return response.data[0];
  }

  async addRatings(credentials: IAddRatings): Promise<IRatings> {
    const response = await axiosInstance.post("/Ratings", credentials);
    return response.data;
  }

  async updateRatings(credentials: IUpdateRatings): Promise<IRatings> {
    const response = await axiosInstance.put("/Ratings", credentials);
    return response.data;
  }

  async deleteRatings(id: number): Promise<IRatings> {
    const response = await axiosInstance.delete(`/Ratings?id=${id}`);
    return response.data;
  }
}

export const ratingRepository = new RatingRepository();
