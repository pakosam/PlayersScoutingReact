import { useEffect, useState } from "react";
import "./App.css";
import { OptionIcon } from "./icons/OptionIcon";
import { error } from "console";

interface IPlayers {
  id: number;
  image?: string;
  name: string;
  surname: string;
  club: string;
}

function App() {
  const [players, setPlayers] = useState<IPlayers[]>();

  useEffect(() => {
    fetch("https://localhost:7066/api/Players")
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Error: ", error));
  }, []);

  return (
    <div id="main-menu">
      <div className="header-and-options-button">
        <div>
          <h1>Players Scouting</h1>
        </div>
        <div>
          <OptionIcon />
        </div>
      </div>
      <div className="selected-option">
        <h3>Reports</h3>
      </div>
      <div className="list">
        {players?.map((player, index) => {
          const { image, name, surname, club } = player;
          return (
            <div key={`${index}${name}${surname}${club}`} className="player">
              <div className="image-container">
                <img
                  className="player-image"
                  src={image || "/assets/forward.png"}
                />
              </div>
              <div className="player-info">
                <p className="player-info-fullname">Scouting report: {name + " " + surname}</p>
                <p className="player-info-club">Club: {club}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
