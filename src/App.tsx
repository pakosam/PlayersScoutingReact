import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlayerView } from "./pages/PlayerView";
import { AddPlayer } from "./pages/AddPlayer";
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/players" element={<PlayerView />} ></Route>
        <Route path="/players/add-player" element={<AddPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
