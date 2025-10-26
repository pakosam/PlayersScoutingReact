import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { IRatings } from "../../api/apiInterface";

interface HexagonRatingsChartProps {
  ratings: IRatings;
  playerName?: string;
}

export const HexagonRatingsChart: React.FC<HexagonRatingsChartProps> = ({
  ratings,
  playerName,
}) => {
  const data = [
    { attribute: "Attack", value: ratings.attack },
    { attribute: "Defense", value: ratings.defense },
    { attribute: "Tactics", value: ratings.tactics },
    { attribute: "Technique", value: ratings.technique },
    { attribute: "Physical", value: ratings.physicalStrength },
    { attribute: "Mental", value: ratings.mentalStrength },
  ];

  console.log("Radar chart data:", data);

  const ratingValues = data.map((d) => d.value);
  const maxValue = Math.max(...ratingValues, 10);

  return (
    <div
      style={{ width: "100%", height: 400, maxWidth: 500, margin: "0 auto" }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#ccc" gridType="polygon" />

          <PolarAngleAxis
            dataKey="attribute"
            stroke="#333"
            tick={{ fontSize: 16 }}
          />

          <PolarRadiusAxis
            domain={[0, maxValue]}
            tickCount={6}
            stroke="#aaa"
            tick={{ fontSize: 10 }}
            tickFormatter={(val) => val.toFixed(1)}
          />

          <Radar
            name={playerName || "Player"}
            dataKey="value"
            stroke="#ff5722"
            strokeWidth={2}
            fill="rgba(255,87,34,0.6)"
            fillOpacity={0.6}
            dot={{ r: 5, fill: "#ff5722" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
