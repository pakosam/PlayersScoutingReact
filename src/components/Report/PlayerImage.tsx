import React from "react";
import { getPlayerImage } from "../../utilities/getPlayerImage";
import "./PlayerImage.css";

interface PlayerImageProps {
  image?: string;
  positions?: string;
  alt: string;
}

export const PlayerImage: React.FC<PlayerImageProps> = ({
  image,
  positions,
  alt,
}) => (
  <div className="image-container">
    <img
      className="player-image"
      src={getPlayerImage(image, positions)}
      alt={alt}
    />
  </div>
);
