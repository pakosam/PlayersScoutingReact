export const getPlayerImage = (
  image: string | undefined,
  positions?: string
): string => {
  if (image) return image;

  const firstPosition = positions?.split(",")[0]?.trim().toLowerCase();

  switch (firstPosition) {
    case "goalkeeper":
      return "/assets/goalkeeper.png";
    case "defender":
    case "center back":
    case "left back":
    case "right back":
    case "left wingback":
    case "right wingback":
      return "/assets/defender.png";
    case "defensive midfielder":
    case "central midfielder":
    case "left midfielder":
    case "right midfielder":
    case "attacking midfielder":
      return "/assets/midfielder.png";
    case "left winger":
    case "right winger":
    case "striker":
      return "/assets/forward.png";
    default:
      return "/assets/default.png";
  }
};