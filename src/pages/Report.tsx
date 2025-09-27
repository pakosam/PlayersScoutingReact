import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Report.css";

interface IPlayer {
  id: number;
  image?: string;
  name: string;
  surname: string;
  birthdate: string;
  birthplace: string;
  foot: string;
  positions: string;
  club: string;
}

interface IRatings {
  id: number;
  attack: number;
  defense: number;
  tactics: number;
  technique: number;
  physicalStrength: number;
  mentalStrength: number;
  playerId: number;
}

const getPlayerImage = (
  image: string | undefined,
  positions?: string
): string => {
  if (image) return image;

  const firstPosition = positions?.split(",")[0]?.trim().toLowerCase();

  switch (firstPosition) {
    case "goalkeeper":
      return "/assets/goalkeeper.png";
    case "defender":
    case "centre back":
    case "left back":
    case "right back":
    case "wingback":
    case "left wingback":
    case "right wingback":
      return "/assets/defender.png";
    case "midfielder":
    case "defensive midfielder":
    case "central midfielder":
    case "left midfielder":
    case "right midfielder":
    case "attacking midfielder":
      return "/assets/midfielder.png";
    case "winger":
    case "left winger":
    case "right winger":
    case "forward":
    case "striker":
      return "/assets/forward.png";
    default:
      return "/assets/default.png";
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const getOrdinal = (n: number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  };

  return `${month} ${day}${getOrdinal(day)} ${year}`;
};

const generatePlayerDescription = (
  rating: IRatings | null,
  playerName: string
): string[] => {
  if (!rating) return ["No ratings available."];

  const {
    attack,
    defense,
    tactics,
    technique,
    physicalStrength,
    mentalStrength,
  } = rating;
  const sentences: string[] = [];

  if (attack >= 8)
    sentences.push(`${playerName} is a constant threat in attack.`);
  else if (attack >= 5)
    sentences.push(`${playerName} contributes fairly well going forward.`);
  else sentences.push(`${playerName} rarely impacts the attack.`);

  if (defense >= 8) sentences.push(`Defensively, ${playerName} is rock solid.`);
  else if (defense >= 5)
    sentences.push(`${playerName} holds his own defensively.`);
  else
    sentences.push(`Defending is definitely a weak point for ${playerName}.`);

  if (technique >= 8) sentences.push(`Technically, he is a joy to watch.`);
  else if (technique >= 5)
    sentences.push(`He has decent control when in possession.`);
  else sentences.push(`He often struggles with ball control and passing.`);

  if (tactics >= 8) sentences.push(`His tactical awareness is outstanding.`);
  else if (tactics >= 5)
    sentences.push(`He generally reads the game fairly well.`);
  else sentences.push(`He often gets caught out of position tactically.`);

  if (physicalStrength >= 8)
    sentences.push(`Physically, he rarely loses a battle.`);
  else if (physicalStrength >= 5)
    sentences.push(`He has average physical strength and stamina.`);
  else sentences.push(`He struggles against more physical opponents.`);

  if (mentalStrength >= 8)
    sentences.push(`Mentally, he thrives under pressure.`);
  else if (mentalStrength >= 5)
    sentences.push(`He shows decent composure most of the time.`);
  else sentences.push(`He often loses focus in tough moments.`);

  return sentences;
};

export const Report = () => {
  const navigate = useNavigate();

  const { playerId } = useParams<{ playerId: string }>();
  const [player, setPlayer] = useState<IPlayer | null>(null);
  const [rating, setRating] = useState<IRatings | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const playerRes = await fetch(
        `https://localhost:7066/api/Players/${playerId}`
      );
      const playerData = await playerRes.json();
      setPlayer(playerData);

      const ratingsRes = await fetch("https://localhost:7066/api/Ratings");
      const allRatings: IRatings[] = await ratingsRes.json();

      const playerRating = allRatings.find(
        (r) => r.playerId === Number(playerId)
      );

      setRating(playerRating || null);
    };

    fetchData();
  }, [playerId]);

  return (
    <div
      className="report-container"
      style={{
        backgroundImage:
          'url("/assets/view-empty-soccer-stadium-with-fantasy-dreamy-sky.jpg")',
      }}
    >
      {player ? (
        <>
          <div className="player-name-and-surname">
            <div className="player-header">
              <h4>Report:</h4>
              <span>
                {player.name} {player.surname}
              </span>
            </div>

            <div className="image-container">
              <img
                className="player-image"
                src={getPlayerImage(player.image, player.positions)}
              />
            </div>
          </div>

          <div className="description">
            <p>
              {player.name} {player.surname} ({player.birthplace},{" "}
              {formatDate(player.birthdate)}) is {player.foot} foot{" "}
              {player.positions} who currently plays for {player.club}
            </p>

            <div className="player-report">
              <h4>Performance Report:</h4>
              <p>
                {rating
                  ? generatePlayerDescription(rating, player.name).join(" ")
                  : "Report not available for this player yet."}
              </p>
            </div>
          </div>

          <div className="link-for-full-report">
            <a href={`/players/${player.id}/full-report`}>View full report →</a>
          </div>
        </>
      ) : (
        <p>No player found</p>
      )}
    </div>
  );
};
