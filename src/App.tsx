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
import { FullReport } from "./pages/FullReport";
import { UpdatePlayer } from "./pages/UpdatePlayer";
import { AddRatings } from "./pages/AddRatings";
import { UpdateRatings } from "./pages/UpdateRatings";
import { AddStats } from "./pages/AddStats";
import { ScoutView } from "./pages/ScoutView";
import { AddScout } from "./pages/AddScout";
import { UpdateScout } from "./pages/UpdateScout";
import { HomePage } from "./pages/HomePage";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

function AppContent() {
  const location = useLocation();
  const rootClass =
    location.pathname === "/players" || location.pathname === "/scouts"
      ? "root-playerview"
      : "root-default";

  return (
    <div id="root" className={rootClass}>
      <Routes>
        <Route path="/" element={<Navigate to="/home-page" replace />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/players" element={<PlayerView />} />
        <Route path="/players/add-player" element={<AddPlayer />} />
        <Route path="/players/:playerId/info" element={<Report />} />
        <Route path="/players/:playerId/full-report" element={<FullReport />} />
        <Route
          path="/players/:playerId/update-player"
          element={<UpdatePlayer />}
        />
        <Route path="/players/:playerId/add-ratings" element={<AddRatings />} />
        <Route
          path="/players/:playerId/update-ratings"
          element={<UpdateRatings />}
        />
        <Route path="/players/:playerId/add-stats" element={<AddStats />} />
        <Route path="/scouts" element={<ScoutView />} />
        <Route path="/scouts/add-scout" element={<AddScout />} />
        <Route path="/scouts/:scoutId/update-scout" element={<UpdateScout />} />
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
