export const parsePositions = (positions: string): string[] => {
  if (!positions) return [];
  return positions
    .split(/[,/]+/)
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean);
};
