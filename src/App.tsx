import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { PlayerView } from "./pages/PlayerView";
import { AddPlayer } from "./pages/AddPlayer";
import { Report } from "./pages/Report";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const rootClass =
    location.pathname === "/players" ? "root-playerview" : "root-default";

  return (
    <div id="root" className={rootClass}>
      <Routes>
        <Route path="/" element={<Navigate to="/players" replace />} />
        <Route path="/players" element={<PlayerView />} />
        <Route path="/players/add-player" element={<AddPlayer />} />
        <Route path="/players/:playerId/info" element={<Report />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
