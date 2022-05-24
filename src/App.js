import React from "react";
import "./App.css";
import {

  Routes,
  Route,
  Navigate,

} from "react-router-dom";
import NavMenu from "./components/NavMenu";
import Dashboard from "./pages/Dashboard";
import OverzichtWijzigen from "./pages/OverzichtWijzigen";
import TemplateBeheren from "./pages/TemplateBeheren";
import CategorieDashboard from "./pages/CategorieDashboard";
import Login from "./pages/Login";
import Itsme from "./pages/Itsme";
import DoelstellingDashboard from "./pages/DoelstellingDashboard";
import PrivateRoute from "./components/PrivateRoute";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NavMenu />} />
      </Routes>

      <Routes>
        <Route exact path="/" element={<Navigate to={"/dashboard"} replace/>}/>
        <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
        <Route exact path="/categorieDashboard/:id" element={<PrivateRoute><CategorieDashboard /></PrivateRoute>}/>
        <Route exact path="/templateBeheren" element={<PrivateRoute role="MVO coördinator"><TemplateBeheren /></PrivateRoute>}/>
        <Route exact path="/overzichtWijzigen" element={<PrivateRoute><OverzichtWijzigen /></PrivateRoute>}/>
        <Route exact path="/doelstellingDashboard/:id" element={<PrivateRoute><DoelstellingDashboard /></PrivateRoute>}/>
          
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/itsme" element={<Itsme />} />
      </Routes>
    </div>
  );
}

export default App;
