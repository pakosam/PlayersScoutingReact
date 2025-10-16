import React from "react";
import { IPlayer } from "../../api/apiInterface";
import { getPlayerImage } from "../../utilities/getPlayerImage";
import { formatDate } from "../../utilities/formatDate";
import { CalendarIcon } from "../../icons/CalendarIcon";
import { HeightIcon } from "../../icons/HeightIcon";
import { HomeIcon } from "../../icons/HomeIcon";
import { ShirtIcon } from "../../icons/ShirtIcon";
import { PenModifyIcon } from "../../icons/PenModifyIcon";
import "./PersonalInfos.css";

interface PersonalInfosProps {
  player: IPlayer;
  onUpdatePlayer: () => void;
}

export const PersonalInfos: React.FC<PersonalInfosProps> = ({
  player,
  onUpdatePlayer,
}) => {
  const {
    image,
    name,
    surname,
    birthdate,
    birthplace,
    height,
    shirtNumber,
    positions,
    club,
  } = player;
  return (
    <div className="personal-infos" onClick={onUpdatePlayer}>
      <div className="image-container">
        <img
          className="player-image"
          src={getPlayerImage(image, positions)}
          alt="player-icon"
        />
      </div>
      <div className="infos-container">
        <div className="name-and-surname">
          {name} {surname}
        </div>
        <div className="properties-with-icons">
          <div className="property">
            <div className="icon">
              <CalendarIcon />
            </div>
            <div>{formatDate(birthdate)}</div>
          </div>
          <div className="property">
            <div className="icon">
              <HeightIcon />
            </div>
            <div>{height} cm</div>
          </div>
          <div className="property">
            <div className="icon">
              <HomeIcon />
            </div>
            <div>{birthplace}</div>
          </div>
          <div className="property">
            <div className="icon">
              <ShirtIcon />
            </div>
            <div>{shirtNumber}</div>
          </div>
        </div>
        <div>Current club: {club}</div>
      </div>

      <div className="edit-icon">
        <PenModifyIcon />
      </div>
    </div>
  );
};
