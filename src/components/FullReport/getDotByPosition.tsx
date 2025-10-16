export const getDotPosition = (position: string): React.CSSProperties => {
  const normalized = position.toLowerCase().trim();

  const map: Record<string, { top: string; left: string }> = {
    goalkeeper: { top: "50%", left: "10%" },

    "center back": { top: "50%", left: "23%" },
    "left back": { top: "18%", left: "23%" },
    "right back": { top: "82%", left: "23%" },
    "left wingback": { top: "18%", left: "32%" },
    "right wingback": { top: "82%", left: "32%" },

    "defensive midfielder": { top: "50%", left: "37%" },
    "central midfielder": { top: "50%", left: "50%" },
    "left midfielder": { top: "18%", left: "50%" },
    "right midfielder": { top: "82%", left: "50%" },
    "attacking midfielder": { top: "50%", left: "63%" },

    "left winger": { top: "18%", left: "71%" },
    "right winger": { top: "82%", left: "71%" },
    striker: { top: "50%", left: "76%" },
  };

  const pos = map[normalized] || { top: "50%", left: "50%" };

  return {
    position: "absolute",
    top: pos.top,
    left: pos.left,
    transform: "translate(-50%, -50%)",
  };
};
