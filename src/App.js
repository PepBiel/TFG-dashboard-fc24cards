import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import React from "react";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import CaptureImages from "./scenes/captureImages";
import ClubPlayers from "./scenes/clubPlayers";
import SBC from "./scenes/SBC";
import { Routes, Route } from "react-router-dom"; // Importación añadida

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/capture-images" element={<CaptureImages />} />
              <Route path="/club-players" element={<ClubPlayers />} />
              <Route path="/sbc" element={<SBC />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
