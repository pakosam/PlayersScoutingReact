import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PlayerView } from "./pages/PlayerView";
import { AddPlayer } from "./pages/AddPlayer";
import { Report } from "./pages/Report";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/players" replace />} />
        <Route path="/players" element={<PlayerView />} />
        <Route path="/players/add-player" element={<AddPlayer />} />
        <Route path="/players/:playerId/info" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
