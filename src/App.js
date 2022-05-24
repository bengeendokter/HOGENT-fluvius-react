import React from "react";
import
{
  Navigate, Route, Routes
} from "react-router-dom";
import "./App.css";
import NavMenu from "./components/NavMenu";
import PrivateRoute from "./components/PrivateRoute";
import CategorieDashboard from "./pages/CategorieDashboard";
import Dashboard from "./pages/Dashboard";
import DoelstellingDashboard from "./pages/DoelstellingDashboard";
import Itsme from "./pages/Itsme";
import Login from "./pages/Login";
import OverzichtWijzigen from "./pages/OverzichtWijzigen";
import TemplateBeheren from "./pages/TemplateBeheren";



function App()
{
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NavMenu />} />
      </Routes>

      <Routes>
        <Route exact path="/" element={<Navigate to={"/dashboard"} replace />} />
        <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route exact path="/categorieDashboard/:id" element={<PrivateRoute><CategorieDashboard /></PrivateRoute>} />
        <Route exact path="/templateBeheren" element={<PrivateRoute role="MVO coördinator"><TemplateBeheren /></PrivateRoute>} />
        <Route exact path="/overzichtWijzigen" element={<PrivateRoute><OverzichtWijzigen /></PrivateRoute>} />
        <Route exact path="/doelstellingDashboard/:id" element={<PrivateRoute><DoelstellingDashboard /></PrivateRoute>} />

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/itsme" element={<Itsme />} />
      </Routes>
    </div>
  );
}

export default App;
