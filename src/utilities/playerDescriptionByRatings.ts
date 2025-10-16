import { IRatings } from "../api/apiInterface";

export const playerDescriptionByRatings = (
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