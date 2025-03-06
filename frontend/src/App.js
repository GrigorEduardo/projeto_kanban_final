import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AppBar from "./components/AppBar";
import Home from "./components/Home";
import DashboardTable from "./components/grade_info";
import CriarQuadro from "./components/CriarQuadro";
import KanbanBoard from "./components/Kanban";

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar />
        <Routes>
          <Route path="/" element={<><Home /><DashboardTable /></>} />
          <Route path="/novo-quadro" element={<CriarQuadro />} />
          <Route path="/kanban/:nomeDoQuadro" element={<KanbanBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;